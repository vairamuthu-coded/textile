// import {User1,User2} from '../HtmlPage/Eight.js';
import React from 'react'
const Seven = () => { 

  return (
    <>
      <div>test</div>
    </>  
  )
}


class User1{
  static noofUsers=0;
  constructor(name,age){
   this._name=name;
    this._age=age;
   User1.noofUsers++;
  } 
  get name(){
    return `Name Is ${this._name}`;
  }
  get age(){
    
    return `Age Is ${this._age}`;
  }

  set name(name){
    if(name != "")
    name="invalid name"
    return this._name=name;
  }
  set age(age){
    if(age<18)
    {
      age="below 18 year old";}{
    this._age=age;
    }
    return this.age;
  }
  login(){
   console.log(`You are log in,${this.name},${this.age}`);  
  }
  logout(){
    console.log(`You are log Out,${this.age}`);
  }
  static DisplayTotalUsers(){
    console.log(`Total User of Count, ${User1.noofUsers}`);
  }
}

class User2 extends User1{
  constructor(name,age,className){
   super(name,age)
    this.className=className;
  }
  login(){
    console.log(`You are log in,${this.name},${this.age},${this.className}`);
   }
   logout(){
     console.log(`You are log Out,${this.age}`);     
   }
}

let reactA=new Promise((resolve,reject)=>
{
  let reached=true;
  if(reached){
    setTimeout(resolve,3000,"Vairamuthu REACHED to Home");
  }else{
    reject("Vairamuthu not Reached");
  }
})

async function asyncstatus(){
  try{
  console.log("hi");
  let res=await reactA
  if(res===false)
  throw "sdddsds";
else
   console.log(res);
  }
  catch(err){
    console.log(err);
  }
}





export default Seven
