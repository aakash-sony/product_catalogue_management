import React, { useState } from 'react';
import ProductService from '../service/product.service'
const AddProduct = () => {

    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        quantity: "",
        status: ""
    });

    const [msg, setMessage] = useState("");

    const handleChange = (e) => {
        const value = e.target.value;
        setProduct({ ...product, [e.target.name]: value });
    }


    const productRegister = (e) => {
        e.preventDefault();
        ProductService.saveProduct(product).then((res) => {
            setMessage("Product Added Successfully..")
            setProduct({
                name: "",
                description: "",
                price: "",
                quantity: "",
                status: ""
            })
        }).catch((error) => {
            console.log(error);
        })
    }
    return (
        <>
            <div className="container mt-3">
                <div className='row'>
                    <div className='col-md-6  mx-auto'>
                        <div className='card mt-1'>
                            <div className='card-header fs-3 text-center'>Add Product</div>
                            {
                                msg &&
                                <p className='fs-4 text-center text-success'>{msg}</p>
                            }
                            <div className='card-body'>
                                <form onSubmit={(e) => { productRegister(e) }}>
                                    <div className='mb-2'>
                                        <label><h5>Enter Product Name</h5></label>
                                        <input type='text' name="name" className='form-control' required
                                            onChange={(e) => handleChange(e)}
                                            value={product.name}
                                        />
                                    </div>

                                    <div className='mb-2'>
                                        <label><h5>Enter Product Price</h5></label>
                                        <input type='number' name="price" className='form-control' required
                                            onChange={(e) => handleChange(e)}
                                            value={product.price}
                                        />
                                    </div>
                                    <div className='mb-2'>
                                        <label><h5>Enter Product Quantity</h5></label>
                                        <input type='number' name="quantity" className='form-control' required
                                            onChange={(e) => handleChange(e)}
                                            value={product.quantity}
                                        />
                                    </div>
                                    <div className='mb-2'>
                                        <label><h5>Enter Product Description</h5></label>
                                        <textarea name="description" className='form-control' required
                                            onChange={(e) => handleChange(e)}
                                            value={product.description}
                                        ></textarea>
                                    </div>
                                    <div className='mb-2'>
                                        <label><h5>Select Product Status</h5></label>
                                        <select name="status" className='form-control' required
                                            value={product.status}
                                            onChange={(e) => handleChange(e)}>

                                            <option value="">Select Status...</option>
                                            <option value="Available">Available</option>
                                            <option value="Not Available">Not Available</option>
                                        </select>
                                    </div>
                                    <button type="submit" className='btn btn-primary w-100 mt-1'>Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddProduct;