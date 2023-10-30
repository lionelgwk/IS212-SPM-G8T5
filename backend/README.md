# Backend API Documentation
1. [ Listing Documentation ](#listing)
2. [ Staff Documentation ](#staff)
3. [ Skill Documentation ](#skill)
4. [ Roles Documentation ](#roles)


<br>
<a name="listing"></a>

# Listing `/listing`
1. [ Get all listed roles ](#getAllListedRoles)
2. [ Get all open roles ](#getAllOpenRoles)
3. [ Delete existing role listing ](#deleteRoleListing)
4. [ Create new role listing ](#addRoleListing)
5. [ Get singular role listing information ](#listedRoleDetails1)
6. [ Edit singular role listing information ](#listedRoleDetails2)
7. [ Filter for roles using skill id ](#filterBySkill)
8. [ Get all role applications ](#getAllRoleApplications)
9. [ Get all role applications by role listing id ](#getAllRoleApplicationsByRoleId)
10. [ Apply for a role listing ](#applyListing)


<br>
<br>
<a name="getAllListedRoles"></a>

## Get all listed roles `/listing/listed_roles`
Methods : <strong>GET</strong><br>
Get all listed roles in the role_listings SQL table.

Sample Output:
```json
{
    "code" : 200,
    "data" : [
        {
            "role_id": 234567891,
            "role_listing_close": "Fri, 29 Sep 2023 00:00:00 GMT",
            "role_listing_creator": 123456788,
            "role_listing_desc": "Job listing for Head, Talent Attraction role",
            "role_listing_id": 101,
            "role_listing_open": "Fri, 15 Sep 2023 00:00:00 GMT",
            "role_listing_source": 123456789,
            "role_listing_ts_create": "Fri, 13 Oct 2023 02:34:04 GMT",
            "role_listing_ts_update": "Fri, 13 Oct 2023 02:34:04 GMT",
            "role_listing_updater": 123456788,
            "role_name": "Head, Talent Attraction"
        },
        {
            "role_id": 234567892,
            "role_listing_close": "Wed, 04 Oct 2023 00:00:00 GMT",
            "role_listing_creator": 123456788,
            "role_listing_desc": "Job listing for Learning Facilitator / Trainer role",
            "role_listing_id": 102,
            "role_listing_open": "Wed, 20 Sep 2023 00:00:00 GMT",
            "role_listing_source": 123456789,
            "role_listing_ts_create": "Fri, 13 Oct 2023 02:34:04 GMT",
            "role_listing_ts_update": "Fri, 13 Oct 2023 02:34:04 GMT",
            "role_listing_updater": 123456788,
            "role_name": "Learning Facilitator / Trainer"
        }
    ],
    "message" : "GET request successful"
}
```
<br>
<br>
<a name="getAllOpenRoles"></a>

## Get all open roles `/listing/open_roles`
Methods : <strong>GET</strong><br>
Get all open role listings in the role_listings SQL table and filtering for role_listings with close_date after today's date.

Sample Output:
```json
{
    code : 200,
    data : [
        {
            "role_id": 234511581,
            "role_listing_close": "Sat, 14 Oct 2023 00:00:00 GMT",
            "role_listing_creator": 123456787,
            "role_listing_desc": "Job listing for Fire Warden role",
            "role_listing_id": 104,
            "role_listing_open": "Sat, 30 Sep 2023 00:00:00 GMT",
            "role_listing_source": 123456788,
            "role_listing_ts_create": "Fri, 13 Oct 2023 02:34:04 GMT",
            "role_listing_ts_update": "Fri, 13 Oct 2023 02:34:04 GMT",
            "role_listing_updater": 123456789,
            "role_name": "Fire Warden"
        },
        {
            "role_id": 234567323,
            "role_listing_close": "Fri, 13 Oct 2023 00:00:00 GMT",
            "role_listing_creator": 123456792,
            "role_listing_desc": "Help to build and test new API endpoints for existing systems",
            "role_listing_id": 9223372036854775807,
            "role_listing_open": "Fri, 29 Sep 2023 00:00:00 GMT",
            "role_listing_source": 123456787,
            "role_listing_ts_create": "Fri, 13 Oct 2023 02:51:33 GMT",
            "role_listing_ts_update": "Fri, 13 Oct 2023 02:51:33 GMT",
            "role_listing_updater": 123456792,
            "role_name": "Software Engineer"
        }
    ],
    message : "GET request successful"
}
```
<br>
<br>
<a name="deleteRoleListing"></a>

## Delete role listing `/listing/delete_role_listing`
Methods : <strong>DELETE</strong><br>
Delete role listing from the role_listing SQL table.

Sample Input JSON Package:
```json
{
    "role_listing_id" : 12391747
}
```

Sample Output:
```json
{
    "message" : "Role Listing deleted successfully"
}
```
<br>
<br>
<a name="addRoleListing"></a>

## Create new role listing `/listing/add_role_listing`
Methods : <strong>POST</strong><br>
Create new role listing by updating the role_listings SQL table. New role listing can only be created using an existing role in role_details.


Sample Input JSON Package:
```json
{
        "role_id" : 234567323,
        "role_listing_source" : 123456787,
        "role_listing_open" : "2023-09-29",
        "role_listing_open" : "2023-10-29",
        "role_listing_creator" : 123456792,
        "role_listing_desc" : "testesttestet"
}
```

Sample Output:
```json
{
    "code": 200,
    "data": [
        {
            "role_id": 234567323,
            "role_listing_close": "Fri, 13 Oct 2023 00:00:00 GMT",
            "role_listing_desc": "testesttestet",
            "role_listing_id": 9608029253891076348,
            "role_listing_open": "Fri, 29 Sep 2023 00:00:00 GMT",
            "role_listing_source": 123456787,
            "role_name": "Software Engineer"
        }
    ],
    "message": "POST request successful"
}
```
<br>
<br>
<a name="listedRoleDetails1"></a>

## Get role listing details `/listing/listed_roles/<string:role_listing_id>`
Methods : <strong>GET</strong><br>
Get details of the role listing by sending a GET request with the role_listing_id.

Sample GET input:
```
role_listing_id = 102
```

Sample Output:
```json
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

## Edit role listing details `/listing/listed_roles/<string:role_listing_id>`
Methods : <strong>PUT</strong><br>
Edit role listing with the specified role_listing_id by sending a POST request.<br>
Current parameters that can be changed : [ role_listing_desc , role_listing_close, role_listing_open ]

Sample GET input and JSON package:
```json
role_listing_id = 1222213254844124688
{
    "role_listing_desc" : "Job listing for Learning Facilitator / Trainer role Edited",
    "role_listing_close" : "2023-10-21",
    "role_listing_open" : "2023-9-21",
    "role_listing_source" : 123456789
}
```

Sample Output:
```json
{
    "code": 200,
    "data": {
        "role_id": 234567323,
        "role_listing_close": "Sat, 21 Oct 2023 00:00:00 GMT",
        "role_listing_creator": 123456792,
        "role_listing_desc": "Job listing for Learning Facilitator / Trainer role Edited",
        "role_listing_id": 1222213254844124688,
        "role_listing_open": "Thu, 21 Sep 2023 00:00:00 GMT",
        "role_listing_source": 123456789,
        "role_listing_ts_create": "Fri, 13 Oct 2023 03:02:46 GMT",
        "role_listing_ts_update": "Fri, 13 Oct 2023 03:05:45 GMT",
        "role_listing_updater": 123456792
    },
    "message": "Role listing with the ID 1222213254844124688 , has been sucessfully updated."
}
```
<br>
<br>
<a name="filterBySkill"></a>

## Filter for roles using skill id `/listing/open_roles`
Methods : <strong>POST</strong><br>
Get all open role listings with that contain the listed skill ids based on the role_skills SQL table<br>

Sample Input JSON Package:
```json
{
    "skill_ids" : [345678914]
}
```

Sample Output:
```json
{
    "code": 200,
    "data": [
        {
            "role_id": 234567892,
            "role_listing_close": "Sat, 21 Oct 2023 00:00:00 GMT",
            "role_listing_creator": 123456788,
            "role_listing_desc": "Job listing for Learning Facilitator / Trainer role Edited",
            "role_listing_id": 102,
            "role_listing_open": "Thu, 21 Sep 2023 00:00:00 GMT",
            "role_listing_source": 123456789,
            "role_listing_ts_create": "Fri, 13 Oct 2023 02:34:04 GMT",
            "role_listing_ts_update": "Fri, 13 Oct 2023 03:05:06 GMT",
            "role_listing_updater": 123456788,
            "role_name": "Learning Facilitator / Trainer"
        },
        {
            "role_id": 234511581,
            "role_listing_close": "Sat, 14 Oct 2023 00:00:00 GMT",
            "role_listing_creator": 123456787,
            "role_listing_desc": "Job listing for Fire Warden role",
            "role_listing_id": 104,
            "role_listing_open": "Sat, 30 Sep 2023 00:00:00 GMT",
            "role_listing_source": 123456788,
            "role_listing_ts_create": "Fri, 13 Oct 2023 02:34:04 GMT",
            "role_listing_ts_update": "Fri, 13 Oct 2023 02:34:04 GMT",
            "role_listing_updater": 123456789,
            "role_name": "Fire Warden"
        }
    ],
    "message": "GET request successful"
}
```
<!-- <br>
<br>
<a name="getAllRoleApplications"></a>

## Get all role applications `/role/applications`
Methods : <strong>GET</strong><br>
Get all role applications from the role_application sql table
<br>

Sample Output:
```json
{
    "code": 200,
    "data": [
        {
            "role_app_id": 1,
            "role_app_status": "applied",
            "role_app_ts_create": "Fri, 13 Oct 2023 21:48:07 GMT",
            "role_listing_id": 101,
            "staff_id": 123456789
        },
        {
            "role_app_id": 2,
            "role_app_status": "withdrawn",
            "role_app_ts_create": "Fri, 13 Oct 2023 21:48:07 GMT",
            "role_listing_id": 101,
            "staff_id": 123456788
        }
    ],
    "message": ""
}
``` -->
<br>
<br>
<a name="getAllRoleApplicationsByRoleId"></a>

## Get all role applications by role listing id `/listing/applicants/<string:role_listing_id>`
Methods : <strong>GET</strong><br>
Get all role applications for a role listing from the role_application sql table, based on the role_listing_id
<br>

Sample Output:
```json
{
    "code": 200,
    "data": [
        {
            "role_app_id": 1,
            "role_app_status": "applied",
            "role_app_ts_create": "Sat, 14 Oct 2023 21:49:30 GMT",
            "role_listing_id": 101,
            "staff_id": 123456789
        },
        {
            "role_app_id": 5,
            "role_app_status": "applied",
            "role_app_ts_create": "Wed, 18 Oct 2023 16:36:32 GMT",
            "role_listing_id": 101,
            "staff_id": 123456786
        }
    ],
    "message": "GET request successful"
}
```
<br>
<br>
<a name="applyListing"></a>

## Apply for a listing `/listing/apply`
Methods : <strong>POST</strong><br>
Apply for an open role listings<br>

Sample Input JSON Package:
```json
{
        "role_listing_id" : 101,
        "staff_id" : 123456786
}
```

Sample Output:
```json
{
    "code": 200,
    "data": {
        "role_app_id": 6,
        "role_app_status": "applied",
        "role_app_ts_create": "Wed, 18 Oct 2023 16:47:19 GMT",
        "role_listing_id": 102,
        "staff_id": 123456786
    },
    "message": "Application successfully submitted"
}
```
<br>
<br>
<a name="getAllRoleAppliedFor"></a>

## Get all applications by a staff `/listing/applied_roles/<string:staff_id>`
Methods : <strong>GET</strong><br>
Get all roles that a singular staff applied for based on the staff_id<br>

Sample Output:
```json
{
    "data": [
        {
            "role_app_id": 4,
            "role_app_status": "withdrawn",
            "role_app_ts_create": "Fri, 13 Oct 2023 21:48:07 GMT",
            "role_listing_id": 102,
            "staff_id": 123456786
        },
        {
            "role_app_id": 5,
            "role_app_status": "applied",
            "role_app_ts_create": "Wed, 25 Oct 2023 13:07:50 GMT",
            "role_listing_id": 101,
            "staff_id": 123456786
        }
    ],
    "message": "GET request sucessful"
}
```

<br>
<br>
<a name="staff"></a>

# Staff `/staff`
1. [ Get a staff's details ](#getStaffDetails)
2. [ Get all managers ](#getAllManagers)
3. [ Get all staff details ](#getAllStaff)

<br>
<br>
<a name="getStaffDetails"></a>

## Get all managers `/staff/<string:id>`
Methods : <strong>GET</strong> <br>
Get details of one staff member based on staff_id

Sample Output:
```json
{
    "code": 200,
    "data": {
        "active_skills": [
            {
                "skill_id": 345678914,
                "skill_name": "Certified Scrum Master",
                "skill_status": "active"
            },
            {
                "skill_id": 345678916,
                "skill_name": "Java Programming",
                "skill_status": "active"
            }
        ],
        "biz_address": "60 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409051",
        "dept": "FINANCE",
        "email": "jason_tan@all-in-one.com.sg",
        "fname": "JASON",
        "lname": "TAN",
        "phone": "65-1234-5672",
        "staff_id": 123456793,
        "sys_role": "manager"
    }
}
```

<br>
<br>
<a name="getAllManagers"></a>

## Get all managers `/staff/managers`
Methods : <strong>GET</strong> <br>
Get all staff with the manager title from the staff_details SQL table

Sample Output:
```json
{
    "code": 200,
    "data": {
        "staffs": [
            "FAUD NIZAM",
            "JASON TAN"
        ]
    }
}
```
<br>
<br>
<a name="getAllManagers"></a>

## Get all staff details `/staff`
Methods : <strong>GET</strong> <br>
Get all staff details from the staff_details SQL table

Sample Output:
```json
{
    "code": 200,
    "data": {
        "staffs": [
            {
                "biz_address": "1 Scotts Rd, #24-10 Shaw Centre, Singapore 228208",
                "dept": "IT",
                "email": "John_doe@all-in-one.com.sg",
                "fname": "JOHN",
                "lname": "DOE",
                "phone": "65-5824-7888",
                "staff_id": 123456786,
                "sys_role": "inactive"
            },
            {
                "biz_address": "60 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409051",
                "dept": "HUMAN RESOURCE AND ADMIN",
                "email": "colins_vincent_rex@all-in-one.com.sg",
                "fname": "VINCENT REX",
                "lname": "COLINS",
                "phone": "65-1234-5679",
                "staff_id": 123456788,
                "sys_role": "hr"
            }
        ]
    }
}
```

<br>
<br>
<a name="skill"></a>

# Skill `/skill`

1. [ Get all skill details](#getAllSkillDetails)

<br>
<br>
<a name="getAllSkillDetails"></a>

## Get all skill details `/skill`
Methods : <strong>GET</strong><br>
Get all skill details in the skill_details SQL table

Sample Output:
```json
{
    "code": 200,
    "data": [
        {
            "skill_id": 345678912,
            "skill_name": "Pascal Programming",
            "skill_status": "inactive"
        },
        {
            "skill_id": 345678913,
            "skill_name": "Python Programming",
            "skill_status": "active"
        }
    ],
    "message": "Successfully retrieved all skill details"
}
```

<br>
<br>
<a name="roles"></a>

# Role `/role`

1. [ Get all role details](#getAllRoleDetails)
2. [ Create new role details ](#addRoleDetails)
3. [ Get role details ](#getRoleDetails)



<br>
<br>
<a name="getAllRoleDetails"></a>

## Get a role's details `/role`
Methods : <strong>GET</strong><br>
Get all role details in the role_details SQL table

Sample Output:
```json
{
    "code": 200,
    "data": [
        {
            "role_description": "The Fire Warden is responsible for testing fire alarms and firefighting equipment and implementing risk assessment recommendations. In the event of a confirmed fire alarm or fire drill, the warden assists in the safe evacuation of staff and visitors from the premise immediately.",
            "role_id": 234511581,
            "role_name": "Fire Warden",
            "role_status": "active"
        },
        {
            "role_description": "The Agile Coach (SM) coaches teams in the conduct of Agile practices and the implementation of Agile methodologies and practices in the organisation and acts as an effective Scrum Master in Agile Scrum teams.",
            "role_id": 234567893,
            "role_name": "Agile Coach (SM)",
            "role_status": "active"
        }
    ],
    "message": "GET request successful"
}

```



<br>
<br>
<a name="addRoleDetails"></a>

## Create new role detail `/role/add_role_detail`
Methods : <strong>POST</strong><br>
Create new role detail by updating the role_details SQL table.

Sample Input JSON Package:
```json
{
    "role_id" : 234567324,
    "role_name" : "Software Engineer",
    "role_description" : "Help to build and test new API endpoints for existing systems",
    "role_status" : "active"
}
```

Sample Output:
```json
{
    "code": 200,
    "message": "New role detail created successful.",
    "request": [
        {
            "role_description": "Help to build and test new API endpoints for existing systems",
            "role_id": 234567323,
            "role_name": "Software Engineer",
            "role_status": "active"
        }
    ]
}
```

<br>
<br>
<a name="getRoleDetails"></a>

## Get a role's details `/role/<string:role_id>`
Methods : <strong>GET</strong><br>
Get role details in the role_details SQL table based on role_id

Sample GET input:
```
role_id = 234567896
```

Sample Output:
```json
{
    "code": 200,
    "data": {
        "role_description": "The Agile Coach (PM) coaches teams in the conduct of Agile practices and the implementation of Agile methodologies and practices in the organisation and acts as an effective Project Manager in Agile Scrum teams.",
        "role_id": 234567896,
        "role_name": "Agile Coach (PM)",
        "role_status": "active"
    }
}

```

