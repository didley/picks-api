import { truncStr } from "./truncateString";
import { isEmptyObj } from "./isEmptyObj";

export const truncatePicksWithinCard = (card) => {
  const truncatedPicks = card?.picks.map((pick) => {
    if (isEmptyObj(pick.preview)) return pick;

    let { ogImageUrl, ogTitle, ogDescription, ogType, ogLocale } =
      pick.preview || {};

    ogImageUrl = truncStr(ogImageUrl, 250);
    ogTitle = truncStr(ogTitle, 200, { ellipsis: true });
    ogDescription = truncStr(ogDescription, 200, { ellipsis: true });
    ogType = truncStr(ogType, 120);
    ogLocale = truncStr(ogLocale, 10);

    const truncatedPreview = {
      ogImageUrl,
      ogTitle,
      ogDescription,
      ogType,
      ogLocale,
    };

    return { ...pick, preview: truncatedPreview };
  });

  const truncatedCard = { ...card, picks: truncatedPicks };

  return truncatedCard;
};
