"""
Patient Routes
"""

# from datetime import datetime as dt

from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
from my_lib.general import crud_template, URI, database, is_none

# -----------------------------------------------------------------------------

patient_bp = Blueprint('patient_routes', __name__)


@patient_bp.route(URI + 'add_doctor', methods=['POST'])
@crud_template(request, ['userId', 'doctorId'])
@jwt_required()
def add_doctor():
    """
    Add a doctor to the user

    Returns:
        response with the doctor added
    """

    success, _ = database.create_table_row(
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


@patient_bp.route(URI + '<int:patient_id>/diaries/<int:diary_id>',
                  methods=['GET'])
@patient_bp.route(URI + '<int:patient_id>/diaries',
                  methods=['GET'])
@jwt_required()
def patient_diaries(patient_id: int, diary_id: int = None):
    """
    Get the patient diaries

    Returns:
        response with the patient diaries
    """

    if is_none(diary_id):
        diaries = database.read_by_field(
            'diaries',
            'IdUser',
            patient_id
        )

        return jsonify({
            "diaries": [d.serialize() for d in diaries]
        }), 200

    diary = database.read_by_id('diaries', diary_id)

    if is_none(diary):
        return jsonify({
            "message": "Diary not found"
        }), 404

    registers = database.read_by_field(
        'registers',
        'IdDiary',
        diary_id
    )

    questions_ids = database.read_by_field(
        'diaries_questions',
        'IdDiary',
        diary_id
    )

    questions = []
    for q_d in questions_ids:
        question = database.read_by_id('questions', q_d.IdQuestion)

        if not is_none(question):
            questions.append(question.serialize())

    return jsonify({
        "diary": diary.serialize(),
        "registers": [r.serialize() for r in registers],
        "questions": questions
    }), 200


@patient_bp.route(URI + 'answer/<int:diary_id>/<int:question_id>',
                  methods=['POST'])
@crud_template(request, ['answer'])
@jwt_required()
def answer_question(diary_id: int, question_id: int):
    """
    Answer a question

    Returns:
        response with the answer
    """

    success, answer = database.create_table_row(
        'registers',
        {
            'IdDiary': diary_id,
            'IdQuestion': question_id,
            'Answer': request.json['answer']
        }
    )

    if not success:
        return jsonify({
            "message": "Error while creating"
        }), 501

    return jsonify({
        "answer": answer.serialize()
    }), 201
