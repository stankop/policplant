import React from 'react'

const Wrapper = ({ children, handleClick }) => {
	return (
		<div onClick={handleClick}
			style={{ border: '1px solid green' }}>
			{children}
		</div>
	)
}

export default Wrapper
