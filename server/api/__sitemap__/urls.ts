export default defineSitemapEventHandler(async () => {
  const posts = await useDrizzle()
    .select({
      id: tables.posts.id,
    })
    .from(tables.posts);

  const urls = posts.map((post) => {
    return `/posts/${post.id}`;
  });

  return urls;
});
