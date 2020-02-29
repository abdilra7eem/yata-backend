# YATA-Backend
YATA-Backend is the backend for YATA: Yet Another Todo-List App.

YATA-Backend is a RESTful API built with NodeJS, Express, and MySQL using ES5 syntax.

This code is provided as is, with no guarantee whatsoever, under LGPL v3.0 license. Please read the attached LICENSE file.

The frontend is provided separately at: http://github.com/abdilra7eem/yata-frontend

## DataBase setup:
This app needs a database with one table named `yataTodo` (case-sensitve), with the following columns:


| Field     | Type                 | Null | Key | Default             | Extra                         |
|-----------|----------------------|------|-----|---------------------|-------------------------------|
| id        | smallint(5) unsigned | NO   | PRI | NULL                | auto_increment                |
| isdone    | tinyint(1)           | NO   |     | NULL                |                               |
| todo      | varchar(100)         | NO   |     | NULL                |                               |
| timestamp | timestamp            | NO   |     | current_timestamp() | on update current_timestamp() |

Create the database and the table, then edit `sample.db-settings.js` and rename it to `.db-settings.js`.

## Set up the dependencies
Once the DataBase is ready, run `npm install` in the app folder in the command line. This will download and install the required npm packages.

## Run the backend
After doing the previous steps, you can run the app by going to the app folder in the command line, and running the following command:
`node app.js`
