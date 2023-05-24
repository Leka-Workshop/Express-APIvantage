# Mongoose Testing Routes

### Create User

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

### Get Users

**Method: GET**

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

### Get Single User

**Method: GET**

**Request URI:** `http://localhost:3000/api/mongoose/users/<USER-ID>`

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

### Update User

**Method: PATCH**

**Request URI:** `http://localhost:3000/api/mongoose/users/<USER-ID>`

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

### Delete User

**Method: DELETE**

**Request URI:** `http://localhost:3000/api/mongoose/users/<USER-ID>`

**Response:**

```json
{
  "message": "User removed!"
}
```

**Status:** 200 OK
