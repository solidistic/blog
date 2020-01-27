export default (posts, text) => {
  return posts
    .filter(post => {
      return post.title.toLowerCase().includes(text.toLowerCase());
    })
    .sort((a, b) => {
      return a.createdAt < b.createdAt ? 1 : -1;
    });
};
