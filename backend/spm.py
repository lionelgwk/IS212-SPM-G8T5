from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from os import environ
from flask_cors import CORS
import enum
from datetime import date, timedelta

from configs.config import Config
from configs.extensions import db

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)
db.init_app(app)

# import blueprints
from blueprints.roles import roles
app.register_blueprint(roles.role_bp)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5050, debug=True)
