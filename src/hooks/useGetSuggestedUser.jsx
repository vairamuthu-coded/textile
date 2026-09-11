import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAuthUser,
  setSuggestedUsers,
  setUserFollowers,
  setUserFollowing,
  setUserProfile,
  setUserStories,
} from "../redux/authSlice";
import axios from "axios";
import { setMessages } from "../redux/chatSlice";
import { setPosts } from "../redux/postSlice";
import { MdOutlineExpandCircleDown } from "react-icons/md";

const useGetSuggestedUser = (url, slicename, userid) => {
  const dispatch = useDispatch();
  const { posts } = useSelector((store) => store.post);
  const [comment, setComment] = useState([]); const updatedPostData = "";
   const updatedCommentData="";let j=0;
  useEffect(() => {
    const fetchSuggestion = async () => {
      try {
        if (slicename === "suggestions") {
          const res0 = await axios.get(`${url}`);
          if (res0.data !== "") {
            dispatch(setSuggestedUsers(res0.data));
          }
        }
        if (slicename === "comments") {
          const res = await axios.get(`${url}`);
          if (res.data !== "") {            
          //  updatedPostData= posts.map(p =>{
          //     res.data.map(c =>               
          //        c.posts === p.asptblinstapostid
          //          ? {
          //              ...p,
          //              comments: [
          //                ...p.comments,
          //                { user: c.username, comment: c.comments },
          //              ],
          //            }
          //          : p
          //        )
          // });
          //   dispatch(setPosts(updatedPostData));
          }

        }

        if (slicename === "profile") {
          const res1 = await axios.get(`${url}`);
          if (res1.data !== "") {
            dispatch(setUserProfile(res1.data));
          }
        }
        if (slicename === "followers") {
          const res2 = await axios.get(`${url}`);
          if (res2.data !== "") {
            dispatch(setUserFollowers(res2.data));
          }
        }
        if (slicename === "following") {
          const res3 = await axios.get(`${url}`);
          if (res3.data !== "") {
            dispatch(setUserFollowing(res3.data));
          }
        }
        if (slicename === "userdetails") {
          const res4 = await axios.get(`${url}`);
          if (res4.data !== "") {
            dispatch(setAuthUser(res4.data));
          }
        }
        if (slicename === "stories") {
          const res5 = await axios.get(`${url}`);
          if (res5.data !== "") {
            dispatch(setUserStories(res5.data));
          }
        }
        if (slicename === "chat") {
          const res7 = await axios.get(`${url}`);
          if (res7.data !== "") {
            dispatch(setMessages(res7.data));
          }
        }
        //    if (slicename === "messages") {
        //     const res7 = await axios.get(`${url}`);
        //     if (res7.data !== "") {

        //       dispatch(setMessages(res7.data));
        //     }
        //  }
      } catch (e) {}
    };
    fetchSuggestion();
  }, []);
};

export default useGetSuggestedUser;
