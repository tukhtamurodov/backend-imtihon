CREATE DATABASE education;
create extension if not exists "uuid-ossp";
CREATE TABLE admins(
  admin_id uuid primary key not null default uuid_generate_v4(),
  admin_login varchar(32) not null unique,
  admin_password uuid  not null, 
  admin_name varchar(64) not null,
  admin_phone varchar(64) not null,
  admin_created_at timestamp default current_timestamp
);


CREATE TABLE categories(
  category_id uuid primary key not null default uuid_generate_v4(),
  category_name varchar(64) not null,
  category_is_active boolean default true, 
  category_created_at timestamp default current_timestamp
);

CREATE TABLE centers(
  center_id uuid primary key not null default uuid_generate_v4(),
  center_name varchar(64) not null,
  center_about text not null, 
  center_logo text not null, 
  center_category_id uuid not null,
  center_phone varchar(64) not null,
  center_telegram varchar(64) not null,
  center_instagram varchar(64) not null,
  center_is_active boolean default true, 
  center_created_at timestamp default current_timestamp,
  foreign key (center_category_id) 
    references categories(category_id)
      on delete cascade
);


CREATE TABLE filials(
  filial_id uuid primary key not null default uuid_generate_v4(),
  filial_name varchar(64) not null,
  filial_center_id uuid not null,
  filial_phone varchar(64) not null,
  filial_telegram varchar(64) not null,
  filial_is_active boolean default true, 
  filial_location text not null, 
  filial_photo text ,
  filial_created_at timestamp default current_timestamp,
  foreign key (filial_center_id) 
    references centers(center_id)
      on delete cascade
);



CREATE TABLE courses(
  cours_id uuid primary key not null default uuid_generate_v4(),
  cours_name varchar(64) not null,
  cours_about text not null, 
  cours_price varchar(64) not null,
  cours_is_active boolean default true, 
  cours_lesson_duration varchar(32), 
  cours_total_duration varchar(32),
  cours_exam_info varchar(64),
  cours_started_date varchar(64), 
  cours_filial_id uuid not null,
  cours_created_at timestamp default current_timestamp,
  foreign key (cours_filial_id) 
    references filials(filial_id)
      on delete cascade
);
