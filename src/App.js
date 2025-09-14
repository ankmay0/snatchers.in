import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Shop from "./Pages/Shop";
import Home from "./Pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Mens from "./Pages/Mens";
import Womens from "./Pages/Womens";
import About from "./Pages/About";
import ProductDialog from "./UI/ProductDialog";
import CategoryShop from "./Pages/CategoryShop";
import ProfilePage from "./Pages/ProfilePage";
import TopOfferBar from "./components/TopOffer";
import Login from "./Pages/Login";
import AddProduct from "./Admin/AddProduct";
import Wishlist from "./Pages/Wishlist";
import { CartProvider } from './contexts/CartContext';
import Cart from "./Pages/Cart";
import BuyNowComponent from "./components/BuyNowComponent";
import Contact from "./Pages/Contact";
import Blog from "./components/Blog";
import Blog1 from "./Pages/Blog1";
import Blog2 from "./Pages/Blog2";
import Blog3 from "./Pages/Blog3";


function App() {
  return (

    <>
      <CartProvider>
        <TopOfferBar />
        <Navbar />

        <main className="pt-36 lg:pt-19">
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/mens" element={<Mens />} />
              <Route path="/womens" element={<Womens />} />
              <Route path="/about" element={<About />} />
              <Route path="/product/:productId" element={<ProductDialog />} />
              <Route path="/category-shop" element={<CategoryShop />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/buy-now/:productId" element={<BuyNowComponent />} />
              {/* Changes */}
              <Route path="/contact" element={<Contact />} /> {/* New Route */}
              <Route path="/" element={<Blog />} /> {/* New Route */}
               <Route path="/blog1" element={<Blog1 />} />
        <Route path="/blog2" element={<Blog2 />} />
        <Route path="/blog3" element={<Blog3 />} />
              
            </Routes>
          </Router>
        </main>
        <Footer />
      </CartProvider>
    </>

  );
}

export default App;
