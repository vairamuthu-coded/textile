
import ZKLib from "node-zklib";
import db from "../../db.js";

  export const getCity = async (req,res) => {  
  try {
    const [rows] = await db.query("SELECT * FROM gtcitymast");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query failed" });
  }
};

  export const getState = async (req, res) => {  
  try {
    const [rows] = await db.query("SELECT * FROM gtstatemast");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query failed" });
  }
};

export const attendance=async(req,res) => {
  const zk = new ZKLib("192.168.101.241", 4370, 10000);
  try {
    await zk.createSocket();
    const users = await zk.getUsers();
    const attendance = await zk.getAttendances();
    await zk.disconnect();

    res.json({
      users: users?.data || users,
      attendance: attendance?.data || attendance,
    });
  } catch (err) {
    console.error("❌ ZKLib error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};




