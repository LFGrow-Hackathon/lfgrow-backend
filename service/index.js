// const ceramic = require("./ceramic.js")
const lens = require("./lens.js")

const mirror = async function (req, res, next) {
  try {
    const result = await lens.mirror(req.body)
    console.log("result ", result)

    res.send("I'm back");
  } catch (error) {
    next(error);
  }
}

const unfollow = async function (req, res, next) {
  try {
    const result = await lens.unfollow(req.body)
    console.log("result ", result)

    res.send("I'm back");
  } catch (error) {
    next(error);
  }
}

const follow = async function (req, res, next) {
  try {
    const result = await lens.follow(req.body)
    console.log("result ", result)

    res.send("I'm back");
  } catch (error) {
    next(error);
  }
}

const createComment = async function (req, res, next) {
  try {
    const result = await lens.createComment(req.body)
    console.log("result ", result)

    res.send("I'm back");
  } catch (error) {
    next(error);
  }
}

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
    console.log("result ", result);

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

module.exports = {
  setDispatcher,
  updateProfilPicture,
  createPost,
  createComment,
  follow,
  unfollow,
  mirror
};
