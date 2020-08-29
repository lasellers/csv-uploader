/* CREATE DATABASE csvuploader; -- handled by mariadb docker automatically */
USE csvuploader;
/*  -- handled by mariadb docker automatically
CREATE USER 'csvuploader' IDENTIFIED BY 'password';
GRANT ALL ON *.* TO 'csvuploader'@'%';
*/
create table docker_entrypoint_initdb (id int, created_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);
insert into docker_entrypoint_initdb (id) values (1);
