# HMWRK

![HMWRK](./public/images/hmwrk.jpg)

[Deployed Site](https://pacific-ridge-99694.herokuapp.com/)

### Overview

* HMWRK is a slack app that lets users talk to the hmwrk_bot or enter slash commands and retrieve data about BCS assignments.

* The admin dashboard will allow adminstrators to login and Create, Update, Read and Delete assignments.

* The app will store all assignments in a mysql database.

* When non admin user try to login to the dashboard they will be directed to a page with different commands they can use in slack.


## Installation

To install the application follow the instructions below:

	git clone https://github.com/ItsGottaBeTheLa/hmwrk.git
	cd hmwrk
	npm install

## Configuration

To setup the database follow the instructions below:
* Connect to your mysql server and run the schema.sql file.
* Run the seeds.sql to populate the table.

An OAuth App in GitHub needs to be created as well as a slack app

Once you have the slack app setup, you will need to install it into your slack workspace.

You .env file should have the following values:<br />
    MY_SLACK_SIGNING_SECRET = slack app signing secret<br />
    GITHUB_CLIENT_ID = GitHub Client Id<br />
    GITHUB_CLIENT_SECRET = GitHub Client Secrect<br />
    GITHUB_CALLBACK_URL = http://localhost:5000/return<br />
    SLACK_BOT_TOKEN = slack app token<br />
    
## Running Locally

To run the application locally and access it in your browser, run

	npm run start
	
The application will now be running locally on port 5000. You can then access it locally from your browser at the URL `localhost:5000`.