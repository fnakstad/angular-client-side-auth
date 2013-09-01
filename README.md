angular-client-side-auth
========================

One way to implement authentication/authorization in Angular applications.

* Blogposts: 
  * [Original post discussing Angular.js client-side solution](http://www.frederiknakstad.com/authentication-in-single-page-applications-with-angular-js/)
  * [Follow-up post disussing Node.js server-side solution](http://www.frederiknakstad.com/blog/2013/08/04/authentication-in-single-page-applications-with-angular.js-part-2/)
* [Live version](http://angular-client-side-auth.herokuapp.com/)

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

## License
```
The MIT License (MIT)

Copyright (c) 2013 Frederik Nakstad

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
