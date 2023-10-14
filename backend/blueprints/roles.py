from flask import Flask, request, jsonify, Blueprint
from os import environ
from flask_cors import CORS
import enum
from datetime import date, timedelta, datetime
import uuid

from models import RoleListings, RoleDetails, RoleSkills
from configs.extensions import db


app = Flask(__name__)
CORS(app)

role_bp = Blueprint('role_bp', __name__,)


@role_bp.route('/')
def getAllRoles():
    """
    Get all roles in the role_details SQL table.
    """
    all_roles = RoleDetails.query.all()
    return jsonify(
        {
            "code" : 200,
            "message" : "GET request successful",
            "data" : [role.json() for role in all_roles]
        }
    ), 200


@role_bp.route('/<string:id>')
def getRoleDetails(id):
    """
    Get details of a role in the role_details SQL table, based on role_id
    Input Parameter: 
    id = 123456786
    """
    role = RoleDetails.query.filter_by(role_id=id).first()
    if role is not None:
        return jsonify(
            {
                "code" : 200,
                "data" : role.json()
            }
        ), 200
    else:
        return jsonify(
            {
                "code" : 404,
                "data" : "Role id not found in role_details table"
            }
        ), 404


@role_bp.route('/add_role_detail', methods=["POST"])
def addRoleDetails():
    """
    Create new role detail by updating the role_details SQL table.
    """
    try:
        data = request.json
        new_role = RoleDetails(
            role_id=data['role_id'],
            role_name=data['role_name'],
            role_description=data['role_description'],
            role_status=data['role_status']
            )
        db.session.add(new_role)
        db.session.commit()
        return jsonify(
            {
                "code" : 200,
                "message" : "New role detail created successful.",
                "request": [data]
            }
        ), 200
    except Exception as e:
        return jsonify(
            {
                'code' : 500,
                "error" : e
            }
        ), 500


