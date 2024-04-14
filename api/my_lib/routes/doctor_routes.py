from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
from my_lib.general import URI, database, crud_template, is_none


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


@doctor_bp.route(URI + '<int:doctor_id>/questions',
                 methods=['GET', 'POST'])
@crud_template(request, ['questionText'])
@jwt_required()
def handle_questions(doctor_id: int):
    """
    Get the questions

    Returns:
        response with the questions
    """

    if request.method == 'POST':
        success, question = database.create_table_row(
            'questions',
            {
                'IdDoctor': doctor_id,
                'QuestionText': request.json['questionText']
            }
        )

        if not success:
            return jsonify({
                "message": "Error while creating"
            }), 501

        return jsonify({
            "question": question.serialize()
        }), 201

    if request.method == 'GET':
        questions = None

        success, questions = database.read_by_field(
            'questions', 'IdDoctor', doctor_id
        )

        if not success:
            return jsonify({
                "message": "Questions not found"
            }), 404

        return jsonify({
            "questions": [question.serialize() for question in questions]
        }), 200


@doctor_bp.route(URI + '<int:doctor_id>/questions/<int:question_id>',
                 methods=['GET', 'PUT', 'DELETE'])
@crud_template(request, optional_fields=['questionText'])
@jwt_required()
def handle_questions_by_id(_: int, question_id: int = None):
    """
    Get the questions

    Returns:
        response with the questions
    """

    if is_none(question_id):
        return jsonify({
            "message": "Missing Question Id"
        }), 400

    if request.method == 'PUT':
        success, question = database.update_table_row(
            'questions', question_id, request.json
        )

        if success:
            return jsonify({
                "question": question.serialize()
            }), 200

    if request.method == 'DELETE':
        success, question = database.delete_table_row('questions', question_id)

        if success:
            return jsonify({
                "message": "Question deleted successfully"
            }), 200

    if request.method == 'GET':
        success, question = database.read_by_id('questions', question_id)

        if success:
            return jsonify({
                "questions": question.serialize()
            }), 200

    return jsonify({
        "message": "Question not found"
    }), 404


@doctor_bp.route(URI + 'create_diary/<int:pacient_id>', methods=['POST'])
@crud_template(request, ['title', 'description'])
@jwt_required()
def create_diary(pacient_id: int):
    """
    Create a diary

    Returns:
        response with the diary created
    """

    success, diary = database.create_table_row(
        'diaries',
        {
            'IdUser': pacient_id,
            'Title': request.json['title'],
            'Description': request.json['description']
        }
    )

    if not success:
        return jsonify({
            "message": "Error while creating"
        }), 501

    return jsonify({
        "diary": diary.serialize()
    }), 201


@doctor_bp.route(URI + 'add_question/<int:diary_id>', methods=['POST'])
@crud_template(request, ['idQuestion'])
@jwt_required()
def add_question(diary_id: int):
    """
    Add a question to a diary

    Returns:
        response with the diary updated
    """

    success, _ = database.create_table_row(
        'diary_questions',
        {
            'IdDiary': diary_id,
            'IdQuestion': request.json['idQuestion']
        }
    )

    if not success:
        return jsonify({
            "message": "Error while creating"
        }), 501

    return jsonify({
        "message": "Question added successfully"
    }), 200
