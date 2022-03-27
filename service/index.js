// const ceramic = require("./ceramic.js")
const lens = require("./lens.js")

const setDispatcher = async function (req, res, next) {
  try {
    console.log(req.body)
    const result = await lens.setDispatcher(req.body)

    res.send("I'm back");
  } catch (error) {
    console.error(error);
    next();
  }
}

const updateProfilPicture = async function (req, res, next) {
  try {
    console.log(req.body)
    const result = await lens.updateProfilPicture(req.body)

    res.send("I'm back");
  } catch (error) {
    console.error(error);
    next();
  }
}

module.exports = { setDispatcher, updateProfilPicture };
