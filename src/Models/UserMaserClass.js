import { render } from '@testing-library/react';
import React from 'react'

const UserMaserClass = () => {

    class UserMaster{
        constructor(userid,finyear,compcode){
          this.userid=userid;
          this.finyear=finyear;
          this.compcode=compcode;
        }
        getUserId= ()=>{
          return this.userid;
        }
        getFinyear= ()=>{
          return this.finyear;
        }
        getCompcode= ()=>{
          return this.compcode;
        }
      }
      class UserMaster1 extends UserMaster{
        constructor(userid,finyear,compcode, dept,username,pasword){
          super(userid,finyear,compcode);
          this.dept=dept;
          this.username=username;
          this.pasword=pasword;
        }
        getDept= ()=>{
          return this.dept;
        }
        getUsername= ()=>{
          return this.username;
        }
        getPasword= ()=>{
          return this.pasword;
        }
        sayhi=()=>{
          alert(`Hell I am Programmer , My Name is ${this.getUsername()} for ${this.getPasword()}`);
        }
    
      }

    
 
}

export default UserMaserClass
