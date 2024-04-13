import os

from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from flask_cors import CORS
from dotenv import load_dotenv

from my_lib.general import crud_template

# -----------------------------------------------------------------------------

load_dotenv()

app = Flask(__name__)
CORS(app)
JWTManager(app)

app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')

URI = '/api/v1/'

# -----------------------------------------------------------------------------


@app.route(URI + 'signup', methods=['POST'])
@crud_template(request, [])
def signup():
    return jsonify({
        "message": "Created Successfully",
    }), 201

    return jsonify({
        "message": "Error while creating"
    }), 501


if __name__ == '__main__':
    app.run(debug=True)
