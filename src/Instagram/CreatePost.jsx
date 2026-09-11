
import { Avatar } from "@mui/material";
import axios from "axios";
import { useContext, useRef, useState } from "react";


import DataContext from "../context/CreateUserContext";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../redux/postSlice";
import { toast } from 'react-toastify';
import { Button, Container, Modal, ModalBody } from "react-bootstrap";



const CreatePost = ({ open, setOpen ,user}) => {
  const { API_URL, colorValue, handleSubmit } = useContext(DataContext);
  const [filee, setFile] = useState("");
   const insert = API_URL + "/InstaPosts";
  const {posts}=useSelector(store=>store.post);

  const [caption, setCaption] = useState("");
  var imagesrc = "",
    imageFile = "";
  const [imagePreview, setImagePreview] = useState("");  
   const [loading, setLoading] = useState(false);

  const dispactch=useDispatch();
  const fileChangeHandler = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
     
      setFile(file);
      const dataUrl = await readFileAsDataURL(file);
      setImagePreview(dataUrl);
    }
  };

  const readFileAsDataURL = async (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const imageref = useRef();

  const createPostHandler = async () => {   
    try{
    if (caption !== "" && imagePreview.length>0) {
      const formdata = {
        asptblinstapostid: 0,
        asptblinstacommentid:0,
        asptblinstauserid:user?.asptblinstauserid,
        asptblinstalikeid:0,
        id: user?.asptblinstauserid,
        caption: caption,
        profilePicture: imagePreview,         
        username: user?.username,
        author: user?.username,
        likes: '',
        comments: '',
        eventname:"post"
      };
      setLoading(true)
      const res = await axios.post(`${insert}`, formdata);
      if (res.data.asptblinstapostid>0) { 
       const formdata1=
    {
      "asptblinstapostid": res.data.asptblinstapostid,
      "user": {
        "userid": res.data.asptblinstauserid,
        "username": user?.username,
        "profilePicture": res.data.profilePicture, 
      },
      "images": res.data.profilePicture,  
      "caption": res.data.caption,
      "likes": 0,
      "comments": [
        
      ],
      "author":user?.username,
      "timestamp": res.data.datetime
    } 
           dispactch(setPosts([formdata1,...posts]));      
           setOpen(false)   ;setImagePreview(null);setCaption("")
           toast.success("New Post Added");
      }
    }else{
      alert("invalid")
    }
  } 
  catch(ex){

  }
  finally{
    setLoading(false)


  }
  };

  const onInteractOutside = () => setOpen(false);


    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
        <>
          {user?.username  ? (
          <div className="p-1"> 
             <Modal className="modal" show={open} onHide={onInteractOutside} >
              <Modal.Header closeButton style={{ backgroundColor: `${colorValue}` }}>
                Create New Post
              </Modal.Header>    
              {/* <ModalBody>
              <Container> */}
              <div className="d-flex justify-content-start p-1">
                <div className="d-flex align-items-center me-4">
                  <Avatar src={user.profilePicture} alt="img"></Avatar>
                </div>
                <div className=" align-items-center">
                  <h1 className="fw-semibold small">{user?.username}</h1>
                  <span className="fw-semibold small">BIo Here...</span>
                </div>
              </div>
              <div className="p-1 ">
                <textarea  value={caption} onChange={(e) => setCaption(e.target.value)}    className="w-100 p-1"   cols={4}  rows={4}   placeholder="write a Caption"      name="textareapost"  style={{border:"1px solid lightgray"}}    ></textarea>
              </div>

              {imagePreview && (
                <div className="d-flex justify-content-center">           
                  <img className="object-fit-cover rounded-2 w-25"  src={imagePreview} alt="preview_img"  ></img>
                </div>
              )}
              <div className="d-felx justify-content-around p-2">
                <input  type="file"    ref={imageref} className="hidden"   onChange={fileChangeHandler}     ></input>
                <button  onClick={() => imageref.current.click()} className="flex-shrink-1 w-100 align-items-center" style={{backgroundColor:`${colorValue}`,color:"white"}} >Choose File</button>
                {imagePreview &&
                  (loading ? (
                    <div className="d-flex justify-content-center">
                      <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                    
                  ) : (
                    <Modal.Footer>
                    <Button onClick={createPostHandler}>Post</Button></Modal.Footer>
                  ))}
              </div> 
              
              {/* </Container>
              </ModalBody> */}
            </Modal> 
       </div>
      ):(<div>Invalid</div>)} 
      </>
  );
};

export default CreatePost;
