import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Alert, Button, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import Comment from "./Comment";

function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200 || comment.length === 0) {
      setCommentError("Error can't send the comment");
      return;
    }
    try {
      const res = await fetch("/api/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment("");
        setCommentError(null);
        setComments([data, ...comments]);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };
  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComments/${postId}`);
        const data = await res.json();
        setComments(data);
      } catch (e) {
        console.log(e);
      }
    };
    getComments();
  }, [postId]);

  console.log(comments);

  return (
    <div className="max-w-4xl mx-auto ">
      {currentUser ? (
        <div className="flex items-center gap-4 my-5 text-gray-500">
          <p>Signed in as :</p>
          <Link to={"/dashboard?tab=profile"}>
            <img
              className="h-12 w-12 rounded-full object-cover"
              src={currentUser.profilePicture}
              alt={currentUser.username}
            />
          </Link>
          <Link to={"/dashboard?tab=profile"}>@{currentUser.username}</Link>
        </div>
      ) : (
        <div className="text-sm text-teal-500">
          <p className="inline p-1">You must be login to comment this.</p>
          <Link to={"/signin"}>
            <Button className="mx-auto my-5" gradientDuoTone="purpleToPink">
              Sign In
            </Button>
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className="border border-teal-500 rounded-md p-3 max-w-full"
        >
          <Textarea
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
            placeholder="Add a comment ... "
            rows="3"
            maxLength={200}
          />
          <div className="flex justify-between items-center mt-5">
            <p className="text-gray-500 mr-40">
              {200 - comment.length} characters remaining
            </p>
            <Button gradientDuoTone="purpleToBlue" type="submit" outline>
              Submit
            </Button>
          </div>
        </form>
      )}
      {commentError && (
        <Alert className="mt-5" color="failure">
          {commentError}
        </Alert>
      )}
      {comments.length === 0 ? (
        <p className="text-sm my-5">No comment Yet</p>
      ) : (
        <div>
          <div className="flex mt-5">
            <p className="">Comments</p>
            <div className="  border-gray-400 border px-2 ml-2 rounded-sm">
              <p className="">{comments.length}</p>
            </div>
          </div>
          {comments.map((comment) => {
            return <Comment key={comment._id} comment={comment} />;
          })}
        </div>
      )}
    </div>
  );
}

export default CommentSection;
