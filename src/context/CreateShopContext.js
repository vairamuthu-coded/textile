
import {createContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useFetch from '../hooks/useFetch';
import Swal from 'sweetalert2';
import { addItems, removeItems, updateItems } from '../store/cardSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const ShopContext = createContext(null)
if (!localStorage.getItem("cart")) {
  JSON.parse(localStorage.setItem("cart", JSON.stringify([])))
}

let dataFromWeb = JSON.parse(localStorage.getItem("cart"))
let cart = {};
export const CreateShopContextProdiver = ({ children, localServerCart, API_URL, colorValue
}) => {
  let intialstate = 0;
  const [error,setError]=useState('');
  const handleSubmit = (e) => { e.preventDefault(); }
  const { products, errors, isloading, setProducts } = useFetch(`${localServerCart}`);
  const defaultCartItems = () => {
    products.map((item) => {
      cart[item.id] = 0;
    })
    return cart;
  }
  const [cartItem, setCartItem] = useState(defaultCartItems())
  let cartProduct = useSelector((state) => { return state.cart })
  const dispatch = useDispatch();
  const addToCart = (itemId) => {
    for (let item in cartItem) {
      cartProduct.map((pro) => {
        if (Number(pro.id) === Number(itemId) && Number(itemId) === Number(item)) {
          if (pro.total === cartItem[item]) {
            Swal.fire({
              title: "Stock qty !" + pro.total,
              text: "No Stock available.",
              icon: "Information"
            });
            return;
          } else {
            setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
          }
        }
      })
    }
  };


  const removeFromCart = (itemId) => {
    for (let item in cartItem) {
      cartProduct.map((pro) => {
        if (Number(pro.id) === Number(itemId) && Number(itemId) === Number(item)) {
          if (cartItem[item] <= 1) {
            setCartItem((prev) => ({ ...prev, [itemId]: 1 }));
            return;
          } else {
            setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
          }
        }
      })
    }
  };

  const updateToCart = (newAmount, itemId) => {
    let listItems = "";
    try {
      for (let item in cartItem) {
        if (item >= 1) {
          cartProduct.map((pro) => {
            if (Number(pro.id) === Number(itemId) && Number(itemId) === Number(item)) {
              if (Number(pro.total) < Number(newAmount)) {
                return;
              } else {

                setCartItem((pre) => ({ ...pre, [itemId]: newAmount }));
                //  listItems = cartProduct.map(pro => pro.id === Number(item) ? { ...pro, total: cartItem[item] } : pro);


              }
            }
          })

        }
      }
    } catch (ex) {

    }
    finally {

    }
  };


  let totalqty = 0;
  const getTotalQty = () => {
    for (let item in cartItem) {
      if (cartItem[item] >= 1) {
        totalqty += cartItem[item];
      }
    }
    return totalqty;
  }

  const getTotalCartAmount = () => {
    let totalamount = 0;
    let totalqty = 0;
    try {
      for (let item in cartItem) {
        if (cartItem[item] >= 1) {
          let itemInfo = cartProduct.find((product) => Number(product.id) === Number(item));

          totalamount += cartItem[item] * itemInfo.price;

        }
      }
    }
    catch (ex) { }

    return totalamount;
  }

  let navigate = useNavigate();
  const handleDelete = (id) => {
    dispatch(removeItems(id))
    if (cartItem.length === 1) {
      navigate("/ProductList");
    }
  }


  const placeOrderHandler = (items) => {
    try {
      if (totalqty > 0) {
        for (let item in items) {

          let listItems = cartProduct.map((pro) => Number(pro.id) === Number(item) ? { ...pro, total: cartItem[item] } : pro)
          setProducts(pre => ([...pre, ...listItems]));
          setCartItem((prev) => ({ ...prev, [item]: 0 }));
          handleDelete(item)

        }
      } else {
        Swal.fire({
          title: "Invalid !",
          text: "Pls Enter Qty.",
          icon: "Information"
        });
      }
    } catch (ex) {

    } finally {

    }

  }


  const ColorParam = API_URL + "/ColorMaster/GetColor";
  const sizeparam = API_URL + "/SizeMasters/GetSizeMaster";
  const [sizeItems, setSizeItems] = useState([])
  const [colorItems, setColorItems] = useState([])
  const [complete, setComplete] = useState(false)

  useEffect(() => {
    const Controller=new AbortController();
    let signal=Controller.signal; 
    axios.get(`${sizeparam}`,{signal}).then((res) => {
      setSizeItems(res.data);
      if (res.data.length>0) {
        axios.get(`${ColorParam}`).then((res1) => {
          setColorItems(res1.data);
        }).catch((error) => { setError(error) });
      }
    }).catch((error) => {setError(error) });
    return ()=>{
      Controller.abort();
    }
  }, [])



  const handleChange = (e, id) => {
    const { name, value } = e.target;
    let listItems1 = "";
    let listItems = cartProduct.filter((item) => item.id === id)
    if (name === 'colorname') {
      listItems1 = listItems.map((pro) => Number(pro.id) === Number(id) ? { ...pro, colorname: value } : pro)
      dispatch(updateItems(listItems1))
    }
    if (name === 'sizename') {
      listItems1 = listItems.map((pro) => Number(pro.id) === Number(id) ? { ...pro, sizename: value } : pro)
      dispatch(updateItems(listItems1))
    }


  }


  return (
    <ShopContext.Provider value={{
      handleSubmit, handleDelete, complete, setComplete, removeFromCart, products, placeOrderHandler, getTotalCartAmount,
      cartProduct, isloading, setProducts, API_URL, localServerCart, colorValue, dispatch, error,setError,
       cartItem, sizeItems, colorItems, setSizeItems, setColorItems, handleChange, setCartItem, addToCart,
      updateToCart, dataFromWeb, getTotalQty
    }}>
      {children}
    </ShopContext.Provider>
  )
}
export default ShopContext;

