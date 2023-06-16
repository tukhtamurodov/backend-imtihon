let joi = require("joi");
const queryPg = require("../lib/queryPg");
const { pg } = require("../lib/pg");

let schema = joi.object().keys({
  name: joi.string().required().min(5).max(64),
  about: joi.string().required().min(15).max(1000),
  price: joi.string().required().min(5).max(64),
  lessonDuration: joi.string().required().min(5).max(32),
  totalDuration: joi.string().required().min(5).max(32),
  examInfo: joi.string().required().min(5).max(64),
  courseStartedDate: joi.string().required().min(5).max(64),
  filialId: joi.string().uuid().required(),
});

let schemaUUID = joi.object().keys({
  id: joi.string().uuid().required(),
});

let post = async (req, res, next) => {
  let {
    name,
    about,
    price,
    lessonDuration,
    totalDuration,
    examInfo,
    courseStartedDate,
    filialId,
  } = req.body;
  let error = schema.validate({
    name,
    about,
    price,
    lessonDuration,
    totalDuration,
    examInfo,
    courseStartedDate,
    filialId,
  });

  if (error?.error) {
    let message = error.error.details[0].message;
    return next({ status: 400, message: message });
  }

  let rows = await pg(next,
    queryPg.courses.post,
    name,
    about,
    price,
    lessonDuration,
    totalDuration,
    examInfo,
    courseStartedDate,
    filialId
  );
  if (rows?.message) {
    return next({ message: rows.message, status: 401 });
  }
  return res.json({ message: "ok", rows });
};

let get = async (req, res, next) => {
  let rows = await pg(next,queryPg.courses.get);
  return res.json(rows);
};

let put = async (req, res, next) => {
  let {
    name,
    about,
    price,
    lessonDuration,
    totalDuration,
    examInfo,
    courseStartedDate,
    filialId,
  } = req.body;
  let error = schema.validate({
    name,
    about,
    price,
    lessonDuration,
    totalDuration,
    examInfo,
    courseStartedDate,
    filialId,
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
    queryPg.courses.put,
    name,
    about,
    price,
    lessonDuration,
    totalDuration,
    examInfo,
    courseStartedDate,
    filialId,
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

  let rows = await pg(next,queryPg.courses.delete, id);
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
  
  let rows = await pg(next,queryPg.courses.getById, id);
  
  if (!rows.length > 0) {
    return next({ status: 400, message: "not found" });
  }

  if (rows?.message) {
    return next({ message: rows.message, status: 401 });
  }
  return res.json(rows[0]);
};

let filialsControllers = { post, get, delet, put, getOne };
module.exports = filialsControllers;
