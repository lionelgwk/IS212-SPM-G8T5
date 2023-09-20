from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from os import environ
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('dbURL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {'pool_recycle': 299}

db = SQLAlchemy(app)

CORS(app)

class StaffDetails(db.Model):
    __tablename__ = 'staff_details'

    staff_id = db.Column(db.Integer, primary_key=True)
    fname = db.Column(db.String(50), nullable=False)
    lname = db.Column(db.String(50), nullable=False)
    dept = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    biz_address = db.Column(db.String(255), nullable=False)

    def __init__(self, staff_id, fname, lname, dept, email, phone, biz_address):
        self.staff_id = staff_id
        self.fname = fname
        self.lname = lname
        self.dept = dept
        self.email = email
        self.phone = phone
        self.biz_address = biz_address
        self.staff_reporting_officer = db.relationship("StaffReportingOfficer", back_populates="")

    def json(self):
        return {"staff_id": self.staff_id, "fname": self.fname, "lname": self.lname, "dept": self.dept, "email": self.email, "phone": self.phone, "biz_address": self.biz_address}

class StaffReportingOfficer(db.Model):
    __tablename__ = 'staff_reporting_officer'

    staff_id = db.Column(db.Integer, primary_key=True)
    RO_id = db.Column(db.Integer, db.ForeignKey('staff_details.staff_id'))

    def __init__(self, staff_id, RO_id):
        self.staff_id = staff_id
        self.RO_id = RO_id


    def json(self):
        return {"staff_id": self.staff_id, "RO_id": self.RO_id}






















@app.route("/staff_details")
def get_all():
    staff_details = StaffDetails.query.all()
    if len(staff_details):
        return jsonify(
            {
                "code": 200,
                "data": {
                    "staff_details": [staff_detail.json() for staff_detail in staff_details]
                }
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "There are no staff details."
        }
    ), 404


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5050, debug=True)
