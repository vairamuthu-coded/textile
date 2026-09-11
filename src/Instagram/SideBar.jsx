import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CreatePost from './CreatePost';
import ChatPage from './ChatPage';

const SideBar = ({user}) => {  
    const navigate = useNavigate(); 
    const dispatch=useDispatch();
  

  const sidebarItem=[
    {icon:<i className="bi bi-house pe-3"></i>,text:"Home"},
    {icon:<i className="bi bi-search pe-3"></i>,text:"Search"},
    {icon:<i className="bi bi-compass pe-3"></i>,text:"Explore"},
    {icon:<i className="bi bi-play-btn pe-3"></i>,text:"Reels"},
    {icon:<i className="bi bi-chat pe-3"></i>,text:"Messages"},    
    {icon:<i className="bi bi-bell-fill pe-3"></i>,text:"Notifications"},
    {icon:<i className="pe-3 bi bi-bag-plus-fill "></i>,text:"Create" },
    {icon:<img src={`${user?.profilePicture}`} className='pe-3'  style={{width:"20%",height:"3%"}} />,text:"Profile"},
    {icon:<i className="bi bi-threads pe-3"></i>,text:"Thread"},
    {icon:<i className="bi bi-list pe-3"></i>,text:"More"},    
    {icon:<i className="bi bi-box-arrow-right pe-3"></i>,text:"Logout"},    
  ]

const [open,setOpen]=useState(false)
  const logoutHandler=async()=>{ 
   
}


const sidebarHandler=(text)=>{
 if(text==="Logout"){ 
  navigate("/Dashboard")
 }

  else if(text==="Create"){ 
  setOpen(true)
 }
  else if(text==="Home"){ 

  navigate('/InstaApp')
  ///${user[0].asptblinstapostid}

 }

 else if(text==="Profile"){ 

  navigate(`/${text}`)


 }

  else if(text==="Messages"){ 
  navigate('/ChatPage')
 }
 else{

 }

}




  return (
    <>


    <div className='mt-3' >
        {/* <img src="Images/instagram.png"  className='object-fit-cover'   />  */}
        <div className='d-flex flex-column gap-3'   >
            {
              sidebarItem.map((item,index)=>{             
               return (
                <>
                <div key={index} className='d-flex flex-row px-2 '   onClick={()=>sidebarHandler(item.text)} >
                {item.icon}
                <span className='align-items-center'>  {item.text}</span>
                  </div>                
                 </>
               )
              })
           }             
      </div>      
<CreatePost open={open} setOpen={setOpen} user={user} />

  </div>
    </>
  )
}

export default SideBar