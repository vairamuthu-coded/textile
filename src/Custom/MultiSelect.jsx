import React, { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";

const MultiSelect = ({ styleGroupItems = [], className, colorValue, ref, handleChange, onKeyDown }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const wrapperRef = useRef(null);

  // Add option
  const selectOption = (option) => {
    const exists = selectedOptions.some((item) => item.asptblstygrpmasid === option.asptblstygrpmasid);

    if (!exists) {
      setSelectedOptions((prev) => [...prev, option]);
    }

    setSearchQuery("");
    setShowDropdown(false);
  };

  // Remove option
  const removeOption = (option) => {
    setSelectedOptions((prev) => prev.filter((item) => item.asptblstygrpmasid !== option.asptblstygrpmasid));
  };

  // Close dropdown outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter options
  const filteredOptions = styleGroupItems.filter((option) => option.productstylegroup.toLowerCase().includes(searchQuery.toLowerCase()) && !selectedOptions.some((item) => item.asptblstygrpmasid === option.asptblstygrpmasid));

  return (
    <div className={`position-relative w-100 p-0  ${className || ""}`} ref={wrapperRef}>
      {/* Input Box */}
      <div className={`d-flex flex-wrap align-items-center gap-2  border rounded`} onClick={() => setShowDropdown(true)}>
        {/* Selected Tags */}
        {selectedOptions.map((item, index) => (
          <div key={index} className={`d-flex align-items-center gap-1 px-2 py-1 text-white rounded `} style={{ backgroundColor: colorValue }}>
            <span>{item.productstylegroup}</span>

            <IoMdClose style={{ cursor: "pointer" }} onClick={() => removeOption(item)} />
          </div>
        ))}

        {/* Search Input */}
        <input
          type="text"
          value={searchQuery}
          placeholder="Search..."
          className="border-0 flex-grow-1 "
          onFocus={() => setShowDropdown(true)}
          ref={ref}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowDropdown(true);
          }}
        />
      </div>

      {/* Dropdown */}
      {showDropdown && filteredOptions.length > 0 && (
        <div
          className="position-absolute w-100 border rounded bg-white shadow-sm "
          style={{
            maxHeight: "400px",
            overflowY: "auto",
            zIndex: 1000,
          }}
        >
          {filteredOptions.map((item, index) => (
            <div
              key={index}
              className="p-2"
              style={{ cursor: "pointer" }}
              onClick={() => selectOption(item)}
              onMouseEnter={(e) => (e.target.style.background = "#f1f1f1")}
              onMouseLeave={(e) => (e.target.style.background = "white")}
              onChange={handleChange}
              onKeyDown={onKeyDown}
            >
              {item.productstylegroup}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
