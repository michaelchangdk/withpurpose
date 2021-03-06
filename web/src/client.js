import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2022-05-12",
  // use true if you want cached versions, false for faster real-time
  useCdn: true,
  token: process.env.REACT_APP_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
