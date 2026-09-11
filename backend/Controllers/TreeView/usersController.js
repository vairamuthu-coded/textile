
import  db  from "../../db.js";

 export const users = async (req,res) => {  
  try {
    const [rows] = await db.query("SELECT * FROM asptblusermas");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query failed" });
  }
};



