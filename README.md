# Social Network API (Module 18 Challenge)

## Description

A back-end social network API using a MongoDB database in order to use a substantial amount of data.  Create new users, post comments, and add reaction thoughts with this back-end application.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

Install the node packages with "npm i" within the application directory.  
Install the mySQL package in order to connect to the database with "npm i mysql2".  
Install the sequelize package to connect express to the mySQL database with "npm i sequelize".  
Install the dot.env package in order to hide important credentials needed to login to the mySQL database with "npm i dotenv".  
Install the Insomnia API platform to check your API route requests from: https://insomnia.rest/

Open up your mySQL Terminal and run "mysql -u root -p" to have the database start listening.  
Then run "source db/schema.sql" to create the database, followed by "use ecommerce_db" to set the database.  

After in your Gitbash Terminal then run "npm run seed" to seed data into the newly created database tables.
Finally run "node server.js" to launch the sequelize connection and be able check your API routes in Insomnia.


Run the application with "node server.js" in the terminal command line and follow the prompts!  

## Usage

### Link to video demo of application.




## Credits

MongoDB for its Database management.  
https://www.mongodb.com/

Node.js for its CLI capabilities.
https://nodejs.org/en/

Express for its routing and web framework.
https://sequelize.org/

## License

Please refer to the LICENSE in the repo.

---