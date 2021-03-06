DROP DATABASE IF EXISTS testdb;
CREATE DATABASE testdb;

DROP DATABASE IF EXISTS hmwrkdb;
CREATE DATABASE hmwrkdb;

use hmwrkdb;

CREATE TABLE Assignments (
    id INTEGER NOT NULL AUTO_INCREMENT,
    assignmentName VARCHAR(250) NOT NULL,
    type VARCHAR(25) NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    assignmentDetails TEXT NOT NULL,
    dueDate DATETIME NOT NULL,
    isRequired BOOLEAN NOT NULL,
    assignmentLink VARCHAR(1000) NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE Users (
    id INTEGER NOT NULL AUTO_INCREMENT,
    userName VARCHAR(250) NOT NULL,
    isAdmin BOOLEAN NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);
