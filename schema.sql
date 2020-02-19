CREATE DATABASE bucketDB;


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    github_id VARCHAR(255) 
);


CREATE TABLE bucket(
    id SERIAL PRIMARY KEY,
    city VARCHAR(255),
    city_photo VARCHAR(255),
    budget INTEGER,
    year INTEGER,
    month INTEGER,
    user_id INTEGER REFERENCES users (id)
);


CREATE TABLE activity(
    id SERIAL PRIMARY KEY,
    activity_title VARCHAR(255),
    activity_detail TEXT,
    activity_photo VARCHAR(255),
    bucket_id INTEGER REFERENCES bucket (id)
);




-- bucket seeding
INSERT INTO bucket (city, city_photo,user_id) VALUES('MEl','http://test1',1);
INSERT INTO bucket (city, city_photo,user_id) VALUES('MEl2','http://test2',1);
INSERT INTO bucket (city, city_photo,user_id) VALUES('MEl3','http://test1',1);
INSERT INTO bucket (city, city_photo,user_id) VALUES('MEl4','http://test1',1);
INSERT INTO bucket (city, city_photo,user_id) VALUES('MEl5','http://test3',2);
INSERT INTO bucket (city, city_photo,user_id) VALUES('MEl','http://test1',2);
INSERT INTO bucket (city, city_photo,user_id) VALUES('MEl2','http://test1',2);

-- activity seeding
INSERT INTO activity (activity_title,activity_detail,activity_photo,bucket_id) VALUES('run','run all day long','http://act1',1);
INSERT INTO activity (activity_title,activity_detail,activity_photo,bucket_id) VALUES('drive','drive all day long','http://act2',1);
INSERT INTO activity (activity_title,activity_detail,activity_photo,bucket_id) VALUES('drive','drive all day long','http://act1',2);
INSERT INTO activity (activity_title,activity_detail,activity_photo,bucket_id) VALUES('sleep','sleep all day long','http://act1',2);
INSERT INTO activity (activity_title,activity_detail,activity_photo,bucket_id) VALUES('run','run all day long','http://act1',3);
INSERT INTO activity (activity_title,activity_detail,activity_photo,bucket_id) VALUES('run','run all day long','http://act1',4);

--user seeding
INSERT INTO users (username, github_id) VALUES('jp1',12423423);
INSERT INTO users (username, github_id) VALUES('jp2',12423423);







