import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((oldData) => {
      return { ...oldData, [id]: value.trim() };
    });
    console.log(e.target.id);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all the field");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/signIn");
      }
    } catch (e) {
      setErrorMessage(e.message);
      setLoading(false);
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
          <p className="text-sm mt-5">
            Hey this is my first full stack MERN project so Welcome{" "}
          </p>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="">
              <Label value="Your username" htmlFor="username" />
              <TextInput
                placeholder="username"
                type="text"
                onChange={handleChange}
                id="username"
                value={formData.username}
              />
            </div>
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
                placeholder="password"
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
                "Sing Up"
              )}
            </Button>
          </form>
          <div>
            <span className="pr-2">Have an account ?</span>
            <Link to="/signin" className="text-blue-500">
              Sign In
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

export default SignUp;
