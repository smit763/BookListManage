import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import { createBook } from "../../Services/Redux/Slices/BookSlice";
import { useNavigate } from "react-router-dom";


const AddBook = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const userData = useSelector(state => state.authData)
    

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (bookData) => {
        try {
            setLoading(true);
            const result = await dispatch(createBook({...bookData,pageSize:+bookData.pageSize,addedBy: userData.data.data._id}));
            
            if (result.payload.success) {
                navigate("/")
                toast.success("Book created successfully!");
                reset();
            } else {
                toast.error("Failed to create book.");
            }
        } catch (error) {
            console.log(error);
            
            toast.error("Something went wrong. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

  return (
    <>
        <section className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-xl-6 col-lg-8 col-md-10 shadow-lg p-4 bg-white rounded">
                    <div className="text-center mb-4">
                        <h2 className="h4 font-weight-bold text-primary">Create a New Book</h2>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input
                                type="text"
                                id="title"
                                placeholder="Enter book title"
                                {...register("title", { required: "Title is required" })}
                                className={`form-control ${errors.title ? "is-invalid" : ""}`}
                            />
                            {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="author" className="form-label">Author</label>
                            <input
                                type="text"
                                id="author"
                                placeholder="Enter author's name"
                                {...register("author", { required: "Author is required" })}
                                className={`form-control ${errors.author ? "is-invalid" : ""}`}
                            />
                            {errors.author && <div className="invalid-feedback">{errors.author.message}</div>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea
                                id="description"
                                placeholder="Enter book description"
                                {...register("description", { required: "Description is required" })}
                                className={`form-control ${errors.description ? "is-invalid" : ""}`}
                                rows="4"
                            ></textarea>
                            {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="pages" className="form-label">Page Size</label>
                            <input
                                type="number"
                                id="pageSize"
                                placeholder="Enter the number of pages"
                                {...register("pageSize", {
                                    required: "Page size is required",
                                    min: { value: 1, message: "Page size must be at least 1" },
                                })}
                                className={`form-control ${errors.pageSize ? "is-invalid" : ""}`}
                            />
                            {errors.pageSize && <div className="invalid-feedback">{errors.pageSize.message}</div>}
                        </div>

                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">
                                {loading ? (
                                    <span>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Submitting...
                                    </span>
                                ) : (
                                    "Submit"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </>
  )
}

export default AddBook