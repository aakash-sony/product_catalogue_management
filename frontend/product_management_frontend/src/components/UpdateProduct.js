import React, { useState } from 'react'
import ProductService from '../service/product.service';
import { useNavigate, useParams } from 'react-router-dom';
const UpdateProduct = () => {
    const [product, setProduct] = useState({
        id: "",
        name: "",
        description: "",
        price: "",
        quantity: "",
        status: ""
    });

    const { id } = useParams();
    const navigate = useNavigate();
    const [msg, setMessage] = useState("");

    useState(() => {
        ProductService.getProductById(id).then((res) => {
            setProduct(res.data.data);
        }).catch((error) => {
            console.log(error);
        })
    }, [])

    const handleChange = (e) => {
        const value = e.target.value;
        setProduct({ ...product, [e.target.name]: value });
    }


    const productUpdate = (e) => {
        e.preventDefault();
        ProductService.updateProduct(product, id).then((res) => {
            navigate("/");
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
                            <div className='card-header fs-3 text-center'>Edit Product</div>
                            {
                                msg &&
                                <p className='fs-4 text-center text-success'>{msg}</p>
                            }
                            <div className='card-body'>
                                <form onSubmit={(e) => { productUpdate(e) }}>
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
                                        <select name="status" className='form-control' required onChange={(e) => handleChange(e)}
                                            value={product.status}>


                                            <option value="Available">Available</option>
                                            <option value="Not Available">Not Available</option>
                                        </select>
                                    </div>
                                    <button type="submit" className='btn btn-primary w-100 mt-1'>Update</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateProduct
