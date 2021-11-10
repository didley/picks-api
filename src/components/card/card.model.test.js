import { pickIsMissingUserTitle } from "./card.model";

const pick = {
  withPreview: {
    url: "https://mocklink.com",
    nsfw: true,
    preview: {
      ogType: "music.playlist",
      ogTitle: "Daily Mix 3",
      ogLocale: "en",
      ogImageUrl: "https://image.link",
      ogDescription: "Spotify · Playlist · 50 songs",
    },
  },
  withTitle: {
    url: "https://mocklink.com",
    nsfw: false,
    userTitle: "wow",
  },
  emptyPreviewObj: {
    preview: {},
    url: "https://mocklink.com",
    nsfw: false,
  },
  undefinedPreview: {
    url: "https://mocklink.com",
    nsfw: false,
  },
  emptyTitle: {
    url: "https://mocklink.com",
    nsfw: false,
    userTitle: "",
  },
  whitespaceTitle: {
    url: "https://mocklink.com",
    nsfw: false,
    userTitle: "    ",
  },
};

describe("pickIsMissingUserTitle fn", () => {
  it("should return false if has preview or userTitle", () => {
    expect(pickIsMissingUserTitle([pick.withPreview])).toBe(false);
    expect(pickIsMissingUserTitle([pick.withTitle])).toBe(false);
  });

  it("should return true if no preview and no userTitle in a pick", async () => {
    expect(pickIsMissingUserTitle([pick.undefinedPreview])).toBe(true);
    expect(pickIsMissingUserTitle([pick.emptyPreviewObj])).toBe(true);
    expect(pickIsMissingUserTitle([pick.emptyTitle])).toBe(true);
    expect(pickIsMissingUserTitle([pick.whitespaceTitle])).toBe(true);

    const mongooseThisPicks = [
      {
        preview: {
          ogImageUlr:
            "https://dailymix-images.scdn.co/v2/img/ab6761610000e5eba9ef26e76b058ee97761bc94/3/en/large0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
          ogTitle: "Daily Mix 3",
          ogDescription: "Spotify · Playlist · 50 songs",
          ogType: "music.playlist",
          ogLocale: "en",
        },
        nsfw: true,
        _id: "614dc1fb436e74a0532e2a41",
        url: "https://open.spotify.com/playlist/37i9dQZF1E35OwayXmGS05?si=571d020f03104b18",
        createdAt: "2021-09-24T12:18:03.921Z",
        updatedAt: "2021-09-24T12:18:03.921Z",
      },
      {
        nsfw: false,
        _id: "614dc1fb436e74a0532e2a42",
        userTitle: "a funny tweet",
        url: "https://twitter.com/kettanaito/status/1429032074699235328?s=20",
        createdAt: "2021-09-24T12:18:03.921Z",
        updatedAt: "2021-09-24T12:18:03.921Z",
      },
      {
        nsfw: false,
        _id: "614dc1fb436e74a0532e2a43",
        url: "https://www.abc.net.au/news/2021-08-26/nsw-eases-some-covid-restrictions-for-fully-vaccinated-people/100408546",
        createdAt: "2021-09-24T12:18:03.921Z",
        updatedAt: "2021-09-24T12:18:03.921Z",
      },
    ];

    expect(pickIsMissingUserTitle(mongooseThisPicks)).toBe(true);
  });
});
