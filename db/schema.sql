DROP DATABASE IF EXISTS hmwrkdb;
CREATE DATABASE hmwrkdb;

use hmwrkdb;

CREATE TABLE assignments (
    id INTEGER NOT NULL AUTO_INCREMENT,
    assignmentName VARCHAR(250) NOT NULL,
    type VARCHAR(25) NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    assignmentDetails TEXT NOT NULL,
    dueDate DATETIME NOT NULL,
    isRequired BOOLEAN NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE users (
    id INTEGER NOT NULL AUTO_INCREMENT,
    userName VARCHAR(250) NOT NULL,
    PRIMARY KEY (id)
);
