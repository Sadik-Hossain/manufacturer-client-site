import React, { useEffect } from "react";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

import { Link, useLocation, useNavigate } from "react-router-dom";
import Spinner from "../Shared/Spinner/Spinner";
import { useForm } from "react-hook-form";
import useToken from "../../hooks/useToken";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [token] = useToken(user || gUser);
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";

  //*? using useEffect for avoiding error msg (render update)
  //* user pawa gele jekhan theke asce sekhane pathay dewa
  useEffect(() => {
    // console.log(user || gUser);
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token, from, navigate]);

  let signInError;

  if (error || gError) {
    signInError = (
      <p style={{ color: "red", textAlign: "center" }}>
        {error?.message || gError?.message}
      </p>
    );
  }

  if (loading || gLoading) {
    return <Spinner />;
  }

  const onSubmit = (data) => {
    signInWithEmailAndPassword(data.email, data.password);
  };

  return (
    <div
      style={{
        boxShadow: " 1rem 1rem 0px rgba(0, 0, 0, 1)",
        border: "2px solid #000",
      }}
      className="register-form"
    >
      <h2>Login</h2>
      {/* 
          //* ================= login form =================
          */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 
          //* ==================== Email ======================
*/}
        <div>
          <label>
            <span>Email</span>
          </label>
          <input
            type="email"
            placeholder="Your Email"
            {...register("email", {
              required: {
                value: true,
                message: "email required",
              },
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "provide a valid email",
              },
            })}
          />
          <label>
            {errors.email?.type === "required" && (
              <span>{errors.email.message}</span>
            )}
            {errors.email?.type === "pattern" && (
              <span>{errors.email.message}</span>
            )}
          </label>
        </div>

        {/* 
//* ==================== Password ======================
*/}
        <div>
          <label>
            <span>Password</span>
          </label>
          <input
            type="password"
            placeholder="Your password"
            {...register("password", {
              required: {
                value: true,
                message: "password is required",
              },
              minLength: {
                value: 6,
                message: "must be 6 characters or longer",
              },
            })}
          />
          <label>
            {errors.password?.type === "required" && (
              <span>{errors.password.message}</span>
            )}
            {errors.password?.type === "minLength" && (
              <span>{errors.password.message}</span>
            )}
          </label>
        </div>

        {signInError}

        <input
          style={{ background: "#2F4858", color: "white" }}
          type="submit"
          value="Login"
        />
      </form>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        <p style={{ fontSize: "1.2rem" }}>New Here?</p>
        <Link
          style={{
            color: "cadetblue",
            textDecoration: "none",
            fontSize: "1.2rem",
          }}
          to="/signup "
        >
          Sign Up
        </Link>
      </div>
      {/* 
      //* divider
      */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{ width: "50%", height: "3px", background: "#2F4858" }}
        ></div>
        <p style={{ margin: "0 1rem" }}>Or</p>
        <div
          style={{ width: "50%", height: "3px", background: "#2F4858" }}
        ></div>
      </div>

      {/* 
          //* ============== Google sign in ===============
          */}
      <button
        style={{
          margin: "1rem  auto",
          display: "block",
          background: "#2F4858",
          color: "white",
          borderRadius: "1rem",
        }}
        onClick={() => signInWithGoogle()}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <p>Continue with google</p>
          <img
            style={{ width: "32px", height: "32px" }}
            src="https://i.ibb.co/J7RvT3j/google.png"
            alt=""
          />
        </div>
      </button>
    </div>
  );
};

export default Login;
