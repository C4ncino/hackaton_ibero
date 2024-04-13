from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from flask_cors import CORS
from dotenv import load_dotenv
import os, random
from datetime import datetime

from my_lib.general import crud_template, is_none
from my_lib.database import DB_interface, Queue, User, Games, Questions, Clash, Game_Question, Shortcuts, Shortcut_Game, Clash_Question, Level, Paragraph, Example

# -----------------------------------------------------------------------------

load_dotenv()

app = Flask(__name__)
CORS(app)
JWTManager(app)
database = DB_interface()

app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')

URI = '/api/v1/'

# -----------------------------------------------------------------------------

@app.route(URI + 'signup', methods=['POST'])
@crud_template(request, ['firstName', 'lastName', 'age', 'username', 'password'])
def signup():
    return jsonify({
        "message": "Created Successfully",
        "user": register.serialize(),
        "token": token
    }), 201
    
    return jsonify({
        "message": "Error while creating"
    }), 501


if __name__ == '__main__':
    app.run(debug=True)