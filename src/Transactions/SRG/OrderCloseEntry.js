  import { useContext, useRef, useState } from "react";

import TextInput from "../../component/elements/TextInput ";
import Input from "../../component/elements/Input";
import DataContext from "../../context/CreateUserContext";
import axios from "axios";
import { toast } from "react-toastify";

const OrderCloseEntry = ({title,subTitle}) => {
 const { API_URL, newButton, inputref, handleSubmit, tabindex, bgValue, currentPage, setCurrentPage,
    CountryParam, searchLable1, searchLable2, searchLable3,  addColumns2, setAddColumns2,
    setSearchLable1, setSearchLable2, setSearchLable3, defaultDetails,
     colorValue, foreValue,loginCompCode,loginUser,defectValues, setDefectValues,addRows2, setAddRows2,
    sorting, setSorting, setNewButton, sizeGroup, setSizeGroup, color1,  HeadersColumn2,defpo, setDefPo } = useContext(DataContext);
  const [fetchError, setFetchError] = useState(null)
  const refs = useRef([]);
  let TableName='asptblcutpanret' 
    const [pos, setPos] = useState([]);
    const minDate = new Date().toISOString().slice(0, 10)
    var imagesrc = '', imageFile = '';
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    var data1 = [], data2 = []; var datas = []; var datasize1 = [];
    var dataIndex = [];
    const [images, setImage] = useState(imagesrc);

const handleChange = async (e) => {
  const { name, value } = e.target;
  if (value === "") return;
  setDefectValues(prev => ({ ...prev, [name]: value }));
  try {
    // -------------------------
    // 1) COMP CODE CHANGE
    // -------------------------


    // -------------------------
    // 2) ISSUE TYPE CHANGE
    // -------------------------
 

    // -------------------------
    // 3) PONO CHANGE
    // -------------------------
  
  }
  catch (error) {
    toast.error(error);
    setFetchError(error);
  }
};

  return (
    <div>
 <TextInput type={'text'} ref={(el) => (refs.current[0] = el)}  onKeyDown={() => refs.current[1]?.focus()} className1='col-md-2' 
  stylecolor={`${foreValue}`}  className='col-md-2' title={"Pono"} id='Pono'   value={defectValues.Asptblcutpanretid || ""} onChange={handleChange} barValues={defectValues} setBarValues={setDefectValues}
  name='Pono' placeholder='' name1="PoNo"  visible={true} maxLength={15} />


 <TextInput type={'text'}  ref={(el) => (refs.current[1] = el)} 
 onKeyDown={() => refs.current[2]?.focus()} className1='col-md-1' className='col-md-2' id='OrderNo' name='OrderNo' 
 placeholder='' value={defectValues.Orderno || ""} onChange={handleChange} barValues={defectValues} setBarValues={setDefectValues}
  name1="Erp-OrderNo" stylecolor={`${colorValue}`} visible={true} tabIndex={8}  />

   
{/* <TextInput
  ref={(el) => (refs.current[0] = el)}
  type="date"
  className="col-md-2"
  placeholder="Name"
  onEnter={() => refs.current[1]?.focus()}
/>

<TextInput
  ref={(el) => (refs.current[1] = el)}
  type="text"
  className="col-md-2"
  placeholder="Age"
  onEnter={() => refs.current[2]?.focus()}
/> */}

<label className="col-md-1"   > bbbb </label>
<select
  ref={(el) => (refs.current[2] = el)}
  onKeyDown={(e) => e.key === "Enter" && refs.current[3]?.focus()}
>
   <option></option> 
             <option value={1}>test</option>
        <option value={2}>test-1</option>
        <option value={3}>test-2</option>
</select>
{/* <TextInput
  ref={(el) => (refs.current[3] = el)}
  type="text"
  className="col-md-2"
  placeholder="Age0"
  onEnter={() => refs.current[4]?.focus()}
/>
<TextInput
  ref={(el) => (refs.current[4] = el)}
  type="text"
  className="col-md-2"
  placeholder="Age1"
/> */}
 
    </div>
  );
}
 export default OrderCloseEntry