import unittest
from datetime import datetime, timedelta
from models import RoleListings, RoleDetails, RoleSkills, SkillDetails, RoleApplications, StaffDetails, SkillStatuses, SysRoles, StaffRoles, StaffSkills, RoleTypes, StaffReportingOfficer


class TestStaffDetails(unittest.TestCase):
    def setUp(self):
        # Create a sample StaffDetails object for testing
        self.staff_id = 1
        self.fname = "John"
        self.lname = "Doe"
        self.dept = "IT"
        self.email = "john.doe@example.com"
        self.phone = "123-456-7890"
        self.biz_address = "123 Main St"
        self.sys_role = SysRoles.staff  # Using the provided enum value

        self.staff_details_obj = StaffDetails(
            self.staff_id, self.fname, self.lname, self.dept, self.email, self.phone, self.biz_address, self.sys_role, roles=[], skills=[]
        )

    def test_staff_details_initialization(self):
        # Check if the attributes are initialized correctly
        self.assertEqual(self.staff_details_obj.staff_id, self.staff_id)
        self.assertEqual(self.staff_details_obj.fname, self.fname)
        self.assertEqual(self.staff_details_obj.lname, self.lname)
        self.assertEqual(self.staff_details_obj.dept, self.dept)
        self.assertEqual(self.staff_details_obj.email, self.email)
        self.assertEqual(self.staff_details_obj.phone, self.phone)
        self.assertEqual(self.staff_details_obj.biz_address, self.biz_address)
        self.assertEqual(self.staff_details_obj.sys_role, self.sys_role)

    def test_json_method(self):
        expected_json = {
            "staff_id": self.staff_id,
            "fname": self.fname,
            "lname": self.lname,
            "dept": self.dept,
            "email": self.email,
            "phone": self.phone,
            "biz_address": self.biz_address,
            "sys_role": self.sys_role.value
        }

        # Check if the json() method returns the expected dictionary
        self.assertEqual(self.staff_details_obj.json(), expected_json)


class TestStaffReportingOfficer(unittest.TestCase):
    def setUp(self):
        # Create a sample StaffDetails object for testing
        self.staff_id = 1
        self.sys_role = SysRoles.staff
        self.staff_details_obj = StaffDetails(
            self.staff_id, "John", "Doe", "IT", "john.doe@example.com", "123-456-7890", "123 Main St",  self.sys_role, roles=[], skills=[])

        # Create a sample StaffReportingOfficer object for testing
        self.ro_id = 2
        self.staff_reporting_officer_obj = StaffReportingOfficer(
            self.staff_id, self.ro_id, self.staff_details_obj)

    def test_staff_reporting_officer_initialization(self):
        # Check if the attributes are initialized correctly
        self.assertEqual(
            self.staff_reporting_officer_obj.staff_id, self.staff_id)
        self.assertEqual(self.staff_reporting_officer_obj.RO_id, self.ro_id)
        self.assertEqual(
            self.staff_reporting_officer_obj.reporting_officer, self.staff_details_obj)

    def test_json_method(self):
        expected_json = {
            "staff_id": self.staff_id,
            "RO_id": self.ro_id,
        }

        # Check if the json() method returns the expected dictionary
        self.assertEqual(
            self.staff_reporting_officer_obj.json(), expected_json)


class TestRoleDetails(unittest.TestCase):
    def setUp(self):
        # Create a sample RoleDetails object for testing
        self.role_id = 1
        self.role_name = "Developer"
        self.role_description = "Responsible for software development."
        self.role_status = SkillStatuses.active  # Using the provided enum value

        self.role_details_obj = RoleDetails(
            self.role_id, self.role_name, self.role_description, self.role_status, staffs=[]
        )

    def test_role_details_initialization(self):
        # Check if the attributes are initialized correctly
        self.assertEqual(self.role_details_obj.role_id, self.role_id)
        self.assertEqual(self.role_details_obj.role_name, self.role_name)
        self.assertEqual(self.role_details_obj.role_description,
                         self.role_description)
        self.assertEqual(self.role_details_obj.role_status, self.role_status)
        self.assertEqual(self.role_details_obj.staffs, [])

    def test_json_method(self):
        expected_json = {
            "role_id": self.role_id,
            "role_name": self.role_name,
            "role_description": self.role_description,
            "role_status": self.role_status.value
        }

        # Check if the json() method returns the expected dictionary
        self.assertEqual(self.role_details_obj.json(), expected_json)


class TestStaffRoles(unittest.TestCase):
    def test_json(self):
        sd1 = StaffRoles(staff_id=123456789, staff_role=123456789,
                         role_type=RoleTypes.primary, sr_status=SkillStatuses.active)
        self.assertEqual(sd1.json(), {
            'staff_id': 123456789,
            'staff_role': 123456789,
            'role_type': 'primary',
            'sr_status': 'active'
        })


class TestSkillDetails(unittest.TestCase):
    def test_json(self):
        rl1 = SkillDetails(skill_id=123456789, skill_name='Python',
                           skill_status=SkillStatuses.active, staffs=[], roles=[])
        self.assertEqual(rl1.json(), {
            'skill_id': 123456789,
            'skill_name': 'Python',
            'skill_status': 'active'

        })


class TestStaffRoles(unittest.TestCase):
    def setUp(self):
        # Create a sample StaffRoles object for testing
        self.staff_id = 1
        self.staff_role = 123
        self.role_type = RoleTypes.primary  # Using the provided enum values
        self.sr_status = SkillStatuses.active  # Using the provided enum values

        self.staff_role_obj = StaffRoles(
            self.staff_id, self.staff_role, self.role_type, self.sr_status
        )

    def test_staff_roles_initialization(self):
        # Check if the attributes are initialized correctly
        self.assertEqual(self.staff_role_obj.staff_id, self.staff_id)
        self.assertEqual(self.staff_role_obj.staff_role, self.staff_role)
        self.assertEqual(self.staff_role_obj.role_type, self.role_type)
        self.assertEqual(self.staff_role_obj.sr_status, self.sr_status)

    def test_json_method(self):
        expected_json = {
            "staff_id": self.staff_id,
            "staff_role": self.staff_role,
            "role_type": self.role_type.value,
            "sr_status": self.sr_status.value
        }

        # Check if the json() method returns the expected dictionary
        self.assertEqual(self.staff_role_obj.json(), expected_json)


class TestStaffSkills(unittest.TestCase):
    def test_json(self):
        ss1 = StaffSkills(staff_id=123456789, skill_id=123456789,
                          ss_status=SkillStatuses.active)
        self.assertEqual(ss1.json(), {
            'staff_id': 123456789,
            'skill_id': 123456789,
            'ss_status': 'active'
        })


class TestRoleSkills(unittest.TestCase):
    def test_json(self):
        rs1 = RoleSkills(role_id=123456789, skill_id=123456789)
        self.assertEqual(rs1.json(), {
            'role_id': 123456789,
            'skill_id': 123456789,
        })


class TestRoleListings(unittest.TestCase):
    def test_role_listings_initialization(self):
        role_listing_id = 1
        role_id = 123
        role_listing_desc = "Sample Description"
        role_listing_source = 456
        role_listing_open = datetime.now()
        role_listing_creator = 789

        # Create a RoleListings object
        role_listing = RoleListings(role_listing_id, role_id, role_listing_desc,
                                    role_listing_source, role_listing_open, role_listing_creator)

        # Check if the attributes are initialized correctly
        self.assertEqual(role_listing.role_listing_id, role_listing_id)
        self.assertEqual(role_listing.role_id, role_id)
        self.assertEqual(role_listing.role_listing_desc, role_listing_desc)
        self.assertEqual(role_listing.role_listing_source, role_listing_source)
        self.assertEqual(role_listing.role_listing_open, role_listing_open)
        self.assertEqual(role_listing.role_listing_creator,
                         role_listing_creator)

        # Check if role_listing_close is set correctly (default is role_listing_open + 2 weeks)
        expected_close_date = role_listing_open + timedelta(weeks=2)
        self.assertEqual(role_listing.role_listing_close, expected_close_date)

        # Check if role_listing_updater is set correctly (default is role_listing_creator)
        self.assertEqual(role_listing.role_listing_updater,
                         role_listing_creator)

        # Check if role_listing_ts_create and role_listing_ts_update are initialized (not None)
        self.assertIsNotNone(role_listing.role_listing_ts_create)
        self.assertIsNotNone(role_listing.role_listing_ts_update)

    def test_json_method(self):
        role_listing = RoleListings(
            1, 123, "Sample Description", 456, datetime.now(), 789)
        expected_json = {
            "role_listing_id": 1,
            "role_id": 123,
            "role_listing_desc": "Sample Description",
            "role_listing_source": 456,
            "role_listing_open": role_listing.role_listing_open,
            "role_listing_close": role_listing.role_listing_close,
            "role_listing_creator": 789,
            "role_listing_ts_create": role_listing.role_listing_ts_create,
            "role_listing_updater": 789,
            "role_listing_ts_update": role_listing.role_listing_ts_update
        }

        # Check if the json() method returns the expected dictionary
        self.assertEqual(role_listing.json(), expected_json)


class TestRoleApplications(unittest.TestCase):
    def setUp(self):
        # Create a sample RoleApplications object for testing
        self.role_listing_id = 1
        self.staff_id = 123
        self.role_app_status = 'applied'

        self.role_application = RoleApplications(
            self.role_listing_id, self.staff_id, self.role_app_status
        )

    def test_role_applications_initialization(self):
        # Check if the attributes are initialized correctly
        self.assertEqual(self.role_application.role_listing_id,
                         self.role_listing_id)
        self.assertEqual(self.role_application.staff_id, self.staff_id)
        self.assertEqual(self.role_application.role_app_status,
                         self.role_app_status)

        # Check if role_app_ts_create is initialized (not None)
        self.assertIsNotNone(self.role_application.role_app_ts_create)

    def test_json_method(self):
        expected_json = {
            "role_app_id": None,  # Assuming role_app_id is not set during initialization
            "role_listing_id": self.role_listing_id,
            "staff_id": self.staff_id,
            "role_app_status": self.role_app_status,
            "role_app_ts_create": self.role_application.role_app_ts_create
        }

        # Check if the json() method returns the expected dictionary
        self.assertEqual(self.role_application.json(), expected_json)
