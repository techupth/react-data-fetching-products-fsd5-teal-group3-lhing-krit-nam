import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
function App() {
  // useState เพื่อแสดงผลจากกการดึงข้อมูล
  const [productList, setProductList] = useState([]);
  // asynchronus function ดึงข้อมูลจาก server
  const getProductList = async () => {
    const result = await axios.get("http://localhost:4001/products");
    //console.log(result); //เอาไว้ใช้สำหรับดูข้อมูลว่าแสดงผลมั้ย
    setProductList(result.data.data);
  };
  // Execute function getProductList
  useEffect(() => {
    getProductList();
  }, []);
  // asynchronus function ลบข้อมูลจาก server
  const deleteProductList = async (index) => {
    await axios.delete(`http://localhost:4001/products/${index}`);
    const result = await axios.get("http://localhost:4001/products");
    setProductList(result.data.data);
  };

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {productList.map((product, index) => {
          return (
            <div className="product" key={index}>
              <div className="product-preview">
                <img
                  src={product.image}
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

              <button
                className="delete-button"
                onClick={() => {
                  deleteProductList(product.id);
                }}
              >
                x
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
