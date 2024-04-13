from flask import Request, jsonify

# -----------------------------------------------------------------------------

def validate(request: Request, fields: list[str]) -> str:
    possible_errors = {}
    
    for field in fields:
        if field not in request.json:
            possible_errors[field] = f"'{field}' is needed"
    
    if request.method == 'POST':
        return possible_errors, len(possible_errors) == 0
    elif request.method == 'PUT':
        return "At least one field is required", len(possible_errors) < len(fields)


def crud_template(request: Request, needed_fields: list[str] = [], optional_fields: list[str] = []):
    def decorador(func):
        
        wrapper_name = f"{func.__name__}_wrapper"

        def wrapper(*args, **kwargs):
            if request.method == 'POST' or request.method == 'PUT':

                if not request.json:
                    return jsonify({"error": "A body in JSON format is needed"}), 400
                
                if request.method == 'POST':
                    errors, validated = validate(request, needed_fields)
                else:
                    errors, validated = validate(request, optional_fields)

                if  not validated:
                    return jsonify({"error": errors}), 400
                
            return func(*args, **kwargs)
        
        wrapper.__name__ = wrapper_name

        return wrapper
    
    return decorador


def is_none(input) -> bool:
    return input == None