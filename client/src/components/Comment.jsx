import { useEffect, useState } from "react";
import moment from "moment";

const Comment = ({ comment }) => {
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
        <div className="flex items-center flex-1">
          <span className="font-bold mr-1 text-xm truncate">
            {user ? `@${user.username}` : "anonymus user"}
          </span>
          <span className="text-gray-500 text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        <p className="text-gray-500 pb-2">{comment.content}</p>
      </div>
    </div>
  );
};

export default Comment;
