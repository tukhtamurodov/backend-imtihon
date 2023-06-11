let joi = require("joi");
const queryPg = require("../lib/queryPg");
const { pg } = require("../lib/pg");
const path = require("path");
let uuid = require("uuid").v4;
const fileUpload = require("express-fileupload");

let schema = joi.object().keys({
  name: joi.string().required().min(3).max(64),
  about: joi.string().required().min(25).max(1000),
  logo: joi.string().required().min(10),
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
  let image = req?.files?.image;
  if (!image) {
    return next({ status: 400, message: "imgage joylamading!!!" });
  }
  let fileType = path.extname(image.name);
  let imageName = uuid() + fileType;

  let pathImg = path.resolve("uploads", "logos", imageName);

  let error = schema.validate({
    name,
    about,
    categoryId,
    telegram,
    logo: imageName,
    instagram,
    phone,
  });

  if (error?.error) {
    let message = error.error.details[0].message;
    return next({ status: 400, message: message });
  }

  let rows = await pg(
    queryPg.centers.post,
    name,
    about,
    imageName,
    categoryId,
    phone,
    telegram,
    instagram
  );

  if (rows.length > 0) {
    image.mv(pathImg);
  }

  return res.json({ message: "ok", rows });
};

let get = async (req, res, next) => {
  let rows = await pg(queryPg.centers.get);
  return res.json(rows);
};

let put = async (req, res, next) => {
  let { name, about, telegram, categoryId, logo, phone, instagram } = req.body;
  let image = req?.files?.image;
  if (!image) {
    return next({ status: 400, message: "imgage joylamading!!!" });
  }
  let fileType = path.extname(image.name);
  let imageName = uuid() + fileType;

  let pathImg = path.resolve("uploads", "logos", imageName);

  let error = schema.validate({
    name,
    about,
    categoryId,
    telegram,
    logo: imageName,
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

  let rows = await pg(
    queryPg.centers.put,
    name,
    about,
    imageName,
    categoryId,
    phone,
    telegram,
    instagram,
    id
  );

  if (rows.length > 0) {
    image.mv(pathImg);
  }
  return res.json(rows[0]);
};

let delet = async (req, res, next) => {
  let { id } = req.params;
  let validate = schemaUUID.validate({ id });

  if (validate?.error) {
    return next({ status: 400, message: "invalid id" });
  }

  let rows = await pg(queryPg.centers.delete, id);
  return res.json(rows[0]);
};

let getOne = async (req, res, next) => {
  let { id } = req.params;
  let validate = schemaUUID.validate({ id });
  if (validate?.error) {
    return next({ status: 400, message: "invalid id" });
  }
  let rows = await pg(queryPg.centers.getById, id);
  if (!rows.length > 0) {
    return next({ status: 400, message: "not found" });
  }

  return res.json(rows[0]);
};

let centersControllers = { post, get, delet, put, getOne };
module.exports = centersControllers;
