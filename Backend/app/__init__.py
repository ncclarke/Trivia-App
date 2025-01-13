from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config.from_object("app.config.Config")
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://testUser:testUserPassword@127.0.0.1:3306/trivia_data'

    db.init_app(app)

    # Register the API blueprint
    from app.routes import trivia
    app.register_blueprint(trivia)

    from .api import create_api
    create_api(app)

    with app.app_context():
        db.create_all()  # Create the database tables

    return app