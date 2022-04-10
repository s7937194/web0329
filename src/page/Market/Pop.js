import styled, { keyframes } from 'styled-components'

const  PopupBox= styled.div`
position: fixed;
height: 1000vh;
width: 100vw;
background-color:${props => `rgba(${props.theme.textRgba},0.7)`};
z-index: 50;
left: 0%;
top: 0%;
`

const  Popup= styled.div`
position: fixed;
width: 20vw;

left: 50%;
top: 50%;
transform: translate(-50%, -50%);
background-color: ${props => props.theme.body}; 
z-index: 60;
`


const Pop = () => {
      return ( 
            <PopupBox >
                  <Popup />
            </PopupBox>
       );
}
 
export default Pop;