import React, { use, useState } from "react";
import { Form, Link, useLocation, useNavigate } from "react-router";
import AuthContext from "../../Contexts/AuthContext";
import { toast } from "react-toastify";
import { saveOrUpdateUser } from "../../utils";

const Registration = () => {
  const [error, setError] = useState("");

  const { creatUser, googleSignIn, UpdateUserprofile } = use(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

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

    try {
      await creatUser(email, password);

      await UpdateUserprofile(name, photoUrl);

      await saveOrUpdateUser({
        name,
        email,
        photoUrl,
      });

      toast.success("Registration successful");
      navigate(from);
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
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
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
        <h1 className="text-center text-4xl font-bold mt-4">Registration</h1>

        <div className="card-body">
          <Form onSubmit={handleSubmit}>
            <fieldset className="fieldset space-y-2">
              <label className="label">Name</label>
              <input
                name="name"
                type="text"
                className="input input-bordered"
                placeholder="Write Your Name"
                required
              />

              <label className="label">Photo URL</label>
              <input
                name="photoUrl"
                type="text"
                className="input input-bordered"
                placeholder="Photo URL"
                required
              />

              <label className="label">Email</label>
              <input
                name="email"
                type="email"
                className="input input-bordered"
                placeholder="Email"
                required
              />

              <label className="label">Password</label>
              <input
                name="password"
                type="password"
                className="input input-bordered"
                placeholder="Password"
                required
              />

              {error && (
                <p className="text-xs text-red-500 font-mono">{error}</p>
              )}

              <button type="submit" className="btn btn-neutral mt-4">
                Register
              </button>
            </fieldset>
          </Form>

          <div className="divider">OR</div>

          <button
            onClick={handleGoogleSignIn}
            className="btn w-full bg-white text-black border"
          >
            Login with Google
          </button>
        </div>

        <p className="text-center mb-4">
          Already have an account?{" "}
          <Link to="/login" className="link link-info">
            Login Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;
