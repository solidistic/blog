export default (name, host, port) => {
  return `http://${host}:${port}/images/${name}`;
};
