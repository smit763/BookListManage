import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { userLogin } from "../../../Services/Redux/Slices/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async loginData => {
    try {
      setLoading(true);
      const data = await dispatch(userLogin(loginData));
      if (data.payload.success) {
        localStorage.setItem("token", data.payload.data.token);
        navigate("/");
        toast.success(data.payload.message);
      } else {
        toast.error(data.payload.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-4 col-md-6 col-11 shadow-lg p-4 bg-white rounded">
            <div className="text-center mb-4">
              <h2 className="h4 font-weight-bold text-primary">
                Sign in to your account
              </h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                      message: "Invalid email format"
                    }
                  })}
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                />
                {errors.email &&
                  <div className="invalid-feedback">
                    {errors.email.message}
                  </div>}
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
                      message: "Password must be at least 6 characters"
                    }
                  })}
                  className={`form-control ${errors.password
                    ? "is-invalid"
                    : ""}`}
                />
                {errors.password &&
                  <div className="invalid-feedback">
                    {errors.password.message}
                  </div>}
              </div>

              <div className="mb-3">
                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2"
                  disabled={loading}
                >
                  {loading
                    ? <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    : "Sign In"}
                  {loading && " Please wait..."}
                </button>
              </div>
            </form>

            <p className="text-center">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-primary text-decoration-none"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
