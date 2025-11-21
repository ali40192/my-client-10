import React, { use, useState } from "react";
import { Form, Link, useLocation, useNavigate } from "react-router";
import AuthContext from "../../Contexts/AuthContext";
import { toast } from "react-toastify";

const Registration = () => {
  const [error, setError] = useState("");

  const { creatUser, googleSignIn } = use(AuthContext);
  const location = useLocation();
  const from = location.state || "/";
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photoUrl = form.photoUrl.value;
    const email = form.email.value;
    const password = form.password.value;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long."
      );
      return;
    }

    console.log(name, photoUrl, email, password);
    creatUser(email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        // ...
        toast.success("Registered user: ", user);
        navigate(from);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        toast.error("Error during registration: ", errorCode, errorMessage);
      });
  };
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        toast.success("Google Sign-In successful: ", user);
        navigate(from);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error("Error during Google Sign-In: ", errorCode, errorMessage);
      });
  };
  return (
    <div className="flex min-h-screen-[60px] items-center justify-center bg-gray-100 p-4">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <h1 className="text-center text-4xl font-bold">Registration</h1>
        <div className="card-body">
          <Form onSubmit={handleSubmit}>
            <fieldset className="fieldset">
              <label className="label">Name</label>
              <input
                name="name"
                type="text"
                className="input"
                placeholder="Write Your Name"
                required
              />
              <label className="label">PhotoUrl</label>
              <input
                name="photoUrl"
                type="text"
                className="input"
                placeholder="Photo Url"
                required
              />
              <label className="label">Email</label>
              <input
                name="email"
                type="email"
                className="input"
                placeholder="Email"
                required
              />
              <label className="label">Password</label>
              <input
                name="password"
                type="password"
                className="input"
                placeholder="Password"
              />

              <div>
                <p className="text-xs text-red-500 font-mono">{error}</p>
              </div>
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button type="submit" className="btn btn-neutral mt-4">
                Registration
              </button>
            </fieldset>
          </Form>
          <div className="divider">OR</div>
          <div className="flex justify-center w-full">
            <button
              onClick={handleGoogleSignIn}
              className="btn w-full bg-white text-black border-[#e5e5e5]"
            >
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Login with Google
            </button>
          </div>
        </div>
        <div>
          <p className="text-center mb-4">
            {" "}
            Already have an account?{" "}
            <Link to="/login" className="link link-info link-hover">
              Login Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
