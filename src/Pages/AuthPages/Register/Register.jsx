import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { userRegister } from "../../../Services/Redux/Slices/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (formData) => {
        try {
            const data = await dispatch(userRegister(formData));
            if (data.payload.success) {
                localStorage.setItem("token", data.payload.data.token);
                navigate("/");
                toast.success(data.payload.message);
            } else {
                toast.error(data.payload.message);
            }
            console.log("Success:", data);
        } catch (error) {
            console.log("Error:", error.response?.data || error.message);
        }
    };

    return (
        <section className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-4 col-md-6 col-11 shadow-lg p-4 bg-white rounded">
                        <div className="text-center mb-4">
                            <h2 className="h4 font-weight-bold text-primary">Create your account</h2>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Enter your full name"
                                    {...register("name", {
                                        required: "Name is required",
                                        minLength: {
                                            value: 3,
                                            message: "Name must be at least 3 characters long",
                                        },
                                    })}
                                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                />
                                {errors.name && (
                                    <div className="invalid-feedback">{errors.name.message}</div>
                                )}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                            message: "Invalid email format",
                                        },
                                    })}
                                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                />
                                {errors.email && (
                                    <div className="invalid-feedback">{errors.email.message}</div>
                                )}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="mobile" className="form-label">
                                    Mobile Number
                                </label>
                                <input
                                    type="number"
                                    id="mobile"
                                    placeholder="Enter your mobile number"
                                    {...register("mobile", {
                                        required: "Mobile number is required",
                                        pattern: {
                                            value: /^[0-9]{10}$/,
                                            message: "Invalid mobile number (must be 10 digits)",
                                        },
                                    })}
                                    className={`form-control ${errors.mobile ? "is-invalid" : ""}`}
                                />
                                {errors.mobile && (
                                    <div className="invalid-feedback">{errors.mobile.message}</div>
                                )}
                            </div>

                            <div className="mb-3">
                                <div className="d-flex justify-content-between">
                                    <label htmlFor="password" className="form-label">
                                        Password
                                    </label>
                                </div>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Enter your password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters",
                                        },
                                    })}
                                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                />
                                {errors.password && (
                                    <div className="invalid-feedback">{errors.password.message}</div>
                                )}
                            </div>

                            <div className="mb-3">
                                <button type="submit" className="btn btn-primary w-100 py-2">
                                    Register
                                </button>
                            </div>
                        </form>

                        <p className="text-center">
                            Already have an account?{" "}
                            <Link to="/login" className="text-primary text-decoration-none">
                                Log in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;