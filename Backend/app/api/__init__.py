from flask import Flask
from .scores import scores_bp

def create_api(app: Flask):
    app.register_blueprint(scores_bp)
