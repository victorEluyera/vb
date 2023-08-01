import axios from "axios";
import React, { useEffect, useState } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";
import { water } from "../assets";
import CartItem from "../components/CartItem";
function Cart() {
  const productData = useSelector((state) => state.vb.productData);
  const userInfo = useSelector((state) => state.vb.userInfo);
  const [totalAmt, setTotalAmt] = useState("");
  const [payNow, setPayNow] = useState(false);
  const handleCheckout = () => {
    if (userInfo) {
      setPayNow(true);
    } else {
      toast.error("Please Sign In to Checkout");
    }
  };

  const payment = async (token) => {
    await axios.post("http://localhost:8000/pay", {
      amount: totalAmt * 100,
      token: token,
    });
  };

  useEffect(() => {
    let price = 0;
    productData.map((item) => {
      price += item.price * item.quantity;
      return price;
    });
    setTotalAmt(price.toFixed(2));
  }, [productData]);

  return (
    <div>
      <img className="w-full h-60 object-cover" src={water} alt="cartImg" />
      {productData.length === 0 ? (
        <div className="text-center mt-8 pb-7 text-green-400 text-xl ">
          <p>
            Your Cart is Empty.Please go back to Shopping and add products to
            Cart.
          </p>
          <div className="flex items-center justify-center mb-4">
            <Link to="/">
              <button className="mt-8 ml-7 flex items-center gap-1 text-gray-400 hover:text-green-400 duration-300">
                <span>
                  <HiOutlineArrowLeft />
                </span>
                go shopping
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="max-w-screen-xl mx-auto py-20 flex">
          <CartItem />
          <div className="w-1/3 bg-[#fafafa] py-6 px-4">
            <div className="flex flex-col gap-6 border-b-[1px] border-b-gray-400 pb-6">
              <h2 className="text-2xl font-medium">Cart totals</h2>
              <p className="flex items-center gap-4 text-base">
                Subtotal{" "}
                <span className="font-titleFont font-bold text-lg">
                  ${totalAmt}
                </span>
              </p>
              <p className="flex items-start gap-4 text-base">
                Shipping{" "}
                <span>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. A
                  eaque nihil quae aut asperiores eveniet vero deserunt
                  laudantium animi impedit? Tempore, debitis! Necessitatibus
                  culpa quibusdam, distinctio atque pariatur illo iure.
                </span>
              </p>
            </div>
            <p className="font-titleFont font-semibold flex justify-between mt-6">
              Total <span className="text-xl font-bold">${totalAmt}</span>
            </p>
            <button
              onClick={handleCheckout}
              className="text-base bg-green-400 text-white w-full py-3 mt-6 hover:bg-green-500 duration-300"
            >
              proceed to checkout{" "}
            </button>
            {payNow && (
              <div className="w-full mt-6 flex items-center justify-center">
                <StripeCheckout
                  stripeKey="pk_test_51NJv80FHu4vi0zGhkmWEfhntSAz7j1OeTj6DrjS1GuEqfAdiJQe3IOq4lyIPfJHo1Y2g6s0c4Ljtn1AMADNxK0Sm00DspHJCPA"
                  name="vb Online Shopping"
                  amount={totalAmt * 100}
                  label="Pay to vb"
                  description={`Your Payment amount is $${totalAmt}`}
                  token={payment}
                  email={userInfo.email}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
