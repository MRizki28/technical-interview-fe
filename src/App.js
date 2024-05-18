import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';


function App() {
  const [product, setProduct] = useState([])
  const [productClick, setProductClick] = useState("")
  const [productSubmit, setProductSubmit] = useState("");

  const getProduct = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/products')
      const responseData = response.data.products
      const results = responseData.map(data => ({
        value: data.title,
        label: data.title
      }))

      setProduct(results.sort((a, b) => a.value.localeCompare(b.label)));
    } catch (error) {
      console.log(error);
    };
  }

  useEffect(() => {
    getProduct()
  }, [])


  const handleSubmit = () => {
    setProductSubmit(productClick)
  }

  const handleChange = (selected) => {
    setProductClick(selected.value)
  }

  return (
    <div className="App" style={{ padding: "30px", textAlign: "center" }}>
      <Select options={product} onChange={handleChange} />
      <button type='button' style={{ marginTop: "15px" }} disabled={!productClick} onClick={handleSubmit}>Show Value</button>
      <h2>{productSubmit}</h2>
    </div>
  );
}

export default App;
