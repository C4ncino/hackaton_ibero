"""
Main App
"""
import os

from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from dotenv import load_dotenv

from my_lib.routes import user_bp, patient_bp

# -----------------------------------------------------------------------------

load_dotenv()

app = Flask(__name__)

CORS(app)

JWTManager(app)
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')

# -----------------------------------------------------------------------------

app.register_blueprint(user_bp)

app.register_blueprint(patient_bp)

if __name__ == '__main__':
    app.run(debug=True)
