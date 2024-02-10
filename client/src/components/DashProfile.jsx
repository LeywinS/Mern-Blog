import { Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";

function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="maw-w-lg mx-auto p-3 w-full ">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <div className="lg:flex  lg:flex-col lg:items-center">
        <form className="flex flex-col gap-4 lg:w-2/3 ">
          <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
            <img
              className="rounded-full w-full h-full object-cover border-8 border-[lightgray] "
              src={currentUser.profilePicture}
              alt="Profile Picture"
            />
          </div>
          <TextInput
            type="text"
            id="username"
            placeholder="username"
            defaultValue={currentUser.username}
          />
          <TextInput
            type="email"
            id="email"
            placeholder="email"
            defaultValue={currentUser.email}
          />
          <TextInput type="password" id="password" placeholder="*********" />
          <Button type="submit" gradientDuoTone="purpleToBlue" outline>
            Update
          </Button>
        </form>
        <div className="text-red-500 flex  justify-between container lg:w-2/3">
          <span className="cursor-pointer">Delete Account</span>
          <span className="cursor-pointer"> Disconnect</span>
        </div>
      </div>
    </div>
  );
}

export default DashProfile;
