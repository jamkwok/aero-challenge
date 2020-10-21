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

Shortcuts check for specific role and userId in Jwt
