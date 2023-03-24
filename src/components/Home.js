import React, { useEffect, useState } from "react";

const Home = ({ postApp }) => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const loadPosts = async () => {
    const postCount = await postApp.currentPostId();
    let posts = [];

    for (let i = 0; i < postCount; i++) {
      const post = await postApp.posts(i);

      posts.push({
        postId: post.postId,
        postContent: post.postContent,
        postBy: post.postBy,
        postHash: post.postHash,
        postImage: post.imageURI,
      });
    }

    setLoading(false);
    setPosts(posts);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <React.Fragment>
      <div className="flex flex-wrap justify-evenly mt-40">
        {loading ? (
          <h1 className="text-2xl text-center mt-48">⌛ Loading Posts...</h1>
        ) : posts ? (
          posts.map((post, id) => {
            return (
              <div className="w-100 rounded overflow-hidden shadow-lg ml-6 mb-10 w-72">
                <img
                  className="w-full h-52"
                  src={post.postImage}
                  alt="post-img"
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl text-center">
                    Posted-By:{" "}
                    {post.postBy.slice(0, 5) +
                      "..." +
                      post.postBy.slice(38, 42)}
                  </div>
                  <p className="text-gray-700 text-base mt-6">
                    Post-Content: {post.postContent}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <h1 className="text-2xl text-center mt-48">
            There is no post to show.
          </h1>
        )}
      </div>
    </React.Fragment>
  );
};

export default Home;
