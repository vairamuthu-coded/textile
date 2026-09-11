
// export class CountryMaster{
//   constructor(countryName){
//     this.countryName=countryName;
//   }  
//   Country(){
//     return(`Country is ${this.countryName}`)
//   }
// }

// export class StateMaster extends CountryMaster{
//   constructor(stateName){
//     super(countryName);
//     this.stateNamesStateName;
//   }
//   State(){
//     return(`State is ${this.stateName}`)
//   }
// }

// export class CityMaster extends StateMaster{
//   constructor(cityName){
//     super(countryName,stateName);
//     this.cityName=cityName;
//   }
//   City(){
//     return(`CityName is ${this.cityName}`)
//   }
// }


export class User1{
  static noofUsers=0;
  constructor(name,age){
   this.name=name;
    this.age=age;
   User1.noofUsers++;
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

export class User2 extends User1{
  constructor(name,age,className){
   super(name,age)
    this.className=className;
  }
 
   logout(){
     console.log(`You are log Out,${this.age}`);
   }
}



