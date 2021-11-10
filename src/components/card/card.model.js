import mongoose from "mongoose";
import { pickSchema } from "../pick/pick.model";
import { isEmptyObj } from "../../utils/isEmptyObj";

export function pickIsMissingUserTitle(picks) {
  const checkPickMissingUserTitle = ({ preview, userTitle }) => {
    const noPreview = preview === undefined || isEmptyObj(preview);

    const noUserTitle = userTitle === undefined || userTitle.trim() === "";

    return noPreview && noUserTitle;
  };

  return picks.some(checkPickMissingUserTitle);
}

const cardSchema = new mongoose.Schema(
  {
    comments: { type: String, maxLength: 200 },
    picks: [pickSchema],
    createdBy: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    tags: { type: Array, maxLength: 5 },
  },
  { timestamps: true }
);

cardSchema.pre("save", async function (next) {
  // ! Workaround: using this.toObject() as 'this' is a mongoose doc and not a plain js object, causing issues with is empty obj equality check
  const { picks } = this.toObject();

  if (picks.length > 5) {
    next(new Error("You can't have more than 5 picks"));
  }

  if (pickIsMissingUserTitle(picks)) {
    next(new Error("User title required if preview not found"));
  }

  next();
});

export const Card = mongoose.model("Card", cardSchema);
