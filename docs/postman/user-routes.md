# User Testing Routes

* [Create User](#create-user)
* [Get Users](#get-users)
* [Get Single User](#get-single-user)
* [Update User](#update-user)
* [Change User Password](#change-user-password)
* [Delete User](#delete-user)

---

### Create User

#### Successful Request / Response

**Method: POST**

**Request URI:** `http://localhost:3000/api/mongoose/users/`

**Request Body:**

```json
{
  "username": "JohnDoe",
  "email": "john@doe.com",
  "password": "john123"
}
```

**Response:**

```json
{
  "_id": "646d292efe4db1a3cc6cbdc4",
  "username": "JohnDoe",
  "email": "john@doe.com",
  "password": "john123",
  "createdAt": "2023-05-23T20:59:26.260Z",
  "updatedAt": "2023-05-23T20:59:26.260Z",
  "__v": 0
}
```

**Status:** 201 Created

#

#### Failure Request / Response

**Method:** POST

**Request URI:** `http://localhost:3000/api/mongoose/users/`

**Request Body:**

```json
{
  "username": "Jack21",
  "password": "password",
  "repeat_password": "password"
}
```

**Response:**

```json
{
  "message": "\"email\" is required"
}
```

**Status:** 400 Bad Request

#

**Method:** POST

**Request URI:** `http://localhost:3000/api/mongoose/users/`

**Request Body:**

```json
{
  "username": "Jack21",
  "email": "jack21g@doe.com",
  "password": "hello"
}
```

**Response:**

```json
{
  "message": "\"repeat_password\" is required"
}
```

**Status:** 400 Bad Request

#

**Method:** POST

**Request URI:** `http://localhost:3000/api/mongoose/users/`

**Request Body:**

```json
{
  "username": "Jack21",
  "email": "jack21g@doe.com",
  "password": "hello",
  "repeat_password": "world"
}
```

**Response:**

```json
{
  "message": "Passwords must match"
}
```

**Status:** 400 Bad Request

---

### Get Users

#### Successful Request / Response

**Method:** GET

**Request URI:** `http://localhost:3000/api/mongoose/users/`

**Response:**

```json
[
  {
    "_id": "646d292efe4db1a3cc6cbdc4",
    "username": "JohnDoe",
    "email": "john@doe.com",
    "password": "john123",
    "createdAt": "2023-05-23T20:59:26.260Z",
    "updatedAt": "2023-05-23T20:59:26.260Z",
    "__v": 0
  }
]
```

**Status:** 200 OK

---

### Get Single User

#### Successful Request / Response

**Method: GET**

**Request URI:** `http://localhost:3000/api/mongoose/users/646d292efe4db1a3cc6cbdc4`

**Response:**

```json
{
  "_id": "646d292efe4db1a3cc6cbdc4",
  "username": "JohnDoe",
  "email": "john@doe.com",
  "password": "john123",
  "createdAt": "2023-05-23T20:59:26.260Z",
  "updatedAt": "2023-05-23T20:59:26.260Z",
  "__v": 0
}
```

**Status:** 200 OK

#

#### Failed Request / Response

**Method: GET**

**Request URI:** `http://localhost:3000/api/mongoose/users/123`

**Response:**

```json
{
  "message": "\"id\" length must be 24 characters long"
}
```

**Status:** 400 Bad Request

#

**Method: GET**

**Request URI:** `http://localhost:3000/api/mongoose/users/1646d292efe4db1a3cc6cbdc`

**Response:**

```json
{
  "message": "User with id: 1646d292efe4db1a3cc6cbdc was not found."
}
```

**Status:** 404 Not Found

---

### Update User

#### Successful Request / Response

**Method:** PATCH

**Request URI:** `http://localhost:3000/api/mongoose/users/646d292efe4db1a3cc6cbdc4`

**Request Body:**

```json
{
  "username": "Jack"
}
```

**Response:**

```json
{
  "_id": "646d292efe4db1a3cc6cbdc4",
  "username": "Jack",
  "email": "john@doe.com",
  "createdAt": "2023-05-23T20:59:26.260Z",
  "updatedAt": "2023-05-23T21:14:53.867Z",
  "__v": 0
}
```

**Status:** 200 OK

#

**Method:** PATCH

**Request URI:** `http://localhost:3000/api/mongoose/users/646d292efe4db1a3cc6cbdc4`

**Request Body:**

```json
{
  "email": "new@email.com"
}
```

**Response:**

```json
{
  "_id": "646d292efe4db1a3cc6cbdc4",
  "username": "Jack",
  "email": "new@email.com",
  "createdAt": "2023-05-23T20:59:26.260Z",
  "updatedAt": "2023-05-23T21:14:53.867Z",
  "__v": 0
}
```

**Status:** 200 OK

#

### Failed Request / Response

**Method:** PATCH

**Request URI:** `http://localhost:3000/api/mongoose/users/6469eeacf5b9a7f1b1608de7`

**Request Body:**

```json
{
  "new_password": "Test123!"
}
```

**Response:**

```json
{
  "message": "Invalid change requested!"
}
```

A password can only be updated via [change-password](#change-user-password) route.

**Status:** 400 Bad Request

#

**Method:** PATCH

**Request URI:** `http://localhost:3000/api/mongoose/users/6469eeacf5b9a7f1b1608de0`

**Request Body:**

```json
{
  "username": "Batman"
}
```

**Response:**

```json
{
  "message": "User with id: 6469eeacf5b9a7f1b1608de0 was not found."
}
```

**Status:** 404 Not Found

#

**Method:** PATCH

**Request URI:** `http://localhost:3000/api/mongoose/users/6469eeacf5b9a7f1b1608de7`

**Request Body:**

```json
{
  "username": "1"
}
```

**Response:**

```json
{
  "message": "\"username\" length must be at least 3 characters long"
}
```

**Status:** 400 Bad Request

---

### Change User Password

#### Successful Request / Response

**Method:** PATCH

**Request URI:** `http://localhost:3000/api/mongoose/users/change-password/6469eeacf5b9a7f1b1608de7`

**Request Body:**

```json
{
  "old_password": "12345",
  "new_password": "Test123!",
  "repeat_password": "Test123!"
}
```

**Response:**

```json
{
  "_id": "6469eeacf5b9a7f1b1608de7",
  "username": "Ezio",
  "email": "ezio2de@gmail.com",
  "createdAt": "2023-05-21T10:13:00.021Z",
  "updatedAt": "2023-07-11T20:52:00.000Z",
  "__v": 0
}
```

**Status:** 200 OK

#

#### Failed Request / Response

**Method:** PATCH

**Request URI:** `http://localhost:3000/api/mongoose/users/change-password/6469eeacf5b9a7f1b1608de7`

**Request Body:**

```json
{
  "new_password": "Test123!",
  "repeat_password": "Test123!"
}
```

**Response:**

```json
{
  "message": "\"old_password\" is required"
}
```

**Status:** 400 Bad Request

#

**Method:** PATCH

**Request URI:** `http://localhost:3000/api/mongoose/users/change-password/6469eeacf5b9a7f1b1608de7`

**Request Body:**

```json
{
  "old_password": "12345",
  "new_password": "Test123!",
  "repeat_password": "Hello!"
}
```

**Response:**

```json
{
  "message": "Passwords must match"
}
```

**Status:** 400 Bad Request

#

**Method:** PATCH

**Request URI:** `http://localhost:3000/api/mongoose/users/change-password/6469eeacf5b9a7f1b1608de0`

**Request Body:**

```json
{
  "old_password": "12345",
  "new_password": "Test123!",
  "repeat_password": "Test123!"
}
```

**Response:**

```json
{
  "message": "User with id: 6469eeacf5b9a7f1b1608de0 was not found."
}
```

**Status:** 404 Not Found

---

### Delete User

#### Successful Request / Response

**Method:** DELETE

**Request URI:** `http://localhost:3000/api/mongoose/users/646d292efe4db1a3cc6cbdc4`

**Response:**

```json
{
  "message": "User removed!"
}
```

**Status:** 200 OK

#

#### Failed Request / Response

**Method:** DELETE

**Request URI:** `http://localhost:3000/api/mongoose/users/646d292efe4db1a3cc6cbdc0`

**Response:**

```json
{
  "message": "User with id: 646d292efe4db1a3cc6cbdc0 was not found."
}
```

**Status:** 404 Not Found

