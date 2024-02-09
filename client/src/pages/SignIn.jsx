import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInSuccess,
  signInFailure,
  signInStart,
} from "../redux/user/userSlice.js";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((oldData) => {
      return { ...oldData, [id]: value.trim() };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill out all the values"));
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (e) {
      dispatch(signInFailure(e));
    }
  };
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center">
        <div className="flex-1">
          <Link
            to="/"
            className="self-center whitespace-nowrap text-4xl  font-bold dark:text-white"
          >
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Backs
            </span>
            Blog
          </Link>
          <p className="text-lg mt-5 ">
            You can sign in with your email or with Google
          </p>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="">
              <Label value="Your email" htmlFor="email" />
              <TextInput
                onChange={handleChange}
                placeholder="name@company.com"
                type="email"
                id="email"
                value={formData.email}
              />
            </div>
            <div className="">
              <Label value="Your password" htmlFor="password" />
              <TextInput
                onChange={handleChange}
                placeholder="*********"
                type="password"
                id="password"
                value={formData.password}
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
          <div className="pt-2">
            <span className="pr-2">Doesn&apos;t have an account ?</span>
            <Link to="/signup" className="text-blue-500">
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
