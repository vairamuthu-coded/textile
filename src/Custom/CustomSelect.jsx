import React, { forwardRef, useState, useRef, useEffect, Children } from "react";

const CustomSelect = forwardRef((props, ref) => {
  const { children, className, name, value, onChange, tabIndex, onFocus, onBlur, onKeyDown, style, visible } = props;

  const [open, setOpen] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(-1);

  const wrapperRef = useRef(null);
  const selectRef = useRef(null);

  const options = Children.toArray(children).map((child) => ({
    value: child.props.value,
    label: child.props.children,
  }));

  const selectedIndex = options.findIndex((x) => String(x.value) === String(value));

  const selected = options[selectedIndex];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectItem = (item) => {
    onChange?.({
      target: {
        name,
        value: item.value,
      },
    });
    setSearch("");
    setOpen(false);
    selectRef.current.focus();
  };

  const handleKeys = (e) => {
    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        if (!open) {
          setOpen(true);
          setHoverIndex(selectedIndex);
        } else if (hoverIndex >= 0) {
          selectItem(options[hoverIndex]);
        }
        setOpen(false);
        break;
      case "Escape":
        setOpen(false);
        break;
      case "ArrowDown":
        e.preventDefault();
        if (!open) {
          setOpen(true);
          setHoverIndex(selectedIndex);
        } else {
          setHoverIndex((prev) => Math.min(prev + 1, options.length - 1));
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        if (open) {
          setHoverIndex((prev) => Math.max(prev - 1, 0));
        }
        break;
      default:
        break;
    }
    onKeyDown?.(e);
  };

  const [search, setSearch] = useState("");

  const filteredOptions = options.filter((item) =>
    String(item.label ?? "")
      .toUpperCase()
      .includes(search.toUpperCase() || ""),
  );

  return (
    <div
      ref={wrapperRef}
      style={{
        position: "relative",
        border: "none",
        margin: "0",
        padding: "0px",
        display: `${visible}`,
      }}
      className={className}
    >
      <div
        ref={(el) => {
          selectRef.current = el;
          if (typeof ref === "function") ref(el);
          else if (ref) ref.current = el;
        }}
        tabIndex={tabIndex}
        className={className}
        onClick={() => setOpen((o) => !o)}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={handleKeys}
        style={{
          cursor: "pointer",
          width: "100%",
          userSelect: "none",
          minHeight: "24px",
          display: "flex",
          alignItems: "center",
          fontSize: "var(--bs-font-sm)",
          justifyContent: "space-between",
          ...style,
        }}
      >
        <span>{selected?.label || ""}</span>

        {/* <span>▼</span> */}
      </div>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",
            background: "#fff",
            border: "1px solid #ced4da",
            maxHeight: "220px",
            overflowY: "auto",
            zIndex: 1,
          }}
        >
          <div className="row m-1 ">
            <input type="text" className="col-md-12 p-2" placeholder="search ...." onChange={(e) => setSearch(e.target.value || "")}></input>
          </div>
          {filteredOptions.map((item, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoverIndex(index)}
              onClick={() => selectItem(item)}
              style={{
                padding: "8px 10px",
                cursor: "pointer",
                fontSize: "var(--bs-font-sm)",
                background: hoverIndex === index ? "#0d6efd" : String(item.value) === String(value) ? "#e7f1ff" : "#fff",
                color: hoverIndex === index ? "#fff" : "#000",
                borderBottom: "1px solid lightgrey",
              }}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default CustomSelect;
