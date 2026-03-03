import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {  MdOutlineFolderDelete } from "react-icons/md";
import { removeItems } from '../../store/cardSlice';

const WishList = () => {
    let cartProduct=useSelector((state)=>{return state.cart})
    let dispatch=useDispatch();
    let handleDelete=(id)=>{ 
        dispatch(removeItems(id))
      }
    
  return (
    <div>
     {
  cartProduct.length !== 0 ? (    
    <section className='products'>
      {
        cartProduct.map((product) => {
          return <Card key={product.id} style={{ width: '25%' }} className='product' >     
            <center>
            <Card.Img src={product.image} style={{ width: "12rem", height: "12rem" }} />
            <Card.Body style={{ overflow: "auto", height: "120px" }}>              
              <Card.Title>{product.title}</Card.Title>
              <Card.Text  >
              $ {product.price}
              </Card.Text>
            </Card.Body>
            </center>
            <Card.Footer style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>            
                               <Button className='danger' onClick={()=>handleDelete(product.id)}  ><MdOutlineFolderDelete/></Button>
            </Card.Footer>
          </Card>

        } )
      }
    </section>
  ): <h1>pls purchases some things</h1>}

    </div>
  )
}

export default WishList
