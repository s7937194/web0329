import styled from 'styled-components'
import { Design, Develope} from './AllSvgs';



const Section = styled.section`
  min-height: 100vh;
  width: 100vw;
  background-color: ${props => props.theme.text};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;

&>*:first-child{
  animation-duration: 20s;

  @media (max-width: 30em){
    animation-duration: 15s;

  }
}
&>*:last-child{
  animation-duration: 15s;
  @media (max-width: 30em){
    animation-duration: 10s;

  }
}
`
const Title = styled.h1`
  font-size: ${(props) => props.theme.fontxxl};
  text-transform: uppercase;
  color: ${(props) => props.theme.body};
  
  margin: 1rem auto;
  border-bottom: 2px solid ${(props) => props.theme.carouselColor};
  width: fit-content;

  @media (max-width: 48em){
  font-size: ${(props) => props.theme.fontxl};

  }
`;
const Container = styled.div`
    width: 75%;
    margin: 2rem auto;

    display: flex;
    justify-content: space-between;
    align-content: center;

@media (max-width: 64em){
  width: 80%;
  }
  @media (max-width: 48em){
  width: 90%;
  flex-direction: column;

  &>*:last-child{
    &>*:first-child{

    margin-top: 0;
}

  }
  }
`

const Main = styled.div`
  border: 2px solid ${props => props.theme.text};
  color: ${props => props.theme.text};
  background-color: ${props => props.theme.body};
  padding: 2rem;
  width: 30vw;
  height: 60vh;
  z-index:3;
  line-height: 1.5;
  cursor: pointer;

  font-family: 'Ubuntu Mono',monospace;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

`

const BoxTitle = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: calc(1em + 1vw);



&>*:first-child{
  margin-right: 1rem;
}
`
const Description = styled.div`
  color: ${props => props.theme.text};
  font-size: calc(0.6em + 1vw);
  padding: 0.5rem 0;



strong{
  margin-bottom: 1rem;
  text-transform: uppercase;
}
ul,p{
  margin-left: 2rem;
}
`


const Tokenomics = () => {

      return ( 
            
            <Section id="tokenomics">
                  <Title>Tokenomics</Title>
                  <Container>

                        <Main>
                              <BoxTitle>
                                    <Design width={40} height={40} /> Tokenomics1
                              </BoxTitle>

                              <Description>
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                              </Description>
                              <Description>
                                    <strong>Tokenomics1</strong>
                                    <ul>
                                    <li>
                                          Lorem, ipsum dolor
                                    </li>
                                    <li>
                                          Lorem, ipsum dolor
                                    </li>
                                    </ul>
                              </Description>
                              <Description>
                                    <strong>Tokenomics2</strong>
                                    <ul>
                                    <li>
                                    Figma
                                    </li>
                                    
                                    </ul>
                              </Description>


                        </Main>

                        <Main>
                              <BoxTitle>
                                    <Develope width={40} height={40} /> Tokenomics2
                              </BoxTitle>
                              <Description>
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                              </Description>
                              <Description>
                                    <strong>Tokenomics1</strong>
                                    <p>
                                          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                    </p>
                              </Description>
                              <Description>
                                    <strong>Tokenomics2</strong>
                                    <p>
                                          Lorem, ipsum dolor
                                    </p>
                              </Description>
                        </Main>
                  </Container>
            </Section>
       );
}
 
export default Tokenomics;