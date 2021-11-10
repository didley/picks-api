import ogs from "open-graph-scraper";

export const linkPreview = async (url, opts) => await ogs({ url, ...opts });
