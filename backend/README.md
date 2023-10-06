# Backend API Documentation
1. [ Roles Documentation ](#roles)
2. [ Staff Documentation ](#staff)


<br>
<a name="roles"></a>

## Roles `/role`
1. [ Get all listed roles ](#getAllListedRoles)
2. [ Get all open roles ](#getAllOpenRoles)
3. [ Create new role details ](#addRoleDetails)
4. [ Delete existing role listing ](#deleteRoleListing)
5. [ Create new role listing ](#addRoleListing)
5. [ Get singular role listing information ](#listedRoleDetails1)
6. [ Edit singular role listing information ](#listedRoleDetails2)


<br>
<br>
<a name="getAllListedRoles"></a>

### Get all listed roles `/role/listed_roles`
Methods : <strong>GET</strong><br>
Get all listed roles in the role_listings SQL table.

Sample Output:
```
{
    code : 200,
    data : [
        {
            "role_id": 234567891,
            "role_listing_close": "Fri, 29 Sep 2023 00:00:00 GMT",
            "role_listing_desc": "Job listing for Head, Talent Attraction role",
            "role_listing_id": 101,
            "role_listing_open": "Fri, 15 Sep 2023 00:00:00 GMT",
            "role_listing_source": 123456789,
            "role_name": "Head, Talent Attraction"
        },
        {
            "role_id": 234567892,
            "role_listing_close": "Wed, 04 Oct 2023 00:00:00 GMT",
            "role_listing_desc": "Job listing for Learning Facilitator / Trainer role",
            "role_listing_id": 102,
            "role_listing_open": "Thu, 21 Sep 2023 00:00:00 GMT",
            "role_listing_source": 123456789,
            "role_name": "Learning Facilitator / Trainer"
        }
    ],
    message : "sucess"
}
```
<br>
<br>
<a name="getAllOpenRoles"></a>

### Get all open roles `/role/open_roles`
Methods : <strong>GET</strong><br>
Get all open role listings in the role_listings SQL table and filtering for role_listings with close_date after today's date.

Sample Output:
```
{
    code : 200,
    data : [
        {
            "role_id": 234567891,
            "role_listing_close": "Fri, 29 Sep 2023 00:00:00 GMT",
            "role_listing_desc": "Job listing for Head, Talent Attraction role",
            "role_listing_id": 101,
            "role_listing_open": "Fri, 15 Sep 2023 00:00:00 GMT",
            "role_listing_source": 123456789,
            "role_name": "Head, Talent Attraction"
        },
        {
            "role_id": 234567892,
            "role_listing_close": "Wed, 04 Oct 2023 00:00:00 GMT",
            "role_listing_desc": "Job listing for Learning Facilitator / Trainer role",
            "role_listing_id": 102,
            "role_listing_open": "Thu, 21 Sep 2023 00:00:00 GMT",
            "role_listing_source": 123456789,
            "role_name": "Learning Facilitator / Trainer"
        }
    ],
    message : "sucess"
}
```
<br>
<br>
<a name="addRoleDetails"></a>

### Create new role detail `/role/add_role_detail`
Methods : <strong>POST</strong><br>
Create new role detail by updating the role_details SQL table.

Sample Input JSON Package:
```
{
    "role_id" : 234567324,
    "role_name" : "Software Engineer",
    "role_description" : "Help to build and test new API endpoints for existing systems",
    "role_status" : "active"
}
```

Sample Output:
```
{
    "code": 200,
    "message": "POST request successful",
    "request": [
        {
            "role_description": "Help to build and test new API endpoints for existing systems",
            "role_id": 234567324,
            "role_name": "Software Engineer",
            "role_status": "active"
        }
    ]
}
```
<br>
<br>
<a name="deleteRoleListing"></a>

### Delete role listing `/role/delete_role_listing`
Methods : <strong>DELETE</strong><br>
Delete role listing from the role_listing SQL table.

Sample Input JSON Package:
```
{
    "role_id" : 12391747
}
```

Sample Output:
```
{
    'message': 'Role Listing deleted successfully'
}
```
<br>
<br>
<a name="addRoleListing"></a>

### Create new role listing `/role/add_role_listing`
Methods : <strong>POST</strong><br>
Create new role listing by updating the role_listings SQL table. New role listing can only be created using an existing role in role_details.


Sample Input JSON Package:
```
{
    "role_id" : 234567325,
    "role_listing_source" : 123456786,
    "role_listing_open" : "2023-09-28"
}
```

Sample Output:
```
{
    "code": 200,
    "data": [
        {
            "role_id": 234567321,
            "role_listing_close": "Fri, 13 Oct 2023 00:00:00 GMT",
            "role_listing_desc": "The HR Coordinator supports human resources operations by assisting with recruitment, onboarding, and employee relations activities.",
            "role_listing_open": "Fri, 29 Sep 2023 00:00:00 GMT",
            "role_listing_source": 123456787,
            "role_name": "HR Coordinator"
        }
    ],
    "message": "POST request successful"
}
```
<br>
<br>
<a name="listedRoleDetails1"></a>

### Get role listing details `/role/listed_roles/\<string:role_listing_id>`
Methods : <strong>GET</strong><br>
Get details of the role listing by sending a GET request with the role_listing_id.

Sample GET input:
```
role_listing_id = 102
```

Sample Output:
```
{
    "code": 200,
    "data": {
        "role_id": 234567892,
        "role_listing_close": "Wed, 04 Oct 2023 00:00:00 GMT",
        "role_listing_desc": "Job listing for Learning Facilitator / Trainer role",
        "role_listing_id": 102,
        "role_listing_open": "Thu, 21 Sep 2023 00:00:00 GMT",
        "role_listing_source": 123456789,
        "role_name": "Learning Facilitator / Trainer"
    }
}
```
<br>
<br>
<a name="listedRoleDetails2"></a>

### Edit role listing details `/role/listed_roles/\<string:role_listing_id>`
Methods : <strong>POST</strong><br>
Edit role listing with the specified role_listing_id by sending a POST request.<br>
Current parameters that can be changed : [ role_listing_desc , role_listing_close, role_listing_open ]

Sample GET input and JSON package:
```
role_listing_id = 102
{
    "role_listing_desc" : "testesttestsetste",
    "role_listing_close" : "2023-10-21",
    "role_listing_open" : "2023-9-21"
}
```

Sample Output:
```
{
    "code": 200,
    "data": {
        "role_id": 234567892,
        "role_listing_close": "Sat, 21 Oct 2023 00:00:00 GMT",
        "role_listing_desc": "Job listing for Learning Facilitator / Trainer role Edited",
        "role_listing_id": 102,
        "role_listing_open": "Thu, 21 Sep 2023 00:00:00 GMT",
        "role_listing_source": 123456789
    },
    "message": "Role listing with the ID 102 , has been sucessfully updated."
}
```