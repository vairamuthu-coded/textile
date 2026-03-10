import { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import DataContext from './context/CreateUserContext';
import Marquee from 'react-fast-marquee';

const Dashboard = ({title,subTitle}) => {
  const {sidebar,  newButton,setNewButton,API_URL,defaultDetails,handlepage,colorValue,foreValue,menuheader,headerdrop}=useContext(DataContext)
  const findmenuname1=API_URL+"/UserMaster/FindScreenName";
  const [findmenu, setFindMenu] = useState([]);
  const [fetchError,setFetchError]=useState(null);
const [loading,setLoading] = useState(false);

useEffect(()=>{
  if(menuheader.length > 0){
    handlepage1(0, menuheader[0].menunameid);
  }
},[menuheader])

const handlepage1 = async (index,pid)=>{

  try{

    setLoading(true);

    const res = await axios.get(`${findmenuname1}/${pid}`);

    setFindMenu(res.data);
    setNewButton(index);

  }catch(error){
    console.error(error);
    setFetchError("Failed to load menu");
  }
  finally{
    setLoading(false);
  }

}




  return (   
  <div className="container-fluid">
   <div style={{borderBottom: `1px solid ${colorValue}`}}>  {
   menuheader.map((item,index)=>(
      <h5  key={index}      style={{fontSize:"var(--bs-body-font-size)"}}  className={newButton === index ? "tabs active-tabs" : "tabs panel"}      onClick={()=>handlepage1(index,item.menunameid)}    >
         <button className="col-md-12 boxShadow" style={{color:colorValue}}>     {item.menuname}     </button>
      </h5>
   )) }
   </div>

   <div className="container-fluid">
   <div className="row animate-zoom boxShadow">
   {findmenu.map((item,index)=>(    
      <div  key={index}   className="col-lg-3 col-md-4 col-sm-6 p-2"   onClick={()=>handlepage(item.menuname)}  >
         <div className="card" style={{cursor:"pointer", borderRadius:"8px"}}    >
         <div className="card-body d-flex justify-content-between align-items-center"  style={{background:colorValue,color:foreValue}}        >
            <div> <h3 style={{margin:"0",color:foreValue}}>        {item.menuname}   </h3> </div>
            <div>  <img    src={item.companylogoo}    style={{width:"28px",height:"28px"}}  alt=""   />  </div>
         </div>
         </div>
      </div>
   ))}
   </div>
   </div>
</div>
  
  )
}

export default Dashboard
