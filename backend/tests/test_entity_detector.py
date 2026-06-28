from services.entity_detector import EntityDetector

detector = EntityDetector()

text = """
My name is Anan Mohith.

I study MCA at PES University in Bangalore.

Email: anan@gmail.com

Phone: 9876543210

GitHub:
https://github.com/AnanMohith07

Instagram:
@anan

Password: Secret123

OTP: 456789

Aadhaar:
1234 5678 9012
"""

results = detector.analyze_text(text)

for result in results:
    print(result)