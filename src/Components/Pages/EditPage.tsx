import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {AxiosInstance} from "../Services/AxiosInstance";

type ProductState = {
    productName: string;
    category: string;
    price: number;
    qty: number;
    imageFileName?: string;
    createdAt?: number;
};

const EditProduct:React.FC = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [initialData, setInitialData] = useState<ProductState>();

    useEffect(()=>{getProduct()}, []);


    const getProduct =async () => {
        try{
            const response=await   AxiosInstance.get<ProductState>(`${params.id}`)
            setInitialData(response.data)
        }catch(err){

        }
    
        // fetch('http://localhost:4000/products/' + params.id)
        //     .then(response => {
        //         if (response.ok) {
        //             return response.json();
        //         }
        //         throw new Error();
        //     }).then((data) => {
        //         setInitialData(data);
        //     }).catch((error) => {
        //         alert('Unable to read the product data');
        //     });
    };


    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log("event data>>", event.currentTarget);
        const formData = new FormData(event.currentTarget);
        console.log("formData>>", formData);

        const product = Object.fromEntries(formData.entries());
        console.log("product>>", product);

        const imageFile = formData.get('imageFileName') as File | null;
        
        console.log('img file',imageFile?.name)
        if (imageFile && imageFile.size > 0) {
            product.imageFileName = imageFile.name || '';  
        } else {
            product.imageFileName = initialData?.imageFileName || ''; 
        }
        

        try {
            const response = await fetch('http://localhost:4000/products/' + params.id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(product),
            });
            const data = await response.json();
            console.log("data>>", data);
            if (response.ok) {
                navigate('/products');
            } else if (response.status === 400) {
                alert('Validation error');
            } else {
                alert('Unable to update the product');
            }

        } catch (error) {
            console.log("Error:", error);
        }
    }

    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-md-8 mx-auto rounded border p-4">
                    <h2 className="text-center mb-5">Edit Product</h2>

                    <div className="row mb-3">
                        <label className="col-sm-4 col-form-label">ID</label>
                        <div className="col-sm-8">
                            <input readOnly className="form-control-plaintext" defaultValue={params.id} />
                        </div>
                    </div>

                    {initialData && (
                        <form onSubmit={handleSubmit}>
                            <div className="row mb-3">
                                <label className="col-sm-4 col-form-label">Product Name</label>
                                <div className="col-sm-8">
                                    <input className="form-control" name="productName" defaultValue={initialData.productName} />
                                    <span className="text-danger"></span>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label className="col-sm-4 col-form-label">Category</label>
                                <div className="col-sm-8">
                                    <select className="form-select" name="category" defaultValue={initialData.category}>
                                        <option value="other">Other</option>
                                        <option value="Phone">Phone</option>
                                        <option value="Computer">Computer</option>
                                        <option value="Accessories">Accessories</option>
                                        <option value="Printers">Printers</option>
                                        <option value="Cameras">Cameras</option>
                                    </select>
                                    <span className="text-danger"></span>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label className="col-sm-4 col-form-label">Price</label>
                                <div className="col-sm-8">
                                    <input className="form-control" name="price" step="0.01" min="1" defaultValue={initialData.price} />
                                    <span className="text-danger"></span>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label className="col-sm-4 col-form-label">Quantity</label>
                                <div className="col-sm-8">
                                    <input className="form-control" name="qty" defaultValue={initialData.qty} />
                                    <span className="text-danger"></span>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="offset-sm-4 col-sm-8">
                                    <img src={"http://localhost:4000/images/" + initialData.imageFileName} alt="Product" width="150" />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label className="col-sm-4 col-form-label">Image</label>
                                <div className="col-sm-8">
                                    <input className="form-control" name="imageFileName" type="file" />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label className="col-sm-4 col-form-label">Created At</label>
                                <div className="col-sm-8">
                                    <input readOnly className="form-control-plaintext" defaultValue={initialData.createdAt?.toString()} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="offset-sm-4 col-sm-4 d-grid">
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                                <div className="col-sm-4 d-grid">
                                    <Link className="btn btn-secondary" to="/products" role="button">Cancel</Link>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditProduct;
