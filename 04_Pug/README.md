# SQL - CRUD
## Create
~~~sql
-- INSERT INTO [table_name] (key1, key2 ...) VALUES (val1, val2 ...);
INSERT INTO board (title, writer, wDate) VALUES ('Welcome', 'Manager', '2020-01-05 14:35:00');

-- INSERT INTO [table_name] SET key1='val1', key2='val2', ...;
INSERT INTO board SET title='Hi, everyone', writer='Manager', wDate=now();
~~~

## Read
~~~sql
-- SELECT * FROM [table_name];
-- SELECT * FROM [table_name] ORDER BY id ASC;
SELECT * FROM board

-- SELECT (key1, key2 ...) FROM [table_name] ORDER BY key DESC;
SELECT (id, title, writer, wDate, rNum) FROM board ORDER BY id DESC;

-- SELECT * FROM [table_name] WHERE key1='val1';
-- SELECT * FROM [table_name] WHERE key2 LIKE '%val%';
SELECT * FROM board WHERE id=7;
SELECT id FROM board WHERE title LIKE '%welcome%';
~~~
