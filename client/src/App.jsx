import "./App.css";
import axios from "axios";
import {useState, useEffect } from "react";


function App() {
  const [productDetail, setProductDetail] = useState([]);

  const getProductDetail = async () => {
    const result = await axios.get("http://localhost:4001/products");
    setProductDetail(result.data.data);
    console.log(result);
  }

  useEffect(() => {
    getProductDetail();
  }, []);

  const deletePost = async (value) => {
    await axios.delete(`
      http://localhost:4001/products/${value}
    `);
    getProductDetail();
  }

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
      {productDetail.map((product) => {
            return (
                <div className="product" key={product.id}>
                  <div className="product-preview">
                    <img
                      src="https://via.placeholder.com/350/350"
                      alt="some product"
                      width="350"
                      height="350"
                    />
                  </div>
                    <div className="product-detail">
                      <h1>Product name: {product.name}</h1>
                      <h2>Product price: {product.price} Baht</h2>
                      <p>Product description: {product.description}</p>
                    </div>
                  <button className="delete-button" onClick={() => {deletePost(product.id)}}>x</button>
                </div>
                    );
            })
        }
      </div>
    </div>
  );
}

export default App;
