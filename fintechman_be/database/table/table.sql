CREATE TABLE WEB_USER_INFO (
  id bigint auto_increment primary key,
  uid varchar(50) not null,
  salt varchar(32) not null,
  password varchar(70) not null
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

