import React from 'react';
import './button.css';

const AButton = ({
  as: AsComponent = 'button',
  children,
  filled,
  secondary,
  bgColor,     // Custom background color
  textColor,   // Custom text color
  width,       // Custom width
  height,      // Custom height
  ...rest
}) => {
  // Create a dynamic style object
  const customStyles = {
    backgroundColor: bgColor || 'initial', // Use the passed bgColor or fallback to default
    color: textColor || 'initial',         // Use the passed textColor or fallback to default
    width: width || 'initial',             // Use the passed width or fallback to default
    height: height || 'initial',           // Use the passed height or fallback to default
  };

  return (
    <AsComponent
      className={`dir-control ${secondary ? 'dir-control--secondary' : ''} ${
        filled ? 'dir-control--filled' : ''
      }`}
      style={customStyles}  // Apply dynamic styles
      {...rest}
    >
      {children}
      <span />
      <span />
      <span />
      <span />
      <b aria-hidden="true">{children}</b>
      <b aria-hidden="true">{children}</b>
      <b aria-hidden="true">{children}</b>
      <b aria-hidden="true">{children}</b>
    </AsComponent>
  );
};

export default AButton;
