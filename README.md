angular-client-side-auth
========================

One way to implement authentication/authorization in Angular applications.

* Blogpost: http://www.frederiknakstad.com/authentication-in-single-page-applications-with-angular-js/
* Live version: http://angular-client-side-auth.herokuapp.com/

To run the server locally, open a terminal, and navigate to the directory you cloned the project to. Then run the following commands:

```
npm install
node server.js
```

Twitter/Facebook/Google auth is enabled by default, but you can easily turn it off  by commenting out the `passport.use()` statements in the [server.js](server.js) file.
If you want to enable any of the social logins make sure to set the appropriate environment variables:

| Provider | Key | Default value |
| ---------| ----| --------------|
| Twitter  | TWITTER_CONSUMER_KEY    | - |
| Twitter  | TWITTER_CONSUMER_SECRET | - |
| Twitter  | TWITTER_CALLBACK_URL    | http://localhost:8000/auth/twitter/callback |
| Facebook | FACEBOOK_APP_ID         | -  |
| Facebook | FACEBOOK_APP_SECRET     | -  |
| Facebook | FACEBOOK_CALLBACK_URL   | http://localhost:8000/auth/facebook/callback  |
| Google   | GOOGLE_REALM            | http://localhost:8000  |
| Google   | GOOGLE_RETURN_URL       | http://localhost:8000/auth/google/return |
| LinkedIn | LINKED_IN_KEY           | -  |
| LinkedIn | LINKED_IN_SECRET        | -  |
| LinkedIn |LINKED_IN_CALLBACK_URL   | http://localhost:8000/auth/linkedin/callback |

