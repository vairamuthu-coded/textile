import React from 'react'

const HandleChangeEvent = (initialValues = {}) => {
     const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    let finalValue;

    switch (type) {
      case "checkbox":
        finalValue = checked;
        break;
      case "number":
        finalValue = Number(value);
        break;
      default:
        finalValue = value;
    }

    setValues((prev) => ({
      ...prev,
      [name]: finalValue,
    }));

    return finalValue; // useful if parent wants extra logic
  };

  return { values, setValues, handleChange };
 
}

export default HandleChangeEvent