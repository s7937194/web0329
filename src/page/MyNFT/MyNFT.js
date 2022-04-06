import React, {useState, useEffect} from 'react'
import styled from 'styled-components'

import img1 from '../../assets/Nfts/bighead.svg';
// import img2 from '../../assets/Nfts/bighead-1.svg';
// import img3 from '../../assets/Nfts/bighead-2.svg';
// import img4 from '../../assets/Nfts/bighead-3.svg';
// import img5 from '../../assets/Nfts/bighead-4.svg';
import ETH from '../../assets/icons8-ethereum-48.png'

import { useMoralis } from "react-moralis"

import {cryptoboysAddress, marketAddress, chain, chunkSize } from "../../config"
import CryptoBoyContract from "../../abis/CryptoBoys.json"
import MarketContract from "../../abis/Market.json"

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

const NftItem = ({img, id=0, name="", price=1, func}) => {
    return(
        <ImgContainer>
            <img width={500} height={400}  src={img1} alt="The Weirdos" />
            <Details>
                <div>
                    <span>Weirdos</span> <br />
                    <h1>{name}</h1>
                </div>
                <div>
                    {/* <span>Price</span>
                    <Price>
                        <img width={200} height={200}  src={ETH} alt="ETH" />
                        <h1>{Number(price).toFixed(1)}</h1>
                    </Price> */}
                    <span>Sell</span>
                    <h1 onClick={() => func(id)}>Add</h1>
                </div>
                
            </Details>
            
        </ImgContainer>
    )
} 
      
const MyNFT = () => {

    const APP_ID = process.env.REACT_APP_MORALIS_APPLICATION_ID;
    const SERVER_URL = process.env.REACT_APP_MORALIS_SERVER_URL;
    const { account, Moralis } = useMoralis();
    const [nfts, setNFTs] = useState([]);

    const addToMarket = async (_tokenId) => {

        await Moralis.enableWeb3();

        const NFTOpts = {
            contractAddress: cryptoboysAddress,
            abi: CryptoBoyContract,
        };

        const MarketOpts = {
            contractAddress: marketAddress,
            abi: MarketContract,
        };

        const approveAddress = await Moralis.executeFunction({
            functionName: "getApproved",
            params : {tokenId : _tokenId},
            ...NFTOpts,
        });

        if (approveAddress != marketAddress) {
            const approve = await Moralis.executeFunction({
                functionName: "approve",
                params : {to : marketAddress, tokenId : _tokenId},
                ...NFTOpts,
            });
            console.log(approve);
        }

        const addListing = await Moralis.executeFunction({
            functionName: "addListing",
            params : {tokenId : _tokenId, price : 1},
            ...MarketOpts,
        });
        console.log(addListing);
    }

    const allNFTs = async () => {

        const startOptions = {
            appId : APP_ID,
            serverUrl : SERVER_URL,
        }
    
        await Moralis.start(startOptions);
        
        const options = {
            address: account,
            token_address: cryptoboysAddress,
            chain: chain,
        };
        
        const allCryptoBoys = await Moralis.Web3API.account.getNFTsForContract(options);

        setNFTs([]);
        allCryptoBoys.result.forEach(function(nft){

            let url = fixUrl(nft.token_uri);

            fetch(url)
            .then(res => res.json())
            .then(data => {

                var newElement = {
                    'img' : fixUrl(data.image),
                    'name': data.name,
                    'id'  : nft.token_id,
                }

                setNFTs(nfts => [...nfts, newElement]);
            });
        })
    };

    function fixUrl(url) {
        if (url.startsWith("ipfs")) {
            return "https://gateway.pinata.cloud/ipfs/" + url.split("ipfs://")[1];
        } else {
            if (url.endsWith("json")) {
                return url + "?format=json";
            }else {
                return url + ".json?format=json";
            }
        }
    };

    useEffect( () => {
        allNFTs();
    }, []);

    function NFTList(props) {
        const nfts = props.nfts;
        const listItems = nfts.map((cryptoboy, index) =>
            <NftItem key={index+1} img={cryptoboy.img} id={cryptoboy.id} name={cryptoboy.name} func={addToMarket} />
        );
        const groups = listItems.map((e, i) => { 
            return i % chunkSize === 0 ? <Row key={i} direction="none">{listItems.slice(i, i + chunkSize)}</Row> : null; 
        }).filter(e => { return e; });

        return groups;
    }

    return ( 
        <Section id="showcase">
            <NFTList nfts={nfts}/>
        </Section>
    );
}
 
export default MyNFT;