DROP database tech_blog_db;


SET foreign_key_checks = 0;

USE tech_blog_db;

CREATE TABLE user(
    id varchar(255),
    usernamename VARCHAR(255)
);


USE tech_blog_db;

SET foreign_key_checks = 0;

DROP TABLE forum;

CREATE TABLE forum(
	id INTEGER NOT NULL auto_increment,
    title VARCHAR(255) NOT NULL,
    user_id INTEGER,
    forum_content TEXT,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `forum` (`id`)
    ) ENGINE=InnoDB;
    
    
CREATE TABLE user(
	id INTEGER NOT NULL auto_increment,
    title VARCHAR(255) NOT NULL,
    user_id INTEGER,
    forum_content TEXT,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`forum_id`) REFERENCES `user` (`id`)
    ) ENGINE=InnoDB;

DROP TABLE user;
DROP TABLE forum;

CREATE TABLE IF NOT EXISTS user(
	id varchar(25) not null
);
CREATE TABLE IF NOT EXISTS forum(
	user_id int(11) not null
);