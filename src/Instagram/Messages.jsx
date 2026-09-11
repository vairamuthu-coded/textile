import { useSelector } from "react-redux";

const Messages = ({messages,updateMessageHandler}) => {
  return (
    <>
 
    <div className='container-fluid' >
         <div className='d-flex flex-column' >
             <div className='d-flex flex-column  gap-1 h-25 overflow-auto ' >           
             { 
                messages.map(m=>{
                    return (
                      <div className={` d-flex m-1 ${m.receiverid === m.asptblinstauserid ? 'justify-content-start float-start' : 'justify-content-end float-end'}`} key={m.asptblinstamegid} onClick={() =>updateMessageHandler(m.asptblinstamegid, m.messages) }>
                        <div className={` text-break ${m.receiverid===m.asptblinstauserid ? 'bg-light p-2 text-black' : ' bg-success-subtle text-black p-2'}`}>{m.messages}</div>
                      </div>
                    );
                 })
             }
        </div>  
        </div>    
     </div>
     </>
  )
}

export default Messages
