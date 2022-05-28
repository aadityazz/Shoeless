import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
  projectId: '2ixk3vx6',
  dataset: 'shoeless',
  apiVersion: '2022-03-10',
  useCdn: true,
  token: 'skIotKK6PJ8AKSe0rv5cte2rlhp0EqZQ8FHrluejKCIqix1mPaJncMsFX5Txca9hYsxOJQReUFx9Hdx7NSZmlGC8zq6XIFuaiq4flcJkNrz0FQW3zmc6Wc8QR10Ol6SmShjQceNA3K5WivMgktzB5rq1UT2NxwAdUxwbM7wIrkW1yFj7GeoQ'

  // token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);