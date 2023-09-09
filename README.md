# Express-APIvantage

Express.js starter app with TypeScript, SQL and MongoDB.

## Topic of this lesson
We'll learn how to set up a project from scratch.

* Initialize NPM repository
* Add TypeScript
* ESLint
* Autoreload with Nodemon
* Pair of databases (SQL & MongoDB)
* Controllers
* Separate features into modules
* Wire everything together

👉 [Read Full Blog on how to set up starter project](https://mirzaleka.medium.com/express-js-starter-api-with-typescript-deef5c4b6b70)

## Folder Structure

```
📁 database-setup
📁 postman
📁 src 
|__ 📁 controllers
|_____ 📁 mongoose
|_____ 📁 typeorm
|__ 📁 databases
|_____ 📁 mongodb
|________ 📁 model
|________ 📁 schema
|_____ 📁 postgresql
|________ 📁 entity
|________ 📁 model
|__ 📁 startup 
```

## Get Started

* Clone repository
* Switch to branch **1-Starter-API** (if you're not on it already)
* Install dependencies `npm i`
* Create .env file
* Paste database connections (Find out how in [database-setup.md](https://github.com/Leka-Workshop/Express-APIvantage/blob/1-Starter-API/database-setup/database-setup.md))
* Start in development mode `npm run dev`
* Look for [postman](https://github.com/Leka-Workshop/Express-APIvantage/tree/1-Starter-API/postman) directory and routes to play around with
* Start in production mode `npm start`
* Have fun!

### Built with:
* Node.js: v18.2.0
* NPM: v8.6.0

## Other Branches

* [API Validations](https://github.com/Leka-Workshop/Express-APIvantage/tree/2-API-Validations)
* [Automated Logging](https://github.com/Leka-Workshop/Express-APIvantage/tree/3-Logging)
