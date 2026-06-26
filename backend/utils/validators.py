import re


def is_valid_email(email):
    """
    Validates email format.
    """
    pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return re.match(pattern, email) is not None


def is_strong_password(password):
    """
    Password must contain:
    - At least 8 characters
    - One uppercase letter
    - One lowercase letter
    - One digit
    - One special character
    """
    pattern = (
        r'^(?=.*[a-z])'
        r'(?=.*[A-Z])'
        r'(?=.*\d)'
        r'(?=.*[@$!%*?&])'
        r'[A-Za-z\d@$!%*?&]{8,}$'
    )

    return re.match(pattern, password) is not None


def is_valid_url(url):
    """
    Checks whether a URL is valid.
    """
    pattern = (
        r'^(https?:\/\/)?'
        r'([\w\-]+\.)+'
        r'[a-zA-Z]{2,}'
        r'(\/.*)?$'
    )

    return re.match(pattern, url) is not None


def is_not_empty(text):
    """
    Checks if a string is not empty.
    """
    return bool(text and text.strip())