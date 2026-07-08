from flask import Blueprint, request, jsonify

#sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__),"..")))

from services.entity_detector import EntityDetector
from services.nlp_analyzer import NLPAnalyzer
from services.privacy_risk import PrivacyRisk
from services.recommendation import RecommendationEngine
from services.simulation import Simulation
from services.sentiment import BehaviorAnalyzer
from services.report_generator import ReportGenerator

analyze_bp = Blueprint("analyze", __name__)

detector = EntityDetector()
analyzer = NLPAnalyzer()
risk_engine = PrivacyRisk()
recommendation_engine = RecommendationEngine()
simulation = Simulation()
behavior = BehaviorAnalyzer()
report_generator = ReportGenerator()

@analyze_bp.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json()
    if not data or "text" not in data:
        return jsonify({
            "error": "No text provided."
        }), 400

    text = data["text"]

    entities = detector.analyze_text(text)
    grouped = analyzer.group_entities(entities)
    scores = risk_engine.calculate_category_scores(grouped)
    recommendations = recommendation_engine.generate_recommendations(
        grouped,
        scores
    )
    simulation_result = simulation.generate_simulation(grouped)
    behavior_result = behavior.analyze_behavior(text)
    report = report_generator.generate_report(
        grouped,
        scores,
        recommendations
    )

    return jsonify({

        "entities": grouped,

        "category_scores": scores,

        "recommendations": recommendations,

        "simulation": simulation_result,

        "behavior_analysis": behavior_result,

        "report": report

    })