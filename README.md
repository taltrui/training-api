# Tiny bootstrap to create API RESTs with Firebase.

## Initial configuration.

You need to make a .env with the following fields to be able to use this:

```javascript
FIRESTORE_API_KEY=
FIRESTORE_AUTH_DOMAIN=
FIRESTORE_PROJECT_ID=
FIRESTORE_STORAGE_BUCKET=
FIRESTORE_MESSAGING_SENDER_ID=
FIRESTORE_APP_ID=
```

In order to obtain this data you need to create a new Firebase app and init it for web dev.

Then you need to create a service user in Settings->Service Accounts->Create. 

This will yield a .json file with the credentials, you need to put this file in the root and call it `serviceAccountKey.json`

## Authentication

Only email and password authentication is enabled (you can add other methods if you want), and 3 endpoints are initially provided:

- /auth/login: Email and password are required in the body, it will return a JWT token from Firebase.
- /auth/create: Email and password are required in the body, it will return a JWT token from Firebase.
- /auth/logout: It will read the token from the authentication header and revoke the user session.

Note: you should store the token somewhere and set it as `Bearer ${TOKEN}` in the authentication header, else other endpoints besides login and create will fail.
