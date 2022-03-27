const myLogger = function (req, res, next) {
  console.log('URL: ', req.url)
  next()
}

module.exports = myLogger;
