import "../../../styles/Posts/Post/post.scss";
import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core/";

import logo from "../../../images/logo.svg";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";

import { likePost, deletePost } from "../../../actions/postsAction";

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();

  return (
    <>
      <Card className="card">
        <CardMedia
          className="media"
          image={post.selectedFile || logo}
          title={post.tittle}
        />
        <div className="overlay">
          <Typography variant="h6">{post.creator}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        <div className="overlay2">
          <Button size="small" onClick={() => setCurrentId(post._id)}>
            <MoreHorizIcon fontSize="medium" />
          </Button>
        </div>
        <div className="details">
          <Typography variant="body2" color="textSecondary" component="h2">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography className="title" gutterBottom variant="h5" component="h2">
          {post.tittle}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.message}
          </Typography>
        </CardContent>
        <CardActions className="card-actions">
          <Button
            size="small"
            color="primary"
            onClick={() => dispatch(likePost(post._id))}
          >
            <ThumbUpAltIcon fontSize="small" /> Like {post.likeCount}{" "}
          </Button>
          <Button
            color="primary"
            size="small"
            onClick={() => dispatch(deletePost(post._id))}
          >
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default Post;
