from flask import Flask, jsonify
from config import Config
from database.db import get_connection
from routes.auth import auth_bp

app = Flask(__name__)
app.config.from_object(Config)

@app.route("/")
def home():
    return "ShadowProfile Backend Running"

@app.route("/health")
def health():
    connection = get_connection()

    if connection:
        connection.close()
        return jsonify({
            "status": "success",
            "message": "Database connected successfully!"
        })
    return jsonify({
        "status": "failed",
        "messsage": "Database connection failed!"
    }), 500

app.register_blueprint(auth_bp, url_prefix="/auth")

if __name__ == "__main__":
    app.run(debug=Config.DEBUG)

