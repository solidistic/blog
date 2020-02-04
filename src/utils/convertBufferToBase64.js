export default buffer => {
  return `data:${buffer.contentType};base64,${Buffer.from(buffer.data).toString(
    "base64"
  )}`;
};
