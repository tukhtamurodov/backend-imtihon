let joi = require("joi");
const queryPg = require("../lib/queryPg");
const { pg } = require("../lib/pg");
const path = require("path");
let uuid = require("uuid").v4;

let schema = joi.object().keys({
  name: joi.string().required().min(3).max(64),
  about: joi.string().required().min(25).max(1000),
  categoryId: joi.string().uuid().required(),
  phone: joi.string().required().min(5).max(64),
  telegram: joi.string().required().min(3).max(64),
  instagram: joi.string().required().min(3).max(64),
});

let schemaUUID = joi.object().keys({
  id: joi.string().uuid().required(),
});

let post = async (req, res, next) => {
  let { name, about, telegram, categoryId, phone, instagram } = req.body;

  let error = schema.validate({
    name,
    about,
    categoryId,
    telegram,
    instagram,
    phone,
  });

  
  if (error?.error) {
    let message = error.error.details[0].message;
    return next({ status: 400, message: message });
  }

  let rows = await pg(next,
    queryPg.centers.post,
    name,
    about,
    categoryId,
    phone,
    telegram,
    instagram
  );
  if (rows?.message) {
    next({ status: 401, message: rows.message });
  }
  if (rows?.message) {
    return next({ message: rows.message, status: 401 });
  }
  return res.json({ message: "ok", rows });
};

let get = async (req, res, next) => {
  let rows = await pg(next,queryPg.centers.get);
  if (rows?.message) {
    return next({ message: rows.message, status: 401 });
  }
  return res.json(rows);
};

let put = async (req, res, next) => {
  let { name, about, telegram, categoryId, phone, instagram } = req.body;

  let error = schema.validate({
    name,
    about,
    categoryId,
    telegram,
    instagram,
    phone,
  });
  let { id } = req.params;
  let validate = schemaUUID.validate({ id });

  if (validate?.error) {
    return next({ status: 400, message: "invalid id" });
  }

  if (error?.error) {
    let message = error.error.details[0].message;
    return next({ status: 400, message: message });
  }

  let rows = await pg(next,
    queryPg.centers.put,
    name,
    about,
    categoryId,
    phone,
    telegram,
    instagram,
    id
  );
  if (rows?.message) {
    return next({ message: rows.message, status: 401 });
  }

  return res.json(rows[0]);
};

let delet = async (req, res, next) => {
  let { id } = req.params;
  let validate = schemaUUID.validate({ id });

  if (validate?.error) {
    return next({ status: 400, message: "invalid id" });
  }

  let rows = await pg(next,queryPg.centers.delete, id);
  if (rows?.message) {
    return next({ message: rows.message, status: 401 });
  }
  return res.json(rows[0]);
};

let getOne = async (req, res, next) => {
  let { id } = req.params;
  let validate = schemaUUID.validate({ id });
  if (validate?.error) {
    return next({ status: 400, message: "invalid id" });
  }
  let rows = await pg(next,queryPg.centers.getById, id);
  if (!rows.length > 0) {
    return next({ status: 400, message: "not found" });
  }

  if (rows?.message) {
    return next({ message: rows.message, status: 401 });
  }
  return res.json(rows[0]);
};

let centersControllers = { post, get, delet, put, getOne };
module.exports = centersControllers;
