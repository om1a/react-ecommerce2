import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Cart() {
  const [cartData, setCartData] = useState(null);

  useEffect(() => {
    const token = "Tariq__" + localStorage.getItem('userToken');
    if (!token) {
      console.log("No token found");
      return;
    }

    const url = 'https://ecommerce-node4.vercel.app/cart';
    const config = {
      headers: { 'Authorization': token }
    };

    axios.get(url, config)
      .then(response => {
        setCartData(response.data);
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  if (!cartData) {
    return ;
  }

  return (
    <div>
      <p className='text-danger m-2'>Cart Count: {cartData.count}</p>
    </div>
  );
}

export default Cart;
