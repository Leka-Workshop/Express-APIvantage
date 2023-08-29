# Project Changes

This file is created to easily track project updates from one version to another.


### V1.2: Logging

* Added Logging service to store logs in the console, file or the database using the [Winston package](https://www.npmjs.com/package/winston)
* Added response interceptor middleware that is triggered on every response sent to the client and calls the logger
* Added redact logger helper that replaces sensitive values with asterisk
* Moved response messages to Enums (Info/Success/Special/Error-messages.enum.ts)
* Moved common HTTP verbs & Error codes to Enums

### V1.1: API Validations

* Changed environment variable `APP_PORT` to `PORT` (Default Node.js env variable) in `init.ts`

####

* Added [Joi](https://www.npmjs.com/package/joi) - API data validator for Users APIs (Mongoose)
* Created and configured Joi validations in `shared/validators/user.joi.validator.ts`
* Created middlewares in `shared/middlewares/user-validator.middleware.ts` for `validating request.params` and `request.body` against Joi validation schema
* Applied validation middlewares to users controller
* Moved `request.params.id` validation from controllers to previously mentioned middlewares
* When creating new user, client must provide fields `password` and `repeat_password` and both must have the same value
* Separated update password from the update route `patch('/:id)`
* Created a new route for updating password `/api/mongoose/users/change-password/:id`
* When updating password, a client must provide fields `old_password`, `new_password`, `repeat_password`

####

* Added [Class-Validator](https://www.npmjs.com/package/class-validator) - API data validator for Products APIs (TypeORM)
* Created and configured Class-validator validations in `shared/validators/product.class.validator.ts`
* Created middlewares in `shared/middlewares/product-validator.middleware.ts` for `validating request.params` and `request.body` against Class-validator validation schema
* Applied validation middlewares to products controller

####

* Updated all Postman routes
* Moved Postman and Database-setup to the Docs directory
