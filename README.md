# aero-challenge

The following app fetches a list of users but also can create a list of users,
assuming the emails are unique and do not exist in the in memory datastore.
The in memory datastore will uniquely generate ids.

## Docker Instructions via swagger

**Step 1: To run in docker**
docker-compose up --build

**Step 2: Navigate to swagger**
http://localhost:3000/swagger

**Step 3: Authorize in swagger by directly pasting jwt without bearer**

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.8f4907mNMQyNONWfS1J8WPTz6MBYLMHd-w-vy2f-uDQ
```

**Step 4: Try Posting an array of users, emails must be unique**

**Step 5: Try Getting an array of users**

## Instructions for Vanilla startup

**Step 1: Install packages**
npm install

**Step 2: Test app**
npm test

**Step 3: Run app**
npm start

**Step 3: Make a Postman Post request with the above JWT**

```
POST /user

[
  {
    "name": "j2",
    "email": "james@jame3s.com",
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

## Production discussion

While the endpoints are protected by an access token they do not validate user role or id,
this can be changed to prepare the application for production so these are also checked.

Shortcuts check for specific role and userId in Jwt
