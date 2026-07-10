from flask import Blueprint, request, send_file
from services.report_generator import ReportGenerator

report_bp = Blueprint("report", __name__)
report_generator = ReportGenerator()

@report_bp.route("/download", methods=["POST"])
def download_report():
    data = request.get_json()

    report = data["report"]

    pdf_path = report_generator.export_pdf(report)

    return send_file(
        pdf_path,
        as_attachment=True,
        download_name="ShadowProfile_Report.pdf"
    )