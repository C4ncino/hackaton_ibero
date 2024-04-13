"""
Main App
"""
import os
from datetime import datetime as dt

from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from flask_cors import CORS
from dotenv import load_dotenv

from my_lib.general import crud_template, is_none, validate
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


@app.route(URI + 'signup/<string:user_type>', methods=['POST'])
@crud_template(request, ['email', 'password', 'name', 'lastName', 'birthDate'])
def signup(user_type: str):
    """
    Create a new user

    Returns:
        response with the user created
    """

    if database.exist_user(request.json['email']):
        return jsonify({
            "message": "User already exist"
        }), 302

    date = dt.strptime(request.json['birthDate'], "%d-%m-%Y").date()

    created, user = database.crate_table_row(
        'users',
        {
            'Name': request.json['name'],
            'LastName': request.json['lastName'],
            'Email': request.json['email'],
            'Password': request.json['password'],
            'UserType': user_type.lower(),
            'BirthDate': date,
        }
    )

    if user_type.lower() == 'd':
        errors, success = validate(
            request,
            ['contactEmail', 'ExperienceYears']
        )

        if not success:
            return jsonify({
                "message": "Errors in the fields",
                "errors": errors
            }), 400

        success, _ = database.crate_table_row(
            'doctors',
            {
                'ContactEmail': request.json['contactEmail'],
                'ExperienceYears': request.json['ExperienceYears'],
            }
        )

        if not success:
            return jsonify({
                "message": "Error while creating"
            }), 501

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


@app.route(URI + 'me/<string:user_id>', methods=['GET', 'PUT'])
@crud_template(request, optional_fields=['email', 'name', 'lastName',
                                         'birthDate', 'contactEmail',
                                         'ExperienceYears'])
@jwt_required()
def me(user_id):
    """
    Get the current user or update it

    Returns:
        response with the current user
    """

    user = database.read_by_id('users', user_id)

    if is_none(user):

        return jsonify({
            "message": "Not found",
        }), 404

    if request.method == 'PUT':
        data = database.update_table_row('users', user_id, request.json)

        return jsonify({
            "message": "Updated Successfully",
            "user": data
        }), 200

    data, _ = user.serialize()

    if user.UserType == 'd':
        doctor = database.read_by_id('doctors', user_id)

        if is_none(doctor):
            return jsonify({
                "message": "Not found",
            }), 404

        data['contactEmail'] = doctor.ContactEmail
        data['ExperienceYears'] = doctor.ExperienceYears

    return jsonify({
        "message": "Login Successfully",
        "user": data
    }), 200


if __name__ == '__main__':
    app.run(debug=True)
