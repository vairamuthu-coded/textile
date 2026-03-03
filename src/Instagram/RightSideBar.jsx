import { Avatar } from '@mui/material'
import { Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const RightSideBar = ({user}) => {

  return (
    <div>
            <div className="d-flex flex-row gap-1 m-2 shadow">   
                <Link to={`/profile/${user?.id}`}>   <Avatar  src={`${user.profilePicture}`} alt={user?.username}  > </Avatar>  </Link>                
                                  
                    <div className="fw-semibold text-sm-center" >
                        <Link to={`/profile/${user?.id}`} style={{textDecoration:"none" ,color:"black"}}>
                          <h3>{user?.username} </h3>
                        <span className='btn-close-white '>{user?.bio}</span></Link>
                    </div>
          </div>       
    </div>
  )
}

export default RightSideBar