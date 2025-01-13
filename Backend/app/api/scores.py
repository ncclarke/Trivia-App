from flask import Blueprint, request, jsonify
from app import db
from app.models.score import Score

scores_bp = Blueprint("scores", __name__, url_prefix="/scores")

@scores_bp.route("/save", methods=['POST'])
def save_score():
    name = request.json.get('name')
    correct_answers = request.json.get('correct_answers')

    new_score = Score(name=name, correct_answers=correct_answers)
    db.session.add(new_score)
    db.session.commit()

    return jsonify({"message": "Score saved successfully!"}), 201

@scores_bp.route("/get", methods=['GET'])
def get_scores():
    scores = Score.query.all()
    output = [{"id": score.id, "name": score.name, "correct_answers": score.correct_answers} for score in scores]

    return jsonify(output)

@scores_bp.route("/leaderboard", methods=['GET'])
def get_top_scores():
    # Query all scores, order by correct_answers in descending order, and limit to 5
    top_scores = Score.query.order_by(Score.correct_answers.desc()).limit(5).all()
    
    # Convert the result to a list of dictionaries
    output = [{"id": score.id, "name": score.name, "correct_answers": score.correct_answers} for score in top_scores]

    return jsonify(output)
