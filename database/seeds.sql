
CREATE TABLE admins(
  admin_id uuid primary key not null default uuid_generate_v4(),
  admin_login varchar(32) not null unique,
  admin_password uuid  not null, 
  admin_name varchar(64) not null,
  admin_phone varchar(64) not null,
  admin_created_at timestamp default current_timestamp
);

INSERT INTO admins (admin_login, admin_password, admin_name, admin_phone)
VALUES ('admin123', '123456789', 'John Doe', '93-123-04-03');
