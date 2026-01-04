import React, { use } from "react";
import { Form, Link, useLocation, useNavigate } from "react-router";
import AuthContext from "../../Contexts/AuthContext";
import { toast } from "react-toastify";
import { saveOrUpdateUser } from "../../utils";

const Login = () => {
  const { loginUser, googleSignIn } = use(AuthContext);

  const location = useLocation();
  const from = location.state || "/";
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    loginUser(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        toast.success("Logged in user: ", user);
        navigate(from);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error("Error during login: ", errorCode, errorMessage);
      });
  };

  const handleGoogleSignIn = async () => {
    try {
      const { user } = await googleSignIn();
      await saveOrUpdateUser({
        name: user.displayName,
        email: user.email,
        photoUrl: user.photoURL,
      });
      toast.success("Google Sign-In successful 🎉");
      navigate(from);
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <div className="flex min-h-screen-[60px] items-center justify-center bg-gray-100 p-4">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <h1 className="text-center text-4xl font-bold">Login Now</h1>
        <div className="card-body">
          <Form onSubmit={handleSubmit}>
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input
                name="email"
                type="email"
                className="input"
                placeholder="Email"
              />
              <label className="label">Password</label>
              <input
                name="password"
                type="password"
                className="input"
                placeholder="Password"
              />
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button type="submit" className="btn btn-neutral mt-4">
                Login
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
            Don't have an account?{" "}
            <Link to="/registration" className="link link-info link-hover">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
