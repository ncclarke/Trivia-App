from flask import Blueprint, jsonify, request
from app.source import fetchAQuestion

trivia = Blueprint("trivia", __name__, url_prefix="/trivia")

@trivia.route("/next", methods=["GET"])
def get_question():
    category = request.args.get("category", type=int)
    difficulty = request.args.get("difficulty", type=str)

    question = fetchAQuestion(category, difficulty)
    return jsonify(question)