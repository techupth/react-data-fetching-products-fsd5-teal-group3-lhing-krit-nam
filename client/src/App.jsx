import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  // 3. สร้าง state เพื่อรับการอัพเดทข้อมูลจาก server
  const [dataProduct, setDataProduct] = useState([]);

  // 4. สร้าง function ปุ่ม delete
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:4001/products/${id}`);
    getProductData();
  };

  // async function deleteProduct() {
  //   const responseDel = await axios.delete(`"http://localhost:4001/products/${id}"`);
  //   setDataProduct(responseDel.data.data);
  // }

  // 2. สร้าง useEffect เพื่อexecute การดึงข้อมูลจาก server ไปอัพเดทใน useState
  useEffect(() => {
    getProductData();
  }, []);

  // 1. ใช้ axios ในการดึงข้อมูลจาก server
  const getProductData = async () => {
    const response = await axios.get("http://localhost:4001/products");
    setDataProduct(response.data.data);
    console.log(response);
  };

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      {dataProduct.map((item, index) => {
        return (
          <div className="product-list" key={index}>
            <div className="product">
              <div className="product-preview">
                <img
                  src={item.image}
                  alt="some product"
                  width="350"
                  height="350"
                />
              </div>
              <div className="product-detail">
                <h1>Product name: {item.name}</h1>
                <h2>Product price: {item.price} Baht</h2>
                <p>Product description: {item.description}</p>
              </div>

              <button
                className="delete-button"
                onClick={() => {
                  handleDelete(item.id);
                }}
              >
                x
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
