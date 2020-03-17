export const getErrorMessage = responseObject => {
  console.log(responseObject);

  if (responseObject.data.body.name === "MongoError") {
    if (responseObject.data.body.code === 11000) {
      const duplicateKey = Object.keys(responseObject.data.body.keyValue);
      return `${duplicateKey.toString().toUpperCase()} is already in use`;
    }
  }

  if (responseObject.data.body.name === "ValidationError") {
    console.log("check");
    if ("email.value" in responseObject.data.body.errors) return "Invalid email";
  }
};
