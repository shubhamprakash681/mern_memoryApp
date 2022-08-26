import "../../styles/Form/form.scss";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";

import { TextField, Button, Typography, Paper } from "@material-ui/core";

// actions import
import { createPost, updatePost } from "../../actions/postsAction";

const initialPostData = {
  creator: "",
  tittle: "",
  message: "",
  tags: "",
  selectedFile: "",
};

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState(initialPostData);

  const post = useSelector((state) =>
    currentId ? state.posts.find((message) => message._id === currentId) : null
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);

  const clearPost = () => {
    setCurrentId(0);
    setPostData(initialPostData);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (currentId === 0) {
      dispatch(createPost(postData));
      clearPost();
    } else {
      dispatch(updatePost(currentId, postData));
      clearPost();
    }
  };

  return (
    <>
      {/* {console.log(post)} */}
      <Paper className="paper">
        <form
          autoComplete="off"
          noValidate
          className={`root form`}
          onSubmit={submitHandler}
        >
          <Typography className="form-headng" variant="h6">
            {currentId ? `Editing "${post.tittle}"` : "Create a Memory"}
          </Typography>
          <TextField
            name="creator"
            variant="outlined"
            label="Creator"
            fullWidth
            value={postData.creator}
            onChange={(e) =>
              setPostData({ ...postData, creator: e.target.value })
            }
          />
          <TextField
            name="title"
            variant="outlined"
            label="Title"
            fullWidth
            value={postData.tittle}
            onChange={(e) =>
              setPostData({ ...postData, tittle: e.target.value })
            }
          />
          <TextField
            name="message"
            variant="outlined"
            label="Message"
            fullWidth
            multiline
            minRows={4}
            value={postData.message}
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
          />
          <TextField
            name="tags"
            variant="outlined"
            label="Tags (coma separated)"
            fullWidth
            value={postData.tags}
            onChange={(e) =>
              setPostData({ ...postData, tags: e.target.value.split(",") })
            }
          />
          <div className={`file-input`}>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setPostData({ ...postData, selectedFile: base64 })
              }
            />
          </div>
          <Button
            className={`submit-button`}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={clearPost}
            fullWidth
          >
            Clear
          </Button>
        </form>
      </Paper>
    </>
  );
};

export default Form;
