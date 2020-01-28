import bgOne from "../images/blog.jpg";
import bgTwo from "../images/blog2.jpg";
import bgThree from "../images/blog3.jpg";

const getRandomBG = () => {
  const bgs = [bgOne, bgTwo, bgThree];
  const random = Math.floor(Math.random() * bgs.length);
  return bgs[random];
};

export default getRandomBG;