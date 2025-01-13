import requests
from flask import current_app

def fetchAQuestion(category = None, difficulty = None):
    url = current_app.config["TRIVIA_API_URL"]
    params = {
        "amount": 1, #Fetch one question
        "category": category,
        "difficulty": difficulty,
        "type": "multiple"  # Only fetch multiple-choice questions
    }

    # Remove None values from the params
    params = {key: value for key, value in params.items() if value is not None}

    try:
        response = requests.get(url, params=params)
        response.raise_for_status()  # Raise an exception for HTTP errors
        return response.json().get("results", [])
    except requests.exceptions.RequestException as e:
        return {"error": f"Failed to fetch questions: {str(e)}"}
