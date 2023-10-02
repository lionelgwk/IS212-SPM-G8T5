from flask import Flask, request, jsonify, Blueprint
from flask_sqlalchemy import SQLAlchemy
from os import environ
from flask_cors import CORS
import enum
from datetime import date, timedelta, datetime
from models import RoleListings, RoleDetails

app = Flask(__name__)

CORS(app)

role_bp = Blueprint('role_bp', __name__,)

@role_bp.route('/listed_roles')
def getAllListedRoles():
    all_role_listings = RoleListings.query.all()
    role_details_json_list = [listing.json() for listing in all_role_listings]

    for role_details_json in role_details_json_list:
        role_id = role_details_json["role_id"]
        role = RoleDetails.query.get(role_id)
        role_details_json["role_name"] = role.json()["role_name"]
    
    return jsonify(
        {
            "code" : 200,
            "message" : "GET request successful",
            "data" : role_details_json_list
        }
    )

@role_bp.route('/open_roles')
def getAllOpenRoles():
    current_date = datetime.now().date()
    all_role_listings = RoleListings.query.filter(RoleListings.role_listing_close > current_date).all()
    role_details_json_list = [listing.json() for listing in all_role_listings]

    for role_details_json in role_details_json_list:
        role_id = role_details_json["role_id"]
        role = RoleDetails.query.get(role_id)
        print("\n#######################")
        print(role_id)
        print(role.json())
        role_details_json["role_name"] = role.json()["role_name"]
        print(role_details_json)
    
    return jsonify(
        {
            "code" : 200,
            "message" : "GET request successful",
            "data" : role_details_json_list
        }
    )


@role_bp.route('/new_role_listing', methods=["POST"])
def getAllOpenRoles():
    current_date = datetime.now().date()
    all_role_listings = RoleListings.query.filter(RoleListings.role_listing_close > current_date).all()
    role_details_ json_list = [listing.json() for listing in all_role_listings]

    for role_details_json in role_details_json_list:
        role_id = role_details_json["role_id"]
        role = RoleDetails.query.get(role_id)
        print("\n#######################")
        print(role_id)
        print(role.json())
        role_details_json["role_name"] = role.json()["role_name"]
        print(role_details_json)
    
    return jsonify(
        {
            "code" : 200,
            "message" : "GET request successful",
            "data" : role_details_json_list
        }
    )