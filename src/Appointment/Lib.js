import axios from "axios";
import dateFormat from "dateformat";

// export const testData=[
//     {id:1,Title:"Tile One",Description:'Description One',LevelofImportance:3,Date:"14-06-2025",Time:"12:15",Address:"Covai",},
//     {id:2,Title:"Tile Two",Description:'Description Two',LevelofImportance:4,Date:"15-06-2025",Time:"12:10",Address:"Madurai",},
//     {id:3,Title:"Tile THREE",Description:'Description THREE',LevelofImportance:3,Date:"14-06-2025",Time:"12:15",Address:"Covai",},
//     {id:4,Title:"Tile FOUR",Description:'Description fOUR',LevelofImportance:4,Date:"15-06-2025",Time:"12:10",Address:"Madurai",},
//     {id:5,Title:"Tile fIVE",Description:'Description fIVE',LevelofImportance:3,Date:"14-06-2025",Time:"12:15",Address:"Covai",},
//     {id:6,Title:"Tile SIX",Description:'Description SIX',LevelofImportance:4,Date:"15-06-2025",Time:"12:10",Address:"Madurai",},
// ]

export const entry={
    title:"",
    description:"",
    address:"",
    date:new Date(),
    time:"",
    done:false,
    deleted:false,   
    levelOfImportance:2,
}

export const filter={
levelOfImportance:null,
all:false,
deleted:false,
done:false,
startDate: null,
endDate:null,
specifiedDate:null,
specifiedTime:null
};

export async function getDefaultUrl(ss) {
  var res= ""
 await axios.get(`${ss}`).then((res1)=>{res=res1.data ; })
if(!res){ 
    nofifyUser("Some thing went Wrong .pls refresh this page")
    return []
}
return res;
}

export const activeId={
id:0
}



export async function postappointment(ss,entry) {
  var res= ""
 await axios.post(`${ss}`,entry).then((res1)=>{res=res1.data})
closeModal("new_modal");
return res;
}

export function nofifyUser(msg){
let notificationE1=document.querySelector('.notifications');
notificationE1.innerHTML=msg ?  msg : '';
if(msg){
    setTimeout(() => {
        notificationE1.innerHTML=''
    }, 1200);
}
}

export function openModal(modal){
const modal_=document.querySelector("."+modal)
if(modal_){
    modal_.classList.remove('hidden')
}
}

export function closeModal(modal){
const modal_=document.querySelector("."+modal)
if(modal_){
    modal_.classList.add('hidden')
}
}