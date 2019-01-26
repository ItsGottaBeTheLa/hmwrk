DROP DATABASE IF EXISTS hmwrkdb;
CREATE DATABASE hmwrkdb;

use hmwrkdb;

CREATE TABLE assignments (
    id INTEGER NOT NULL AUTO_INCREMENT,
    assignment_name VARCHAR(250) NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    assign_details TEXT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE users (
    id INTEGER NOT NULL AUTO_INCREMENT,
    username VARCHAR(250) NOT NULL,
    PRIMARY KEY (id)
);
