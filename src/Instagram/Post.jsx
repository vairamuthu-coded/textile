import { Avatar } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Badge, Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import CommentDialog from "./CommentDialog";
import { Link, useNavigate } from "react-router-dom";
import { BsChatRight, BsFillBagHeartFill, BsThreeDots } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import DataContext from "../context/CreateUserContext";
import { toast } from "react-toastify";
import { setPosts, setSelectedPost } from "../redux/postSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Post = ({ post }) => {
  const { selectedPost, posts } = useSelector((store) => store.post);

  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const { API_URL, colorValue } = useContext(DataContext);
  const insert = API_URL + "/InstaPosts";
  const insertLikes = API_URL + "/InstaLikes";
  const instaComments = API_URL + "/InstaComments";
  const [comment, setComment] = useState([]);

  useEffect(() => {
    post && setComment(post.comments);
  }, [post]);

  const navigate = useNavigate();
  const [showChild, setShowChild] = useState(false);
  const handleChildClose = () => setShowChild(false);
  const handleChildShow = () => {
    setShowChild(true);
  };
  const handleShow = () => {
    setOpen(true);
  };
  const { user } = useSelector((store) => store.auth);

  const [liked, setLiked] = useState(false);
  const [postLike, setPostLike] = useState(post === null ? 0 : post.likes);
  const TextChangeHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  };

  const [msgText, setMsgText] = useState();

  const ChangeEventHandle = (e) => {
    const { name, value } = e.target;
    if (value != "") {
      setMsgText(value);
    } else {
      setMsgText("");
    }
  };
  const sendMessageHandle = () => {};
  const dispatch = useDispatch();

  const deleteHandler = async (deletedid) => {
    await axios
      .delete(`${insert}/${deletedid}`)
      .then((res) => {
        if (res.data > 0) {
          toast.success("Record Deleted : " + res.data);
          const updatedPost = posts.filter((item) => item.asptblinstapostid !== deletedid);
          dispatch(setPosts(updatedPost));
        }
      })
      .catch((error) => {
        toast.error(error);
      });
    setShowChild(false);
  };

  const likeorDislikeHandler = async (likeid) => {
    try {
      const action = liked ? "dislike" : "like";
      const updatedPostLike = liked ? postLike - 1 : postLike + 1;
      setPostLike(updatedPostLike);
      setLiked(!liked);
      const formdata = {
        asptblinstapostid: 0,
        asptblinstauserid: user?.asptblinstauserid,
        id: likeid,
        caption: post.caption,
        profilePicture: post.images,
        username: post.user.username,
        author: post.user.username,
        likes: !liked,
        comments: "",
        eventname: "likes",
      };

      const res = await axios.post(`${insert}`, formdata);
      if (res.data.asptblinstapostid > 0) {
        const updatedPostData = posts.map((p) =>
          p.asptblinstapostid === post.asptblinstapostid
            ? {
                ...p,
                likes: liked ? p.likes.filter((asptblinstapostid) => asptblinstapostid !== post.asptblinstapostid) : [...p.likes, post.asptblinstapostid],
              }
            : p,
        );

        dispatch(setPosts(updatedPostData));
        toast.success("likes Added  : " + !liked);
      }
    } catch (ex) {
    } finally {
    }
  };

  const postHandler = async (commentid) => {
    try {
      const formdata = {
        asptblinstacommentid: 0,
        username: user.username,
        id: user?.asptblinstauserid,
        comments: text,
        author: user.author,
        posts: commentid,
        eventname: "comments",
      };

      const res = await axios.post(`${instaComments}`, formdata);

      if (res.data.asptblinstacommentid > 0) {
        let newComments = { user: user.username, comment: text };
        const updatedCommentData = [...comment, newComments];
        setComment(updatedCommentData);
        const updatedPostData = posts.map((p) => (p.asptblinstapostid === res.data.posts ? { ...p, comments: updatedCommentData } : p));
        dispatch(setPosts(updatedPostData));

        setText("");
        toast.success("Comments Added  : " + post.asptblinstapostid);
      }
    } catch (ex) {
    } finally {
    }
  };

  return (
    <>
      {post && (
        <div className="container-fluid shadow">
          <div key={post.asptblinstapostid} className="row">
            <div className="d-flex   pe-3 ">
              <div className="p-1">
                {" "}
                <Avatar src={user?.profilePicture} alt={post.author}>
                  {" "}
                </Avatar>
              </div>
              <div className="p-1">
                {post?.username} {post?.asptblinstapostid} {post?.id}{" "}
              </div>
              <div className="p-1 justify-content-end">{user?.asptblinstauserid === post.asptblinstapostid && <Badge variant="secondary">Author </Badge>}</div>
              <div className="ms-auto p-1" onClick={() => handleChildShow(showChild)}>
                {" "}
                <BsThreeDots />{" "}
              </div>
              <Modal show={showChild} onHide={() => setShowChild(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>Comments {post.asptblinstapostid}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex flex-column align-items-center  ">
                  <Button variant="ghost" className="strong">
                    {" "}
                    UnFollow{" "}
                  </Button>
                  <Button variant="ghost" className="strong">
                    {" "}
                    Add Favourites{" "}
                  </Button>
                  {user && user?.asptblinstauserid === post.asptblinstapostid && (
                    <Button onClick={() => deleteHandler(post.asptblinstapostid)} variant="ghost" className="strong">
                      {" "}
                      Delete s{" "}
                    </Button>
                  )}
                </Modal.Body>
              </Modal>
            </div>
            <p>{post.comments.user}</p>
            <div className="d-flex flex-column justify-content-between">
              <img src={post.images} className="col-md-6" style={{ width: "20%" }} />
            </div>
            <div className="d-flex flex-row p-1">
              <div className="w-100">
                {liked ? (
                  <FaHeart onClick={() => likeorDislikeHandler(post.asptblinstapostid)} size={"12"} style={{ marginRight: "15px", color: "red" }} />
                ) : (
                  <FaRegHeart size={"12"} onClick={() => likeorDislikeHandler(post.asptblinstapostid)} style={{ marginRight: "15px" }} />
                )}
                <i
                  className="bi bi-chat pe-2"
                  onClick={() => {
                    dispatch(setSelectedPost(post));
                    setOpen(true);
                  }}
                ></i>

                <i className=" bi bi-send pe-2"></i>
              </div>
              <div className="flex-shrink-1">
                <i className="bi bi-bookmark"></i>
              </div>
            </div>
            <span className="pe-3" style={{ color: "black", fontWeight: "bold" }}>
              {postLike} Likes
            </span>
            <span className="d-flex text-truncate">
              {post.user?.username} {post.caption}
            </span>
            {comment && (
              <span
                className="pe-1"
                onClick={() => {
                  dispatch(setSelectedPost(post));
                  setOpen(true);
                }}
              >
                View {Number(comment.length)} Comments
              </span>
            )}
            <CommentDialog key={post.asptblinstapostid} open={open} setOpen={setOpen} post={post} />
            <div className="row p-2">
              <img src={user?.profilePicture} alt={post.author} style={{ width: "7%", height: "5%" }} className="object-fit-contain" />
              <textarea cols={"3"} rows={"3"} placeholder="add comments.." value={text} onChange={TextChangeHandler} style={{ border: "1px solid whitesmoke", padding: "2px" }} className="col-md-9"></textarea>
              {text && (
                <button type="button" onClick={() => postHandler(post.asptblinstapostid)} className="btn col-md-1">
                  post
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Post;
