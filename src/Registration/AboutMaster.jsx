import React, { useEffect, useState } from 'react'

const AboutMaster = () => {
  const [menu, setMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    rowData: null
  });

  // Close menu on click outside
  useEffect(() => {
    const handleClick = () => setMenu({ ...menu, visible: false });
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [menu]);

  const handleRightClick = (event, row) => {
    event.preventDefault(); // disable default browser menu

    setMenu({
      visible: true,
      x: event.clientX,
      y: event.clientY,
      rowData: row
    });
  };

  const data = [
    { id: 1, name: "Item A", qty: 10 },
    { id: 2, name: "Item B", qty: 20 },
    { id: 3, name: "Item C", qty: 30 }
  ];

  const handleDelete=((m)=>{
 const updated = data.filter(item => item.id !== m.id);
  setMenu({
    visible: false,
    x: 0,
    y: 0,
    rowData: updated  
  })
})

  return (    
    <div>
      <table border="1" width="50%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Qty</th>
          </tr>
        </thead>

        <tbody>
           
          {menu.rowData.map((row) => (
            <tr
              key={row.id}
              onContextMenu={(e) => handleRightClick(e, row)}
              style={{ cursor: "context-menu" }}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.qty}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Tooltip Menu */}
      {menu.visible && (
        <div
          style={{
            position: "fixed",
            top: menu.y,
            left: menu.x,
            background: "#333",
            color: "#fff",
            padding: "8px 12px",
            borderRadius: "6px",
            zIndex: 1000
          }}
        >
          <div>Row: {menu.rowData.name}</div>
          <hr />
          <div style={{ cursor: "pointer" }}>Edit</div>
          <div style={{ cursor: "pointer" }} onClick={()=>handleDelete(menu.rowData)} >Delete</div>
        </div>
      )}
    </div>
  )
}

export default AboutMaster