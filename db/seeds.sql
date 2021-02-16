INSERT INTO department (id,name) VALUES 
(801,'Engineering'),
(802,'Sales'),
(803,'Marketing'),
(804,'Accounting');

INSERT INTO roles (id,title,salary,department_id) VALUES 
(901,'Engineering Manager',150000,801),
(902,'Engineering',80000,801),
(903,'Sales Manager',125000,802),
(904,'Salesperson',65000,802),
(905,'Marketing Manager',125000,803),
(906,'Marketing',65000,803),
(907,'Accounting Manager',140000,804),
(908,'Accountant',70000,804);

INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES
('Xavier','Smart',901,NULL),
('Monica','Gamble',903,NULL),
('Elize','Goddard',905,NULL),
('Coral','Flynn',907,NULL),
('Maria','Kempar',904,2),
('Karina','Fendi',904,2),
('Chloe','Chong',906,3),
('Chris','Pratt',906,3);

SELECT e1.id,e1.first_name AS 'First Name',e1.last_name AS 'Last Name',roles.title AS 'Title',department.name AS 'Department',roles.salary AS 'Salary',CONCAT(e2.first_name,e2.last_name) AS 'Managed By'
FROM employee e1
LEFT JOIN employee e2 ON e1.manager_id = e2.id
INNER JOIN roles ON e1.role_id = roles.id
INNER JOIN department ON roles.department_id = department.id
ORDER BY id;