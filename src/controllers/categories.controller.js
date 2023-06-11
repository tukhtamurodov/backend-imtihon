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

  let rows = await pg(queryPg.categories.post, name);
  return res.json({ message: "ok", rows });
};

let get = async (req, res, next) => {
  let rows = await pg(queryPg.categories.get);
  return res.json(rows);
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

  let rows = await pg(queryPg.categories.put, name, id);
  console.log(rows);
  return res.json(rows[0]);
};

let delet = async (req, res, next) => {
  let { id } = req.params;
  let validate = schemaUUID.validate({ id });

  if (validate?.error) {
    return next({ status: 400, message: "invalid id" });
  }

  let rows = await pg(queryPg.categories.delete, id);
  return res.json(rows[0]);
};

let getOne = async (req, res, next) => {
  let { id } = req.params;
  let validate = schemaUUID.validate({ id });
  if (validate?.error) {
    return next({ status: 400, message: "invalid id" });
  }
  let rows = await pg(queryPg.categories.getById, id);
  if (!rows.length > 0) {
    return next({ status: 400, message: "not found" });
  }

  return res.json(rows[0]);
};

let categoriesControllers = { post, get, delet, put, getOne };
module.exports = categoriesControllers;
