from configs.config import Config
from configs.extensions import db
import enum
from datetime import date, timedelta, datetime


class SysRoles(enum.Enum):
    staff = "staff"
    manager = "manager"
    hr = "hr"
    inactive = "inactive"



class StaffDetails(db.Model):
    __tablename__ = 'staff_details'

    staff_id = db.Column(db.Integer, primary_key=True)
    fname = db.Column(db.String(50), nullable=False)
    lname = db.Column(db.String(50), nullable=False)
    dept = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    biz_address = db.Column(db.String(255), nullable=False)
    sys_role = db.Column(db.Enum(SysRoles))
    roles = db.relationship("RoleDetails", secondary="staff_roles", back_populates="staffs")
    skills = db.relationship("SkillDetails", secondary="staff_skills", back_populates="staffs")

    def __init__(self, staff_id, fname, lname, dept, email, phone, biz_address, roles=None, skills=None):
        self.staff_id = staff_id
        self.fname = fname
        self.lname = lname
        self.dept = dept
        self.email = email
        self.phone = phone
        self.biz_address = biz_address
        self.roles = roles
        self.skills = skills

    def json(self):
        return {"staff_id": self.staff_id, "fname": self.fname, "lname": self.lname, "dept": self.dept, "email": self.email, "phone": self.phone, "biz_address": self.biz_address}



class StaffReportingOfficer(db.Model):
    __tablename__ = 'staff_reporting_officer'

    staff_id = db.Column(db.Integer, primary_key=True)
    RO_id = db.Column(db.Integer, db.ForeignKey('staff_details.staff_id'))
    reporting_officer = db.relationship("StaffDetails")

    def __init__(self, staff_id, RO_id, reporting_officer=None):
        self.staff_id = staff_id
        self.RO_id = RO_id
        self.reporting_officer = reporting_officer

    def json(self):
        return {"staff_id": self.staff_id, "RO_id": self.RO_id}
    


class SkillStatuses(enum.Enum):
    active = "active"
    inactive = "inactive"
    unverified = "unverified"



class RoleDetails(db.Model):
    __tablename__ = 'role_details'

    role_id = db.Column(db.Integer, primary_key=True)
    role_name = db.Column(db.String(50), nullable=False)
    role_description = db.Column(db.String(50000), nullable=False)
    role_status = db.Column(db.Enum(SkillStatuses))
    staffs = db.relationship("StaffDetails", secondary="staff_roles", back_populates="roles")
    skills = db.relationship("SkillDetails", secondary="role_skills", back_populates="roles")

    def __init__(self, role_id, role_name, role_description, role_status, staffs=[]):
        self.role_id = role_id
        self.role_name = role_name
        self.role_description = role_description
        self.role_status = role_status
        self.staffs = staffs

    def json(self):
        return {"role_id": self.role_id, "role_name": self.role_name, "role_description" : self.role_description, "role_status" : self.role_status}
    


class SkillDetails(db.Model):
    __tablename__ = 'skill_details'

    skill_id = db.Column(db.Integer, primary_key=True)
    skill_name = db.Column(db.String(50), nullable=False)
    skill_status = db.Column(db.Enum(SkillStatuses))
    staffs = db.relationship("StaffDetails", secondary="staff_skills", back_populates="skills")
    roles = db.relationship("RoleDetails", secondary="role_skills", back_populates="skills")
    
    def __init__(self, skill_id, skill_name, skill_status, staffs=None, roles=None):
        self.skill_id = skill_id
        self.skill_name = skill_name
        self.skill_status = skill_status
        self.staffs = staffs
        self.roles = roles

    def json(self):
        return {"skill_id": self.skill_id, "skill_name": self.skill_name, "skill_status": self.skill_status.value}



class RoleTypes(enum.Enum):
    primary = "primary"
    secondary = "secondary"



class StaffRoles(db.Model):
    __tablename__ = 'staff_roles'

    staff_id = db.Column(db.Integer, db.ForeignKey('staff_details.staff_id'), primary_key=True)
    staff_role = db.Column(db.Integer, db.ForeignKey('role_details.role_id'), primary_key=True)
    role_type = db.Column(db.Enum(RoleTypes))
    sr_status = db.Column(db.Enum(SkillStatuses))

    def __init__(self, staff_id, staff_role, role_type, sr_status):
        self.staff_id = staff_id
        self.staff_role = staff_role
        self.role_type = role_type
        self.sr_status = sr_status

    def json(self):
        return {"staff_id": self.staff_id, "staff_role": self.staff_role, "role_type": self.role_type, "sr_status": self.sr_status}
    


class StaffSkills(db.Model):
    __tablename__ = 'staff_skills'

    staff_id = db.Column(db.Integer, db.ForeignKey('staff_details.staff_id'), primary_key=True)
    skill_id = db.Column(db.Integer, db.ForeignKey('skill_details.skill_id'), primary_key=True)
    ss_status = db.Column(db.Enum(SkillStatuses))

    def __init__(self, staff_id, skill_id, ss_status):
        self.staff_id = staff_id
        self.skill_id = skill_id
        self.ss_status = ss_status

    def json(self):
        return {"staff_id": self.staff_id, "skill_id": self.skill_id, "ss_status": self.ss_status}



class RoleSkills(db.Model):
    __tablename__ = 'role_skills'

    role_id = db.Column(db.Integer, db.ForeignKey('role_details.role_id'), primary_key=True)
    skill_id = db.Column(db.Integer, db.ForeignKey('skill_details.skill_id'), primary_key=True)

    def __init__(self, role_id, skill_id):
        self.role_id = role_id
        self.skill_id = skill_id

    def json(self):
        return {"role_id": self.role_id, "skill_id": self.skill_id}


class RoleListings(db.Model):
    __tablename__ = 'role_listings'

    role_listing_id = db.Column(db.BigInteger, primary_key=True, autoincrement=False)
    role_id = db.Column(db.Integer, db.ForeignKey('role_details.role_id'))
    role_listing_desc = db.Column(db.String)
    role_listing_source = db.Column(db.Integer, db.ForeignKey('staff_details.staff_id'))
    role_listing_open = db.Column(db.Date)
    role_listing_close = db.Column(db.Date)
    role_listing_creator = db.Column(db.Integer) #####
    role_listing_ts_create = db.Column(db.DateTime) # autofill
    role_listing_updater = db.Column(db.Integer)
    role_listing_ts_update = db.Column(db.DateTime) # autofill

    def __init__(self, role_listing_id, role_id, role_listing_desc, role_listing_source, role_listing_open, role_listing_creator, role_listing_updater=None, role_listing_close=None):
        self.role_listing_id = role_listing_id
        self.role_id = role_id
        self.role_listing_desc = role_listing_desc
        self.role_listing_source = int(role_listing_source)
        self.role_listing_open = role_listing_open

        if role_listing_close is not None:
            self.role_listing_close = role_listing_close
        else:
            self.role_listing_close = role_listing_open + timedelta(weeks=2)
        self.role_listing_creator = role_listing_creator

        if role_listing_updater is None:
            self.role_listing_updater = role_listing_creator
        else:
            self.role_listing_updater = role_listing_updater
        
        self.role_listing_ts_create = datetime.now()
        self.role_listing_ts_update = datetime.now()

    def json(self):
        return {
            "role_listing_id" : self.role_listing_id,
            "role_id": self.role_id,
            "role_listing_desc": self.role_listing_desc,
            "role_listing_source" : self.role_listing_source,
            "role_listing_open" :self.role_listing_open,
            "role_listing_close" : self.role_listing_close,
            "role_listing_creator" : self.role_listing_creator,
            "role_listing_ts_create" : self.role_listing_ts_create,
            "role_listing_updater" : self.role_listing_updater,
            "role_listing_ts_update" : self.role_listing_ts_update
            }


class RoleApplications(db.Model):
    __tablename__ = 'role_applications'

    role_app_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    role_listing_id = db.Column(db.Integer, db.ForeignKey('role_listings.role_listing_id'))
    staff_id = db.Column(db.Integer, db.ForeignKey('staff_details.staff_id'))
    role_app_status = db.Column(db.Enum('applied', 'withdrawn'))
    role_app_ts_create = db.Column(db.DateTime)

    def __init__(self, role_listing_id, staff_id, role_app_status):
        self.role_listing_id = role_listing_id
        self.staff_id = staff_id
        self.role_app_status = role_app_status

    def json(self):
        return {
            "role_app_id": self.role_app_id,
            "role_listing_id": self.role_listing_id,
            "staff_id": self.staff_id,
            "role_app_status": self.role_app_status,
            "role_app_ts_create" : self.role_app_ts_create
        }