import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [updateId, setUpdateId] = useState(null);

  // const apiUrl = "https://localhost:7076/api/Product";
    const apiUrl = "https://amar-api-test.azurewebsites.net/api/Product";

  // Fetch products
  const fetchProducts = async () => {
    try {
      const response = await axios.get(apiUrl);
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add new product
  const addProduct = async () => {
    try {
      await axios.post(apiUrl, {
        name,
        price: parseFloat(price),
        quantity: parseInt(quantity),
      });
      fetchProducts();
      setName("");
      setPrice("");
      setQuantity("");
    } catch (error) {
      console.error(error);
    }
  };

  // Update product
  const updateProduct = async () => {
    try {
      await axios.put(`${apiUrl}/${updateId}`, {
        id: updateId,
        name,
        price: parseFloat(price),
        quantity: parseInt(quantity),
      });
      fetchProducts();
      setName("");
      setPrice("");
      setQuantity("");
      setUpdateId(null);
    } catch (error) {
      console.error(error);
    }
  };

  // Edit product (fill form)
  const editProduct = (product) => {
    setUpdateId(product.id);
    setName(product.name);
    setPrice(product.price);
    setQuantity(product.quantity);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Product List</h1>
      <div style={{ marginBottom: "15px" }}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginRight: "5px" }}
        />
        <input
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{ marginRight: "5px" }}
        />
        <input
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          style={{ marginRight: "5px" }}
        />
        {updateId ? (
          <button onClick={updateProduct}>Update Product</button>
        ) : (
          <button onClick={addProduct}>Add Product</button>
        )}
      </div>

      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - ${p.price} - Qty: {p.quantity}{" "}
            <button onClick={() => editProduct(p)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
