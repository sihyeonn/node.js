## MongoDB
> NoSQL

### Setting MongoDB
1. If you don't have Homebrew installed,
   ~~~bash
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
   ~~~
2. Installing MongoDB
   ~~~bash
    brew tap mongodb/brew
    brew install mongodb-community@4.2
   ~~~
3. Run MongoDB community version
   ~~~bash
    brew services start mongodb-community@4.2
   ~~~
4. Connect and use MongoDB
   ~~~bash
    mongo
   ~~~

### CRUD with MongoDB
1. Create DB 'test' and table 'user'
   ~~~sql
    use test
    db.createCollection('user') # collection is table
    show collections
   ~~~
2. CRUD
   ~~~sql
    # INSERT
    db.user.insertOne({name: 'Sihyeon Jang', type: 'A'})
    db.user.insertOne({name: 'Sihyeon Jang', type: 'A', country: 82})
    db.user.insertMany([{name: 'Sanghyeon', country: 82}, {name: 'Sohyeon', type: 'O'}])

    # SELECT
    db.user.find()
    db.user.find({country:82}).pretty()
    db.user.find({type: {$in:['A', 'O']}}).pretty()
    db.user.find({country: {$ne:82}}).pretty()
    db.user.find({country: {$ne:82}, type: 'A'}).pretty()
    db.user.find({$or: [{country: 82}, {type: 'A'}]}).pretty()

    # UPDATE
    db.user.updateOne({country: {$ne:82}}, {$set:{country: 1}})
    db.user.updateMany({type: 'A'}, {$set: {type: 'AO'}})

    # DELETE
    db.user.deleteOne({country: 8})
    db.user.deleteMany({country: 82})
   ~~~

> [reference](https://github.com/booldook/2109-kn-node-mongoose/blob/master/readme.md)
