import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const validateEmail = (email) => validator.isEmail(email);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, maxLength: 50 },
    email: {
      type: String,
      trim: true,
      unique: true,
      maxLength: 50,
      lowercase: true,
      trim: true,
      validate: [validateEmail, "Your Email address is invalid, try again."],
    },
    username: {
      type: String,
      required: true,
      trim: true,
      minLength: 4,
      maxLength: 15,
      unique: true,
      match: [
        /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/,
        "Your Username is invalid, you can only use letters, numbers, periods & underscores.",
      ],
    },
    displayPicture: { type: String, trim: true, maxLength: 200 },
    bio: { type: String, maxLength: 200 },
    location: { type: String, maxLength: 30 },
    following: { type: Array },
    followers: { type: Array },
    password: "",
    publicProfile: { type: Boolean, default: true },
    picksCards: {
      weekly: { type: Array },
      topic: { type: Array },
      draft: { type: Object },
      scheduled: { postingOn: Date },
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (err) {
      return next(err);
    }
  }

  next();
});

userSchema.methods = {
  checkPassword: function (inputPassword) {
    return bcrypt.compare(inputPassword, this.password);
  },
};

// userSchema.pre("deleteOne", async function (next) {
//   const userId = this._conditions._id;

//   try {
// todo: await deleteMany (.all users assets)
//   } catch (err) {
//     return next(err);
//   }

//   next();
// });

export const User = mongoose.model("User", userSchema);
