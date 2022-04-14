import React, { useState } from "react";
import styled from "styled-components";
import Typewriter from "typewriter-effect";
import Button from './Button';

import { useMoralis, useMoralisWeb3Api } from "react-moralis"

import {cryptoboysAddress, chain } from "../config"
import CryptoBoyContract from "../abis/CryptoBoys.json"

const Title = styled.h2`
  font-size: ${(props) => props.theme.fontxxl};
  text-transform: capitalize;
  width: 80%;
  color: ${(props) => props.theme.text};
  align-self: flex-start;

  span {
    text-transform: uppercase;
    font-family: "Akaya Telivigala", cursive;
  }
  .text-1{
      color: blue;
  }
  .text-2{
      color: orange;
  }
  .text-3{
      color: red;
  }

  @media (max-width: 70em) {
    font-size: ${(props) => props.theme.fontxl};

  }
  @media (max-width: 48em) { 
    align-self: center;
    text-align:center;
  }
  @media (max-width: 40em){
    width: 90%;
  }

  
`;

const SubTitle = styled.h3`
  font-size: ${(props) => props.theme.fontlg};
  text-transform: capitalize;
  color: ${props => `rgba(${props.theme.textRgba}, 0.6)`};
  font-weight:600;
  margin-bottom: 1rem;
  width: 80%;
  align-self: flex-start;

  @media (max-width: 40em) {
    font-size: ${(props) => props.theme.fontmd};

  }

  @media (max-width: 48em) { 
    align-self: center;
    text-align:center;
  }
  
`

const ButtonContainer = styled.div`
 width: 80%;
  align-self: flex-start;

  @media (max-width: 48em) { 
    align-self: center;
    text-align:center;

    button{
      margin: 0 auto;
    }
  }

`
const TypeWriterText = () => {

    const { user, account, authenticate, Moralis } = useMoralis();
    const Web3Api = useMoralisWeb3Api();
    let [count, setCount] = useState(1);

    async function initApp () {
        console.log(user);

        if (!user) {
            try {
                user = await authenticate({ signingMessage: "Hello World!" })
                mintNFT();
            } catch(error) {
                console.log(error)
            }
        } else {
            mintNFT();
        }
    }

    async function mintNFT(){
        await Moralis.enableWeb3();
        const options = {
            contractAddress: cryptoboysAddress,
            abi: CryptoBoyContract,
        };

        const mint = await Moralis.executeFunction({
            functionName: "mint",
            params : { amount: count.toString() }, 
            msgValue: Moralis.Units.ETH("0.025") * count,
            ...options,
        });
        console.log(mint);
    }

    function incrementCount() {
        count = count + 1;
        setCount(count);
    }

    function decrementCount() {
        count = count == 1 ? 1 : count - 1;
        setCount(count);
    }

    return (
        <>
        <Title>
            Discover a new era of cool
            <Typewriter
                options={{
                    autoStart: true,
                    loop: true,
                }}
                onInit={(typewriter) => {
                    typewriter
                    .typeString(`<span class="text-1">NFTs.</span>`)
                    .pauseFor(2000)
                    .deleteAll()
                    .typeString(`<span class="text-2">Collectible Items.</span>`)
                    .pauseFor(2000)
                    .deleteAll()
                    .typeString(`<span class="text-3">Ape Killers!</span>`)
                    .pauseFor(2000)
                    .deleteAll()
                    .start();
                }}
            />      
        </Title>

        <SubTitle>Bored Of Apes? Try Something New.</SubTitle>

        {/*鑄造*/ }
        
        <ButtonContainer>
            {/* <div>{count}</div> */}
            <Button style="light" text="-" click={decrementCount} />
            <Button style="non-outline" text={count} />
            <Button style="light" text="+" click={incrementCount} />
            <Button text= "Mint" click={initApp}/>
        </ButtonContainer>
        </>
    );
};

export default TypeWriterText;
