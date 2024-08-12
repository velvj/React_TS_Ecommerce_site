import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

type ProductState = {
  id: number;
  productName: string;
  category: string;
  price: number;
  qty: number;
  imageFileName: string;
  Action: string;
  isError: boolean;
  isButtonDisabled: boolean;
  createdAt: number;
};

type ProductList = {
  listData: ProductState[];
  errors: { [key: string]: string };
};

const initialState: ProductList = {
  listData: [
    {
      id: 0,
      productName: "",
      category: "",
      price: 0,
      qty: 0,
      imageFileName: "",
      Action: "",
      isError: false,
      isButtonDisabled: false,
      createdAt: Date.now(),
    },
  ],
  errors: {},
};

const Products = () => {
  const [productData, setProductData] = useState<ProductList>(initialState);

  const handleQty = (type:string, id:number) => {
    setProductData((prevState) => ({
      ...prevState,
      listData: prevState.listData.map((product) => {
        if (type === 'increment' && product.id === id) {
          return { ...product, qty: product.qty + 1 };
        } else if (type === 'decrement' && product.id === id && product.qty > 0) {
          return { ...product, qty: product.qty - 1 };
        } else {
          return product;
        }
      }),
    }));
  };



  const getProducts = async()=>{
   try{ const response =await  axios.get<ProductState[]>('http://localhost:4000/products?_sort=id&_order=desc')
    // console.log('response',response.data)
    setProductData({...productData,listData:response.data})
   }
   catch(err){
    console.log("API Fetch Err:",err)
    throw err;
   }
  }

  useEffect(()=>{getProducts()},[])
  console.log(">>>product data>>>",productData.listData)



  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Products</h2>
      <div className="row mb-3">
        <div className="col">
          <Link className="btn btn-primary me-1" to="*" role="button">
            Create Product
          </Link>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={getProducts}
          >
            {" "}
            Refresh
          </button>
        </div>
        <div className="col"></div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>id</th>
            <th>productName</th>
            <th>category</th>
            <th>price</th>
            <th>qty</th>
            <th>image</th>
            <th>createdAt</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{productData?.listData?.map((val,index)=>{
            let type:string;
            return (
                <tr key={index}>
                    <th>{val.id}</th>
                    <th>{val.productName}</th>
                    <th>{val.category}</th>
                    <th>{val.price}</th>
                    <th>{val.qty}</th>
                    <th><img src={'http://localhost:4000/images/'+val.imageFileName} width='100' alt="..."/></th>
                    <th>{val.createdAt}</th>
                    <td style={{width:'10px' ,whiteSpace:'nowrap'}}>
                        <div>
                        {val.qty === 0 ? (
                  <button
                    type="button"
                    className="btn btn-primary btn-sm me-1"
                    onClick={() => handleQty(type='increment',val.id)}
                  >
                    Add
                  </button>
                ) : (
                  <div>
                    <button  className="btn btn-outline-secondary btn-sm ms-1" onClick={() => handleQty(type='decrement',val.id)}>-</button>
                    <span>{val.qty}</span>
                    <button className="btn btn-outline-secondary btn-sm me-1" onClick={() => handleQty(type='increment',val.id)}>+</button>
                  </div>
                )}
                        </div>
                        <Link className="btn btn-primary btn-sm me-1" to={'*'}>Edit</Link>
                        <button type="button" className="btn btn-danger btn -sm">Delete</button>
                    </td>
                    <th>{val.Action}</th>
                 
                </tr>
            )
        })}</tbody>
      </table>
    </div>
  );
};

export { Products };
