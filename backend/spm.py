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

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Float(precision=2), nullable=False)
    address = db.Column(db.String(50), nullable=False)

    def __init__(self, id, name, description, price, address):
        self.id = id
        self.name = name
        self.description = description
        self.price = price
        self.addres = address

    def json(self):
        return {"id": self.id, "name": self.name, "description": self.description, "price": self.price, "address": self.address}


@app.route("/staff_details")
def get_all():
    staff_details = StaffDetails.query.all()
    if len(staff_details):
        return jsonify(
            {
                "code": 200,
                "data": {
                    "activities": [staff_detail.json() for staff_detail in staff_details]
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
