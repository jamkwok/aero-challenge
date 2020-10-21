# P Aero Challenge User app

THis app is the early beginning of a CRUD service. The following app fetches a list of users but also can create a list of users, assuming the emails are unique and do not exist in the in memory datastore. The in memory datastore will uniquely generate ids.

## Architectural challenge

[link to architectural challenge pdf](https://github.com/jamkwok/aero-challenge/blob/main/Propellor%20Aero.pdf)

## Docker Instructions via swagger

**Step 1: To run in docker**

```
docker-compose up --build
```

**Step 2: Navigate to swagger**

```
http://localhost:3000/swagger
```

**Step 3: Authorize in swagger by directly pasting jwt without bearer**

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.8f4907mNMQyNONWfS1J8WPTz6MBYLMHd-w-vy2f-uDQ
```

**Step 4: Try Posting an array of users, emails must be unique**

**Step 5: Try Getting an array of users**

## Instructions for Vanilla startup

**Step 1: Install packages**

```
npm install
```

**Step 2: Test app**

```
npm test
```

**Step 3: Run app**

```
npm start
```

**Step 3: Make a Postman Post request with the above JWT**

```
POST /users

[
  {
    "name": "james james",
    "email": "james@james.com",
    "meta": {
      "isVerified": true,
      "isExpired": false,
      "addedOn": "addedOn"
    }
  }
]

```

**Step 3: Make a Postman Get request with the above JWT and observe users created in earlier step**

```
Get /users

```

## Production Improvements

While the endpoints are protected by an access token they do not validate user role or id,
this can be changed to prepare the application for production so these are also checked. For
this challenge roles and ids are ignored as a shortcut. The JWT secret will need to be sourced
from a secure place, Kubernetes can mount secrets or Hashicorp vault could be used,

For the challenge a mocked database, it was written as promise functions because sequelize and
mongoose both provide promise functionality, no real rewrite of the upper layers are required if sequelize is implemented. Sequelize is preferred as it creates a database abstraction via code and is also compatible with a range of sql databases such as AWS Aurora. While NoSQL can be used, it can be seen this product will likely need property querying and relationships in the future. SQL is much better suited to this task. A real database is needed because the in memory implementation will not persist app shutdown, especially on Kubernetes where pods are often moved around hosts for scaling and efficiency.

Depending on usage and frequency of user creation, Redis caching can also be added for the GET
users requests, but this will depend on the production use cases. As logic gets more complicated the application layer should be split into application and domain layers to encapsulate app and enterprise logic respectively.

Finally for the app to be production ready besides creating and listing new users, updating users is required. A third patch endpoint or using the existing POST endpoint to allow for the modification of users will be required as updates will be a highly sought after feature. To complete the CRUD acronym, a Delete method endpoint will also be needed to make this service sufficiently functional.
