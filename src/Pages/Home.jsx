import Navbar from "../components/Navbar.jsx";
import Crausel from "../components/Crausel/Crausel.jsx"
import DateNight from "../components/DateNight.jsx";
import Category from "../components/Category.jsx";
import NewProducts from "../components/NewProducts.jsx";
import Testimonial from "../components/Testimonial.jsx";
import Blog from "../components/Blog.jsx";
import Footer from "../components/Footer.jsx";
import CategoryCarousel from "../components/CategoryCrausel.jsx";
import ModelCatalog from "../components/ModelCatelog.jsx";
import OurStory from "../components/OurStory.jsx";
import AnimatedHeading from "../UI/AnimatedHeading.jsx";

function Home() {
  return (
    <>
      <Crausel />
      <AnimatedHeading heading="Womens" subheading="Empowering styles for modern women" />
      <CategoryCarousel />
      <AnimatedHeading heading="Mens" subheading="Bold design for modern men" />
      <CategoryCarousel />
      <DateNight />
      <Category />
      <AnimatedHeading heading="Happy Coustomers" subheading=" " />
      <ModelCatalog />
      <NewProducts />
      <Testimonial />
      <Blog />
      <OurStory />
      </>
  );
}

export default Home;
