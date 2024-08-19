import React, { useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import {AxiosInstance} from "../Services/AxiosInstance";

// Define the shape of a form field
type CreateProductFields = {
  name: string;
  type: string;
  value: string | number;
  label: string;
  required: boolean;
  placeholder?: string;
};

type ProductState = {
  fields: CreateProductFields[];
  errors: { [key: string]: string };
};

type ProductAction =
  | {
      type: "SET_FIELD_NAME";
      fieldName: string;
      value: string;
    }
  | {
      type: "SET_ERROR";
      fieldName: string;
      error: string;
    }
  | {
      type: "CLEAR_ERROR";
      fieldName: string;
    }
  | {
      type: "RESET_FORM";
    };

const initialStateVal: ProductState = {
  fields: [
    {
      name: "productName",
      type: "text",
      label: "productName",
      required: true,
      value: "",
      placeholder: "Enter the Product Name",
    },
    {
      name: "category",
      type: "text",
      label: "category",
      required: true,
      value: "",
      placeholder: "Enter the category",
    },
    {
      name: "price",
      type: "text",
      label: "price",
      required: true,
      value: "",
      placeholder: "Enter the Price",
    },
    {
      name: "qty",
      type: "text",
      label: "qty",
      required: false,
      value: 0,
      //   placeholder: "Enter the QTY",
    },
    {
      name: "imageFileName",
      type: "text",
      label: "imageFileName",
      required: true,
      value: "",
      placeholder: "Enter the imageFileName",
    },
  ],
  errors: {},
};

const reducer = (state: ProductState, Action: ProductAction): ProductState => {
  switch (Action.type) {
    case "SET_FIELD_NAME":
      return {
        ...state,
        fields: state.fields.map((ele) =>
          ele.name === Action.fieldName ? { ...ele, value: Action.value } : ele
        ),
      };
    case "SET_ERROR":
      return {
        ...state,
        errors: { ...state.errors, [Action.fieldName]: Action.error },
      };
    case "CLEAR_ERROR":
      const { [Action.fieldName]: _, ...restErrors } = state.errors;
      return {
        ...state,
        errors: restErrors,
      };
    case "RESET_FORM":
      return {
        ...initialStateVal,
        fields: state.fields.map((field) => ({ ...field, value: "" })),
      };
  }
};

const CreateProductPage:React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialStateVal);
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    dispatch({ type: "SET_FIELD_NAME", fieldName: name, value: value });
    dispatch({ type: "CLEAR_ERROR", fieldName: name });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const product = Object.fromEntries(
      formData.entries()
    ) as unknown as ProductState;

    // Validate required fields
    // if (product.fields[0].name !== 'productName' || 'category' || 'price'||'qty'||'imageFileName') {
    //     alert('Please fill all the fields.');
    //     return;
    //   }

    // Check if imageFileName is of type File
    const imageFile = formData.get("imageFileName") as File | null;
    const finalData = {
      ...product,
      imageFileName: imageFile?.name,
      createdAt: Date.now(),
    };

    try {

     const response = await AxiosInstance.post<CreateProductFields[]>('',finalData)
      // const response = await fetch("http://localhost:4000/products", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(finalData),
      // });

      // const data: ProductState = await response.json();

      if (response.data) {
        // Product created successfully
        navigate("/products", { state: { newProduct: response.data } });
      } else if (response.status === 400) {
        alert("Validation error");
      } else {
        alert("Unable to create the product");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An unexpected error occurred");
    }

    dispatch({ type: "RESET_FORM" });
  };
  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-8 mx-auto rounded border p-4">
          <h2 className="text-center mb-5">Create Product</h2>
          <form onSubmit={handleSubmit}>
            {state.fields.map((field) => (
              <div>
                {field.name === "category" ? (
                  <div className="row mb-3">
                    <label className="col-sm-2 col-form-label"> category</label>
                    <div className="col-sm-10">
                      <select className="form-select" name="category">
                        <option value="other"> Other</option>
                        <option value="Phone"> Phone</option>
                        <option value="Computer"> Computer</option>
                        <option value="Accessories"> Accessories</option>
                        <option value="Printers"> Printers</option>
                        <option value="Cameras"> Cameras</option>
                      </select>
                      <span className="text-danger"></span>
                    </div>
                  </div>
                ) : field.name === "imageFileName" ? (
                  <div className="row mb-3">
                    <label className="col-sm-4 col-form-label"> images</label>
                    <div className="col-sm-8">
                      <input
                        className="form-control"
                        name="imageFileName"
                        type="file"
                      />
                      <span className="text-danger"></span>
                    </div>
                  </div>
                ) : (
                  <div className="row mb-3">
                    <label htmlFor={field.name}>{field.label}:</label>
                    <input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      value={field.value}
                      onChange={handleChange}
                      required={field.required}
                      placeholder={field.placeholder}
                    />
                  </div>
                )}

                {state.errors[field.name] && (
                  <p className="error">{state.errors[field.name]}</p>
                )}
              </div>
            ))}

            <div className="row">
              <div className="offset-sm-4 col-sm-4 d-grid">
                <button type="submit" className="btn btn-primary">
                  submit
                </button>
              </div>
              <div className="col-sm-4 d-grid">
                <Link
                  className="btn btn-secondary"
                  to="/products"
                  role="button"
                >
                  {" "}
                  cancel
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export { CreateProductPage };
