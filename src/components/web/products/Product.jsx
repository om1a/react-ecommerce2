import axios from "axios";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/Cart.jsx";


export default function Product() {
  const { productId } = useParams();

  const {addToCartContext} = useContext(CartContext);

  const getproduct = async () => {
    const { data } = await axios.get(
      `https://ecommerce-node4.vercel.app/products/${productId}`);

    return data.product;
  };
  const { data, isLoading } = useQuery(
    "product",
    getproduct
  );
  const addToCart= async (productId)=>{
    const res = await addToCartContext(productId);
    console.log(res)
  }
  if (isLoading) {
    return <p>Loading....</p>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
            {data.subImages.map((img,index)=>
            <React.Fragment key={index}>
            <img src={img.secure_url} alt="clothes" />
            </React.Fragment>
            )}
        </div>
        <div className="col-lg-6 ps-5">
                <h2>{data.name}</h2>
                <p>{data.price}</p>
                <button className="btn btn-outline-info" onClick={()=>addToCart(data._id)}>Add To Cart</button>
        </div>
      </div>
    </div>
  );
}
