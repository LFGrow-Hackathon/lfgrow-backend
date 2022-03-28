// const ceramic = require("./ceramic.js")
const lens = require("./lens.js")

const createPost = async function (req, res, next) {
  try {
    const result = await lens.createPost(req.body)
    console.log("result ", result)

    res.send("I'm back");
  } catch (error) {
    next(error);
  }
}

const setDispatcher = async function (req, res, next) {
  try {
    const result = await lens.setDispatcher(req.body)
    console.log("result ", result)

    res.send("I'm back");
  } catch (error) {
    next(error);
  }
}

const updateProfilPicture = async function (req, res, next) {
  try {
    const result = await lens.updateProfilPicture(req.body)

    res.send("I'm back");
  } catch (error) {
    next(error);
  }
}

module.exports = { setDispatcher, updateProfilPicture, createPost };
