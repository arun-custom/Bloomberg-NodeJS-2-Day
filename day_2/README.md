#Node Continued

##Filesystem Access
- One powerful feature of Node is its ability to manipulate the filesystem.
- With few exceptions, file read and write operations are asynchronous, and thus provide a good deal of flexibility.

##Streams
- Many features of Node operate by a "stream", which is essentially a flowing outlet of data.
- The flow of this data can be detected by event listeners, the same as you would use for frontend event detection like clicks.
- Let's see an example that uses a very large file provided to you in this repository: [wordsEn.txt](wordsEn.txt).

```javascript
var stream = fs.createReadStream("./wordsEn.txt");

stream.on("data", function(data) {
	console.log("NEW DATA:");
	console.log(data);
});
```

- As you can see, the data comes back in chunks, and not all at once.
- This makes Node streams versatile for very large files and for data sources that will not be exhausted (think streaming).
- You will also notice that the data also comes back as a buffer, which is Node's way of working with binary data.
- There are a variety of events you can listen for on streams including `open`, `data`, `error`, `end`, and `close`.
- Let's try adding this:

```javascript
stream.on("end", function() {
	console.log("Stream has no more data");
});
```

##More on Buffers
- JavaScript readily supports unicode characters but does not work well with binary data.
- Buffers are places in memory that hold binary data.
- A buffer works like an array of bytes - small integers.
- Buffer is a class that is global, so the `require` keyword will not be necessary.
- Buffers are always fixed at a given size when created:

An empty buffer with 1024 bytes

```javascript
var buf = new Buffer(1024);
```

- You can also create a buffer from a string and pass a character encoding to it:

```javascript
var buf = new Buffer("This will be saved as binary data", "utf-8");
```

##Streams Lab
- For this lab we will be combining the principles we learned about creating a server with streams.
- We will not be using Express for this lab.
- Here are the steps you will follow:
	- Step 1: Create a read stream for the wordEn.txt file.
	- Step 2: Create a listener for the `open` event on the read stream. In the callback write a response header for the server response.
	- Step 3: Create a listener for the `data` event on the read stream. Write the data we receive back to the response.
	- Step 4: Create a listener for the `end` event on the stream. End the response on the callback, which will finish the data transmission to the user.

##Piping Data
- As data is read from a stream, Node provides us a method called `.pipe()` that allows us to send the incoming data somewhere else.
- The destination could be another stream (write stream for example), or even a server response.
- This can enable some pretty amazing things from streaming video to high-performance multiplayer games.
- Let's take a look at an example using the wordEn.txt document:

```javascript
var fs = require("fs");

var rd = fs.createReadStream("./wordsEn.txt");
var wr = fs.createWriteStream("./newWords.txt");

rd.pipe(wr);

wr.on("finish", function() {
	console.log("Write operation finished");
});
```

- Here we are setting up two streams. The read stream is dumping data into the write stream to effectively copy the file.

##Piping Lab
- In this lab we will be modifying the code we wrote to copy the files into a more generic approach including error handling.
- Here are the steps you will need to follow:
	- Step 1: Set up a function called copyFile that will be used as a generic way to copy any file.
	- Step 2: Set up your read stream and write stream within the function. Make sure the target file in your write stream comes from a function parameter.
	- Step 3: Pipe the read stream into the write stream.
	- Step 4: Make sure to do some error checking on the read and write streams to ensure that everything is going smoothly.
	- **Bonus:** Provide the user with a callback function that gets executed when the copy is complete.

##Simple User Manager Warmup
- We will be building a user manager system using Node with PostgresSQL.
- First we will have to build the front end of the application and set up our routes to handle the display and input of user information.
- Your task is to set up an application with two views - show all users and edit a user.
- Each of these views will be EJS templates.
- Your application must have two separate GET routes to handle the display of each of these pages.
- The frontend is already done for you and can be found [here](user_manager_html/).

##Sequelize - Introduction to a Professional-Grade ORM

####ORM

An ORM (Object Relational Mapper) is a piece/layer of software that helps map objects to our database. This means we can just use JavaScript to create and work with our data instead of writing raw SQL queries.

####Sequelize

From the Sequelize docs "To put it in a nutshell, it's an ORM (Object-Relational-Mapper). The library is written entirely in JavaScript and can be used in the Node.JS environment." In other words, Sequelize is an ORM that works with relational databases and Node.js. It allows us to do many things including:
- Represent models and their data.
- Represent associations between these models.
- Validate data before they gets persisted to the database.
- Perform database operations in an object-oriented fashion.

####Model

A model is a class that maps to the data relation (table) and potentially bridges tables. You can think of a model as the blueprint (class) for what each row of data is going to contain. Unlike a migration, you perform CRUD on instances of your models.

####Migration

Migrations (also known as ‘schema evolution’ or ‘mutations’) are a way of changing your database schema from one version into another. You can think of a migration as the creation or changes you want to make to a database table or column.

Before you can start manipulating your models, you need to create and run a migration. Examples of migrations are creating, deleting and altering tables (and their existing columns).

####Sequelize and the Sequelize-Cli

We are going to be using the sequelize-cli so that we can easily run commands in the terminal to initialize our project and to create migrations and models.

This requires us to first install the sequelize-cli (CLI stands for Command Line Interface) using `npm install --save sequelize-cli`, and then in order to run a command we need to type node_modules/.bin/sequelize. This is a bit annoying to type over and over so first thing we should do is create an alias so that we don't have to remember/type this.

Let's also install the Sequelize package itself: `npm install --save sequelize`

```
alias sequelize='node_modules/.bin/sequelize'
```
####Config.json

In sublime we should now see a bunch of new folders. We now have config, migrations and models. This was created for us when we ran `sequelize init`.

Let's start in the config folder and open up the config.json file. This file contains information about the database we are using as well as how to connect. We have three settings, one for development (what we will use now), test(for testing our code), and production(when we deploy our app on AWS/Heroku).

Let's change the config.json so it looks like this (we will not be using the test or production environments, so just ignore those for now - all that matters is "development").

##Creating Models and Migrations

In order to create a model, we start with `sqlize model:create` and then specify the name of the model using the --name flag. Make sure your models are always in the singular (remember table name in plural, model name in singular).

After passing in the --name flag followed by the name of your model, you can then add an --attributes flag and pass in data about your model. When you generate your model, you will also generate a corresponding migration. You only need to do this once for your model.

Remember, if you want to make changes to your model after generating it - all you have to do is make a change and save it. If you want to make changes to your migrations, you have to re-run them (either by undoing the migration or by creating a new one that alters the migration).

Here is an example of a command to generate a User model with a first_name, last_name and age along with a corresponding migration. Make sure you do not have any spaces for each of the attributes and their data types

```
sequelize model:create --name User --attributes firstname:string,lastname:string,role:string,username:string
```

##CRUD with Sequelize

####Create

```javascript
var pg = require("pg");
var models = require("./models/index.js");

models.User.create({
	firstname:req.body.firstname,
	lastname:req.body.lastname,
	role: req.body.role,
	username: req.body.username
}).done(function(data, error) {
	res.redirect("/");
});
```

####Read

```javascript
models.User.findAll().done(function(users, error) {
	res.render("index.ejs", {
		all_users: users
	});
});
```
or

```javascript
models.User.findById(req.params.id).done(function(user, error) {
	res.render("edit.ejs", {
		user_info: user
	});
});
```

####Update

```javascript
models.User.findById(req.params.id).done(function(user, error) {
	user.updateAttributes({
		firstname:req.body.firstname,
		lastname:req.body.lastname,
		role: req.body.role,
		username: req.body.username
	}).done(function() {
		res.redirect("/");
	});
});
```

####Delete

```javascript
models.User.findById(req.params.id).done(function(user, error) {
	user.destroy().done(function() {
		res.redirect("/");
	});
});
```

##Using Modules
- So far we have seen a few modules that we have pulled from NPM to accomplish certain tasks.
- Creating our own modules is simple, and is best-practice for large applications that have a lot of functionality.
- Modules are set up as a property called `exports` of the module object:

greetings.js

```javascript
module.exports = {
	sayHello: function() {
		alert("Hello!");
	},
	
	sayGoodbye: function() {
		alert("Goodbye!");
	}
};
```

- After you set up your module you can require it in other code:

```javascript
var Greetings = require("./greetings");
```

- Since modules are just objects with functions attached, they can be constructed in a more typical JavaScript OOP fashion as well:

```javascript
function Greeting(name) {
	this.name = name;
}

Greeting.prototype.sayHello = function() {
	console.log("Hello " + this.name);
}

Greeting.prototype.sayGoodbye = function() {
	console.log("Goodbye " + this.name);
}

module.exports = Greeting;
```

- Modules can be published to NPM if you want to distribute them. More information can be found [here](https://docs.npmjs.com/getting-started/publishing-npm-packages).

##Module Lab
- In this lab we will be writing some generic functionality as helpers to work with arrays.
- We will set up each function as a module method.
- Your job is to set up a module with methods to accomplish the following operations:
	- Find last value in array
	- Sort array
	- Add value to end of array
	- Reverse array
- Try to call your methods in a separate file to practice invoking them.

##Testing with Mocha and Chai
- Testing in Node can take many forms, but Mocha and Chai are two tools that are pretty industry standard.
- Mocha is the spec runner software and Chai is the assertion library that work together to run the tests.
- Since Mocha is just a spec runner, we can install it globally so the commands can be accessed anywhere: `npm install mocha -g`.
- Chai should be specific to the project, so we will install it as a local dependency. However, it should only be used during development so we will specify that: `npm install chai --save-dev`.
- Let's see an example test:

```javascript
var expect = require("chai").expect;

var num1 = 2;
var num2 = 3;

describe("Testing Mocha and Chai", function() {
	it("Should add 2 and 3 together", function(done) {
		expect(num1 + num2).equal(5);
		done();
	});

	it("Should fail", function(done) {
		expect(num1 + num2).equal(10);
		done();
	});
});
```

##Testing Lab
- Step 1: Install all npm modules for this project with `npm install`.
- Step 2: Create a `test` folder with a file inside called library_spec.js.
- Step 3: Open up library.js and try to figure out what the functions are doing.
- Step 4: Think of how we could write tests to ensure that this functionality is correct.
- Step 5: Write the tests in library_spec.js.
- Step 6: There is one test that *should* fail. Can you correct the code to make it pass?

##Setting Up TLS
- Transport Layer Security encrypts HTTP connections.
	- Asymmetric-key encryption is used to pass a random key.
	- Asymmetric-key encryption is "public/private key" encryption.
	- The key is used with symmetric-key encryption to protect data.

- The simplified connection sequence is:
	- The client connects to a secure port.
	- The server identifies itself with a certificate.
	- The certificate contains the server's public key.
	- The client authenticates the certificate.
	- The client sends a "master secret" encrypted with the public key.
	- The server decrypts the key and starts symmetric encryption.

- There are two main ways you can set up TLS encryption - key and certificate in separate PEM files or together in a PFX file:

```javascript
//As separate files

var options = {
	key: fs.readFileSync("secretkey.pem"),
	cert: fs.readFileSync("certificate.pem")
};

//As one file

var options = {
	pfx: fs.readFileSync("certificate.pfx")
};

var server = http.createServer(options, function(req, res) { ... });

server.listen(3000);
```

##Using Gulp
- Gulp is an automation tool that makes working with Node easier.
- This tool automates common processes that are normally tedious and repetitive.
- A few examples of tasks it can automate are: minifying files, compiling SASS, and linting JS code.
- Gulp is run from the command line but also necessary in the project. We will install it in two steps:
	- Step 1: `npm install gulp -g`
	- Step 2: `npm install gulp --save-dev`
- We will be practicing Gulp with the minification plugin. We will have to install it first: `npm install gulp-uglify --save-dev`.
- All projects that use Gulp work with a Gulpfile. We will set ours up to concatenate and minify our sample files:

```javascript
var gulp = require("gulp");

var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var rename = require("gulp-rename");

gulp.task("scripts", function() {
	return gulp.src("js/*.js")
		.pipe(concat("all.js"))
		.pipe(gulp.dest("dist"))
		.pipe(rename("all.min.js"))
		.pipe(uglify())
		.pipe(gulp.dest("dist"));
});

gulp.task("default", ["scripts"]);
```