""""
General functions and variables
"""

from flask import Request, jsonify


def validate(request: Request, fields: list[str]) -> str:
    """
    Validate if the fields are in the request

    Args:
        request: The request
        fields: The fields to validate

    Returns:
        str: The errors
    """

    possible_errors = {}

    for field in fields:
        if field not in request.json:
            possible_errors[field] = f"'{field}' is needed"

    if request.method == 'POST':
        return possible_errors, len(possible_errors) == 0

    if request.method == 'PUT':
        error_msg = "At least one field is required"
        return error_msg, len(possible_errors) < len(fields)

    return None


def crud_template(request: Request, needed_fields: list[str] = None,
                  optional_fields: list[str] = None):
    """
    Decorator to validate if the fields are in the request

    Args:
        request: The request
        needed_fields: The fields to validate
        optional_fields: The fields to validate

    Returns:
        str: The errors
    """

    if needed_fields is None:
        needed_fields = []

    if optional_fields is None:
        optional_fields = []

    def decorador(func):

        wrapper_name = f"{func.__name__}_wrapper"

        def wrapper(*args, **kwargs):
            if request.method in ('POST', 'PUT'):
                if not request.json:
                    return jsonify({
                        "error": "A body in JSON format is needed"
                    }), 400

                if request.method == 'POST':
                    errors, validated = validate(request, needed_fields)
                else:
                    errors, validated = validate(request, optional_fields)

                if not validated:
                    return jsonify({"error": errors}), 400

            return func(*args, **kwargs)

        wrapper.__name__ = wrapper_name

        return wrapper

    return decorador


def is_none(value) -> bool:
    """
    Check if the value is None

    Args:
        value: The value to check

    Returns:
        bool: True if the value is None, False otherwise
    """

    return value is None
