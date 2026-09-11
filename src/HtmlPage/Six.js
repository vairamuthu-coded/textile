import React from 'react'

const Six = () => {

    class spinning
    {
        superwiser="abi";
        #endregionspecialcount="25S";
        rawmeterial="yarn";
        constructor(count){   this.count=count;  }
        getSuperwiser(){ return this.superwiser; }
        setSuperwiser(superwiser){ return this.superwiser.push(superwiser); }
        bake(){ return console.log(`Count is ${this.count} specialcount ${this.specialcount}` );}        
    }

    class knitting extends spinning{
        constructor(counat){
            super(counat);
            this.rawmeterial="fabric";
        }
        bake()
        {
            return console.log(`Count is ${this.count} Superwiser  name ${this.superwiser} rawmeterial ${this.rawmeterial} specialcount ${this.specialcount}` );
        }
    }
    const dyeing=new knitting("40s");
    dyeing.bake();
    console.log(dyeing.specialcount);
  return (
    <div> </div>
  )
}

export default Six
