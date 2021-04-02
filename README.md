# expresspractice
express request and get post practice 

This is a very simple application that returns "Hello World!" when a request comes in on the root path /.
It's straight out of the Express documentation with two small additions. First, we imported the serverless-http package at the top. Second, we exported a handler function which is our application wrapped in the serverless package.

We're forwarding all traffic on the domain to our application and letting Express handle the entirety of the routing logic. There is a benefit to this—I don't have to manually string up all my routes and functions. I can also limit the impact of cold-starts on lightly-used routes.

However, we also lose some of the benefits of the serverless architecture. I can isolate my bits of logic into separate functions and get a decent look at my application from standard metrics. If each route is handled by a different Lambda function, then I can see:

## How many times each route is invoked
How many errors I have for each route
How long each route takes (and how much money I could save if I made that route faster)

This app starts a server and listens on port 3000 for connections. The app responds with “Hello World!” for requests to the root URL (/) or route. For every other path, it will respond with a 404 Not Found.

##Post
Now, all requests to GET /users/:userId will be handled by the getUser instance of your application, and all requests to 
POST /users/ will be handled by the createUser instance. For any other requests, they'll be handled by the main app instance of your function.

Again, none of this is required, and it's a bit of an overweight solution since each specific endpoint will include the full application code for your other endpoints. 
However, it's a good balance between speed of development by using the tools you're used to along with the per-endpoint granularity that serverless application patterns provide.

# AWS 
This section walks you through deploying a sample application to Elastic Beanstalk using Elastic Beanstalk Command Line Interface (EB CLI) and Git, and then updating the application to use the Express framework.

## Where:

app is an instance of express.
METHOD is an HTTP request method, in lowercase.
PATH is a path on the server.
HANDLER is the function executed when the route is matched.
