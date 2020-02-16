~~~bash
mongod --port 15000 --dbpath ./MongoDB/node
~~~
## Register user
### 1. Register root
~~~bash
mongo --port 15000
~~~
~~~js
use admin
db.createUser({
  user: "root",
  pwd: "password",
  roles: ["dbAdminAnyDatabase", "userAdminAnyDatabase"]
});
~~~
### 2. Register new user
~~~bash
mongod --port 15000 --dbpath ./MongoDB/node --auth
~~~
~~~bash
mongo --port 15000 -u root -p
~~~
~~~js
use node
db.createUser({
  user: "node",
  pwd: "password",
  roles: ["readWrite", "userAdmin"]
});
~~~
