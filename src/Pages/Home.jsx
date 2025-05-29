import Navbar from "../components/Navbar.jsx";
import Crausel from "../components/Crausel/Crausel.jsx"
import DateNight from "../components/DateNight.jsx";
import Category from "../components/Category.jsx";
import NewProducts from "../components/NewProducts.jsx";
import Testimonial from "../components/Testimonial.jsx";
import Blog from "../components/Blog.jsx";
import Footer from "../components/Footer.jsx";

function Home() {
  return (
    <>
      <Crausel />
      <DateNight />
      <Category />
      <NewProducts />
      <Testimonial />
      <Blog />
      </>
  );
}

export default Home;
