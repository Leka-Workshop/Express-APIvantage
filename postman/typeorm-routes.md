
# TypeORM Testing Routes


### Create Product

**Method: POST**

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

### Get Products

**Method: GET**

**Request URI:** `http://localhost:3000/api/typeorm/products/`

**Response:**

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

### Get Single Product

**Method: GET**

**Request URI:** `http://localhost:3000/api/typeorm/products/PRODUCT-ID>`

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

### Update Product

**Method: PATCH**

**Request URI:** `http://localhost:3000/api/typeorm/products/PRODUCT-ID>`

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

### Delete Product

**Method: DELETE**

**Request URI:** `http://localhost:3000/api/typeorm/products/PRODUCT-ID>`

**Response:**

```json
{
  "message": "Product removed!"
}
```

**Status:** 200 OK
