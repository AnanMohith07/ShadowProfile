from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash

from models.user import UserModel
from utils.validators import (
    is_valid_email,
    is_strong_password,
    is_not_empty
)

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    full_name = data.get("full_name")
    email = data.get("email")
    password = data.get("password")

    if not is_not_empty(full_name):
        return jsonify({"error": "Full name is required"}), 400

    if not is_valid_email(email):
        return jsonify({"error": "Invalid email"}), 400

    if not is_strong_password(password):
        return jsonify({"error": "Weak password"}), 400

    if UserModel.get_user_by_email(email):
        return jsonify({
            "error": "Email already registered."
        }), 409
    
    password_hash = generate_password_hash(password)
    success = UserModel.create_user(
        full_name,
        email,
        password_hash
    )
    if success:
        return jsonify({
            "message": "Registration successful."
        }), 201
    return jsonify({
        "error": "Registration failed."
    }), 500

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    email = data.get("email")
    password = data.get('password')

    if not is_valid_email(email):
        return jsonify({
            "error": "Invlaid email",
        }),400

    if not is_not_empty(password):
        return jsonify({
            "error": "Password is required. "
        }),400

    user = UserModel.get_user_by_email(email)
    if user is None:
        return jsonify({
            "error": "Invalid email or passsword"
        }),401
    if not check_password_hash(user["password_hash"],password):
        return jsonify({
            "error": "Invalid email or passsword"
        }),401
    
    return jsonify({
        "message": "Login successfull",
        "user": {
            "user_id": user["user_id"],
            "full_name": user["full_name"],
            "email": user["email"]
        }
    }),200