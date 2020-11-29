let randomId = 0;

export const users = [
  {
    username: "geoffrich_",
    displayname: "Geoff",
    profileSrc: "/images/profile1.jpg",
    images: makeImages(3)
  },
  {
    username: "SvelteSociety",
    displayname: "Svelte Society",
    profileSrc: "/images/profile3.jpg",
    images: makeImages(1)
  },
  {
    username: "argyleink",
    displayname: "Adam Argyle",
    profileSrc: "/images/profile2.jpg",
    images: makeImages(2)
  }
]

function makeImages(count) {
  return [...Array(count)].map(_ => ({
    src: `https://picsum.photos/480/840?random=${randomId++}`,
    isSeen: false
  }));
}