# from datetime import datetime as dt

from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required
from my_lib.general import URI, database


doctor_bp = Blueprint('doctor_routes', __name__)


@doctor_bp.route(URI + '<int:doctor_id>/patients', methods=['GET'])
@jwt_required()
def patients(doctor_id: int):
    """
    Get the patients

    Returns:
        response with the patients
    """

    success, doctor_id = database.read_by_id('doctors', doctor_id)

    if not success:
        return jsonify({
            "message": "Doctor not found"
        }), 404

    patients_ids = database.read_by_field(
        'patients', 'IdDoctor', doctor_id
    )

    _patients = []

    for patient_id in patients_ids:
        success, patient = database.read_by_id('patients', patient_id)

        if success:
            _patients.append(patient.serialize())

    return jsonify(_patients), 200
