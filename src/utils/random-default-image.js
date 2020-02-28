import imageOne from "../images/blog.jpg";
import imageTwo from "../images/blog2.jpg";
import imageThree from "../images/blog3.jpg";

const getRandomDefaultImage = () => {
  const images = [imageOne, imageTwo, imageThree];
  const random = Math.floor(Math.random() * images.length);
  return images[random];
};

export default getRandomDefaultImage;