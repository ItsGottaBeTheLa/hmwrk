DROP DATABASE IF EXISTS hmwrkdb;
CREATE DATABASE hmwrkdb;

use hmwrkdb;

CREATE TABLE assignments (
    id INTEGER NOT NULL AUTO_INCREMENT,
    assignmentName VARCHAR(250) NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    assignmentDetails TEXT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE users (
    id INTEGER NOT NULL AUTO_INCREMENT,
    username VARCHAR(250) NOT NULL,
    PRIMARY KEY (id)
);
