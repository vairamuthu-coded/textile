import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
const ViewStory = () => {
    const [viewstorys, setViewStorys] = React.useState([]);
    const { id,tot } = useParams(); // Get the story ID from the URL parameters
let urls = "http://localhost:3002"; // Default URL if not provided
    React.useEffect(() => {    
        fetch(`${urls}/stories/${id}`)
            .then(response => response.json())
            .then((data) => {setViewStorys(data) ; })
            .catch(error => console.error('Error fetching view stories:', error));
    }, [id]);  

    const navigate = useNavigate();

  const handleClick= (id) => {
        fetch(`${urls}/stories/${id}`)
            .then(response => response.json())
            .then((data) => {setViewStorys(data) ;  })
            .catch(error => console.error('Error fetching view stories:', error));
    };
 
    return (    
        <>
        
        <div className="bg-light">           
            {viewstorys.images != null ? (
                <ul  className="mx-2 align-items-center " style={{width: "100%", height: "auto", position: "relative"}}> 
                    <li key={viewstorys.id}>
                  <p>{viewstorys.user.username}</p>         
               <img src={"/"+viewstorys.user.profilePicture}   className='rounded-circle'   />
                    <div  style={{width: "100%", height: "auto", position: "absolute",  display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                       
                        <Link onClick={() => handleClick(`${Number(viewstorys.id)-1}`)} style={{zIndex: 1,fontSize: "30px"}}><i className="bi bi-arrow-left-circle-fill "></i> </Link>  
                        <img src={"/"+viewstorys.images}   style={{width: "25%", height: "25%", objectFit: "cover"}}  />
                        <Link onClick={() => handleClick(`${Number(viewstorys.id)+1}`)} style={{zIndex: 1,fontSize: "30px"}}><i className="bi bi-arrow-right-circle-fill" ></i> </Link>  
                    </div>   
                    </li>
                </ul>          
            ) : <p>{navigate("/InstaApp")}</p>}          
        </div>     
        </>
    );
}

export default ViewStory