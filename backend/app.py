from flask import Flask, jsonify
from flask_cors import CORS

from config import Config
from database.db import get_connection
from routes.auth import auth_bp
from routes.analyze import analyze_bp
from routes.report import report_bp

app = Flask(__name__)
app.config.from_object(Config)

CORS(app)

app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(analyze_bp)
app.register_blueprint(report_bp, url_prefix="/report")

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

if __name__ == "__main__":
    app.run(debug=Config.DEBUG)

