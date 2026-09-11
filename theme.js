import { createContext,useState,useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { green, grey, indigo } from "@mui/material/colors";
import { Typography } from "@mui/material";

export const tokens=(mode)=>({
...(mode==="dark" ?{
grey:{    
    100: "#c2c2c2",
    200: "#a3a3a3",
    300: "#858585",
    400: "#666666",
    500: "#525252",
    600: "#3949ab",
    700: "#3d3d3d",
    800: "#292929",
    900: "#141414",  
},

primary:{    
    100: "#c2c2c2",
    200: "#727674",
    300: "#434547",
    400: "#141b2b",
    500: "#101624",
    600: "#0c101b",
    700: "#080b12",
    800: "#050456",
   900: "#040509",  
},
greenAccent:{   
    100: "#c2c2c2",
    200: "#727674",
    300: "#434547",
    400: "#141b2b",
    500: "#101624",
    600: "#1016de",
    700: "#080b12",
    800: "#080b12",
    900: "#040509",  
},
redAccent:{    
    100: "#c2c2c2",
    200: "#727674",
    300: "#434547",
    400: "#141b2b",
    500: "#101624",
    600: "#0c101b",
    700: "#832f2c",
    800: "#58201e",
    900: "#2c100f",  
},
blueAccent:{   
    100: "#c3c6fd",
    200: "#a4a9fc",
    300: "#868dfb",
    400: "#6870fa",
    500: "#535ac8",
    600: "#63d3fd",
    700: "#3e4346",
    800: "#2a2d64",
    900: "#151632",  
}} : {
    grey:{
    100: "#141414",  
    200: "#292929",
    300: "#3d3d3d",
    400: "#3949ab",
    500: "#525252",
    600: "#666666",
    700: "#858585",
    800: "#a3a3a3",
    900: "#c2c2c2",    
},
primary:{
    100: "#040509",  
    200: "#050456",
    300: "#080b12",
    400: "#f2f0f0",
    500: "#101624",
    600: "#141b2b",
    700: "#434547",
    800: "#727674",
    900: "#c2c2c2",    
},
greenAccent:{
    100: "#040509",  
    200: "#080b12",
    300: "#080b12",
    400: "#1016de",
    500: "#101624",
    600: "#141b2b",
    700: "#434547",
    800: "#727674",
    900: "#c2c2c2",   
},
redAccent:{
    100: "#2c100f",  
    200: "#58201e",
    300: "#832f2c",
    400: "#0c101b",
    500: "#101624",
    600: "#141b2b",
    700: "#434547",
    800: "#727674",
    900: "#c2c2c2",     
},
blueAccent:{
    100: "#151632",  
    200: "#2a2d64",
    300: "#3e4346",
    400: "#63d3fd",
    500: "#535ac8",
    600: "#6870fa",
    700: "#868dfb",
    800: "#a4a9fc",
    900: "#c3c6fd",     
}}
)
});

export const themeSettings=(mode)=>{
    const colors=tokens(mode);
    return {
        palette:{
            mode:mode,
            ...(mode==="dark" ? 
                {
                    primary:{main:colors.primary[500]},
                    secondary:{main:colors.greenAccent[500]},
                    netural:{dark:colors.grey[700],main:colors.grey[500],light:colors.grey[100]},
                    background:{default:colors.primary[500]}   
                }: {                    
                    primary:{main:colors.primary[100]},
                    secondary:{main:colors.greenAccent[500]},
                    netural:{dark:colors.grey[700],main:colors.grey[500],light:colors.grey[100]},
                    background:{default:"#fcfcfc"}  
                }),
        },
        Typography:{
            fontFamily:["Roboto,sans-serif"].join(","),fontSize:12,
            h1:{ fontFamily:["Roboto,sans-serif"].join(","),fontSize:40,},
            h2:{ fontFamily:["Roboto,sans-serif"].join(","),fontSize:32,},
            h3:{ fontFamily:["Roboto,sans-serif"].join(","),fontSize:24,},
            h4:{ fontFamily:["Roboto,sans-serif"].join(","),fontSize:20,},
            h5:{ fontFamily:["Roboto,sans-serif"].join(","),fontSize:16,},
            h6:{ fontFamily:["Roboto,sans-serif"].join(","),fontSize:14,},
        },
    };

};

export const colorModeContext=createContext({
    toggleColorMode:()=>{

    }
});

export const useMode=()=>{
    const [mode,setMode]=useState("dark");
    const colorMode=useMemo(()=>({
        toggleColorMode:()=>
            setMode((pre)=>(pre==="light" ? "dark" : "light")),
        
    }),[]
);

const theme=useMemo(()=>{createTheme(themeSettings(mode)),[mode]});

return [theme,colorMode];
}


