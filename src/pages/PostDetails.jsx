import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Advertise from "../components/shared/Advertise";
import CommentSection from "../components/shared/CommentSection";
import PostCard from "../components/shared/PostCard";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";

const apiUrl = import.meta.env.VITE_BACKENT_API_URL;

const PostDetails = () => {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentArticles, setRecentArticles] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${apiUrl}/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();

        if (!res.ok) throw new Error("Failed to fetch post.");

        setPost(data.posts[0]);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/post/getposts?limit=3`);
        const data = await res.json();

        if (!res.ok) throw new Error("Failed to fetch recent articles.");

        setRecentArticles(data.posts);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchRecentPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <img
          src="https://cdn-icons-png.flaticon.com/128/39/39979.png"
          alt="Loading"
          className="w-20 animate-spin"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-xl text-red-500">An error occurred while loading the post.</h1>
      </div>
    );
  }

  return (
    <main className="p-5 flex flex-col max-w-7xl mx-auto min-h-screen space-y-10">
      {/* Post Title */}
      <h1 className="text-4xl font-bold text-center text-slate-800 underline underline-offset-8">
        {post?.title}
      </h1>

      {/* Post Category */}
      <div className="flex justify-center">
        <Link
          to={`/search?category=${post?.category}`}
          className="mt-5"
        >
          <Button variant="outline" className="border border-slate-500">
            {post?.category}
          </Button>
        </Link>
      </div>

      {/* Post Image */}
      <img
        src={post?.image}
        alt={post?.title}
        className="rounded-lg mt-10 mx-auto max-h-[500px] w-full object-cover shadow-md"
      />

      {/* Post Meta Information */}
      <div className="flex justify-between text-sm text-slate-600 max-w-3xl mx-auto">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {post && Math.ceil(post.content.length / 100)} mins read
        </span>
      </div>

      <Separator className="bg-slate-500 my-5" />

      {/* Post Content */}
      <div
        className="prose prose-lg max-w-4xl mx-auto text-slate-700"
        dangerouslySetInnerHTML={{ __html: post?.content }}
      ></div>

      {/* Advertisement */}
      <div className="max-w-4xl mx-auto">
        <Advertise />
      </div>

      {/* Comment Section */}
      <div className="max-w-4xl mx-auto">
        <CommentSection postId={post?._id} />
      </div>

      {/* Recent Articles */}
      <div className="max-w-6xl mx-auto space-y-5">
        <h2 className="text-2xl font-semibold text-center text-slate-800">
          Recently Published Articles
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {recentArticles?.map((article) => (
            <PostCard key={article._id} post={article} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default PostDetails;