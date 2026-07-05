from fileinput import filename
import json
import os
from datetime import datetime

from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

REPORT_DIR = os.path.join(BASE_DIR, "reports")
JSON_DIR = os.path.join(REPORT_DIR, "json")
PDF_DIR = os.path.join(REPORT_DIR, "pdf")
HTML_DIR = os.path.join(REPORT_DIR, "html")

for folder in [REPORT_DIR, JSON_DIR, PDF_DIR, HTML_DIR]:
    os.makedirs(folder, exist_ok=True)

class ReportGenerator:
    def __init__(self):
        print("Report Generator initialized successfully!")

    def generate_report(self, grouped_entities, category_scores, recommendations):
        total_score = sum(category_scores.values())
        summary = {
            "overall_risk": recommendations["overall"]["level"],
            "total_score": total_score,
            "generated_at": self.generate_timestamp()
        }
        report = {
            "report_id": self.generate_report_id(),
            "summary": summary,
            "statistics": self.generate_statistics(
                grouped_entities,
                recommendations
            ),
            "entities": grouped_entities,
            "category_scores": category_scores,
            "recommendations": recommendations
        }
        return report
    
    def generate_report_id(self):
        return "RPT-"+ datetime.now().strftime("%Y%m%d-%H%M%S")
    
    def generate_timestamp(self):
        return datetime.now().isoformat(timespec="seconds")
    
    def generate_statistics(self, grouped_entities, recommendations):
        stats = {
            "total_entities": 0,
            "critical": 0,
            "high": 0,
            "medium": 0,
            "low": 0
        }
        for entities in grouped_entities.values():
            stats["total_entities"] += len(entities)

        for rec in recommendations["entity_recommendations"]:
            risk = rec["risk"].lower()

            if risk == "critical":
                stats["critical"] += 1

            elif risk == "high":
                stats["high"] += 1

            elif risk == "medium":
                stats["medium"] += 1

            elif risk == "low":
                stats["low"] += 1
        return stats
    
    def save_json(self,report):
        """
        Save report dictionary as a JSON file.
        Args:
            report (dict)
        Returns:
            str: Path to saved file.
        """
        filename = f"{report['report_id']}.json"
        filepath = os.path.join(JSON_DIR, filename)
        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(report, f, indent=4, ensure_ascii=False)
        return filepath
    
    def export_pdf(self, report):
        filename = f"{report['report_id']}.pdf"
        filepath = os.path.join(PDF_DIR, filename)

        doc = SimpleDocTemplate(filepath)
        styles = getSampleStyleSheet()
        story = []

        # Title
        story.append(Paragraph("ShadowProfile Privacy Report", styles["Title"]))
        story.append(Spacer(1, 20))

        # Summary
        story.append(Paragraph("<b>Summary</b>", styles["Heading2"]))
        summary = report["summary"]

        story.append(Paragraph(f"Report ID: {report['report_id']}", styles["BodyText"]))
        story.append(Paragraph(f"Generated At: {summary['generated_at']}", styles["BodyText"]))
        story.append(Paragraph(f"Overall Risk: {summary['overall_risk']}", styles["BodyText"]))
        story.append(Paragraph(f"Total Score: {summary['total_score']}", styles["BodyText"]))
        story.append(Spacer(1, 15))

        # Statistics
        story.append(Paragraph("<b>Statistics</b>", styles["Heading2"]))
        stats = report["statistics"]

        for key, value in stats.items():
            story.append(
                Paragraph(
                    f"{key.replace('_', ' ').title()}: {value}",
                    styles["BodyText"]
                )
            )

        story.append(Spacer(1, 15))

        # Detected Entities
        story.append(Paragraph("<b>Detected Entities</b>", styles["Heading2"]))

        for category, entities in report["entities"].items():

            if not entities:
                continue

            story.append(
                Paragraph(category.replace("_", " ").title(), styles["Heading3"])
            )

            for entity in entities:
                value = entity.get("value", "N/A")
                entity_type = entity.get("type", "Unknown")

                story.append(
                    Paragraph(f"• {entity_type}: {value}", styles["BodyText"])
                )

            story.append(Spacer(1, 8))

        # Category Scores
        story.append(Paragraph("<b>Category Scores</b>", styles["Heading2"]))

        for category, score in report["category_scores"].items():
            story.append(
                Paragraph(
                    f"{category.replace('_',' ').title()}: {score}",
                    styles["BodyText"]
                )
            )

        story.append(Spacer(1, 15))

        # Recommendations
        story.append(Paragraph("<b>Recommendations</b>", styles["Heading2"]))

        overall = report["recommendations"]["overall"]

        story.append(
            Paragraph(
                f"<b>Overall:</b> {overall['message']}",
                styles["BodyText"]
            )
        )

        story.append(Spacer(1, 10))

        for rec in report["recommendations"]["entity_recommendations"]:
            story.append(
                Paragraph(
                    f"• <b>{rec['type']}</b>: {rec['recommendation']}",
                    styles["BodyText"]
                )
            )

        doc.build(story)

        return filepath