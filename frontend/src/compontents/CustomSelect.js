import { CSSProperties, useState } from 'react';
import Select, { AriaOnFocus } from 'react-select';

export default function CustomSelect({values, onAction}) {

  const [ariaFocusMessage, setAriaFocusMessage] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const style = {
    blockquote: {
      fontStyle: 'italic',
      fontSize: '.75rem',
      margin: '1rem 0',
    },
    label: {
      fontSize: '.75rem',
      fontWeight: 'bold',
      lineHeight: 2,
    },
  };

  const onChange = (inputValue,{ action, prevInputValue }) => {
    console.log('Input e:',inputValue)
    if (action === 'select-option') 
        onAction(inputValue)
    if (action === 'clear') 
        onAction('')
    if (action === 'remove-value') 
        onAction(inputValue)
     
  };

  const onMenuOpen = () => setIsMenuOpen(true);
  const onMenuClose = () => setIsMenuOpen(false);

  return (
    
      <Select
        aria-labelledby="aria-label"
        inputId="aria-example-input"
        name="aria-live-color"
        isClearable
        isSearchable
        isMulti
        className="basic-multi-select"
        onMenuOpen={onMenuOpen}
        onMenuClose={onMenuClose}
        options={values}
        classNamePrefix="select"
        onChange={onChange}
        closeMenuOnSelect={false}
      />
 
  );
}