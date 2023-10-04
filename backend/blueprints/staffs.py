from flask import Flask, request, jsonify, Blueprint
from flask_sqlalchemy import SQLAlchemy
from os import environ
from flask_cors import CORS
import enum
from datetime import date, timedelta, datetime
from random import randint

from models import StaffDetails
from configs.extensions import db


app = Flask(__name__)
CORS(app)

staff_bp = Blueprint('staff_bp', __name__,)

@staff_bp.route('/')
def getStaffs():
    """
    Get all Staffs in the staff_details SQL table
    """
    staffs = StaffDetails.query.all()
    if staffs is not None:
        return jsonify(
            {
                "code" : 200,
                "data" : {
                    "staffs" : [staff.json() for staff in staffs]
                }
            }
        ), 200
    else:
        return jsonify(
            {
                "code" : 404,
                "data" : "No staffs found in staff_details table"
            }
        ), 404

@staff_bp.route('/<string:id>')
def getStaffDetails(id):
    """
    Get details of a Staff in the staff_details SQL table, based on staff_id
    Input Parameter: 
    id = 123456786
    """
    staff = StaffDetails.query.filter_by(staff_id=id).first()
    if staff is not None:
        return jsonify(
            {
                "code" : 200,
                "data" : staff.json()
            }
        ), 200
    else:
        return jsonify(
            {
                "code" : 404,
                "data" : "Staff id not found in staff_details table"
            }
        ), 404