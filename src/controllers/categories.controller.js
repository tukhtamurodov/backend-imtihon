let joi = require("joi");
const queryPg = require("../lib/queryPg");
const { pg } = require("../lib/pg");
let schema = joi.object().keys({
  name: joi.string().required().min(3).max(64),
});
let schemaUUID = joi.object().keys({
  id: joi.string().uuid().required(),
});



let post = async (req, res, next) => {
  let { name } = req.body;
  let error = schema.validate({ name });

  if (error?.error) {
    let message = error.error.details[0].message;
    return next({ status: 400, message: message });
  }

  let rows = await pg(next,queryPg.categories.post, name);
  if (rows?.message) {
    return next({ message: rows.message, status: 401 });
  }
  return res.status(200).json({ message: "ok", rows });
};

let get = async (req, res, next) => {
  let rows = await pg(next,queryPg.categories.get);
  if (rows?.message) {
    return next({ message: rows.message, status: 401 });
  }
  return res.status(200).json(rows);
};

let put = async (req, res, next) => {
  let { name } = req.body;
  let { id } = req.params;
  let validate = schemaUUID.validate({ id });
  let error = schema.validate({ name });

  if (validate?.error) {
    return next({ status: 400, message: "invalid id" });
  }

  if (error?.error) {
    let message = error.error.details[0].message;
    return next({ status: 400, message: message });
  }

  let rows = await pg(next,queryPg.categories.put, name, id);
  if (rows?.message) {
    return next({ message: rows.message, status: 401 });
  }
  return res.status(200).json(rows[0]);
};

let delet = async (req, res, next) => {
  let { id } = req.params;
  let validate = schemaUUID.validate({ id });

  if (validate?.error) {
    return next({ status: 400, message: "invalid id" });
  }

  let rows = await pg(next,queryPg.categories.delete, id);
  if (rows?.message) {
    return next({ message: rows.message, status: 401 });
  }
  return res.status(200).json(rows[0]);
};

let getOne = async (req, res, next) => {
  let { id } = req.params;
  let validate = schemaUUID.validate({ id });
  if (validate?.error) {
    return next({ status: 400, message: "invalid id" });
  }
  let rows = await pg(next,queryPg.categories.getById, id);
  if (!rows.length > 0) {
    return next({ status: 400, message: "not found" });
  }
  if (rows?.message) {
    return next({ message: rows.message, status: 401 });
  }

  return res.status(200).json(rows[0]);
};

let categoriesControllers = { post, get, delet, put, getOne };
module.exports = categoriesControllers;
