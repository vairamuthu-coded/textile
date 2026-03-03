import React, { useContext, useState } from 'react'

import { Button, Grid2, Paper, TextField, Typography } from '@mui/material'
import DataContext from '../../context/CreateUserContext';
import { useNavigate, useParams } from 'react-router-dom'
import Label from '../../Custom/Label';
import ShopContext from '../../context/CreateShopContext';


const NewProduct = (defaultDetails,remarksValues,setRemarksValues,colorValue) => {
    const { handleSubmit,localServerCart,sizeItems, colorItems, setSizeItems, setColorItems, } = useContext(ShopContext)

    let paperstyle = {
      width: 400,
      margin: "20px auto",
      padding: "10px"
  }


  
  const [newProduct,setNewProduct]=useState({  
      total: 5,title: "",   price: 500,
      description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      category: "",  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
       colorname:" ",
        sizename: "",
      rating: {rate: 0, count: 0}
  })

  const newobj=useParams();

    const handleChange = (e) => {
        const { name, value } = e.target;
        let fieldname = name.split('rating.')[1];
        if (name.includes("rating.")) {
            setNewProduct({
                ...newProduct,
                rating: {
                    ...newProduct.rating,
                    [fieldname]: value
                }
            })
        } else {
            setNewProduct({
                ...newProduct, [name]: value,
            })
        }
    };

let handleSave=()=>{ 
   
    fetch(`${localServerCart}`,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(newProduct),
}).then(()=>{
    alert("Data Saved Successfully")
    setNewProduct({  
        total: 5, title: "",   price: 500,
        description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        category: "", 
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        colorname:" ",
        sizename: "",
        rating: {rate: 0, count: 0}
    })
})
}

let navigate=useNavigate();
let handleExit=(()=>{

    navigate("/ProductList")
})


return (
    <>
      <form onSubmit={handleSubmit} >
    <Paper elevation={20} style={paperstyle}>
        <Typography variant='h5'  > {" "} Create New Product {" "}</Typography>
        <div className="container-fluid" >
        <div className="row">
        <div className="col-md-12 pt-1">
           <label className='col-md-2'>Title</label>
                             <input  type='text' className='col-md-7'    value={newProduct.title}  name="title"     label="Title"     onChange={handleChange} />
                              <label className='col-md-1'>Total</label>
                             <input  type='text' className='col-md-2'    value={newProduct.total}  name="total"     label="Total"     onChange={handleChange} />
                    <div className="col-md-12 pt-1">
                    <label className='col-md-2'>Category</label>
            <input  type='text'  className='col-md-10'   value={newProduct.category} name="category" label="Category"   onChange={handleChange} />
     </div>
            <div className="col-md-12 pt-1">
            <div className="col-md-6" style={{float:"left"}} >
            <label className='col-md-4'>Rate</label>
                <input  name="rating.rate" className='col-md-7'   value={newProduct.rating.rate} type='number' label="Rate"   onChange={handleChange} />
                </div>
                <div className="col-md-6" style={{float:"right"}}>
                <label className='col-md-4'>Count</label>
                <input    name="rating.count" className='col-md-7' value={newProduct.rating.count} type='number' label="Count"   onChange={handleChange} />
                </div>
                    <div className='row' >
                    <div className='col-md-12 pt-1'>
                 <label className='col-md-2'>Color</label>
                <select name="colorname" value={newProduct.colorname} className='col-md-10 col-sm-12'
                  autoFocus onChange={(e) => handleChange(e)} >
                  {
                    colorItems !== null &&
                    colorItems.map((result, index2) => (<option key={index2} value={result.colorname}>
                      {result.colorname}
                    </option>))
                  }
                </select> 
              </div>
                    <div className='col-md-12 pt-1'  >
                              <label className='col-md-2'>Size</label>
                              <select name="sizename" value={newProduct.sizename} className='col-md-10 col-sm-12'
                                onChange={(e) => handleChange(e)} autoFocus>
                                {
                                  sizeItems !== null &&
                                  sizeItems.map((result, index1) => (<option key={index1} value={result.sizename}>
                                    {result.sizename}
                                  </option>))
                                }
                              </select>
                            </div>
                             </div>
                <center>
                <Button variant='contained' style={{margin:"2%"}}  className='primary' onClick={handleSave} >Add</Button>
        <Button variant='contained' style={{ margin: "2%" }} className='secondary' onClick={handleExit} >Clear</Button>
        </center>
                </div>
              
        </div>
        
        </div>
        </div>
    </Paper>  
    </form>
    </>
)
}



export default NewProduct
