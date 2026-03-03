import { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import DataContext from './context/CreateUserContext';
import Marquee from 'react-fast-marquee';

const Dashboard = ({title,subTitle}) => {
  const {sidebar,  newButton,setNewButton,API_URL,defaultDetails,handlepage,colorValue,foreValue,menuheader,headerdrop}=useContext(DataContext)
  const findmenuname1=API_URL+"/UserMaster/FindScreenName";
  const [findmenu, setFindMenu] = useState([]);
  const [fetchError,setFetchError]=useState(null);
      // const urls="http://localhost:3002"; 
      // useGetAllPost(`${API_URL}/InstaPosts`);  
      // useGetSuggestedUser(`${API_URL}/InstaUsers`,"suggestions","0");
      // useGetSuggestedUser(`${urls}/followers`,"followers","0"); 
      // useGetSuggestedUser(`${urls}/profiles`,"profile","0");
      // useGetSuggestedUser(`${API_URL}/InstaComments`,'comments','0');
      // useGetSuggestedUser(`${API_URL}/InstaUsers/${defaultDetails.UserId}`,'userdetails','0');
      // useGetSuggestedUser(`${urls}/stories`,'stories','0');

useEffect(()=>{
  handlepage1(0,2);  
},[])


const handlepage1= async (index,pid)=>{

  try{
  await axios.get(`${findmenuname1}/${pid}`).then((res) => {setFindMenu(res.data);  }) 
   .catch((error)=>{alert(error);
   });  
  setNewButton(index); 
  }
  catch(e){}
}





  return (   
    <div className='container-fluid'>
       {/* <Marquee    style={{textAlign:"center", padding:'0.3%',margin:'0.1%', background:`${colorValue}`,color:`${foreValue}`}}> {title} </Marquee>  */}

    <div style={{borderBottom: `1px solid ${colorValue}`}}>     {      
            menuheader.map((item,index)=>(   
                <h5  style={{fontSize:`var(--bs-body-font-size)`}}  key={index} className={newButton ===index ? "tabs active-tabs " : "tabs panel"} 
                 onClick={(e)=>handlepage1(index,item.menunameid)}>
                   <button className='col-md-12 col-sm-12 col-lg-12 boxShadow'  style={{color:`${colorValue}`}}>  {item.menuname}</button>
                </h5>
             ))           
        }
      </div>

    <div className='container-fluid  ' >
       <div className={newButton ===0 ? "active-content" : "content"} >
        <div className='row animate-zoom boxShadow'>            
        {  
            findmenu.map((item,index)=>(             
              <div className='col-md-3 panel p-1'  width={item.menuname.length} key={index}   onClick={(e)=>handlepage(item.menuname)} to={`/${item.menuname}`}   >
                    <div className='d-flex justify-content-evently boxShadow ' style={{background:`${colorValue}`}}  >
                    <button className='col-lg-11 col-md-11 col-sm-11 float-start' style={{background:`${colorValue}`, fontSize:`${'var(--bs-bigfont)'}` }} >
                    {item.menuname}  
                     <img src={item.companylogoo} className='col-lg-1  col-md-1 col-sm-1 float-end'  />  
                        </button>    
                    </div>                   
              </div>   
             ))           
        }  
        </div>    
      </div>
      <div className={newButton ===1 ? "content active-content" : "content"} >
      <div className='row animate-zoom'>
      {          
            findmenu.map((item,index)=>(   
             <div className='col-md-3 p-1 panel'   width={item.menuname.length}   key={index}   onClick={(e)=>handlepage(item.menuname)} to={`/${item.menuname}`}   >
              <div className='d-flex justify-content-evently boxShadow' style={{backgroundColor:`${colorValue}`}}  >
                  <button className='col-lg-11 col-md-11 col-sm-11 ' style={{backgroundColor:`${colorValue}`, fontSize:`${'var(--bs-bigfont)'}`  }} >
                    {item.menuname}    
                     <img src={item.companylogoo} className='col-lg-1  col-md-1 col-sm-1 float-end'  />  
                        </button>  
             
              </div>
             
        </div>  
             )
            )
        }
  
      </div>
         </div>
         <div className={newButton ===2 ? "content active-content" : "content"} >
         <div className='row animate-zoom'>
      {          
            findmenu.map((item,index)=>(   
           <div className='col-md-3 panel p-1'  width={item.menuname.length} key={index}   onClick={(e)=>handlepage(item.menuname)} to={`/${item.menuname}`}   >
                    <div className='d-flex justify-content-evently  boxShadow' style={{background:`${colorValue}`}}  >
                    <button className='col-lg-11 col-md-11 col-sm-11 float-start ' style={{background:`${colorValue}`, fontSize:`${'var(--bs-bigfont)'}` }} >
                    {item.menuname}  
                     <img src={item.companylogoo} className='col-lg-1  col-md-1 col-sm-1 float-end'  />  
                        </button>    
                    </div>                   
              </div>    
             )
            )
        }
  
      </div>
         </div>
         <div className={newButton ===3 ? "content active-content" : "content"}  >
         <div className='row animate-zoom'>
      {          
            findmenu.map((item,index)=>(   
              <div className='col-md-3 p-1 panel'  width={item.menuname.length}  key={index}   onClick={(e)=>handlepage(item.menuname)} to={`/${item.menuname}`}   >
             <div className='d-flex justify-content-between boxShadow' style={{backgroundColor:`${colorValue}`}}  >
                <button className='col-lg-11 col-md-11 col-ms-11 float-start ' style={{backgroundColor:`${colorValue}`, fontSize:`${'var(--bs-bigfont)'}` }} >
                    {item.menuname}       
                 
                     <img src={item.companylogoo} className='col-lg-1  col-md-1 col-sm-1 float-end'  />  
                        </button> 
             
              </div>
             
        </div>  
             )
            )
        }
  
      </div>
         </div>
         <div className={newButton ===4 ? "content active-content" : "content"}  >
         <div className='row animate-zoom'>
      {          
            findmenu.map((item,index)=>(   
              <div className='col-md-3 p-1 panel'  width={item.menuname.length}  key={index}   onClick={(e)=>handlepage(item.menuname)} to={`/${item.menuname}`}   >
             <div className='d-flex justify-content-evently boxShadow' style={{width:"100%",backgroundColor:`${colorValue}`}}  >
                <button className='col-lg-11 col-md-11 col-ms-11 float-start ' style={{backgroundColor:`${colorValue}`, fontSize:`${'var(--bs-bigfont)'}` }} >
                    {item.menuname}       
                 
                     <img src={item.companylogoo} className='col-lg-1  col-md-1 col-sm-1 float-end'  />  
                        </button> 
             
              </div>
             
        </div>  
             )
            )
        }
  
      </div>
         </div>
         <div className={newButton ===5 ? "content active-content" : "content"}  >
         <div className='row animate-zoom'>
      {          
            findmenu.map((item,index)=>(   
              <div className='col-md-3 p-1 panel'   width={item.menuname.length} key={index}   onClick={(e)=>handlepage(item.menuname)} to={`/${item.menuname}`}   >
             <div className='d-flex justify-content-evently boxShadow' style={{width:"100%",backgroundColor:`${colorValue}`}}  >
                 <button className='col-lg-11 col-md-11 col-ms-11 float-start ' style={{backgroundColor:`${colorValue}`, fontSize:`${'var(--bs-bigfont)'}` }} >
                    {item.menuname}       
                 
                     <img src={item.companylogoo} className='col-lg-1  col-md-1 col-sm-1 float-end'  />  
                        </button> 
              </div>
              </div>  
             )
            )
        }
  
      </div>
         </div>
                  <div className={newButton ===6 ? "content active-content" : "content"}  >
         <div className='row animate-zoom'>
      {          
            findmenu.map((item,index)=>(   
              <div className='col-md-3 p-1 panel'   width={item.menuname.length} key={index}   onClick={(e)=>handlepage(item.menuname)} to={`/${item.menuname}`}   >
             <div className='d-flex  justify-content-evently boxShadow' style={{width:"100%",backgroundColor:`${colorValue}` ,borderRadius:"1%"}}  >
                 <button className='col-lg-11 col-md-11 col-ms-11 float-start ' style={{backgroundColor:`${colorValue}`, fontSize:`${'var(--bs-bigfont)'}` }} >
                    {item.menuname}       
                 
                     <img src={item.companylogoo} className='col-lg-1  col-md-1 col-sm-1 float-end'  />  
                        </button> 
             
              </div>
             
        </div>  
             )
            )
        }
  
      </div>
         </div>
   </div>
   </div>
  )
}

export default Dashboard
