const errorsHandling = (err, _, res, __) => {
  return res.status(err.status).json({
    message: err.message,
    status: err.status,
  });
};
module.exports = errorsHandling;
