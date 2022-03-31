import React, {useState} from 'react'
import styled from 'styled-components'

import img1 from '../../assets/Nfts/bighead.svg';
import img2 from '../../assets/Nfts/bighead-1.svg';
import img3 from '../../assets/Nfts/bighead-2.svg';
import img4 from '../../assets/Nfts/bighead-3.svg';
import img5 from '../../assets/Nfts/bighead-4.svg';

import ETH from '../../assets/icons8-ethereum-48.png'


import { useMoralis } from "react-moralis"

import {cryptoboysAddress, chain } from "../../config"

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

const NftItem = ({img, tokenId, price=0}) => {
    return(
        <ImgContainer >
            <img width={500} height={400}  src={img} alt="The Weirdos" />
            <Details>
                <div>
                <span>Weirdos</span> <br />
                <h1>#{tokenId}</h1>
                </div>

                <div>
                <h1>SELL {price}</h1>
                
                </div>
            </Details>
        </ImgContainer>
    )
} 
      
const MyNFT = () => {

    const { user, account, authenticate, Moralis } = useMoralis();
    const [nfts, setNFTs] = useState([]);

    async function initApp () {
        console.log(user);

        if (!user) {
            try {
                user = await authenticate({ signingMessage: "Hello World!" })
                // allNFTs();
            } catch(error) {
                console.log(error)
            }
        } else {
            // allNFTs();
        }
    }

    async function allNFTs(){
        // await Moralis.enableWeb3();
        
        const options = {
            address: account,
            token_address: cryptoboysAddress,
            chain: chain,
        };
        
        const allCryptoBoys = await Moralis.Web3API.account.getNFTsForContract(options);

        allCryptoBoys.result.forEach(function(nft){

            let url = fixUrl(nft.token_uri);
            let id = nft.token_id;
            fetch(url)
            .then(res => res.json())
            .then(data => {


                var resp = {
                    'img':fixUrl(data.image),
                    'tokebId':id,
                    'price':1,
                }

                nfts.push(resp);
            });
        })
    }

    function fixUrl(url) {
        if (url.startsWith("ipfs")) {
            return "https://gateway.pinata.cloud/ipfs/" + url.split("ipfs://ipfs/")[1];
        } else {
            if (url.endsWith("json")) {
                return url + "?format=json";
            }else {
                return url + ".json?format=json";
            }
        }
    }

    
    allNFTs();

    return ( 
        <Section id="showcase">
        <Row direction="none">
        {nfts.map((cryptoboy) => {
            console.log(cryptoboy);
            return (
                <NftItem img={cryptoboy.img}  tokebId={cryptoboy.tokebId} price={cryptoboy.price} />
            )
        })}
            {/* <NftItem img={img1}  number={852} price={1}    />
            <NftItem img={img2}  number={123} price={1.2}   />
            <NftItem img={img3}  number={456} price={2.5}    />
            <NftItem img={img4}  number={666} price={3.5}   />
            <NftItem img={img5}  number={452} price={4.7}  /> */}
    
        </Row>

        </Section>

    );
}
 
export default MyNFT;