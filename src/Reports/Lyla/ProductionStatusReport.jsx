import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import DataContext from '../../context/CreateUserContext';
import axios from 'axios';
import SocialMissing from '../../Social/SocialMissing';
import Label from '../../Custom/Label'; 
import { toast } from 'react-toastify';
import { useReactToPrint } from 'react-to-print';
import SortingDetails from '../../component/data/SortingDetails';
import Input from '../../component/elements/Input';
import dateFormat from 'dateformat'
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import Search from '../../Custom/Search';
import { Await, useParams } from 'react-router-dom';
import { colors } from '@mui/material';
import { highlightPlugin } from '@react-pdf-viewer/highlight';

      
const ProductionStatusReport = ({ title, subTitle, }) => {
     const { API_URL, newButton,
            colorValue,bgValue,foreValue, 
        defaultDetails,color1,
            setNewButton, statuspo, setStatusPo } = useContext(DataContext)
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
const ENDPOINTS = {  
  PONO_DETAILS: "/ProductionStatusReport/GetPO",
};

const GetPO = API_URL + ENDPOINTS.PONO_DETAILS;
  let workerUrls="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js";
   const [pdfFile, setPdfFile]=useState(null);const [docFormat,setDocFormat]=useState(null)
     const [userRights1, setUserRights1] = useState([])  ;   const [fetchError, setFetchError] = useState(null)
           const [searchCompCode, setSearchCompCode] = useState([])
           const [searchUserName, setSearchUserName] = useState([])
           const printFormat=["PDF","WORD"];  setNewButton(1);
               const [statusReport, setStatusReport] = useState([])

    const TabIndexClick = async(inx,Pono) => {  
if(Pono){
        const response = await axios.get(`${API_URL}/ProductionStatusReport/ProdcutionReport/${printFormat[0]}/${Pono}`);
        setPdfFile(`data:application/pdf;base64,${response.data}`);  
        setDocFormat(`data:application/pdf;base64,${response.data}`); 
        setNewButton(inx); 
}     else{
    toast.error("errror"+Pono)
}
    }

    useEffect(()=>{
        async function GetApi() {
         const res =  await axios.get(`${GetPO}/${defaultDetails.Compcode}`);       
         const [res0]=await Promise.all([res]);         
            setStatusPo(res0.data);
        }
        GetApi();
    },[])

    const handleChange = async (e) => {
        const { name, value, type, checked } = e.target;      
         setStatusReport(prev => ({
        ...prev,
        [name]: value
    }));
    }

const highlight = highlightPlugin();

            return (              
    <div className='row animate-zoom'>
       
           <h6 className='d-flex justify-content-evenly mt-1 p-1' style={{backgroundColor:`${colorValue}`}}  >
                                        
                    
                               <Label className={`col-md-1 ps-1`} name="Pono" forecolor={`${foreValue}`} labelName={"Pono "} visible={true}  ></Label>
                                <select className='col-md-2' name="Pono"  tabIndex="2" style={{ color: `${colorValue}` }}
                                  value={statusReport.Pono || ""} onChange={handleChange} >
                                  <option></option>{                       
                                    statuspo.map((result, index) => (<option key={index} value={result.pono}>
                                      {result.pono}
                                    </option>))
                                  }
                                </select>
                                <Input type={'date'} className1='col-md-1 ps-1' className='col-md-2' id='FromDate' name='FromDate' placeholder='' value={statusReport.FromDate || ""} onChange={handleChange} barValues={statusReport} setBarValues={setStatusReport} name1={"From Date"} colorValue={colorValue} stylecolor={color1[0]} visible={true} />
                                <Input type={'date'} className1='col-md-1 ps-1' className='col-md-2' id='ToDate' name='ToDate' placeholder='' value={statusReport.ToDate || ""} onChange={handleChange} barValues={statusReport} setBarValues={setStatusReport} name1={"To Date"} colorValue={colorValue} stylecolor={color1[0]} visible={true} />
                                <button type={'submit'} className='align-items-end' id='ToDate' name='btnsearch' style={{color:`${color1[1]}`}} onClick={() => TabIndexClick(1,statusReport.Pono)}  >Search</button>

                              </h6>

          {/* <ul className='bloc-tabs' style={{paddingBottom:'white'}}>
               
            
                <li className='ps-2'> <button className={newButton === 4 ? "tabs active-tabs btn" : "tabs "}  style={{ backgroundColor:`${colorValue}`, width:'100%',fontWeight:'bold', }} > Reports Status </button></li>
          </ul> */}
         
                 {setFetchError&&<span className='text-danger '>{setFetchError}</span>}   
                     <div className='col-md-12' style={{height:'446px',overflow:'auto'}}>      
                      {     pdfFile &&
                            <Worker workerUrl={workerUrls}>     
                                                        
                            <Viewer fileUrl={pdfFile} 
                            defaultScale={1}  plugins={[defaultLayoutPluginInstance,highlight]}  ></Viewer>   
                            </Worker>  
                    }
                     </div>                                                  
                {!pdfFile&&<>No file is selected yet</>}
    </div>        
   )
}

export default ProductionStatusReport