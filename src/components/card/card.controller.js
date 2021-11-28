import { useGenericCRUD } from "../useGenericCRUD";
import { Card } from "./card.model";
import { User } from "../user/user.model";
import httpErr from "http-errors";
import { truncatePicksWithinCard } from "../../utils/truncatePicksWithinCard";

const generic = useGenericCRUD(Card);

const getCardsByUsername = async (req, res, next) => {
  const { un: usernameQueryString } = req.query;

  try {
    const user = await User.findOne({ username: usernameQueryString });
    const docs = await Card.find({ createdBy: user._id })
      .sort("-createdAt")
      .populate("createdBy", "username name -_id");

    res.status(200).json({ data: docs });
  } catch (err) {
    next(httpErr(400, err));
  }
};

const getCardById = async (req, res, next) => {
  const { id: cardId } = req.query;

  try {
    const doc = await Card.findOne({ _id: cardId }).populate(
      "createdBy",
      "username name -_id"
    );

    if (!doc) return res.status(400).end();

    res.status(200).json({ data: doc });
  } catch (err) {
    next(httpErr(400, err));
  }
};

const createCard = async (req, res, next) => {
  const createdBy = req.user._id;

  let card = req.body;

  if (card.tags) card.tags = card.tags.toString().split(" ");

  const truncatedCard = truncatePicksWithinCard(card);

  try {
    let doc = await Card.create({ ...truncatedCard, createdBy });
    doc = await doc.populate("createdBy", "username name -_id").execPopulate();
    res.status(201).json({ data: doc });
  } catch (err) {
    next(httpErr(400, err));
  }
};

const updateCard = async (req, res, next) => {
  let card = req.body;

  if (card.tags) card.tags = card.tags.toString().split(" ");

  const truncatedCard = truncatePicksWithinCard(card);

  try {
    let updatedDoc = await Card.findOneAndUpdate(
      {
        createdBy: req.user._id,
        _id: req.body._id,
      },
      truncatedCard,
      { new: true }
    );

    updatedDoc = await updatedDoc
      .populate("createdBy", "username name -_id")
      .execPopulate();

    if (!updatedDoc) {
      return res.status(400).end();
    }

    res.status(200).json({ data: updatedDoc });
  } catch (err) {
    next(httpErr(400, err));
  }
};

const deleteCardById = (req, res, next) =>
  generic.removeOne(req, res, next, { idReqType: "query" });

export default {
  getCardsByUsername,
  createCard,
  getCardById,
  updateCard,
  deleteCardById,
};
