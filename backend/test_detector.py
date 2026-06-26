from services.entity_detector import EntityDetector

detector = EntityDetector()

text = """
Email: anan@gmail.com

Phone: 9876543210

Website:
https://github.com/AnanMohith07

PAN: ABCDE1234F

Aadhaar: 1234 5678 9123
"""

results = detector.detect_regex(text)

for item in results:
    print(item)