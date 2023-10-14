from flask import Flask, request, jsonify, Blueprint
from flask_sqlalchemy import SQLAlchemy
from os import environ
from flask_cors import CORS
import enum
from datetime import date, timedelta, datetime

from models import SkillDetails, StaffSkills
from configs.extensions import db


app = Flask(__name__)
CORS(app)

skill_bp = Blueprint('skill_bp', __name__,)

@skill_bp.route('/')
def getAllSkillDetails():
    """
    Get all skill details in the skill_details SQL table.
    """
    all_skill_details = SkillDetails.query.all()
    print(all_skill_details)
    skill_details_json_list = [listing.json() for listing in all_skill_details]

    return jsonify(
        {
            "code" : 200,
            "data" : skill_details_json_list,
            "message" : "Successfully retrieved all skill details"
        }
    ), 200