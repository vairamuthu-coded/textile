import ReactDOM from 'react-dom/client';
import App from './App.jsx';

import 'font-awesome/css/font-awesome.min.css';
 import './Button.css';
 import './App.css';


//  import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
 import {Provider} from 'react-redux'
 import {store} from './store/store.js'
// import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import  {PersistGate}  from "redux-persist/integration/react"

import { BrowserRouter } from 'react-router-dom';  
import {persistStore} from 'redux-persist';
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';
import useGetSuggestedUser from './hooks/useGetSuggestedUser.jsx';
import useGetAllPost from './hooks/useGetAllPost.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
const API_URL = 'http://localhost:5271/api';//'http://192.168.101.15:82/api'; //http://localhost:5271/api// npx json-server --port 3001  --watch db.json
const localServerCart ='http://localhost:3001/productss'; // http://localhost:3001/productss 'https://fakestoreapi.com/products';
const todoListUrl='http://localhost:3002/Items';
let persistor=persistStore(store)
        const urls="";//http://localhost:3002
//https://shimmering-granita-b5b927.netlify.app/



root.render(

 <BrowserRouter>
  
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor}>
        <App API_URL={API_URL} localServerCart={localServerCart} todoListUrl={todoListUrl} urls={urls} />
        <ToastContainer/>
      </PersistGate>
    </Provider>  
   </BrowserRouter>
);
