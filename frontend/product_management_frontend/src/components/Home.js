import React, { useEffect, useState } from 'react';
import productService from '../service/product.service';
import { Link } from 'react-router-dom';

const Home = () => {
    const [productList, setProductList] = useState([])
    const [msg, setMessage] = useState("");
    useEffect(() => {
        init();
    }, [])

    const init = () => {
        productService.getAllProducts().then((res) => {
            setProductList(res.data.data);
            console.log(res.data)
        }).catch((error) => {
            console.log(error);
        })
    }
    const deleteHandler = (id) => {
        productService.deleteProduct(id).then((res) => {
            setMessage("Product deleted successfully")
            init();
        }).catch((error) => {
            console.log(error)
        })
    }
    return (
        <div className="container mt-3">
            <div className='row'>
                <div className='col-md-12'>
                    <div className='card'>
                        <div className='card-header fs-3 text-center'>All Products List
                            {
                                msg &&
                                <p className='fs-4 text-center text-success'>{msg}</p>
                            }
                        </div>
                        <div className='card-body text-center'>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Sr. No</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        productList.map((p, num) => (
                                            <tr key={p.id}>
                                                <td>{num + 1}</td>
                                                <td>{p.name}</td>
                                                <td>{p.description}</td>
                                                <td>{p.price}</td>
                                                <td>{p.quantity}</td>
                                                <td>{p.status}</td>
                                                <td>
                                                    <Link to={"updateProduct/" + p.id} className='btn btn-sm btn-primary'>Edit</Link >
                                                    <button onClick={(e) => { deleteHandler(p.id) }} className='btn btn-sm btn-danger ms-1'>Delete</button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Home;