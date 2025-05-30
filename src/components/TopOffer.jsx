import React from "react";

const TopOfferBar = () => {
  return (
    <div className="fixed top-0 left-0 w-full bg-black text-white text-xs sm:text-sm text-center py-2 z-30 px-2">
      <p className="truncate">
        🎁 Free Shipping on Orders Over ₹999 – Shop Now!
      </p>
    </div>
  );
};

export default TopOfferBar;
