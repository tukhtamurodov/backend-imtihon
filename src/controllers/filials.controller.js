let joi = require("joi");
const path = require("path");

let uuid = require("uuid").v4;
const queryPg = require("../lib/queryPg");
const { pg } = require("../lib/pg");

let schema = joi.object().keys({
  name: joi.string().required().min(3).max(64),
  centerId: joi.string().uuid().required(),
  phone: joi.string().required().min(5).max(64),
  telegram: joi.string().required().min(3).max(64),
  location: joi.string().required().min(15).max(1000),
  photo: joi.string().min(10),
});

let schemaUUID = joi.object().keys({
  id: joi.string().uuid().required(),
});

let post = async (req, res, next) => {
  let { name, centerId, phone, telegram, location } = req.body;
  let image = req?.files?.image;
  let imageName = "filial.jpg";
  let pathImg = null;
  if (image) {
    let fileType = path.extname(image.name);
    imageName = uuid() + fileType;

    pathImg = path.resolve("uploads", "filials-photos", imageName);
  }

  let error = schema.validate({
    name,
    centerId,
    phone,
    telegram,
    location,
    photo: imageName,
  });

  if (error?.error) {
    let message = error.error.details[0].message;
    return next({ status: 400, message: message });
  }

  let rows = await pg(
    queryPg.filials.post,
    name,
    centerId,
    phone,
    telegram,
    location,
    imageName
  );
  if (rows.length > 0 && image) {
    image.mv(pathImg);
  }
  return res.json({ message: "ok", rows });
};

let get = async (req, res, next) => {
  let rows = await pg(queryPg.filials.get);
  return res.json(rows);
};

let put = async (req, res, next) => {
  let { name, centerId, phone, telegram, location, photo } = req.body;
  let image = req?.files?.image;
  let imageName = "filial.jpg";
  let pathImg = null;
  if (image) {
    let fileType = path.extname(image.name);
    imageName = uuid() + fileType;

    pathImg = path.resolve("uploads", "filials-photos", imageName);
  }

  let error = schema.validate({
    name,
    centerId,
    phone,
    telegram,
    location,
    photo:imageName,
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
    queryPg.filials.put,
    name,
    centerId,
    phone,
    telegram,
    location,
    imageName,
    id
  );
  if (rows.length > 0 && image) {
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

  let rows = await pg(queryPg.filials.delete, id);
  return res.json(rows[0]);
};

let getOne = async (req, res, next) => {
  let { id } = req.params;
  let validate = schemaUUID.validate({ id });
  if (validate?.error) {
    return next({ status: 400, message: "invalid id" });
  }
  let rows = await pg(queryPg.filials.getById, id);
  if (!rows.length > 0) {
    return next({ status: 400, message: "not found" });
  }

  return res.json(rows[0]);
};

let filialsControllers = { post, get, delet, put, getOne };
module.exports = filialsControllers;
