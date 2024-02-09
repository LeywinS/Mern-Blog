import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
const SignUp = () => {
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
          <form className="flex flex-col gap-4">
            <div className="">
              <Label value="Your username" />
              <TextInput placeholder="username" type="text" id="username" />
            </div>
            <div className="">
              <Label value="Your email" />
              <TextInput
                placeholder="name@company.com"
                type="email"
                id="email"
              />
            </div>
            <div className="">
              <Label value="Your password" />
              <TextInput placeholder="password" type="password" id="password" />
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit">
              Sign Up
            </Button>
          </form>
          <div>
            <span className="pr-2">Have an account ?</span>
            <Link to="/signin" className="text-blue-500">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
