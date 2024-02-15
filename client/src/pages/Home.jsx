import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getPosts");
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-3xl lg:text-6xl">Welcome to my blog</h1>
        <p className="text-gray-500 text-xs sm:text-sm lg:text-xl">
          Bienvenue dans un univers où la curiosité n&apos;a pas de limites, et
          où chaque sujet est une porte ouverte vers la découverte. Sur ce blog,
          nous explorons un monde infini de thématiques, des sujets captivants
          aux discussions stimulantes. Que vous soyez passionné par la science,
          la culture, la technologie, le voyage, la cuisine, ou tout simplement
          avide de connaissances diverses, vous trouverez ici un refuge pour
          votre esprit curieux. Préparez-vous à plonger dans un océan
          d&apos;idées, d&apos;inspirations et de partages, car ma mission est
          simple : parler de tout !!
        </p>
        <Link
          to="/search"
          className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
        >
          View all posts
        </Link>
      </div>
      <div className="max-w-7xl mx-auto p-3 flex-col gap-8">
        {posts && posts.length > 0 && (
          <div>
            <h2 className="text-2xl text-center mb-5">Recents posts</h2>
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
              {posts.map((post) => {
                return <PostCard key={post._id} post={post} />;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
