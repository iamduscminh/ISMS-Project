import styled, { keyframes } from 'styled-components';


// Tạo keyframes cho hiệu ứng chuyển màu
const changeBGAnimation = keyframes`
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
`;

// Styled component cho button với hiệu ứng chuyển màu
const StyledButton = styled.button`
    background-color: #1E43C5;
    font-size: var(--button-fontSize);
    border-style: none; 
    width: 100%;
    height: 100%;
    z-index: 0;
    position: relative;
    &:hover::after{
        background-color: #8094d9;
        border-radius: 8px;
        content: "";
        height: 100%;
        left: 0;
        opacity: 0.58;
        position: absolute;
        top: 0px;
        animation: ${changeBGAnimation} 0.3s ease 0s;
        width: 100%;
        z-index: 10;
    }
`;
const StyleSpan = styled.span`
    position: absolute;
    top: calc(40% - (var(--button-fontSize)/2));
    left: 21%;
    color: #FFFFFF;
    font-weight:400;
    z-index: 50;
`
// Sử dụng StyledButton trong component
// eslint-disable-next-line react/prop-types
const ChangeBgButton = ({children}) => {
    return (  
      <StyledButton>
        <StyleSpan>{children}</StyleSpan>
      </StyledButton>
  );
};

export default ChangeBgButton;