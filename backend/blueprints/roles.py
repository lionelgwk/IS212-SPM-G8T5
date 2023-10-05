from flask import Flask, request, jsonify, Blueprint
from os import environ
from flask_cors import CORS
import enum
from datetime import date, timedelta, datetime
from random import randint

from models import RoleListings, RoleDetails
from configs.extensions import db


app = Flask(__name__)
CORS(app)

role_bp = Blueprint('role_bp', __name__,)

@role_bp.route('/listed_roles')
def getAllListedRoles():
    """
    Get all listed roles in the role_listings SQL table.
    Output JSON format :
    {
        code : 200,
        data : []
        message : sucess
    }
    """
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
    ), 200



@role_bp.route('/open_roles')
def getAllOpenRoles():
    """
    Get all open role listings in the role_listings SQL table and filtering for role_listings with close_date after today's date.
    Output JSON format :
    {
        code : 200,
        data : []
        message : sucess
    }
    """  
    current_date = datetime.now().date()
    all_role_listings = RoleListings.query.filter(RoleListings.role_listing_close >= current_date).all()
    role_details_json_list = [listing.json() for listing in all_role_listings]

    for role_details_json in role_details_json_list:
        role_id = role_details_json["role_id"]
        role = RoleDetails.query.get(role_id)
        print("\n#######################")
        role_details_json["role_name"] = role.json()["role_name"]
        print(role_details_json)
    
    return jsonify(
        {
            "code" : 200,
            "message" : "GET request successful",
            "data" : role_details_json_list
        }
    ), 200



@role_bp.route('/add_role_detail', methods=["POST"])
def addRoleDetails():
    """
    Create new role detail by updating the role_details SQL table.
    Input parameters are in JSON format
    {
        "role_id" : 234567321, ##### PRIMARY KEY #####
        "role_name" : "Software Engineer",
        "role_description" : "Help to build and test new API endpoints for existing systems",
        "role_status" : "active"
    }
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
        print(new_role)
        return jsonify(
            {
                "code" : 200,
                "message" : "POST request successful",
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



@role_bp.route('/delete_role_listing', methods=["DELETE"])
def deleteRoleDetails():
    """
    Delete role detail from the role_details SQL table.
    Input parameters are in JSON format
    {
        "role_id" : 12391747
    }
    """
    try:
        data = request.json
        role_listing_id = data["role_id"]
        print("\n#############")
        print(role_listing_id)
        role_listing = RoleListings.query.filter_by(role_listing_id=role_listing_id).first()
        if role_listing is not None:
            db.session.delete(role_listing)
            db.session.commit()
            return jsonify(
                {
                    'message': 'Role Listing deleted successfully'
                }
            ), 200
        else:
            return jsonify(
                {
                    'error': 'Role Listing not found'
                }
            ), 404

    except Exception as e:
        return jsonify(
            {
                'code' : 500,
                "error" : e
            }
        ), 500



@role_bp.route('/add_role_listing', methods=["POST"])
def addRoleListing():
    """
    Create new role listing by updating the role_listings SQL table. New role listing can only be created using an existing role in role_details.
    Input parameters are in JSON format
    {
        "role_id" : 234567325,
        "role_listing_source" : 123456786,
        "role_listing_open" : "2023-09-28"
    }
    {
        "role_id" : 234567321,
        "role_listing_source" : 123456787,
        "role_listing_open" : "2023-09-29"
    }
    """
    data = request.json

    role_id = data['role_id']

    role = RoleDetails.query.filter_by(role_id=role_id).first().json()
    role_listing_desc = role["role_description"]
    role_name = role["role_name"]

    role_listing_source = data['role_listing_source']
    role_listing_open = datetime.strptime(data['role_listing_open'], '%Y-%m-%d')
    role_listing_id = randint(10000000, 99999999)

    try:
        role_listing_close = data["role_listing_close"]
    except:
        role_listing_close = role_listing_open + timedelta(weeks=2)
        new_role_listing = RoleListings(
            role_listing_id=role_listing_id,
            role_id=role_id,
            role_listing_desc=role_listing_desc,
            role_listing_source=role_listing_source,
            role_listing_open=role_listing_open,
            role_listing_close=role_listing_close
            )

    db.session.add(new_role_listing)
    db.session.commit()
    return jsonify(
        {
            "code" : 200,
            "message" : "POST request successful",
            "data" : [
                {   
                    "role_id" : role_id,
                    "role_name" : role_name,
                    "role_listing_desc" : role_listing_desc,
                    "role_listing_source" : role_listing_source,
                    "role_listing_open" : role_listing_open,
                    "role_listing_close" : role_listing_close
                }
            ]
        }
    ), 200



@role_bp.route('/listed_roles/<string:role_listing_id>', methods=["GET", "POST"])
def listedRoleDetails(role_listing_id):
    """
    Get details of the role listing by sending a GET request with the role_listing_id.
    role_listing_id = 102

    OR

    Edit role listing with the specified role_listing_id by sending a POST request.
    Current parameters that can be changed : [ role_listing_desc , role_listing_close, role_listing_open ]
    Input Parameters in JSON format:
    role_listing_id = 102
    {
        "role_listing_desc" : "testesttestsetste",
        "role_listing_close" : "2023-10-21",
        "role_listing_open" : "2023-9-21"
    }
    """
    role = RoleListings.query.filter_by(role_listing_id=role_listing_id).first()
    if role is None:
        return jsonify(
                {
                    "code" : 404,
                    "data" : "Role listing ID does not exist"
                }
            ), 404

    if request.method == "GET":
        role_details_json = role.json()
        role_id = role_details_json["role_id"]
        role = RoleDetails.query.get(role_id)
        role_details_json["role_name"] = role.json()["role_name"]

        return jsonify(
            {
                "code" : 200,
                "data" : role_details_json
            }
        ), 200
            
    elif request.method == "POST":
        data = request.json
        if data is None:
            return jsonify(
                {
                    "code" : 200,
                    "data" : "Empty request sent. No changes made"
                }
            ), 200
        else:
            if "role_listing_desc" in data:
                print(role.role_listing_desc)
                role.role_listing_desc = data["role_listing_desc"]
                print(role.role_listing_desc)

            if "role_listing_close" in data:
                print(role.role_listing_close)
                print(type(role.role_listing_close))
                role.role_listing_close = datetime.strptime(data["role_listing_close"], '%Y-%m-%d')
                print(role.role_listing_close)
                print(type(role.role_listing_close))

            if "role_listing_open" in data:
                print(role.role_listing_open)
                print(type(role.role_listing_open))
                print(data["role_listing_open"])
                role.role_listing_open = datetime.strptime(data["role_listing_open"], '%Y-%m-%d')
                print(role.role_listing_open)
                print(type(role.role_listing_open))

            db.session.commit()
            
        
        return jsonify(
        {
            "code" : 200,
            "message" : f"Role listing with the ID {role_listing_id} , has been sucessfully updated.",
            "data" : role.json()
        }
        ), 200