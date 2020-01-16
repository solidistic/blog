export default (posts, text) => {
  return posts.filter(post => {
    return post.title.toLowerCase().includes(text.toLowerCase());
  });
};
