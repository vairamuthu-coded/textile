import { Avatar } from '@mui/material'
import { useContext, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from 'react-bootstrap'
import axios from 'axios'
import { LoaderIcon } from 'react-hot-toast'
import DataContext from '../context/CreateUserContext'
import { setAuthUser, setUserProfile } from '../redux/authSlice'
import { toast } from 'react-toastify'
import SideBar from './SideBar'

const EditProfile = () => {
      const { API_URL, colorValue } = useContext(DataContext);
  const{userProfile, user}=useSelector(store=>store.auth);
  const imageRef=useRef();
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [loading,setLoading]=useState(false)
 const { urls } = useContext(DataContext);
const insert = API_URL+"/InstaUsers";
  const [filee, setFile] = useState("");
  var imagesrc = "", imageFile = "";
  const [imagePreview, setImagePreview] = useState("");  
  const [inputEdit, setInputEdit] = useState({ "profilePicture":user.images,    "bio":user.bio, "gender":user.gender  });
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

  const fileChangeHandler = async (e) => {
    const {name,value,type}=e.target;
    const file = e.target.files?.[0];   
    if(type==="file"){
      
      setFile(file);     
      const dataUrl = await readFileAsDataURL(file);
      setInputEdit({...inputEdit,profilePicture:dataUrl});
    setImagePreview(dataUrl)
    }
    else{

      setInputEdit({...inputEdit,[name]:value})
    }
    
  };
  const editHandleSave=async()=>{   
    try{    

     setLoading(true) 
         const formdata = {
        asptblinstauserid: user.asptblinstauserid,
        id:user.asptblinstauserid,
         likes: user.likes===true ? 'T' : 'F',
         profilePicture: imagePreview,
         gender:inputEdit.gender,      
         username: user.username,
         author: user.username,   
         bio:inputEdit.bio,
         eventname:'insert',    
     };  

    const response = await axios.put(`${insert}/${user.asptblinstauserid}`, formdata)
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // });
      if (response.data != null) {
      const updateUserPost={...user ,id:response.data.id, bio:response.data.bio,gender:response.data.gender,images:response.data.profilePicture}
      dispatch(setAuthUser(updateUserPost)) ;
      const newpost={asptblinstapostid:user.asptblinstauserid, username:response.data.username, images:response.data.profilePicture, post:response.data.bio}
               const editedProfile=userProfile.map(p=>p.asptblinstapostid===user.asptblinstauserid ? 
                {...p,bio:response.data.bio, posts:[...p.posts,newpost]}  : p)  
                 dispatch(setUserProfile(editedProfile)) ;

      toast.success("Record Saved Successfully")
      navigate('/InstaApp')
    }
    }
    catch(e){

    }
    finally{
      setLoading(false)
    }
  }

  // const selectChangeHandler=(e)=>{
  //   setInputEdit({...inputEdit,gender:e.target.value})
  // }

  // const bioChangeHandler=(e)=>{
  //   setInputEdit({...inputEdit,bio:e.target.value})
  // }
 




  return (
    <>
    <div className='row'>
      <div className='col-md-2'>
        <SideBar urls={urls} user={user} />
      </div>
       <div className='col-md-3'>
         <section className='d-flex flex-column border h-100' >
           bar details
         </section>
      </div>
       <div className='col-md-5'>
      <section className='d-felx flex-column bg-light'>
        <h3 className='fw-bold'>Edit Profile</h3>
        <div className='d-flex align-items-center gap-2 '>
          <Link><Avatar src={imagePreview !=='' ? imagePreview : `${user.profilePicture}`}></Avatar></Link>
          <div className='fw-semibold'>
            <Link to={`/profile/${user.asptblinstapostid}`}></Link>
            <span className=''>{user?.bio}</span>
          </div>
          <div className=' ms-auto'>
            <input ref={imageRef} type='file' name="profilePicture" onChange={fileChangeHandler} className='hidden'></input>
        <Button onClick={()=>imageRef.current.click()}  className='col-md-12'> Change Photo</Button>
        </div>
          </div>
      </section>
          <div className='row'>
            <h3>Bio</h3>
            <textarea onChange={fileChangeHandler} name="bio" value={inputEdit.bio} cols={3} rows={3} className='col-md-9 fw-semibold border-info'  ></textarea>
          </div>
            <div className='row'>
            <h3>Gender</h3>
              <select onChange={fileChangeHandler} name="gender" value={inputEdit.gender} className="form-select col-md-9 border-info" aria-label="Default select example">
                <option></option>
                <option value="Male">Male</option>
                <option value="FeMale">FeMale</option>                
              </select>
          </div>
          <div className='d-flex justify-content-end'>
            {
              loading ? (<Button><LoaderIcon/> please wait</Button>) : (       
            <Button onClick={editHandleSave}>Submit</Button>
          )
        }
          </div>
    </div>
     <div className='col-md-2'>

     </div>
    </div>
     
      </>
  )
}

export default EditProfile
