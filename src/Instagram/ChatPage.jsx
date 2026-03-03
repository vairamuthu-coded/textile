import { Avatar } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/authSlice";
import { Button } from "react-bootstrap";
import { FiMessageCircle } from "react-icons/fi";
import SideBar from "./SideBar";
import Messages from "./Messages";
import axios from "axios";
import { setMessages } from "../redux/chatSlice";
import DataContext from "../context/CreateUserContext";
import useGetSuggestedUser from "../hooks/useGetSuggestedUser";
import { toast } from "react-toastify";

const ChatPage = () => {
  const { API_URL } = useContext(DataContext);
  const { user, suggestedUsers, selectedUser } = useSelector(
    (store) => store.auth
  );

  const dispatch = useDispatch();
  const [textMessage, setTextMessage] = useState({
    asptblinstamegid: 0,
    messages: "",
  });


  const { onlineuser, messages } = useSelector((store) => store.chat);
  const [insertUpdate, setInsertUpdate] = useState(false);
  const messageGet = API_URL + "/InstaMessages";
  const messageDetails = async (id) => {
    dispatch(setMessages([]))

    try {

     await axios.get(`${messageGet}/${id}`).then((m)=>{
      dispatch(setMessages(m.data));
    }).catch((e)=>{});
   
    } catch (e) {}
  };

  useEffect(() => {   
    return () => {
      dispatch(setSelectedUser(null));
    
    };
  }, []);

  let msgid, msg;
  const updateMessageHandler = (id, msg) => {
    msgid = id;
    msg = msg;
    setTextMessage({ asptblinstamegid: id, messages: msg });
    setInsertUpdate(true);
  };

  const sendMessageHandler = async (id) => {
    try {
      if (insertUpdate === false) {
        const formdata = {
          asptblinstamegid: 0,
          asptblinstauserid: id,
          asptblinstapostid: id,
          asptblinstacommentid: 0,
          id: id,
          messages: textMessage.messages,
          username: user.username,
          senderid: 0,
          receiverid: 0,
        };
        const res = await axios.post(`${messageGet}`, formdata);
        if (res.data.asptblinstamegid > 0) {
          dispatch(setMessages([...messages, res.data]));          
          setInsertUpdate(false);
          toast.success("Inserted");
        }
      }
      if (insertUpdate === true) {
        if (textMessage.asptblinstamegid > 0) {
          const formdata = {
            asptblinstamegid: textMessage.asptblinstamegid,
            asptblinstauserid: selectedUser.asptblinstapostid,
            asptblinstapostid: selectedUser.asptblinstapostid,
            asptblinstacommentid: selectedUser.asptblinstapostid,
            id: selectedUser.asptblinstapostid,
            messages: textMessage.messages,
            username: user.username,
            senderid: 0,
            receiverid: 0,
          };

          await axios.put(`${messageGet}/${textMessage.asptblinstamegid}`,formdata).then((res) =>
             {
              if (res.data.asptblinstamegid >= 1) {
             let mes=   messages.map(m=>m.asptblinstamegid===res.data.asptblinstamegid ? 
             {...m,messages:res.data.messages }: m);
                 dispatch(setMessages(mes))
                toast.success("updated");
                setTextMessage({ asptblinstamegid: "", messages: "" });
                setInsertUpdate(false);
              }
            })
            .catch((e) => {});
        } else {
          toast.success("id value Invalid " + textMessage.asptblinstamegid);
        }
      }
    } catch (e) {
    } finally {
      
    }
  };

  return (
    <div className="container-fluid ">
      <div className="d-flex  justify-content-evently">
        <div className="col-md-2 col-sm-2 border-end">
          <SideBar user={user} />
        </div>
        <div className="col-sm-2 col-md-2  border-end justify-content-evently">
          <h3 className="fw-bold ps-2">{user?.username}</h3>
          {suggestedUsers.map((sug) => {
            const isonline=onlineuser.includes(sug.asptblinstapostid);
            return (
              <div
                onClick={() => dispatch(setSelectedUser(sug))}
                className="d-flex  gap-2 p-2 align-items-center"
              >
                <Avatar src={sug.profilePicture}></Avatar>
                <div
                  className="d-flex flex-column"
                  onClick={() => messageDetails(sug.asptblinstapostid)}
                >
                  <span className="fw-medium">
                    {sug.username} {sug.asptblinstapostid}
                  </span>
                  <span
                    className={`text-sm-center  fw-bold ${
                      onlineuser.length > 0 ? "text-success" : "text-danger"
                    }`}
                  >
                    {onlineuser.length > 0 ? "online" : "offline"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="col-sm-8 col-md-8 mr-2 mx-2 ">
          {selectedUser ? (
            <>
              <div className="d-flex flex-column  h-25 overflow-auto">
                <div className=" d-flex align-items-center">
                  <Avatar src={selectedUser?.profilePicture}></Avatar>
                  <div className="pt-2 ms-2">{selectedUser?.username}</div>
                </div>
             
         
              <div className="d-flex flex-row   py-2 " >
                {messages  && (
                  <Messages
                    messages={messages}
                    updateMessageHandler={updateMessageHandler}
                  />
                )}
              </div>
 </div>
              <hr />
              <div className="d-flex">
                <textarea
                  value={textMessage.messages}
                  onChange={(e) =>
                    setTextMessage({
                      asptblinstamegid: textMessage.asptblinstamegid,
                      messages: e.target.value,
                    })
                  }
                  name="chatmessage"
                  className="col-md-10 px-2"
                ></textarea>
                <Button
                  className="col-md-2"
                  onClick={() =>
                    sendMessageHandler(selectedUser.asptblinstapostid)
                  }
                >
                  send
                </Button>
              </div>
            </>
          ) : (
            <div className="d-flex flex-column align-items-center border-0">
              <FiMessageCircle
                className="col-md-12  my-4"
                style={{ fontSize: "50" }}
              />
              <h3 className="fw-medium">Your Messages</h3>
              <span>send to Message to Start</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
