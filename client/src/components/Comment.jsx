import { useEffect, useState } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
const Comment = ({ comment, onLike }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [user, setUser] = useState({});
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data);
          return;
        }
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [comment]);
  console.log(user);
  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      <div className="py-5 flex-shrink-0">
        <img
          className="w-12 h-12 rounded-full"
          src={user.profilePicture}
          alt={user.username}
        />
      </div>
      <div>
        <div className="flex items-center flex-1 pl-5">
          <span className="font-bold mr-1 text-xm truncate">
            {user ? `@${user.username}` : "anonymus user"}
          </span>
          <span className="text-gray-500 text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        <p className="text-gray-500 pb-2 pl-5">{comment.content}</p>
        <div className="flex gap-2 items-center text-xs ">
          <button
            type="button"
            onClick={() => {
              onLike(comment._id);
            }}
            className={`text-gray-400 hover:text-blue-500 pl-5 ${
              currentUser &&
              comment.likes.includes(currentUser._id) &&
              "!text-blue-500"
            }`}
          >
            <FaThumbsUp className="text-sm" />
          </button>
          <p className=" text-gray-500">
            {comment.numberOfLikes > 0 &&
              comment.numberOfLikes +
                " " +
                (comment.numberOfLikes === 1 ? "like" : "likes")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
