import { Alert, Button, FileInput, TextInput } from "flowbite-react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

function CreatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      }
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(imageUploadProgress);
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image upload failed");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ formData, imageUrl: downloadUrl });
            console.log(formData);
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      return;
    }
  };

  return (
    <div className="p-3 max-w-3xl min-h-screen mx-auto">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title required"
            required
            className="flex-1"
          />
          <TextInput
            type="text"
            placeholder="Category space by an   ','"
            required
            className="flex-1"
          />
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            disabled={imageUploadProgress}
            onClick={() => {
              handleUploadImage();
            }}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress}%` || "0%"}
                />
              </div>
            ) : (
              <div>Loading</div>
            )}
          </Button>
        </div>
        {imageUploadError && (
          <Alert color="failure" className="mt-4">
            {imageUploadError}
          </Alert>
        )}
        {formData.imageUrl ? (
          <>
            <img
              src={formData.imageUrl}
              alt="upload"
              className="
              top-left
              w-full
              h-72
              object-cover
              object-center"
            />
          </>
        ) : (
          ""
        )}

        <ReactQuill
          theme="snow"
          placeholder="Write something"
          className="h-72 mb-12 mt-5"
          required
        />
        <Button type="submit" gradientDuoTone="purpleToPink" outline>
          Publish
        </Button>
      </form>
    </div>
  );
}

export default CreatePost;
