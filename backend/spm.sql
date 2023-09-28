DROP DATABASE IF EXISTS spm;
CREATE DATABASE IF NOT EXISTS spm DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE spm;

create table staff_details (
	staff_id INT NOT NULL PRIMARY KEY,
	fname VARCHAR(50) NOT NULL,
	lname VARCHAR(50) NOT NULL,
	dept VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL,
	phone VARCHAR(20) NOT NULL,
	biz_address VARCHAR(255) NOT NULL,
	sys_role ENUM('staff', 'manager', 'hr', 'inactive') NOT NULL
);


create table role_details (
	role_id INT NOT NULL PRIMARY KEY,
	role_name VARCHAR(50) NOT NULL,
	role_description VARCHAR(50000) NOT NULL,
	role_status ENUM('active', 'inactive') NOT NULL
);


create table staff_roles (
	staff_id INT NOT NULL,
	staff_role INT NOT NULL,
	role_type ENUM('primary', 'secondary') NOT NULL,
	sr_status ENUM('active', 'inactive') NOT NULL,
	PRIMARY KEY (staff_id, staff_role),
	FOREIGN KEY (staff_id) REFERENCES staff_details(staff_id),
	FOREIGN KEY (staff_role) REFERENCES role_details(role_id)
);


CREATE TABLE role_listings(
    role_listing_id INT NOT NULL,
    role_id INT NOT NULL,
    role_listing_desc VARCHAR(255) NOT NULL,
    role_listing_source INT,
    role_listing_open DATE NOT NULL,
    role_listing_close DATE not NULL,
    PRIMARY KEY(role_listing_id),
    FOREIGN KEY(role_id) REFERENCES role_details(role_id),
    FOREIGN KEY(role_listing_source) REFERENCES staff_roles(staff_id)
);


CREATE TABLE role_applications (
    role_app_id INT AUTO_INCREMENT PRIMARY KEY,
    role_listing_id INT NOT NULL,
    staff_id INT NOT NULL,
    role_app_status VARCHAR(255) NOT NULL,
    FOREIGN KEY (role_listing_id) REFERENCES role_listings(role_listing_id),
    FOREIGN KEY (staff_id) REFERENCES staff_details(staff_id)
);


INSERT INTO staff_details (staff_id, fname, lname, dept, email, phone, biz_address, sys_role)
VALUES
(123456789, 'AH GAO', 'TAN', 'FINANCE', 'tan_ah_gao@all-in-one.com.sg', '65-1234-5678', '60 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409051', 'staff'),
(123456788, 'VINCENT REX', 'COLINS', 'HUMAN RESOURCE AND ADMIN', 'colins_vincent_rex@all-in-one.com.sg', '65-1234-5679', '60 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409051', 'hr'),
(123456787, 'FAUD', 'NIZAM', 'SALES', 'faud_nizam@all-in-one.com.sg', '60-03-21345678', 'Unit 3A-07, Tower A, The Vertical Business Suite, 8, Jalan Kerinchi, Bangsar South, 59200 Kuala Lumpur, Malaysia', 'manager'),
(123456786, 'JOHN', 'DOE', 'IT', 'John_doe@all-in-one.com.sg', '65-5824-7888', '1 Scotts Rd, #24-10 Shaw Centre, Singapore 228208', 'inactive');


INSERT INTO role_details (role_id, role_name, role_description, role_status)
VALUES
(234567891, 'Head, Talent Attraction', 'The Head, Talent Attraction is responsible for strategic workforce planning to support the organisation''s growth strategies through establishing talent sourcing strategies, determining the philosophy for the selection and securing of candidates and overseeing the onboarding and integration of new hires into the organisation. He/She develops various approaches to meet workforce requirements and designs employer branding strategies. He oversees the selection processes and collaborates with business stakeholders for the hiring of key leadership roles. As a department head, he is responsible for setting the direction and articulating goals and objectives for the team, and driving the integration of Skills Frameworks across the organisation''s talent attraction plans. The Head, Talent Attraction is an influential and inspiring leader who adopts a broad perspective in the decisions he makes. He is articulate and displays a genuine passion for motivating and developing his team.', 'inactive'),
(234567892, 'Learning Facilitator / Trainer', 'The Learning Facilitator delivers learning products and services in a variety of environments, using multiple learning delivery modes and methods. He/She assesses learning needs and adapts the facilitation approach to reflect desired learning outcomes and learner needs. He is responsible for knowledge and skills transfer by delivering learning content, facilitating group discussions and responding to queries. He drives learner development and commitment to continuous learning by actively providing feedback and learner support. He evaluates curriculum effectiveness and recommends improvement areas by collecting learner feedback as well as analyzing learning delivery approaches and materials. He is a strong communicator who builds trusted relationships and creates a cooperative and engaging learning environment. He is adaptable and adept at managing multiple stakeholders. He works in multiple different environments, including different learning venues and client sites, and regularly interacts with digital systems.', 'active'),
(234567893, 'Agile Coach (SM)', 'The Agile Coach (SM) coaches teams in the conduct of Agile practices and the implementation of Agile methodologies and practices in the organisation and acts as an effective Scrum Master in Agile Scrum teams.', 'active'),
(234511581, 'Fire Warden', 'The Fire Warden is responsible for testing fire alarms and firefighting equipment and implementing risk assessment recommendations. In the event of a confirmed fire alarm or fire drill, the warden assists in the safe evacuation of staff and visitors from the premise immediately.', 'active'),
(234567121, 'Marketing Manager', 'The Marketing Manager is responsible for developing and implementing marketing strategies to promote the companys products or services. They analyze market trends, identify target audiences, and oversee advertising and promotional campaigns. This role involves collaborating with cross-functional teams and managing marketing budgets to achieve business goals.', 'active'),
(234567325, 'Software Engineer', 'The Software Engineer designs, develops, and tests software applications. They work with programming languages and frameworks to create functional and efficient software solutions. Software Engineers collaborate with other team members, document code, and troubleshoot issues to deliver high-quality software products.', 'active'),
(234567321, 'HR Coordinator', 'The HR Coordinator supports human resources operations by assisting with recruitment, onboarding, and employee relations activities. They maintain HR records, coordinate interviews, and provide administrative support to the HR department. This role plays a crucial part in ensuring HR processes run smoothly.', 'active');

INSERT INTO staff_roles (staff_id, staff_role, role_type, sr_status)
VALUES
(123456789, 234567891, 'primary', 'active'),
(123456789, 234567893, 'secondary', 'active'),
(123456789, 234511581, 'secondary', 'inactive'),
(123456787, 234567321, 'primary', 'active'),
(123456787, 234567325, 'secondary', 'active'),
(123456786, 234567893, 'primary', 'inactive'),
(123456788, 234567121, 'primary', 'active');


INSERT INTO role_listings(role_listing_id, role_id, role_listing_desc, role_listing_source, role_listing_open, role_listing_close)
VALUES
(101, 234567891, 'Job listing for Head, Talent Attraction role', 123456789, '2023-09-15', '2023-09-29'),
(102, 234567892, 'Job listing for Learning Facilitator / Trainer role', 123456789, '2023-09-20', '2023-10-04'),
(103, 234567893, 'Job listing for Agile Coach (SM) role', 123456787, '2023-09-25', '2023-10-09'),
(104, 234511581, 'Job listing for Fire Warden role', 123456788, '2023-09-30', '2023-10-14');

