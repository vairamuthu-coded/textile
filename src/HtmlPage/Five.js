import React from 'react';


const Five = () => {


  const initGame=()=>{
    const startGame= window.confirm('Do You want to Play Rock ,Paper,Scissors');    
     startGame ?  playGame() : alert('Ok Thanks May be next time ');
  }
  initGame();
  
  const playGame=()=>
  {   
     while(true) 
       {        
          const playerChoice1=getPlayerChoice();
          let  playerChoice=formatePlayerChoice(playerChoice1);         
          if(playerChoice==="")
          {
            invalidChoice();
            continue;
          }
          if(!playerChoice){
            decideNotToPlay();
            break;
          }
          playerChoice=evaluatePlayerChoice(playerChoice);
          if(!playerChoice){
            invalidChoice();
            continue;
          }
          const computerChoice=getComputerChoice();
          let result=determineWinner(playerChoice,computerChoice);         
          displayResult(result);
          if(askToPlayAgain()){            
            continue;
          }else{
            thanksForPlaying();
            
            break;
          }
       } 
       
  };
  

  const getPlayerChoice=()=>{
    return  prompt("Please Enter Your Choice  PAPER,ROCK,SCISSORS");
  };

  const formatePlayerChoice=(playerChoice)=>{
    if(playerChoice || playerChoice===""){
     return playerChoice.trim().toLowerCase();
    }else{
      return false;
    }
  };

  const invalidChoice=()=>{
    alert("You don't Enter Paper , rock,scissor ");
  }

  const decideNotToPlay=(playerChoice)=>{
    alert("I guess you changed your mind May be Next time");

  }

  const evaluatePlayerChoice=(playerChoice)=>{
    if(playerChoice==="rock" || playerChoice=="paper" || playerChoice=="scissor"){
      return playerChoice;
    }else{
      return false;
    }
  }

  const getComputerChoice=()=>{
    const randomNumber=Math.floor(Math.random()*3);
    alert(randomNumber);
    const myarry=["rock","paper","scissor"]; 
   return myarry[randomNumber];
  }

  const determineWinner=(playerOne,computer)=>{
    const result=playerOne===computer ? "Tie Game" : playerOne==="rock" && computer==="paper" 
              ? `Player:${playerOne}  Computer : ${computer}  Computer Win`
              :playerOne==="rock" && computer ==="scissor"
              ? `Player:${playerOne}  Computer : ${computer}  Computer Win`
              : playerOne==="scissor" && computer ==="paper"
              ? `Player:${playerOne}  Computer : ${computer}  Computer Win`
              : `Player:${playerOne}  Computer : ${computer}  Player Win`
              return(result);

    };

  const displayResult=(result)=>{
    alert(result);

  };

  const askToPlayAgain=()=>{
    return window.confirm("play again");

  };

  const thanksForPlaying=()=>{
    alert("ok Thanks for Playing");
  };



  return (
  <>    


  </>
  );
}


export default Five;
