import React, { useEffect, useRef, useState, forwardRef } from "react";

import { IoMdClose } from "react-icons/io";

const MultiSelect = forwardRef(({ styleGroupItems = [], className = "", colorValue, selectedOptions = [], setSelectedOptions, name, labelField, valueField, handleChange }, ref) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const wrapperRef = useRef(null);

  const selectOption = (option) => {
    const exists = selectedOptions.some((item) => item[valueField] === option[valueField]);

    if (!exists) {
      const updated = [...selectedOptions, option];

      setSelectedOptions((prev) => ({
        ...prev,
        [name === "SplCategory" ? "CategorySelected" : name]: updated,
      }));

      if (handleChange) {
        handleChange({
          target: {
            name,
            value: updated,
          },
        });
      }
    }

    setSearchQuery("");
    setShowDropdown(false);
  };

  // Remove option
  const removeOption = (option) => {
    const updated = selectedOptions.filter((item) => item[valueField] !== option[valueField]);

    setSelectedOptions((prev) => ({
      ...prev,
      [name === "SplCategory" ? "CategorySelected" : name]: updated,
    }));

    if (handleChange) {
      handleChange({
        target: {
          name,
          value: updated,
        },
      });
    }
  };

  // Outside click
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
  const filteredOptions = styleGroupItems.filter((option) => option[labelField]?.toLowerCase().includes(searchQuery.toLowerCase()) && !selectedOptions.some((item) => item[valueField] === option[valueField]));

  return (
    <div className={`position-relative w-100 ${className}`} ref={wrapperRef}>
      {/* Input Box */}
      <div className="d-flex flex-wrap align-items-center gap-2 border rounded form-select" onClick={() => setShowDropdown(true)}>
        {/* Selected Tags */}
        {selectedOptions.map((item, index) => (
          <div
            key={index}
            className="d-flex align-items-center gap-1 px-2 py-1 text-white rounded"
            style={{
              backgroundColor: colorValue,
            }}
          >
            <span>{item[labelField]}</span>

            <IoMdClose
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                e.stopPropagation();
                removeOption(item);
              }}
            />
          </div>
        ))}

        {/* Search */}
        <input
          ref={ref}
          type="text"
          value={searchQuery}
          placeholder="Search..."
          className="border-0 flex-grow-1"
          onFocus={() => setShowDropdown(true)}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowDropdown(true);
          }}
        />
      </div>

      {/* Dropdown */}
      {showDropdown && filteredOptions.length > 0 && (
        <div
          className="position-absolute w-100 border rounded bg-white shadow-sm"
          style={{
            maxHeight: "300px",
            overflowY: "auto",
            zIndex: 1000,
          }}
        >
          {filteredOptions.map((item, index) => (
            <div key={index} className="p-2" style={{ cursor: "pointer" }} onClick={() => selectOption(item)} onMouseEnter={(e) => (e.currentTarget.style.background = "#f1f1f1")} onMouseLeave={(e) => (e.currentTarget.style.background = "white")}>
              {item[labelField]}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default MultiSelect;
