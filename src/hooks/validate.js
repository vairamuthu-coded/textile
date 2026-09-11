
export default function validate(values){
    let errors={}
    if(!values.countryname.trim()){
        errors.countryname="Invalid Country Name";
    }
    if(/^[a-zA-Z]$/.test(values.countryname)){
        errors.countryname="Special Charector not allowed";
    }
    return errors;
}
