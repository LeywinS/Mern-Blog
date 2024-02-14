import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CommentSection from "../components/CommentSection";

function PostPage() {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${slug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        setPost(data.posts[0]);
        setPost((post) => {
          return {
            ...post,
            category: ["test1", "test2"],
          };
        });
        setError(null);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);
  console.log(post);
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        {post && post.title}
      </h1>
      {post && (
        <div className="flex self-center m-5">
          {post.category.map((cat) => {
            return (
              <Link
                className="self-center ml-5"
                to={`/search?category=${post && cat}`}
                key={cat}
              >
                <Button
                  gradientDuoTone="purpleToPink"
                  outline
                  className=" mb-5  border-1"
                >
                  {cat}
                </Button>
              </Link>
            );
          })}
        </div>
      )}
      <img
        className="mt-10 p-3 max-h-[600px] w-full object-cover"
        src={post && post.image}
        alt={post && post.title}
      />
      <div className="flex justify-between border-b border-slate-500 w-full text-xs pb-5">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {post && (post.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div
        className="p-3 max-w-2xl mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>
      <CommentSection postId={post._id} />
    </main>
  );
}

export default PostPage;
