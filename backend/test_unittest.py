import unittest

from models import RoleListings, RoleDetails, RoleSkills, SkillDetails, RoleApplications, StaffDetails, SkillStatuses

class TestSkillDetails(unittest.TestCase):
    def test_json(self):
       rl1 = SkillDetails(skill_id = 123456789, skill_name='Python', skill_status=SkillStatuses.active, staffs=[], roles=[])
       self.assertEqual(rl1.json(),{
           'skill_id': 123456789, 
            'skill_name': 'Python',
            'skill_status': 'active'

       })
