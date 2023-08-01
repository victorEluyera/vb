import React, { useEffect, useState } from "react";
import { MdOutlineStar } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { addToCart } from "../redux/vbSlice";

const Product = () => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  let [quantity, setQuantity] = useState(1);
  const location = useLocation();
  const item = location.state.product;
  useEffect(() => {
    setProduct(item);
  }, [item]);
  return (
    <div>
      <div className="max-w-screen-xl mx-auto my-10 flex gap-10">
        <div className="w-2/5 relative">
          <img
            className="w-full h-[550px] object-cover"
            src={product.image}
            alt="productImage"
          />
          <div className="absolute top-4 right-0">
            {product.isNew && (
              <p className="bg-green-400  text-white font-semibold font-titleFont px-8 py-1">
                Sale
              </p>
            )}
          </div>
        </div>
        <div className="w-3/5 flex flex-col justify-center gap-12">
          <div>
            <h2 className="text-4xl font-semibold">{product.title}</h2>
            <div className="flex items-center gap-4 mt-3">
              <p className="line-through text-green-400">${product.oldPrice}</p>
              <p className="font-semibold text-green-600">
                ${product.price}
              </p>{" "}
            </div>
          </div>
          <div className="flex items-center gap-2 text-base">
            <div className="flex">
              <MdOutlineStar />
              <MdOutlineStar />
              <MdOutlineStar />
              <MdOutlineStar />
              <MdOutlineStar />
            </div>
            <p className="text-xs text-gray-500">(1 Customer review)</p>
          </div>
          <p className="text-base text-green-400 -mt-3">
            {product.description}
          </p>
          <div className="flex gap-4">
            <div className="w-25 flex items-center justify-between text-green-400 gap-4 border p-3">
              <p className="text-sm">Quatity</p>
              <div className="flex items-center gap-4 text-sm font-semibold">
                <button
                  onClick={() =>
                    setQuantity(quantity === 1 ? (quantity = 1) : quantity - 1)
                  }
                  className="border h-5 font-normal text-lg flex items-center justify-center px-3 hover:bg-green-500 hover:text-white cursor-pointer duration-300 active:bg-green-300"
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="border h-5 font-normal text-lg flex items-center justify-center px-3 hover:bg-green-500 hover:text-white cursor-pointer duration-300 active:bg-green-300"
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={() =>
                dispatch(
                  addToCart({
                    _id: product._id,
                    title: product.title,
                    image: product.image,
                    price: product.price,
                    quantity: quantity,
                    description: product.description,
                  })
                ) & toast.success(`${product.title} is added`)
              }
              className="bg-green-400 text-white py-3 px-6 active:bg-green-800"
            >
              add to cart
            </button>
          </div>
          <p className="text-base text-green-400">
            Category:{" "}
            <span className="font-medium capitalize">{product.category}</span>
          </p>
        </div>
      </div>
      <ToastContainer
        position="top-left"
        ausoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Product;
