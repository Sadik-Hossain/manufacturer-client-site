import React from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import Spinner from "../Shared/Spinner/Spinner";
import useToken from "../../hooks/useToken";

const SignUp = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);
  const navigate = useNavigate();
  const [token] = useToken(user || gUser);
  let signInError;
  if (error || gError || updateError) {
    signInError = <p>{error?.message || gError?.message}</p>;
  }
  if (loading || gLoading || updating) {
    return <Spinner />;
  }
  if (token) {
    navigate("/home");
  }
  const onSubmit = async (data) => {
    // console.log(data);
    await createUserWithEmailAndPassword(data.email, data.password);
    await updateProfile({ displayName: data.name });
  };
  return (
    <div>
      <div
        style={{
          boxShadow: " 1rem 1rem 0px rgba(0, 0, 0, 1)",
          border: "2px solid #000",
        }}
        className="register-form"
      >
        {/* 
          //* ================= reg. form ===============
          */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* 
          //* ==================== name ======================
*/}
          <div>
            <label>
              <span>Name</span>
            </label>
            <input
              type="text"
              placeholder="Your Name"
              {...register("name", {
                required: {
                  value: true,
                  message: "name required",
                },
              })}
            />
            <label>
              {errors.name?.type === "required" && (
                <span style={{ color: "red" }}>{errors.name.message}</span>
              )}
            </label>
          </div>
          {/* 
          //* ==================== email ======================
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
                <span style={{ color: "red" }}>{errors.email.message}</span>
              )}
              {errors.email?.type === "pattern" && (
                <span style={{ color: "red" }}>{errors.email.message}</span>
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
                <span style={{ color: "red" }}>{errors.password.message}</span>
              )}
              {errors.password?.type === "minLength" && (
                <span style={{ color: "red" }}>{errors.password.message}</span>
              )}
            </label>
          </div>

          {signInError}

          <input
            style={{ background: "rgb(47, 72, 88)", color: "white" }}
            type="submit"
            value="register"
          />
        </form>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: "1.2rem" }}>already a member?</p>
          <Link
            style={{
              color: "cadetblue",
              textDecoration: "none",
              fontSize: "1.2rem",
            }}
            to="/login"
          >
            Login
          </Link>
        </div>
        {/* 
        //* divider
        */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "50%",
              height: "3px",
              background: "rgb(47, 72, 88)",
            }}
          ></div>
          <p style={{ margin: "0 1rem" }}>Or</p>
          <div
            style={{
              width: "50%",
              height: "3px",
              background: "rgb(47, 72, 88)",
            }}
          ></div>
        </div>

        {/* 
          //* ============== Google sign in ===============
          */}
        <button
          style={{
            margin: "1rem  auto",
            display: "block",
            background: "rgb(47, 72, 88)",
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
    </div>
  );
};

export default SignUp;
