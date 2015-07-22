#Introduction to Node JS

##Installation
- Install [Node JS](http://nodejs.org/)
- Install [Nodemon](https://github.com/remy/nodemon)
- Install [Postgres.app](http://postgresapp.com/)

##JavaScript Runtime
- Node operates on the V8 Google Chrome JavaScript runtime.
- This runtime is what is responsible for interpreting the JavaScript and mapping it over to machine commands.
- Commands are executed through an architecture known as the "call stack." Currently-processing requests are part of the call stack, and come from the process queue.

##What is Node?
- Node JS is an interface that allows you to write server-side code in JavaScript.
- This interface provides the ability to handle requests and issue responses.
- It is asynchronous, and as a result, can be written in a way that will not block the call stack.
- Node is also a server that will allow your code to be accessible to the public and be able to issue responses for certain requests.

##First Server with Node

```javascript
// server.js
var http = require("http");

function greet(req, res) {
	res.writeHead(200, {"Content-Type": "text/plain"});
	res.write("Hello World");
	res.end();
}

var server = http.createServer(greet);

server.listen(3000);
```

##Express JS
- Express is an API to Node JS that makes development more intuitive and quicker.
- Express allows us to easily set up routes that will trigger actions such as rendering pages.

##NPM and NPM Init
- NPM stands for Node Package Manager, and is a tool that allows us to easily download community-built Node packages.
- Initialize new Node project with NPM: `npm init`
- Install NPM packages: `npm install express --save`
- NPM works with package.json, which is a list of dependencies that can be installed on other computers and servers.

##Hello World in Node

```javascript
var express = require('express');
var app = express();

app.get('/', function (req, res) {
	res.send('Hello World!');
});

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});
```

##Representational State Transfer (REST)
- REST is a convention of routing that allows you to represent server-side actions in a URL.
- HTTP requests occur in 4 main types:
	- GET: Read
	- POST: Create
	- PUT: Update
	- DELETE: Delete
- Express uses RESTful routes to trigger actions on certain URL routes.
- Parameters can also be passed into a URL:

```javascript
app.get("/greet/:name/:lastname", function(req, res) {
	res.send("Hello " + req.params.name + " " + req.params.lastname);
});
```

##Practicing Routes with an Express Calculator
- We will create a simple calculator that will perform math operations from numbers that will be passed in the URL.
- Your program should have routes that will at least add, subtract, multiply, and divide.

##Let's Talk About Templates
- Templates allow you to create dynamic HTML views that are reused for various sets of data.
- Embedded JavaScript (EJS) is the templating framework used with Node.
- Within EJS code you can write standard JS.
- EJS looks for templates in the `views` folder.
- EJS uses `<% %>`, `<%= %>`, and `<%- %>` blocks to display JS content.

####<%= %>

This notation is to be used when you want to "escape" HTML in the data returned. This will not allow HTML returned to be rendered as HTML.

####<%- %>

This notation will not escape the data returned, and will allow HTML to be rendered.

####<% %>

This notation is to be used when you don't want to print any resulting values to the view. A good example of this would be if you want to use a FOR loop in your template.

####Example Hello World Using EJS

app.js

```javascript
var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get('/', function(req, res) {
	res.render("index.ejs", {
		greeting: "Hello World"
	});
});

app.listen(3000);
```

views/index.ejs

```javascript
<h1>Testing out EJS</h1>

<h2>Greeting is: <%= greeting %></h2>

<div style="margin-top:50px;">
	<% for (var i = 0; i < 5; i++) { %>
		<h5>Repeated Text</h5>
	<% } %>
</div>
```

##Making Calls to Web Services
- On the client side we have AJAX, on the server side we have cURL.
- Using Node.js we have to make requests with cURL.
- You can install the [JSONView](https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc?hl=en) Chrome extension to easily look through JSON objects.

####Request Module
- Allows us to make HTTP requests easily using Node.

```javascript
var request = require('request');

request('http://www.google.com', function (error, response, body) {
	if (!error && response.statusCode == 200) {
		console.log(body); // Print the google web page.
	}
});
```

##Request Exercise
- Create a new Node app using `npm init`.
- Set up EJS as your templating engine.
- Make a request out to facebook.com and place the response body inside a template. Hint: Think about which template syntax to use for this.

##Using JSON
- Normally if you use a real web service it will return data to you in JSON format.
- Node however interprets this JSON as a string, so you need to parse it into real JSON.

#####JSON.parse()

```javascript
request('http://daretodiscover.herokuapp.com/users', function (error, response, body) {
	if (!error && response.statusCode == 200) {
		var data = JSON.parse(body);
	}
});
```

##JSON API Exercise

For this exercise we will be using the User API:

`http://daretodiscover.herokuapp.com/users`

- Create a new application using `npm init`.
- Use the request module to make a GET request to the above url.
- Create 3 different routes using Express - first, last, all.
	- First will display a list of all users' first names.
	- Last will display a list of all users' last names.
	- All will display a list of all users' data in table form.

##POST Operations

- Instead of working with data that comes in to the server as a URL string, POST data is sent as an object through the request header.
- POST requests are usually mapped over to create actions.
- As a result, this data is hidden from user view.
- This is often used for confidential, one-time data sending such as account credentials while setting up an account or sending credit card details securely.

```javascript
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({
	extended:true
}));

app.post("/user", function(req, res) {
	request({
		method: "POST",
		uri: "http://daretodiscover.herokuapp.com/users",
		formData: {
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			age: req.body.age,
			username: req.body.username
		}
	}, function(error, response, body) {
		res.redirect("/user");
	});
});
```

- Unlike GET requests, you can't access these parameters with `req.query`.
- To access POST parameters you have to use the Node `body-parser` module, which takes the name attribute from the form data and uses it as POST data.
- With this module you can simply use `req.body` as shown above.

##PUT Operations

- PUT is essentially the same as a POST request.
- PUT requests are normally mapped over to update actions.
- According to the convention, since PUT is mapped over to an update action, an ID needs to be passed to reference the data object.

```
var methodOverride = require("method-override");

app.use(methodOverride("_method"));

app.put("/user/:id", function(req, res) {
	request({
		method: "PUT",
		uri: "http://daretodiscover.herokuapp.com/users/" + req.params.id,
		formData: {
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			role: req.body.role,
			username: req.body.username
		}
	}, function(error, response, body) {
		res.redirect("/user");
	});
});
```

- Method override allows us to use the PUT verb in the HTML form, which is otherwise not supported.

##Wine API Exercise
- In this exercise we will be building a wine manager system.
- You will be using a front end that is already built for the project. You can find it [here](wine_manager_html/).
- These are the steps you will need to follow:
	- Step 1: Set up the project as a new Node project.
	- Step 2: Make a GET request to `http://daretodiscover.herokuapp.com/wines` to retrieve a list of wines.
	- Step 3: Show all wines when a user goes to the "/" route.
	- Step 4: When a user submits the "Add New Wine" form, make a post request to the same URL as above.

##Event-Driven IO
- Node is often used for "event-driven" IO operations.
- What this means is that as data flows to and from the application, events are triggered to invoke your app's logic.
- The event-driven approach allows for seamless real-time experiences due to the fact that your code is listening for and handling events instead of needing to be invoked some other way.
- We will look at a few ways that Node implements this event-driven model.

##Introduction to Web Sockets
- One of the most powerful uses for Node is its ability to handle seamless "real-time" experiences.
- Sockets are a way for a browser and server to communicate without the standard request-response cycle.
- Chat clients, real-time data feeds, and operational dashboards are some examples of where sockets have been used effectively.

##How it Basically Works
- A client makes an initial request out to the server and a "handshake" is created - AKA a connection has been established.
- This "handshake" is given a unique socket with a unique ID.
- Essentially this request never completes and remains open for the duration of the session.
- Every further request-response simulation is done via a manifestation of a JavaScript event.
- In a perfect world this is how things would always operate with sockets but certain factors such as browser incompatibility and more can interfere with a proper handshake. As a result, a more brute-force approach of "polling" may be required.

##Socket.io
- Socket.io is a library that essentially manages browser capabilities to connect a client with a server through web sockets in the most ideal way possible.
- It can switch between polling and sockets automatically and basically automate the handshake process.
- Socket.io works on the client and the server side to achieve seamless interaction.

##Socket-Based Chat Mechanism
- We will be building a chat application in Node using web sockets.
- We will use Express JS as the application framework.

####The Server Setup
- For this project we will need to import the Express and Socket.io modules into the project:

```javascript
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
```

- You will need to use this new variable `http` for our listen method:

```javascript
http.listen(3000);
```

- To handle the initial handshake, Socket.io registers a `connection` event:

```javascript
io.on('connection', function(socket) { });
```

- This is now a unique socket for this specific connection.
- Any events to this socket can easily be detected and dealt with:

```javascript
socket.on('event', function(params) { });
```

- Any event can also be "emitted" from the socket if necessary:

```javascript
io.emit('event', params);
```

- You can also emit events to all sockets connected except for yours by using `broadcast`:

```javascript
socket.broadcast.emit('event', params);
```

####The Client Setup
- The client will also use Socket.io to handle the handshake and any further events.
- The first thing that will be needed is to create the handshake with the server:

```javascript
var socket = io.connect("server_url or blank for current server");
```

- The client can also detect and respond to events:

```javascript
socket.on('event', function(params) { });
```

- The client can also "emit" events:

```javascript
socket.emit('event', params);
```

##In-Class Lab: Build the Chat
- In this lab we will be working to create a real-time chat application.
- The front end is already done for you [here](chat_starter_app/).
- You will be working in js/app.js to develop the code to interact with the web socket server.
- The server can be found at: http://arunchatserver.herokuapp.com/
- **Bonus:** Use your knowledge of front end JavaScript to change the page title when a new chat is received.