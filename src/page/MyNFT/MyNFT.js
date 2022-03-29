import React from 'react'
import styled from 'styled-components'

import img1 from '../../assets/Nfts/bighead.svg';
import img2 from '../../assets/Nfts/bighead-1.svg';
import img3 from '../../assets/Nfts/bighead-2.svg';
import img4 from '../../assets/Nfts/bighead-3.svg';
import img5 from '../../assets/Nfts/bighead-4.svg';

import ETH from '../../assets/icons8-ethereum-48.png'

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



const ImgContainer = styled.div`
width: 15rem;
margin: 0 1rem;
background-color:${props => props.theme.body};

border-radius: 20px;
cursor: pointer;

@media (max-width: 48em){
  width: 12rem;
  }
  @media (max-width: 30em){
  width: 10rem;
  }

img{
  width: 100%;
  height: auto;
}
`
const Row = styled.div`
/* background-color: lightblue; */
white-space: nowrap;
box-sizing:content-box;
margin: 2rem 0;
display: flex;
`

const Details = styled.div`
display: flex;
justify-content: space-between;
padding: 0.8rem 1rem;
background-color: ${props => props.theme.text};
border: 2px solid ${props => `rgba(${props.theme.bodyRgba},0.5)`};

border-bottom-left-radius: 20px;
border-bottom-right-radius: 20px;

span{
  font-size: ${props => props.theme.fontsm};
  color:${props => `rgba(${props.theme.bodyRgba},0.5)`};
  font-weight:600;
  line-height: 1.5rem;
}

h1{
  font-size: ${props => props.theme.fontmd};
  color: ${props => props.theme.body};
  font-weight:600;

  @media (max-width: 30em){
    font-size: ${props => props.theme.fontsm};

  }

}

`

const Price = styled.div`
display: flex;
justify-content: flex-start;
align-items: center;

img{
  width: 1rem;
  height: auto;

}
`


const NftItem = ({img, number=0, }) => {


      
      
        return(
          <ImgContainer >
            <img width={500} height={400}  src={img} alt="The Weirdos" />
            <Details>
              <div>
                <span>Weirdos</span> <br />
                <h1>#{number}</h1>
              </div>
      
              <div>
                <h1>SELL</h1>
                
              </div>
            </Details>
          </ImgContainer>
        )
      } 
      


const MyNFT = () => {

    
      return ( 
            <Section id="showcase">
            <Row direction="none">
              <NftItem img={img1}  number={852} price={1}    />
              <NftItem img={img2}  number={123} price={1.2}   />
              <NftItem img={img3}  number={456} price={2.5}    />
              <NftItem img={img4}  number={666} price={3.5}   />
              <NftItem img={img5}  number={452} price={4.7}  />
        
            </Row>

            </Section>

       );
}
 
export default MyNFT;