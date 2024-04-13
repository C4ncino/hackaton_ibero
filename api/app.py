"""
Main App
"""
import os

from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager, create_access_token
from flask_cors import CORS
from dotenv import load_dotenv

from my_lib.general import crud_template
from my_lib.database import DatabaseInterface

# -----------------------------------------------------------------------------

load_dotenv()

app = Flask(__name__)
CORS(app)
JWTManager(app)

database = DatabaseInterface()

app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')

URI = '/api/v1/'

# -----------------------------------------------------------------------------


@app.route(URI + 'signup', methods=['POST'])
@crud_template(request, ['email', 'password', 'name', 'lastName', 'birthDate'])
def signup():
    """
    Create a new user

    Returns:
        response with the user created
    """

    if database.exist_user(request.json['email']):
        return jsonify({
            "message": "User already exist"
        }), 302

    created, user = database.crate_table_row(
        'user',
        {
            'Name': request.json['name'],
            'LastName': request.json['lastName'],
            'Email': request.json['email'],
            'Password': request.json['password'],
            'BirthDate': request.json['birthDate'],
        }
    )

    if created:
        token = create_access_token(identity=user.Username)

        data, element_id = user.serialize()

        return jsonify({
            "message": "Created Successfully",
            "user": {
                "id": element_id,
                "data": data
            },
            "token": token
        }), 201

    return jsonify({
        "message": "Error while creating"
    }), 501


@app.route(URI + 'login', methods=['POST'])
@crud_template(request, ['email', 'password'])
def login():
    """
    Login an existing user

    Returns:
        response with the user logged in
    """

    email = request.json['email']
    password = request.json['password']

    success, user = database.try_login(email, password)

    if success:
        token = create_access_token(identity=email)

        data, element_id = user.serialize()

        return jsonify({
            "message": "Login Successfully",
            "user": {
                "id": element_id,
                "data": data
            },
            "token": token
        }), 200

    return jsonify({
        "message": "Incorrect Credentials",
    }), 401


if __name__ == '__main__':
    app.run(debug=True)
