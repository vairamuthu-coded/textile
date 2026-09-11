import React from 'react'

const FormData = ({post}) => { 
    alert("FormData"+post);
    return (    
    {
      "asptblinstapostid": post.asptblinstapostid,
      "user": {
        "userid": post.asptblinstapostid,
        "username": post.username,
        "profilePicture": post.profilePicture, 
      },
      "images": post.profilePicture,  
      "caption": post.caption,
      "likes": 1,
      "comments": [
        {
          "user": post.username,
          "comment":post.comments
        }
      ],
      "author":post.username,
      "timestamp": post.datetime
    }   
  )
}

export default FormData