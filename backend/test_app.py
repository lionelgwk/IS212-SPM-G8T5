import pytest
from spm import app
# from models import StaffDetails

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

##### Testing for listings #####
def test_all_listed_roles(client):
    """
    Flask API Test to get all listed roles
    """
    response = client.get('/listing/listed_roles')
    assert response.status_code == 200
    data = response.get_json()
    assert data['message'] == "GET request successful"
    assert type(data['data']) is list
    assert len(data['data']) != 0


def test_add_role_listing(client):
    """
    Flask API Test to create new role listing
    """
    request = {
        "role_id" : 234511581,
        "role_listing_source" : 123456787,
        "role_listing_open" : "2023-09-29",
        "role_listing_creator" : 123456792,
        "role_listing_desc" : "testtestestesttt"
    }
    response = client.post('/listing/add_role_listing', json=request)
    assert response.status_code == 200
    data = response.get_json()
    assert data["message"] == "New role listing successfully created."
    assert type(data['data']) is list
    assert len(data['data']) != 0


def test_invalid_add_role_listing(client):
    """
    Flask API Test to create new role listing for role details that does not exist
    """
    request = {
        "role_id" : 234567323111,
        "role_listing_source" : 123456787,
        "role_listing_open" : "2023-09-29",
        "role_listing_creator" : 123456792
    }
    response = client.post('/listing/add_role_listing', json=request)
    assert response.status_code == 404
    data = response.get_json()
    assert data["message"] == "Role with 234567323111 not found."


def test_all_open_roles(client):
    """
    Flask API Test to get all open roles
    """
    response = client.get('/listing/open_roles')
    assert response.status_code == 200
    data = response.get_json()
    try:
        assert data['message'] == "GET request successful"
        assert type(data['data']) is list
        assert len(data['data']) != 0
    except:
        assert data['message'] == "No open role listing found."


def test_filter_based_on_skill(client):
    """
    Flask API Test to filter open roles based on skill id
    """
    request = {
        "skill_ids" : [345678914]
    }
    response = client.post('/listing/open_roles', json=request)
    assert response.status_code == 200
    data = response.get_json()
    assert data['message'] == "GET request successful"
    assert type(data['data']) is list
    assert len(data['data']) != 0


def test_invalid_filter_based_on_skill(client):
    """
    Flask API Test to filter open roles based on skill id but no open roles returned
    """
    request = {
        "skill_ids" : [3456789141]
    }
    response = client.post('/listing/open_roles', json=request)
    assert response.status_code == 200
    data = response.get_json()
    assert data['message'] == "No open role listing found."


def test_delete_role_listing(client):
    """
    Flask API Test to delete role listings from the role_listing table
    """
    request = {
        "role_id" : 234567896,
        "role_listing_source" : 123456787,
        "role_listing_open" : "2023-09-29",
        "role_listing_creator" : 123456792,
        "role_listing_desc" : "this is a test role description"
    }
    response = client.post('/listing/add_role_listing', json=request)
    data = response.get_json()
    role_listing_id = data['data'][0]["role_listing_id"]

    request = {
    "role_listing_id" : role_listing_id
    }
    response = client.delete('/listing/delete_role_listing', json=request)
    assert response.status_code == 200
    data = response.get_json()
    assert data['message'] == "Role Listing deleted successfully"


def test_invalid_delete_role_listing(client):
    """
    Flask API Test to delete role listings from the role_listing table
    """
    request = {
    "role_listing_id" : 91919119191
    }
    response = client.delete('/listing/delete_role_listing', json=request)
    assert response.status_code == 404
    data = response.get_json()
    assert data['error'] == 'Role Listing not found'


def test_get_role_listing_details(client):
    """
    Flask API Test to get details of singular role listing
    """
    response = client.get('listing/listed_roles/101')
    assert response.status_code == 200
    data = response.get_json()
    assert type(data['data']) == dict


def test_invalid_get_role_listing_details(client):
    """
    Flask API Test to get details of singular role listing with invalid role_listing_id
    """
    response = client.get('listing/listed_roles/91919191919191191919191919191')
    assert response.status_code == 404
    data = response.get_json()
    assert data['data'] == "Role listing ID does not exist"


def test_edit_role_listing_details(client):
    """
    Flask API Test to edit details of a singular role listing
    """
    request = {
    "role_listing_desc" : "Job listing for Head, Talent Attraction role",
    "role_listing_close" : "2025-10-21",
    "role_listing_open" : "2023-9-21"
    }
    response = client.put('listing/listed_roles/101', json=request)
    assert response.status_code == 200
    data = response.get_json()
    assert data["message"] == "Role listing with the ID 101 , has been sucessfully updated."


def test_get_listing_applicants(client):
    """
    Flask API Test to get all applicants for a role listing
    """
    response = client.get('listing/applicants/101')
    assert response.status_code == 200
    data = response.get_json()
    assert data["message"] == "GET request successful"
    assert type(data["data"]) is list
    

def test_apply_listing(client):
    """
    Flask API Test to apply for role listing
    """
    request = {
        "staff_id":987654321, 
        "fname":"Julian", 
        "lname":"Ooi", 
        "dept":"Engineering", 
        "email":"test@gmail.com", 
        "phone":"999", 
        "biz_address":"Istana",
        "sys_role":"staff"
    }
    response = client.post('/staff/new_staff', json=request)
    data = response.get_json()
    assert data["message"] == "new staff created"

    request = {
        "role_listing_id" : 101,
        "staff_id" : 987654321
    }
    response = client.post('/listing/apply', json=request)
    data = response.get_json()
    role_app_id = data["data"]["role_app_id"]
    assert data["message"] == "Application successfully submitted"
    assert response.status_code == 200

    response = client.delete(f'/listing/987654321/delete_application/{role_app_id}')
    response = client.delete(f'/staff/delete_staff/987654321')


def test_get_applications_by_staff(client):
    response = client.get('/listing/applied_roles/123456789')
    data = response.get_json()
    assert response.status_code == 200
    assert data["message"] == "GET request sucessful"

##### Testing for staffs #####
def test_get_staff(client):
    response = client.get('/staff/')
    data = response.get_json()
    assert response.status_code == 200
    try:
        assert type(data['data']) is dict
        assert len(data['data']) != 0
    except:
        assert data['data'] == "No staffs found in staff_details table"

def test_get_staff_details(client):
    response = client.get('/staff/123456786')
    data = response.get_json()
    assert response.status_code == 200
    try:
        assert type(data['data']) is dict
        assert len(data['data']) != 0
    except:
        assert data['data'] == "Staff id not found in staff_details table"

def test_add_new_staff(client):
    request = {
        "staff_id":987654321, 
        "fname":"Julian", 
        "lname":"Ooi", 
        "dept":"Engineering", 
        "email":"test@gmail.com", 
        "phone":"999", 
        "biz_address":"Istana",
        "sys_role":"staff"
    }
    response = client.post('/staff/new_staff', json=request)
    data = response.get_json()
    assert response.status_code == 200
    assert data["message"] == "new staff created"
    response = client.delete(f'/staff/delete_staff/987654321')

def test_delete_staff(client):
    request = {
        "staff_id":987654321, 
        "fname":"Julian", 
        "lname":"Ooi", 
        "dept":"Engineering", 
        "email":"test@gmail.com", 
        "phone":"999", 
        "biz_address":"Istana",
        "sys_role":"staff"
    }
    response = client.post('/staff/new_staff', json=request)
    data = response.get_json()
    staff_id = data["data"]["staff_id"]

    request = {
        "staff_id":staff_id, 
    }
    response = client.delete(f'/staff/delete_staff/{staff_id}')
    data = response.get_json()
    assert data["message"] == f"Staff with the id {staff_id} successfully deleted"

##### Testing for skills #####
def test_get_skill_details(client):
    response = client.get('/skill/')
    data = response.get_json()
    assert response.status_code == 200
    assert data["message"] == "Successfully retrieved all skill details"
    assert type(data["data"]) is list

##### Testing for roles #####
def test_get_all_roles(client):
    response = client.get('/role/')
    data = response.get_json()
    assert response.status_code == 200
    assert data["message"] == "GET request successful"
    assert type(data["data"]) is list

def test_get_role_details(client):
    response = client.get('/role/234511581')
    data = response.get_json()
    assert response.status_code == 200
    try:
        assert type(data['data']) is dict
        assert len(data['data']) != 0
    except:
        assert data['data'] == "Role id not found in role_details table"


def test_add_role_details(client):
    request = {
        "role_id": 234567999,
        "role_name": "Product Manager",
        "role_description": "The Product Manager need to balance the needs of customers, the capabilities of the development team, and the goals of the business to create a successful product.",
        "role_status": "active"
    }
    response = client.post('/role/add_role_detail', json=request)
    data = response.get_json()
    assert response.status_code == 200
    assert data["message"] == "New role detail created successful."

    request_duplicate_id = {
        "role_id": 234567999,
        "role_name": "Product Manager",
        "role_description": "The Product Manager need to balance the needs of customers, the capabilities of the development team, and the goals of the business to create a successful product.",
        "role_status": "active"
    }
    response_duplicate_id = client.post('/role/add_role_detail', json=request_duplicate_id)
    data_duplicate_id = response_duplicate_id.get_json()

    # Check for IntegrityError scenario
    assert response_duplicate_id.status_code == 400
    assert "IntegrityError occurred. This might be due to a duplicate role_id." in data_duplicate_id["message"]
