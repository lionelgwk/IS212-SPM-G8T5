DROP DATABASE IF EXISTS spm;
CREATE DATABASE IF NOT EXISTS spm DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE spm;

CREATE TABLE staff_details (
	staff_id INT PRIMARY KEY,
	fname VARCHAR(50),
	lname VARCHAR(50),
	dept VARCHAR(50),
	email VARCHAR(50),
	phone VARCHAR(20),
	biz_address VARCHAR(255),
	sys_role ENUM('staff', 'hr', 'manager', 'inactive')
);

CREATE TABLE staff_reporting_officer (
	staff_id INT PRIMARY KEY,
	RO_id INT,
	FOREIGN KEY (RO_id) REFERENCES staff_details(staff_id),
	FOREIGN KEY (staff_id) REFERENCES staff_details(staff_id)
);

CREATE TABLE role_details (
	role_id INT PRIMARY KEY,
	role_name VARCHAR(50),
	role_description TEXT(50000),
	role_status ENUM('active', 'inactive')
);

CREATE TABLE staff_roles (
	staff_id INT,
	staff_role INT,
	role_type ENUM('primary', 'secondary'),
	sr_status ENUM('active', 'inactive'),
    PRIMARY KEY (staff_id, staff_role),
	FOREIGN KEY (staff_id) REFERENCES staff_details(staff_id),
	FOREIGN KEY (staff_role) REFERENCES role_details(role_id)
);

CREATE TABLE skill_details (
	skill_id INT PRIMARY KEY,
	skill_name VARCHAR(50),
	skill_status ENUM('active', 'inactive')
);

CREATE TABLE staff_skills (
	staff_id INT,
	skill_id INT,
	ss_status ENUM('active', 'unverified', 'in-progress'),
    PRIMARY KEY (staff_id, skill_id),
	FOREIGN KEY (staff_id) REFERENCES staff_details(staff_id),
	FOREIGN KEY (skill_id) REFERENCES skill_details(skill_id)
);

CREATE TABLE role_skills (
	role_id INT,
	skill_id INT,
    PRIMARY KEY (role_id, skill_id),
	FOREIGN KEY (role_id) REFERENCES role_details(role_id),
	FOREIGN KEY (skill_id) REFERENCES skill_details(skill_id)
);

CREATE TABLE role_listings(
    role_listing_id INT NOT NULL,
    role_id INT NOT NULL,
    role_listing_desc VARCHAR(10000) NOT NULL,
    role_listing_source INT,
    role_listing_open DATE NOT NULL,
    role_listing_close DATE not NULL,
    role_listing_creator INT,
    role_listing_ts_create TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    role_listing_updater INT,
    role_listing_ts_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(role_listing_id),
    FOREIGN KEY(role_id) REFERENCES role_details(role_id),
    FOREIGN KEY(role_listing_source) REFERENCES staff_roles(staff_id),
    FOREIGN KEY(role_listing_creator) REFERENCES staff_details(staff_id),
    FOREIGN KEY(role_listing_updater) REFERENCES staff_details(staff_id)
);

CREATE TABLE role_applications (
    role_app_id INT AUTO_INCREMENT PRIMARY KEY,
    role_listing_id INT NOT NULL,
    staff_id INT NOT NULL,
    role_app_status ENUM('applied', 'withdrawn') NOT NULL,
    role_app_ts_create TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (role_listing_id) REFERENCES role_listings (role_listing_id),
    FOREIGN KEY (staff_id) REFERENCES staff_details (staff_id)
);

INSERT INTO staff_details (staff_id, fname, lname, dept, email, phone, biz_address, sys_role)
VALUES
	(123456789, 'AH GAO', 'TAN', 'FINANCE', 'tan_ah_gao@all-in-one.com.sg', '82345678', '60 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409051', 'staff'),
	(123456788, 'VINCENT REX', 'COLINS', 'HUMAN RESOURCE AND ADMIN', 'colins_vincent_rex@all-in-one.com.sg', '92345679', '60 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409051', 'hr'),
	(123456787, 'FAUD', 'NIZAM', 'SALES', 'faud_nizam@all-in-one.com.sg', '81345678', 'Unit 3A-07, Tower A, The Vertical Business Suite, 8, Jalan Kerinchi, Bangsar South, 59200 Kuala Lumpur, Malaysia', 'manager'),
	(123456786, 'JOHN', 'DOE', 'IT', 'John_doe@all-in-one.com.sg', '98247888', '1 Scotts Rd, #24-10 Shaw Centre, Singapore 228208', 'inactive'),
    (123456791, 'JOHN', 'SMITH', 'SALES', 'john_smith@all-in-one.com.sg', '82345670', '60 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409051', 'staff'),
    (123456792, 'JESSICA', 'LEE', 'HUMAN RESOURCE AND ADMIN', 'jessica_lee@all-in-one.com.sg', '92345671', '60 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409051', 'hr'),
    (123456793, 'JASON', 'TAN', 'FINANCE', 'jason_tan@all-in-one.com.sg', '82345672', '60 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409051', 'manager'),
    (123456794, 'JIMMY', 'NG', 'IT', 'jimmy_ng@all-in-one.com.sg', '92345673', '1 Scotts Rd, #24-10 Shaw Centre, Singapore 228208', 'inactive');


INSERT INTO staff_reporting_officer (staff_id, RO_id)
VALUES
	(123456789, 123456791),
	(123456787, 123456788),
    (123456786, 123456792),
    (123456792, 123456788),
    (123456791, 123456794),
    (123456794, 123456788);

INSERT INTO role_details (role_id, role_name, role_description, role_status)
VALUES
	(234567891, 'Head, Talent Attraction', 'The Head, Talent Attraction is responsible for strategic workforce planning to support the organisation''s growth strategies through establishing talent sourcing strategies, determining the philosophy for the selection and securing of candidates and overseeing the onboarding and integration of new hires into the organisation. He/She develops various approaches to meet workforce requirements and designs employer branding strategies. He oversees the selection processes and collaborates with business stakeholders for the hiring of key leadership roles. As a department head, he is responsible for setting the direction and articulating goals and objectives for the team, and driving the integration of Skills Frameworks across the organisation''s talent attraction plans.\n\nThe Head, Talent Attraction is an influential and inspiring leader who adopts a broad perspective in the decisions he makes. He is articulate and displays a genuine passion for motivating and developing his team.', 'inactive'),
	(234567892, 'Learning Facilitator / Trainer', 'The Learning Facilitator delivers learning products and services in a variety of environments, using multiple learning delivery modes and methods. He/She assesses learning needs and adapts the facilitation approach to reflect desired learning outcomes and learner needs. He is responsible for knowledge and skills transfer by delivering learning content, facilitating group discussions and responding to queries. He drives learner development and commitment to continuous learning by actively providing feedback and learner support. He evaluates curriculum effectiveness and recommends improvement areas by collecting learner feedback as well as analysing learning delivery approaches and materials. \n\nHe is a strong communicator who builds trusted relationships and creates a cooperative and engaging learning environment. He is adaptable and adept at managing multiple stakeholders. \n\nHe works in multiple different environments, including different learning venues and client sites, and regularly interacts with digital systems.', 'active'),
	(234567893, 'Agile Coach (SM)', 'The Agile Coach (SM) coaches teams in the conduct of Agile practices and the implementation of Agile methodologies and practices in the organisation and acts as an effective Scrum Master in Agile Scrum teams.', 'active'),
	(234511581, 'Fire Warden', 'The Fire Warden is responsible for testing fire alarms and firefighting equipment and implementing risk assessment recommendations. In the event of a confirmed fire alarm or fire drill, the warden assists in the safe evacuation of staff and visitors from the premise immediately.', 'active'),
	(234567894, 'Head, Talent Management', 'The Head, Talent Management is responsible for the development and implementation of talent management strategies and programs that support the organisation''s growth strategies. He/She is responsible for the design and implementation of talent acquisition, development, retention and succession planning programs. He/She is responsible for the development of the organisation''s talent management framework and the implementation of the framework across the organisation. He/She is responsible for the development of the organisation''s talent management policies and procedures. He/She is responsible for the development of the organisation''s talent management metrics and the implementation of the metrics across the organisation. He/She is responsible for the development of the organisation''s talent management technology and the implementation of the technology across the organisation. He/She is responsible for the development of the organisation''s talent management analytics and the implementation of the analytics across the organisation.', 'inactive'),
    (234567895, 'Learning and Development Manager', 'The Learning and Development Manager is responsible for the development and implementation of learning and development strategies and programs that support the organisation''s growth strategies. He/She is responsible for the design and implementation of learning and development programs that support the development of the organisation''s talent. He/She is responsible for the development of the organisation''s learning and development framework and the implementation of the framework across the organisation. He/She is responsible for the development of the organisation''s learning and development policies and procedures. He/She is responsible for the development of the organisation''s learning and development metrics and the implementation of the metrics across the organisation. He/She is responsible for the development of the organisation''s learning and development technology and the implementation of the technology across the organisation. He/She is responsible for the development of the organisation''s learning and development analytics and the implementation of the analytics across the organisation.', 'active'),
    (234567896, 'Agile Coach (PM)', 'The Agile Coach (PM) coaches teams in the conduct of Agile practices and the implementation of Agile methodologies and practices in the organisation and acts as an effective Project Manager in Agile Scrum teams.', 'active'),
    (234511582, 'Security Officer', 'The Security Officer is responsible for ensuring the safety and security of the organisation''s premises and personnel. He/She is responsible for the development and implementation of security policies and procedures. He/She is responsible for the development and implementation of security training programs. He/She is responsible for the development and implementation of security metrics and the implementation of the metrics across the organisation. He/She is responsible for the development and implementation of security technology and the implementation of the technology across the organisation. He/She is responsible for the development and implementation of security analytics and the implementation of the analytics across the organisation.', 'active');


INSERT INTO staff_roles (staff_id, staff_role, role_type, sr_status)
VALUES
	(123456789, 234567892, 'primary', 'active'),
	(123456788, 234567892, 'secondary', 'active'),
	(123456787, 234567892, 'secondary', 'inactive'),
	(123456786, 234567892, 'primary', 'active'),
    (123456791, 234567892, 'secondary', 'active'),
    (123456792, 234567892, 'secondary', 'inactive'),
    (123456793, 234567894, 'primary', 'active');

INSERT INTO skill_details (skill_id, skill_name, skill_status)
VALUES
	(345678912, 'Pascal Programming', 'inactive'),
	(345678913, 'Python Programming', 'active'),
	(345678914, 'Certified Scrum Master', 'active'),
	(345678916, 'Java Programming', 'active'),
    (345678917, 'C# Programming', 'active'),
    (345678918, 'Project Management', 'active');

INSERT INTO staff_skills (staff_id, skill_id, ss_status)
VALUES
    (123456789, 345678912, 'active'),
    (123456789, 345678913, 'active'),
    (123456789, 345678914, 'active'),
    (123456789, 345678916, 'unverified'),
    (123456789, 345678917, 'in-progress'),
    (123456789, 345678918, 'in-progress'),
    (123456791, 345678913, 'active'),
    (123456791, 345678917, 'active'),
    (123456791, 345678918, 'in-progress'),
    (123456792, 345678914, 'active'),
    (123456792, 345678917, 'active'),
    (123456792, 345678918, 'active'),
    (123456793, 345678914, 'active'),
    (123456793, 345678916, 'active');

INSERT INTO role_skills (role_id, skill_id)
VALUES
    (234567893, 345678914),
    (234567894, 345678914),
    (234567894, 345678916),
    (234567895, 345678914),
    (234567895, 345678916),
    (234567896, 345678914),
    (234567896, 345678916),
    (234511581, 345678918),
    (234567893, 345678917);


INSERT INTO role_listings(role_listing_id, role_id, role_listing_desc, role_listing_source, role_listing_creator, role_listing_updater, role_listing_open, role_listing_close)
VALUES
(101, 234567891, 'Job listing for Head, Talent Attraction role', 123456789, 123456788, 123456788, '2023-09-15', '2023-10-29'),
(102, 234567892, 'Job listing for Learning Facilitator / Trainer role', 123456789, 123456788, 123456788, '2023-09-20', '2023-10-04'),
(103, 234567893, 'Job listing for Agile Coach (SM) role', 123456787, 123456788, 123456788, '2023-09-25', '2023-10-09'),
(104, 234511581, 'Job listing for Fire Warden role', 123456788, 123456787, 123456789, '2023-09-30', '2023-10-14'),
(105, 234511581, 'Job listing for Fire Warden role', 123456788, 123456787, 123456789, '2023-09-30', '2023-10-14');

INSERT INTO role_applications (role_listing_id, staff_id, role_app_status)
VALUES
    (101, 123456789, 'applied'),
    (101, 123456788, 'withdrawn'),
    (101, 123456787, 'applied'),
    (102, 123456786, 'withdrawn');