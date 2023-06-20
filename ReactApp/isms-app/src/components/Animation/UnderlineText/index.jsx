import React from 'react';
import styled, { keyframes } from 'styled-components';

// Keyframes cho animation
const underlineAnimation = keyframes`
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
`;

// Styled component cho chữ gạch chân
const UnderlineText = styled.span`
position: relative;
display: inline-block;

&:hover::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 100%;
  height: 2px;
  background-color: #043AC5;
  transform-origin: left;
  animation: ${underlineAnimation} 1s forwards;
}
`;

const UnderlineAnimation = ({children}) => {
  return (
        <UnderlineText>{children}</UnderlineText>
  );
};

export default UnderlineAnimation;