const index = (req, resp) => {
  try {
    resp.status(200).send({ routeList: ["/admin", "/articles", "/articles/:id"], msg: 'Simple API for blog website' })
  } catch (err) {
    console.log(err);
  }
}

module.exports = index