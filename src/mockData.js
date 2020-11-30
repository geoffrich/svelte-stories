export const users = [
  {
    username: "geoffrich_",
    displayname: "Geoff",
    profileSrc: "/images/profile1.jpg",
    images: makeImages([
      "/images/stories/1.jpg",
      "/images/stories/percy.jpg",
      "/images/stories/oliver.jpg",
    ])
  },
  {
    username: "SvelteSociety",
    displayname: "Svelte Society",
    profileSrc: "/images/profile3.jpg",
    images: makeImages(["/images/stories/2.jpg"])
  },
  {
    username: "argyleink",
    displayname: "Adam Argyle",
    profileSrc: "/images/profile2.jpg",
    images: makeImages([
      "/images/stories/3.jpg",
      "/images/stories/4.jpg"
    ])
  }
]

function makeImages(filenames) {
  return filenames.map(src => ({
    src,
    isSeen: false
  }));
}