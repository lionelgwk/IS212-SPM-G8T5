from flask import Flask, request, jsonify, Blueprint
from os import environ
from flask_cors import CORS
import enum
from datetime import date, timedelta, datetime
import uuid

from models import RoleListings, RoleDetails, RoleSkills, SkillDetails, RoleApplications, StaffDetails
from configs.extensions import db


app = Flask(__name__)
CORS(app)

listing_bp = Blueprint('listing_bp', __name__,)


@listing_bp.route('/listed_roles')
def getAllListedRoles():
    """
    Get all listed roles in the role_listings SQL table.
    """
    all_role_listings = db.session.query(RoleListings, RoleDetails).join(
        RoleDetails, RoleListings.role_id == RoleDetails.role_id).all()
    all_role_skills = db.session.query(RoleSkills, SkillDetails).join(
        SkillDetails, RoleSkills.skill_id == SkillDetails.skill_id).all()
    final = []
    for role_listing in all_role_listings:
        role_listing_json = role_listing[0].json()
        role_listing_json["role_name"] = role_listing[1].json()["role_name"]
        role_listing_json["role_skills"] = []
        for role_skill in all_role_skills:
            if role_skill[0].role_id == role_listing_json["role_id"]:
                role_listing_json["role_skills"].append(role_skill[1].json())
        final.append(role_listing_json)

    return jsonify(
        {
            "code": 200,
            "message": "GET request successful",
            "data": final
        }
    ), 200
    # role_details_json_list = [listing.json() for listing in all_role_listings]

    # for role_details_json in role_details_json_list:
    #     role_id = role_details_json["role_id"]
    #     role = RoleDetails.query.get(role_id)
    #     role_details_json["role_name"] = role.json()["role_name"]

    # return jsonify(
    #     {
    #         "code" : 200,
    #         "message" : "GET request successful",
    #         "data" : role_details_json_list
    #     }
    # ), 200


@listing_bp.route('/add_role_listing', methods=["POST"])
def addRoleListing():
    """
    Create new role listing by inserting into the role_listings SQL table. New role listing can only be created using an existing role in role_details.
    """
    data = request.json

    role_id = data['role_id']

    roleObj = RoleDetails.query.filter_by(role_id=role_id).first()
    if roleObj is None:
        return jsonify(
            {
                "code": 404,
                "message": f"Role with {role_id} not found."
            }
        )
    role = roleObj.json()
    role_listing_desc = role["role_description"]
    role_name = role["role_name"]

    role_listing_source = data['role_listing_source']
    role_listing_open = datetime.strptime(
        data['role_listing_open'], '%Y-%m-%d')
    role_listing_id = int(str(uuid.uuid4().int)[:19])
    role_listing_creator = data['role_listing_creator']

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
        role_listing_close=role_listing_close,
        role_listing_creator=role_listing_creator
    )

    db.session.add(new_role_listing)
    db.session.commit()
    return jsonify(
        {
            "code": 200,
            "message": "New role listing successfully created.",
            "data": [
                {
                    "role_listing_id": role_listing_id,
                    "role_id": role_id,
                    "role_name": role_name,
                    "role_listing_desc": role_listing_desc,
                    "role_listing_source": role_listing_source,
                    "role_listing_open": role_listing_open,
                    "role_listing_close": role_listing_close,
                    "role_listing_creator": role_listing_creator
                }
            ]
        }
    ), 200


@listing_bp.route('/open_roles', methods=["GET", "POST"])
def getAllOpenRoles():
    """
    Get all open role listings in the role_listings SQL table and filtering for role_listings with close_date after today's date.

    OR

    POST request to filter for all open roles based on skill id
    """
    current_date = datetime.now().date()
    if request.method == "GET":
        # all_role_listings = RoleListings.query.filter(RoleListings.role_listing_close >= current_date).all()
        all_role_listings = db.session.query(RoleListings, RoleDetails).join(
            RoleDetails, RoleListings.role_id == RoleDetails.role_id).filter(RoleListings.role_listing_close >= current_date).all()
        print(all_role_listings)
        if all_role_listings == []:
            return jsonify(
                {
                    "code": 200,
                    "message": "No open role listing found."
                }
            ), 200
        all_role_skills = db.session.query(RoleSkills, SkillDetails).join(
            SkillDetails, RoleSkills.skill_id == SkillDetails.skill_id).all()
        final = []
        for role_listing in all_role_listings:
            role_listing_json = role_listing[0].json()
            role_listing_json["role_name"] = role_listing[1].json()[
                "role_name"]
            role_listing_json["role_skills"] = []
            for role_skill in all_role_skills:
                if role_skill[0].role_id == role_listing_json["role_id"]:
                    role_listing_json["role_skills"].append(
                        role_skill[1].json())
            final.append(role_listing_json)

        return jsonify(
            {
                "code": 200,
                "message": "GET request successful",
                "data": final
            }
        ), 200
    elif request.method == "POST":
        data = request.json
        list_skill_ids = data["skill_ids"]
        all_role_listings = RoleListings.query.filter(RoleListings.role_listing_close >= current_date).filter(
            RoleSkills.skill_id.in_(list_skill_ids)).all()

        if all_role_listings is None:
            return jsonify(
                {
                    "code": 200,
                    "message": "No open role listing found."
                }
            ), 200
        role_details_json_list = [listing.json()
                                  for listing in all_role_listings]

        for role_details_json in role_details_json_list:
            role_id = role_details_json["role_id"]
            role = RoleDetails.query.get(role_id)
            role_details_json["role_name"] = role.json()["role_name"]

        return jsonify(
            {
                "code": 200,
                "message": "GET request successful",
                "data": role_details_json_list
            }
        ), 200


@listing_bp.route('/delete_role_listing', methods=["DELETE"])
def deleteRoleListing():
    """
    Delete role listing from the role_listing SQL table.
    Input parameters are in JSON format
    """
    try:
        data = request.json
        role_listing_id = data["role_id"]
        print("\n#############")
        print(role_listing_id)
        role_listing = RoleListings.query.filter_by(
            role_listing_id=role_listing_id).first()
        if role_listing is not None:
            db.session.delete(role_listing)
            db.session.commit()
            return jsonify(
                {
                    "code": 200,
                    'message': 'Role Listing deleted successfully'
                }
            ), 200
        else:
            return jsonify(
                {
                    "code": 404,
                    'error': 'Role Listing not found'
                }
            ), 404

    except Exception as e:
        return jsonify(
            {
                'code': 500,
                "error": e
            }
        ), 500


@listing_bp.route('/listed_roles/<string:role_listing_id>', methods=["GET", "POST"])
def listedRoleDetails(role_listing_id):
    """
    Get details of the role listing by sending a GET request with the role_listing_id.

    OR

    Edit role listing with the specified role_listing_id by sending a POST request.
    Current parameters that can be changed : [ role_listing_desc , role_listing_close, role_listing_open ]
    """
    role = RoleListings.query.filter_by(
        role_listing_id=role_listing_id).first()
    if role is None:
        return jsonify(
            {
                "code": 404,
                "data": "Role listing ID does not exist"
            }
        ), 404

    if request.method == "GET":
        role_details_json = role.json()
        role_id = role_details_json["role_id"]
        role = RoleDetails.query.get(role_id)
        role_details_json["role_name"] = role.json()["role_name"]
        all_role_skills = db.session.query(RoleSkills, SkillDetails).join(
            SkillDetails, RoleSkills.skill_id == SkillDetails.skill_id).all()
        role_details_json["role_skills"] = []
        for role_skill in all_role_skills:
            if role_skill[0].role_id == role_details_json["role_id"]:
                role_details_json["role_skills"].append(role_skill[1].json())

        return jsonify(
            {
                "code": 200,
                "data": role_details_json
            }
        ), 200

    elif request.method == "POST":
        data = request.json
        if data is None:
            return jsonify(
                {
                    "code": 200,
                    "data": "Empty request sent. No changes made"
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
                role.role_listing_close = datetime.strptime(
                    data["role_listing_close"], '%Y-%m-%d')
                print(role.role_listing_close)
                print(type(role.role_listing_close))

            if "role_listing_open" in data:
                print(role.role_listing_open)
                print(type(role.role_listing_open))
                print(data["role_listing_open"])
                role.role_listing_open = datetime.strptime(
                    data["role_listing_open"], '%Y-%m-%d')
                print(role.role_listing_open)
                print(type(role.role_listing_open))

            if "role_listing_source" in data:
                print(role.role_listing_source)
                role.role_listing_source = data["role_listing_source"]
                print(role.role_listing_source)

            db.session.commit()

        return jsonify(
            {
                "code": 200,
                "message": f"Role listing with the ID {role_listing_id} , has been sucessfully updated.",
                "data": role.json()
            }
        ), 200



@listing_bp.route('/applicants/<string:role_listing_id>')
def getApplicants(role_listing_id):
    """
    Get all applicants for a role listing by sending a GET request with the role_listing_id.
    """
    all_applicants = db.session.query(RoleApplications).filter(RoleApplications.role_listing_id == role_listing_id).all()

    
    return jsonify(
        {
            "code": 200,
            "message": "GET request successful",
            "data": [applicant.json() for applicant in all_applicants]
        }
    ), 200