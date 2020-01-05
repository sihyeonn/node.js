# How to set Node.js
## Installation Node.js
1. Download node from https://nodejs.org
2. Install as default
3. Open terminal and execute a below command
   ~~~
   node --version
   ~~~
4. Create a project folder and move to the folder
5. Create `app.js`file
6. Open terminal on vscode(`command + j`) and execute below commands to start npm project
   ~~~bash
   # Install npm project, create `package.json`
   npm init -y
   
   # Install express module
   npm i express
   # Install pug module
   npm i pug
   ~~~
   - If you didn't install global module which you need to install only one time, you can install with below commands
   ~~~bash
   npm i -g supervisor nodemon # for development
   npm i -g pm2 # for deployment
   ~~~
   - Modify `package.json` to develop easy
7. Write codes on `app.js`
   ~~~js
   const express = require('express');
   const app = express();
   const port = 3000;
   const host = '127.0.0.1';

   // Start a server
   app.listen(port, () => { console.log(`http://${host}:${port}`); });

   // Set express and middle wares
   app.set('view engine', 'pug'); // Use pug as a view engine this time, express has pug
   app.set('views', './views');

   // Set static router
   app.use('/', express.static('./public')); // Send user to public who tried to access to root
   app.use(express.json()); // Set bodyParser
   app.use(express.urlencoded({extended: false}));
   app.locals.pretty = true; // Print sources from client pretty

   // Client will be waiting until server responses
   app.get("/user", (req, res) => {
     // Request from http://host:port/user?id=10
     let queryId = req.query.id; // method:get -> access variables from url
   });
   app.get("/user:id", (req, res) => {
     // Request from http://host:port/user/10
     let paramId = req.params.id; // method:semantic -> access variables from url
   });
   app.get("/user", (req, res) => {
     let bodyId = req.body.id; // method:post 
   });
   ~~~
