## Express and Sequelize setting

### 1. Generate a project
   ~~~bash
    cd ..
    npm i -g express-generator # if you need
    express -v pug 06_Alone # same with express --view=ejs 06_Alone except view-engine
    cd 06_Alone
   ~~~
### 2. Install npm packages
   ~~~bash
    npm i
   ~~~
### 3. Install and init sequelize for db
   ~~~bash
    npm i -g sequelize-cli # if you need
    npm i sequelize mysql2
    sequelize init
   ~~~
### 4. Install dotenv and config for using '.env'
   ~~~bash
    npm i dotenv
   ~~~
   ~~~js
    require('dotenv').config()
   ~~~
### 5. customize your db config (06_Alone/config/config.json)

## Project migration

### 1. Create model in models/boards.js
   ~~~js
   module.exports = (sequelize, Sequelize) => {
     return sequelize.define('Board', { // class create module
     title: { type: Sequelize.STRING(255) },
     writer: { type: Sequelize.STRING(255) },
     img: { type: Sequelize.STRING(255) },
     comment: { type: Sequelize.TEXT() },
       }, { // option
         timestamps: true,
         charset: 'utf8',
         tableName: 'boards'
       }
     );
   }; 
   ~~~
### 2. Add model in app.js
   ~~~js
    var {sequelize} = require('./models'); // same with require('./models/index');
    sequelize.sync({force: false}) // without this table would not be created
   ~~~
 ### 3. Add router in routes/board.js
   ~~~js
    const {Board} = require('./models');
   ~~~  
