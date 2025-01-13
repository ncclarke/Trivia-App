from app import db  

class Score(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    correct_answers = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f"<Score {self.name} - {self.correct_answers}>"