import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";

import Post from "./Post/Post";

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts);
  // console.log(posts);

  return (
    <>
      {!posts.length ? (
        <CircularProgress />
      ) : (
        <Grid container alignItems="stretch" spacing={3} className="container">
          {posts.map((post) => (
            <Grid item key={post._id} xs={12} sm={6} md={6}>
              <Post post={post} setCurrentId={setCurrentId} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default Posts;
