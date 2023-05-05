const response = (statusCode, data, message, res) => {
  res.status(statusCode).json({
    status_code: statusCode,
    payload: {
      datas: data,
      messages: message,
    },
  });
};

module.exports = response;