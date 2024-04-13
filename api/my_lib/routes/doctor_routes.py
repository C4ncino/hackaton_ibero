# from datetime import datetime as dt

from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
from my_lib.general import URI, database, crud_template


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


@doctor_bp.route(URI + '<int:doctor_id>/questions', methods=['GET', 'POST', 'PUT', 'DELETE'])
@doctor_bp.route(URI + '<int:doctor_id>/questions/<int:question_id>', methods=['GET'])
@crud_template(request, ['questionText'], ['questionText'])
@jwt_required()
def handle_questions(doctor_id: int, question_id: int = None):
    """
    Get the questions

    Returns:
        response with the questions
    """

    if request.method == 'GET':
        questions = None

        if question_id is not None:
            success, question = database.read_by_id('questions', question_id)

            questions = [question]

        else:
            success, questions = database.read_by_field(
                'questions', 'IdDoctor', doctor_id
            )

        if not success:
            return jsonify({
                "message": "Question not found"
            }), 404

        return jsonify({
            "questions": [question.serialize() for question in questions]
        }), 200
