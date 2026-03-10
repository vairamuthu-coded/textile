
// import NotFound from './ShoppingCart/Shopping/NotFound.jsx';
// import NewProduct from './ShoppingCart/Shopping/NewProduct.jsx';
// import ProductList from './ShoppingCart/Shopping/ProductList.jsx';
// import UpdateProduct from './ShoppingCart/Shopping/UpdateProduct.jsx';
// import Remarks from './ShoppingCart/Shopping/Remarks.jsx';
// import WishList from './ShoppingCart/Shopping/WishList.js';
// import Cart from './ShoppingCart/Shopping/Cart.jsx';
// import ColorSelector from './ShoppingCart/Shopping/ColorSelector.jsx';
// import CreatePost from './Instagram/CreatePost.jsx'
// import  ViewStory from './Instagram/ViewStory'
// import Stories from './Instagram/Stories.jsx'
//  import InstaApp from './Instagram/InstaApp.jsx'
//  import Home from './Appointment/Home.jsx'
//  import Edit from './Appointment/Edit.jsx'
//  import Delete from './Appointment/Delete.jsx'
//  import Appointment from './Appointment/Appointment.jsx'
//  import New from './Appointment/New.jsx'
//  import Profile from './Instagram/Profile.jsx'
// import EditProfile from './Instagram/EditProfile.jsx'
// import ChatPage from './Instagram/ChatPage.jsx'


import MasterRoutes from "./Routes_MasterRoutes";
import TransactionsRoutes from "./Routes_TransactionsRoutes";
import DashboardRoutes from "./Routes_DashboardRoutes";
import TreeViewRoutes from './Routes_TreeViewRoutes';





 const AppRoutes = [
// { path:"*"                     ,element:<NotFound              title="NotFound"            subTitle="Details"  />},
// { path:'/ColorSelector'        ,element:<ColorSelector/>} ,
// { path:'/InstaApp'             ,element:<InstaApp/>},
// { path:'/CreatePost'           ,element:<CreatePost/>},
// { path:'/ViewStory/:id/:tot'   ,element:<ViewStory/>},
// { path:'/Stories'              ,element:<Stories/>},
// { path:'/ChatPage'             ,element:<ChatPage/>},
// { path:'/all'                  ,element:<GetAllPost/>},
// { path:'/userpost/all'         ,element:<GetUserPost/>},
// { path:'/:id/like'             ,element:<LikePost/>},
// { path:'/:id/dislike'          ,element:<DisLikePost/>},
// { path:'/:id/comment'          ,element:<AddComment/>},
// { path:'/:id/comment/all'      ,element:<GetCommentOfPost/>},
// { path:'/delete/:id'           ,element:<DeletePost/>},
// { path:'/:id/bookmark'         ,element:<BookmarkPost/>},
//  { path:'/Profile'             ,element:<Profile/>},
// { path:'/EditProfile'          ,element:<EditProfile/>},
// { path:'/ChatPage'             ,element:<ChatPage/>}

 ...DashboardRoutes,
 ...MasterRoutes,
 ...TransactionsRoutes,
 ...TreeViewRoutes
]

export default AppRoutes