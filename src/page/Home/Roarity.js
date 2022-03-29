import styled, { keyframes } from 'styled-components'
import astronaut from './spaceman.png'



const Section = styled.section`
min-height: 100vh;
width: 100vw;
background-color: ${props => props.theme.body};
position: relative;
overflow: hidden;
`
const Title = styled.h1`
  font-size: ${(props) => props.theme.fontxxl};
  text-transform: capitalize;
  color: ${(props) => props.theme.text};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem auto;
  border-bottom: 2px solid ${(props) => props.theme.text};
  width: fit-content;

  @media (max-width: 40em){
    font-size: ${(props) => props.theme.fontxl};

}
`
const Main =  styled.div`
  border: 2px solid ${(props) => props.theme.text};
  color: ${(props) => props.theme.text};
  padding: 2rem;
  width: 50vw;
  height: 60vh;
  z-index: 3;
  line-height: 1.5;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: calc(0.6rem + 1vw);
 backdrop-filter: blur(4px);
  
  position: absolute;
  left: calc(5rem + 5vw);
  top: 10rem;
  font-family: 'Ubuntu Mono', monospace;
  font-style: italic;
`

const float = keyframes`
0% { transform: translateY(-10px) }
50% { transform: translateY(15px) translateX(15px) }
100% { transform: translateY(-10px) }
`
const Spaceman = styled.div`
position: absolute;
top: 10%;
right: 5%;
width: 20vw;
animation: ${float} 4s ease infinite;
img{
    width: 100%;
    height: auto;
}
`


const Roarity = () => {
      return ( 
            <Section id="roarity">
                  <Title>Roarity</Title>
                  <Spaceman>
                        <img src={astronaut} alt="spaceman" />
                  </Spaceman>    


                  <Main>
                        I'm a front-end developer located in India. I love to create simple yet beautiful websites with great user experience.
                        <br /> <br/>
                        I'm interested in the whole frontend stack Like trying new things and building great projects. I'm an independent freelancer and blogger. I love to write blogs and read books.
                        <br/> <br/>
                        I believe everything is an Art when you put your consciousness in it. You can connect with me via social links.
                  </Main>

            </Section>
            
       );
}
 
export default Roarity;