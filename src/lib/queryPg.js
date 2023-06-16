const admin = {
  get: `SELECT admin_id, admin_username, admin_name, admin_phone FROM admins where admin_id = $1;`,
  login: `SELECT * FROM ADMINS where admin_password = $1 and admin_username = $2;`,
};

const categories = {
  post: `insert into categories (category_name) values ($1) returning *;`,
  get: `select * from categories order by category_created_at;`,
  getById: `select * from categories where category_id = $1 and category_is_active = true;`,
  delete: `update categories set category_is_active = false where category_id = $1 and category_is_active = true returning *;`,
  put: `update categories set category_name = $1 where category_id = $2 returning *;`,
};

let centers = {
  post: `insert into centers (center_name, center_about,center_category_id,center_phone,center_telegram,center_instagram)
   values ($1,$2,$3,$4,$5,$6) returning *;`,
  get: `select * from centers order by center_created_at;`,
  getById: `select * from centers where center_id = $1 and center_is_active = true;`,
  delete: `update centers set center_is_active = false where center_id = $1 and center_is_active = true returning *;`,
  put: `update centers set center_name = $1, center_about = $2,center_category_id = $3,center_phone = $4,center_telegram = $5,center_instagram = $6 where center_id = $7 returning *;`,
};

let filials = {
  post: `insert into filials (filial_name, filial_center_id, filial_phone, filial_telegram, filial_location)
   values ($1,$2,$3,$4,$5) returning *;`,
  get: `select * from filials order by filial_created_at;`,
  getById: `select * from filials where filial_id = $1;`,
  delete: `update filials set filial_is_active = false where filial_id = $1 and filial_is_active = true returning *;`,
  put: `update filials set filial_name = $1, filial_center_id = $2, filial_phone = $3, filial_telegram = $4, filial_location = $5  where filial_id = $6 returning *;`,
};

let courses = {
  post: `insert into courses (cours_name, cours_about, cours_price, cours_lesson_duration, cours_total_duration ,cours_exam_info,cours_started_date,cours_filial_id)
   values ($1,$2,$3,$4,$5,$6,$7,$8) returning *;`,
  get: `select * from courses where cours_is_active = true order by cours_created_at;`,
  getById: `select * from courses where cours_id = $1 and cours_is_active = true;`,
  delete: `update courses set cours_is_active = false where cours_id = $1 and cours_is_active = true returning *;`,
  put: `update courses set cours_name = $1, cours_about = $2, cours_price = $3, cours_lesson_duration = $4, cours_total_duration = $5 , cours_exam_info = $6, cours_started_date = $7 , cours_filial_id = $8 where cours_id = $9 returning *;`,
};

let queryPg = { admin, categories, centers, filials, courses };
module.exports = queryPg;
