import { User } from "./user.model";
import { generateToken } from "../../utils/auth";
import httpErr from "http-errors";

const getUser = (req, res, next) => {
  if (!req.user) {
    res.status(404);
    return next();
  }

  return res.status(200).json({ data: req.user });
};

const updateUser = async (req, res, next) => {
  const { name, bio, location } = req.body;
  const updates = { name, bio, location };
  try {
    const user = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
    }).lean();

    res.status(200).json({ data: user });
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  const { email, username, name, password } = req.body;
  const UN_TAG = "p/";

  const removeUsernameTag = (username) => {
    const UN_TAG = "p/";
    const trimmedUN = username.trim();
    if (trimmedUN.toLowerCase()[1] === UN_TAG) return trimmedUN.substring(2);
    return trimmedUN;
  };

  try {
    const alreadyEmail = await User.findOne({ email: email.toLowerCase() });
    if (alreadyEmail) {
      return res
        .status(401)
        .json({ msg: "Email already in use, try logging in." });
    }

    const alreadyUsername = await User.findOne({
      username: removeUsernameTag(username).toLowerCase(),
    });
    if (alreadyUsername) {
      return res
        .status(401)
        .json({ msg: "Username already in use, try another one." });
    }

    const user = await User.create({ email, username, name, password });

    const token = generateToken(user.id);

    res.json({
      token: token,
      user: {
        email: user.email,
        username: user.username,
        taggedUsername: UN_TAG + user.username,
        name: user.name,
      },
    });
  } catch (err) {
    return next(err);
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please complete all required fields" });
  }

  try {
    const returnFields = ["email", "password", "username"];
    const user = await User.findOne({ email }, returnFields);

    const invalidMessage = { message: "Incorrect login details, try again" };

    if (!user) return res.status(401).json(invalidMessage);

    const match = await user.checkPassword(password);

    if (!match) return res.status(401).send(invalidMessage);

    const token = generateToken(user.id);

    const UN_TAG = "p/";

    return res.status(201).json({
      token,
      user: {
        email: user.email,
        username: user.username,
        taggedUsername: UN_TAG + user.username,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getPublicProfileSummary = async (req, res, next) => {
  const { un: usernameQueryString } = req.query;

  if (!usernameQueryString)
    throw httpErr(
      400,
      "Username required as 'un' query string to getPublicProfileSummary controller"
    );

  try {
    const returnFields = [
      "name",
      "username",
      "displayPicture",
      "location",
      "bio",
      "-_id",
    ];
    const doc = await User.findOne(
      { username: usernameQueryString },
      returnFields
    )
      .lean()
      .exec();

    if (!doc) return httpErr(404, "Profile not found");

    res.status(200).json({ data: doc });
  } catch (err) {
    next(err);
  }
};

export default {
  getUser,
  updateUser,
  createUser,
  loginUser,
  getPublicProfileSummary,
};
