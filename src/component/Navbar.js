import { MenuNameArray } from "../component/MenuNameArray";
import MenuItems from "../component/MenuItems";
const Navbar = ({ colorValue}) => {    
    return ( 
        <>
     
    <nav  style={{borderTop:"1px solid var(--bs-white)"}}>
        <ul style={{backgroundColor:`${colorValue}`}}> 
            {
                MenuNameArray.map((menu, index) => {    
                    const depthLevel = 0;
                    return <MenuItems   menu={menu}   key={index} depthLevel={depthLevel}> </MenuItems>;
                })
            }
        </ul> 
    </nav>

   
    </>

    );
};

export default Navbar;

