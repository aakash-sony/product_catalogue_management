import { Routes, Route } from 'react-router-dom'
import Navbar from "./components/Navbar";
import AddProduct from "./components/AddProduct";
import Home from './components/Home';
import UpdateProduct from './components/UpdateProduct';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/updateProduct/:id" element={<UpdateProduct />} />
      </Routes>
    </div>
  );
}

export default App;
