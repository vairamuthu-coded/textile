export const utilityState = (e, setState) => {
  const { name, value, checked, type } = e.target;

  const finalValue = type === "checkbox" ? (checked ? "T" : "F") : type === "number" ? Number(value) : value.trimStart();

  setState((prev) => ({
    ...prev,
    [name]: finalValue,
  }));
};
