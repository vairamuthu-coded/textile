import {  useState,useEffect,useRef} from "react";
import Dropdown from "./Dropdown";
import { Link, Route, useNavigate } from "react-router-dom";

const MenuItems = ({menu, depthLevel}) => {     


    const [dropdown, setDropdown] = useState(false);
    let ref = useRef();
    useEffect(() => {
        const handler = (event) => {
            if (dropdown && ref.current && !ref.current.contains(event.target)) {
                setDropdown(false);         
               
            }
        };
        document.addEventListener("mousedown", handler);
        document.addEventListener("touchstart", handler);
        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", handler);
            document.removeEventListener("touchstart", handler);
            
        };
      
    }, [dropdown]);

 

    const onMouseEnter = () => {
        window.innerWidth > 960 && setDropdown(true);
    };

    const onMouseLeave = () => {
        window.innerWidth > 960 && setDropdown(false);
    };

    return (       
    <li  className="menu-items"  ref={ref} >
                {
                    menu.submenu ? ( <>  
                    <button className="btn"     aria-haspopup = "menu" aria-expanded = {dropdown ? "true" : "false"}  onClick = {() => setDropdown((prev) => !prev)}  >  {menu.parentmenuid <= 0 ?  <Link>   {menu.title} {depthLevel > 0 ? <span>▶ </span> : <span>▶</span> } </Link>    : <Link   to={"/"+menu.title}  >  {menu.title} {depthLevel > 0 ? <span>▶ </span> : <span>▶</span> } </Link>}       </button> 
                        <Dropdown   depthLevel = {depthLevel} submenus={menu.submenu} dropdown = {dropdown}/>  </> 
                    ) : ( <button className="btn" > <Link  to={"/"+menu.title}> {menu.title} </Link></button> )
                
                }
    </li>
        
    );

};
export default MenuItems;

