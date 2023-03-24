import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { NFTStorage } from "nft.storage";

const Create = ({ postApp }) => {
  const navigate = useNavigate();

  const [image, setImage] = useState();
  const [postHash, setPostHash] = useState();
  const [postContent, setPostContent] = useState();

  const uploadToIPFS = async (e) => {
    e.preventDefault();

    const file = e.target.files[0];
    if (typeof file !== undefined) {
      try {
        const nftstorage = new NFTStorage({
          token: process.env.REACT_APP_NFT_STORAGE_KEY,
        });

        const imgData = await nftstorage.store({
          image: file,
          name: "",
          description: "",
        });
        setPostHash(imgData.ipnft);
        const url = imgData.data.image.pathname.slice(1); //creating valid url for retrieving image from ipfs
        setImage(`https://ipfs.io/ipfs${url}`);
      } catch (error) {
        console.log("error while uploading image to ipfs", error);
      }
    }
  };

  const createPost = async () => {
    if (!postHash || !postContent || !image) return;
    try {
      await postApp.addPost(postContent, postHash, image);

      postApp.on("NewPost", (postId, postContent, postedBy, postHash) => {
        alert(
          `a new post is created by address ${postedBy},\n the hash of the post is: ${postHash},\n the content of the post is: ${postContent}`
        );
        navigate("/");
      });
    } catch (error) {
      console.log("ipfs uri upload error", error);
    }
  };

  return (
    <React.Fragment>
      <div className="container mx-auto">
        <div className="max-w-xl p-5 mx-auto my-10 bg-white rounded-md shadow-sm">
          <div className="text-center">
            <h1 className="my-3 text-3xl font-semibold text-gray-700">
              Post Something
            </h1>
          </div>
          <div>
            <div className="mb-6">
              <input
                type="file"
                name="image"
                required
                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                onChange={uploadToIPFS}
              />
            </div>
            <div className="mb-6">
              <input
                type="text"
                name="postContent"
                placeholder="Post-Content"
                required
                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                onChange={(e) => {
                  setPostContent(e.target.value);
                }}
              />
            </div>

            <div className="mb-6">
              <button
                className="w-full px-2 py-4 text-white bg-indigo-500 rounded-md  focus:bg-indigo-600 focus:outline-none"
                onClick={createPost}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Create;
