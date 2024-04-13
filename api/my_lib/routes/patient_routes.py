"""
Patient Routes
"""

# from datetime import datetime as dt

from flask import Blueprint, jsonify, request
# from flask_jwt_extended import jwt_required
from my_lib.general import crud_template, URI, database

# -----------------------------------------------------------------------------

patient_bp = Blueprint('patient_routes', __name__)


@patient_bp.route(URI + 'add_doctor', methods=['POST'])
@crud_template(request, ['userId', 'doctorId'])
# @jwt_required()
def add_doctor():
    """
    Add a doctor to the user

    Returns:
        response with the doctor added
    """

    success, _ = database.crate_table_row(
        'patients',
        {
            'Id': request.json['userId'],
            'IdDoctor': request.json['doctorId']
        }
    )

    if not success:
        return jsonify({
            "message": "Error while creating"
        }), 501

    return jsonify({
        "message": "Doctor added successfully"
    }), 201


# TODO: Diary Routes
