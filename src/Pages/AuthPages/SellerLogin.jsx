import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthProvider";

const SellerLogin = () => {
  const { emailSignIn, googleSign, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loginError, setLoginError] = useState("");

  const handleLogin = (data) => {
    setLoginError("");
    console.log(data);
    emailSignIn(data.email, data.password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(user);
        //jwt token
        fetch(`https://ark-deals-server.vercel.app/jwt?email=${user?.email}`)
          .then((res) => res.json())
          .then((data) => {
            console.log(data.accessToken);
            localStorage.setItem("arkDeals", data.accessToken);
            toast.success("Login SuccessFully!");
            navigate("/dashboard");
          });
      })
      .catch((err) => {
        setLoginError(err.message);
        isLoading(false);
      });
  };

  const handleGoogleSign = () => {
    googleSign()
      .then((res) => {
        const signedUser = res.user;
        console.log(signedUser);
        const user = {
          name: signedUser.displayName,
          email: signedUser.email,
          role: "buyer",
        };
        fetch(`https://ark-deals-server.vercel.app/add-users`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.acknowledged) {
              //jwt token
              fetch(
                `https://ark-deals-server.vercel.app/jwt?email=${user?.email}`
              )
                .then((res) => res.json())
                .then((data) => {
                  console.log(data.accessToken);
                  localStorage.setItem("arkDeals", data.accessToken);
                  toast.success("Registration Success as Buyer!");
                  navigate("/dashboard");
                });
            }
          });
      })
      .catch((err) => {
        setLoginError(err.message);
        isLoading(false);
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Sell your unused laptops and get the best price only on
            arkDEALS.com!
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <form onSubmit={handleSubmit(handleLogin)}>
              <h2 className="text-2xl text-center">Login as Seller</h2>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  {" "}
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  {...register("email", {
                    required: "Email Address is required",
                  })}
                  className="input input-bordered w-full max-w-xs"
                />
                {errors.email && (
                  <p className="text-red-600">{errors.email?.message}</p>
                )}
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  {" "}
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be 6 characters or longer",
                    },
                  })}
                  className="input input-bordered w-full max-w-xs"
                />
                <label className="label">
                  {" "}
                  <span className="label-text">Forget Password?</span>
                </label>
                {errors.password && (
                  <p className="text-red-600">{errors.password?.message}</p>
                )}
              </div>
              <input
                className="btn btn-accent w-full"
                value="Login"
                type="submit"
              />
              <div>
                {loginError && <p className="text-red-600">{loginError}</p>}
              </div>
            </form>
            <p className="text-sm">
              New to arkDEALS.com?{" "}
              <Link className="text-secondary" to="/seller-register">
                Register as Seller
              </Link>
            </p>
            <div className="divider">OR</div>
            <button
              onClick={handleGoogleSign}
              className="btn btn-outline btn-secondary w-full"
            >
              CONTINUE WITH GOOGLE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerLogin;
