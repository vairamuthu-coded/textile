
const apiRequest = (url,optionObj,errMsg) =>
 {
    try{
           
        const response=fetch(url,optionObj)

        if(!response.ok)
        throw Error("Please ReLoad Application");
    }
    catch(err){
        errMsg=err.Message;
    }
    finally{
        return errMsg;
    }
}

export default apiRequest;


