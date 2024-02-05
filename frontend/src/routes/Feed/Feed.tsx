import React, { useState } from "react";
import "./Feed.css";
import FeedPost from "../../components/Feed/FeedPost/FeedPost";

const Feed: React.FC = () => {
  const [posts, setPosts] = useState([]);

  return (
    <div className="feed">
      <div className="feed-posts">
        <FeedPost />
      </div>
    </div>
  );
};

export default Feed;
