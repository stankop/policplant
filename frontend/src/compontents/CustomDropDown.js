import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <button
    href=""
    ref={ref}
    type="search"
    style={{ background:'white', border:'1px solid grey',padding:'0.5rem', width: '100%'}}
    
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    
  >
    {children}
    <span style={{ }}>&#x23F7;</span>
    
  </button>
));

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    const [value, setValue] = useState('');

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <Form.Control
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Odaberite..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) =>
              !value || child.props.children.toLowerCase().startsWith(value),
          )}
        </ul>
      </div>
    );
  },
);

function CustomDropDown({ values }){
  
  return  (
  <Dropdown style={{ padding:'0.5rem', width: '100%'}}>
    <Dropdown.Toggle  as={CustomToggle} id="dropdown-custom-components">
      pretraga
    </Dropdown.Toggle>

    <Dropdown.Menu as={CustomMenu}>
      { values?.map((val, ind) => (
        <Dropdown.Item key={ind} eventKey={ind}>{val}</Dropdown.Item>
      ))}
    </Dropdown.Menu>
  </Dropdown>)
}

export default CustomDropDown