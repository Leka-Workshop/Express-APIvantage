
# Product Testing Routes

* [Create Product](#create-product)
* [Get Products](#get-products)
* [Get Single Product](#get-single-product)
* [Update Product](#update-product)
* [Delete Product](#delete-product)

----

### Create Product

#### Successful Request / Response

**Method:** POST

**Request URI:** `http://localhost:3000/api/typeorm/products/`

**Request Body:**

```json
{
  "name": "Keyboard",
  "price": "5",
  "description": "awesome looking keyboard"
}
```

**Response:**

```json
{
  "name": "Keyboard",
  "image": null,
  "price": 5,
  "description": "awesome looking keyboard",
  "id": 1,
  "datePublished": "Tue May 23 2023"
}
```

**Status:** 201 Created

#

#### Failed Request / Response

**Method:** POST

**Request URI:** `http://localhost:3000/api/typeorm/products/`

**Request Body:**

```json
{ }
```

**Response:**

```json
{
  "message": "name should not be empty"
}
```

**Status:** 400 Bad Request

#

**Method:** POST

**Request URI:** `http://localhost:3000/api/typeorm/products/`

**Request Body:**

```json
{
  "name": "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
}
```

**Response:**

```json
{
   "message": "name must be shorter than or equal to 50 characters"
}
```

**Status:** 400 Bad Request

---

### Get Products

#### Successful Request / Response:

**Method:** GET

**Request URI:** `http://localhost:3000/api/typeorm/products/`


```json
[
  {
    "id": 1,
    "name": "Keyboard",
    "price": 5,
    "description": "awesome looking keyboard",
    "datePublished": "Tue May 23 2023"
    "image": null
  }
]
```

**Status:** 200 OK

---

### Get Single Product

#### Successful Request / Response

**Method:** GET

**Request URI:** `http://localhost:3000/api/typeorm/products/1`

**Response:**

```json
{
  "name": "Keyboard",
  "image": null,
  "price": 5,
  "description": "awesome looking keyboard",
  "id": 1,
  "datePublished": "Tue May 23 2023"
}
```

**Status:** 200 OK

#

#### Failed Request / Response

**Method:** GET

**Request URI:** `http://localhost:3000/api/typeorm/products/ABC`

**Response:**

```json
{
  "message": "id must not be less than 1"
}
```

**Status:** 400 Bad Request

#

**Method:** GET

**Request URI:** `http://localhost:3000/api/typeorm/products/9999`

**Response:**

```json
{
  "message": "Product with id: 9999 was not found."
}
```

**Status:** 404 Not Found

---

### Update Product

**Method:** PATCH

**Request URI:** `http://localhost:3000/api/typeorm/products/1`

**Request Body:**

```json
{
  "name": "new keyboard",
  "price": "1000"
}
```

**Response:**

```json
{
  "id": 1,
  "name": "new keyboard",
  "price": "1000",
  "description": "awesome looking keyboard",
  "datePublished": "Tue May 23 2023",
  "image": null
}
```

**Status:** 200 OK

#

#### Failed Request / Response

**Method:** PATCH

**Request URI:** `http://localhost:3000/api/typeorm/products/ABC`

**Request Body:**

```json
{
  "name": "new keyboard",
  "price": "1000"
}
```

**Response:**

```json
{
  "message": "id must not be less than 1"
}
```

**Status:** 400 Bad Request

#

**Method:** PATCH

**Request URI:** `http://localhost:3000/api/typeorm/products/1`

**Request Body:**

```json
{
  "name": "dummy 5",
  "price": "200" // it's expecting "price": 200
}
```

**Response:**

```json
{
  "message": "price must not be greater than 1000000"
}
```

**Status:** 400 Bad Request



---

### Delete Product

**Method:** DELETE

#### Successful Request / Response

**Request URI:** `http://localhost:3000/api/typeorm/products/1`

**Response:**

```json
{
  "message": "Product removed!"
}
```

**Status:** 200 OK

#

#### Failed Request / Response

**Method:** DELETE

**Request URI:** `http://localhost:3000/api/typeorm/products/ABC`

**Response:**

```json
{
  "message": "id must not be less than 1"
}
```

**Status:** 400 Bad Request
