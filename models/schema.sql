DROP DATABASE IF EXISTS hmwrkdb;
CREATE DATABASE hmwrkdb;

use hmwrkdb;

create table assignments
(
	id integer not null auto_increment,
    assignment_name varchar(250) not null,
    completed boolean default false,
    assign_details DESCRIPTION not null VARCHAR(250),
    primary key (id)
    
);

create table users 
(
  username varchar(250) not null,
  primary key (id) 
);