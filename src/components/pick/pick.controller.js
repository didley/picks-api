import httpErr from "http-errors";
import { linkPreview } from "../../utils/linkPreview";

const getLinkPreview = async (req, res, next) => {
  const { url } = req?.query;

  try {
    const { result } = await linkPreview(url.trim());

    const previewNotFound = !result.success || !result.ogTitle;
    if (previewNotFound)
      return res.status(404).json({ message: "Preview not found" });

    const { ogType, ogTitle, ogLocale, ogImage, ogDescription } = result;
    res.status(200).json({
      data: {
        ogType,
        ogTitle,
        ogLocale,
        ogImageUrl: ogImage?.url,
        ogDescription,
      },
    });
  } catch (err) {
    next(httpErr(400, err));
  }
};

export default { getLinkPreview };
