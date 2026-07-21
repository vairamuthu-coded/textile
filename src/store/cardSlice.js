import { createSlice } from "@reduxjs/toolkit";

let dataFromWeb = ""; // JSON.parse(localStorage.getItem("cart"))

const cardSlice = createSlice({
  name: "cart1",
  initialState: dataFromWeb,
  reducers: {
    addItems(statse, actions) {
      statse.push(actions.payload);
      localStorage.setItem("cart", JSON.stringify([...statse]));
    },
    removeItems(state, action) {
      let itemid = action.payload;

      let newitem = state.filter((item) => item.id !== itemid);
      localStorage.setItem("cart", JSON.stringify([...newitem]));

      return newitem;
    },
    updateItems(state, action) {
      let itemid = action.payload;
      let newitem = state.map((pro) => (Number(pro.id) === Number(itemid[0].id) ? { ...pro, colorname: itemid[0].colorname, sizename: itemid[0].sizename } : pro));
      localStorage.setItem("cart", JSON.stringify([...newitem]));
      return newitem;
    },
  },
});
export default cardSlice.reducer;
export let { addItems, removeItems, updateItems } = cardSlice.actions;
