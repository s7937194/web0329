import React, {useState, useEffect} from 'react'
import img1 from '../../assets/Nfts/bighead.svg';
import tw from 'tailwind-styled-components/dist/tailwind';
import Avax from  './avax.svg'

import { useMoralis } from "react-moralis"

import {cryptoboysAddress, marketAddress, chain, chunkSize } from "../../config"
import CryptoBoyContract from "../../abis/CryptoBoys.json"
import MarketContract from "../../abis/Market.json"


const Section = tw.div`
flex 
justify-center 
items-center
w-screen 
bg-black
`

const Container = tw.div`
flex 
flex-col
items-center
w-[90%]
h-[90%]
`
const RewardBox = tw.div`
m-20
flex 
justify-evenly 
items-center
`
const Reward = tw.div`
mx-20
`
const Tittle = tw.div`
text-white
text-2xl
font-bold
`

const NftBox = tw.div`
w-[70%]
flex 
items-center
flex-wrap
`
const NftItem = tw.div`
w-[20%]
bg-white
rounded-xl
flex 
flex-col
overflow-hidden
m-8
`

const MyNFT = () => {

    const APP_ID = process.env.REACT_APP_MORALIS_APPLICATION_ID;
    const SERVER_URL = process.env.REACT_APP_MORALIS_SERVER_URL;
    const { account, Moralis } = useMoralis();

    const [ nfts, setNFTs ] = useState([]);
    const [ isSwitch, setIsSwitch ] = useState(false);
    const [ popTokenId, setPopTokenId ] = useState(0);
    const [ price, setPrice ] = useState(0);

    const clickPop = () => {
        if (isSwitch ==false) {
            setPrice(1);
            setIsSwitch(true);
        }else {
            setIsSwitch(false)
        }
    }

    const addToMarket = async (_tokenId=0, _price=1) => {

        await Moralis.enableWeb3();

        const MarketOpts = {
            contractAddress: marketAddress,
            abi: MarketContract,
        };
        
        const addListing = await Moralis.executeFunction({
            functionName: "addListing",
            params : {tokenId : _tokenId, price : _price},
            ...MarketOpts,
        });
        console.log(addListing);
    
    };

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

    const Popup = () => {
        return(
            <div className="bg-black bg-opacity-80 absolute inset-0  justify-center items-center flex z-30 h-[220%]">
                <div className="bg-gray-200 max-w-sm py-4 px-5 rounded shadow-xl text-gray-800 w-[15%] top-[20%] absolute">
                    <div className="flex justify-between items-center">
                        <h4 className="text-lg font-bold my-2">Sell your NFT </h4>
                        <svg onClick={clickPop} className="h-6 w-6 cursor-pointer p-1 hover:bg-gray-300 rounded-full" id="close-modal" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd">
                            </path>
                        </svg>
                    </div>
    
                    <div className="mt-2 text-sm">
                        <input value={price} onChange={event => setPrice(event.target.value)} type="number" step="0.01" className="block w-full px-3 py-2 mt-1 text-sm bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"/>
                        <p>Price in AVAX</p>
                    </div>
                    <div className="mt-3 flex justify-end space-x-3">
                        <button onClick={clickPop} className="px-3 py-1 rounded hover:bg-red-300 hover:bg-opacity-50 hover:text-red-900">Cancel</button>
                        <button onClick={() => {
                            addToMarket(popTokenId, price);
                        }} className="px-3 py-1 bg-red-800 text-gray-200 hover:bg-red-600 rounded">List NFT</button>
                    </div>
                </div>
            </div>
        );
    }

    const NftItemData = ({ img, id=0, name="" }) => {
        return(
            <NftItem>
                <img src={img1} width={300} />
                <div className="flex bg-gray-800">
                    <div className="m-2 text-2l font-bold text-white flex-2">{name}</div>
                    <button onClick={() => {
                            setPopTokenId(id);
                            clickPop();
                    }} className="flex-1 w-screen text-white bg-red-800"> Sell</button>
                </div>
            </NftItem>
        )
    } 

    return ( 
        <Section>
            {isSwitch && <Popup />}
            
            <Container>
                <RewardBox>
                    <Reward>
                        <Tittle>Mint Rewards</Tittle>
                        <div className="flex items-center justify-center">
                            <div className="m-2 text-white">2.2</div>
                            <img src={Avax} width={20} />
                            <button className="px-2 m-2 text-white bg-red-800 rounded-md" >Calim</button>
                        </div>
                    </Reward>
                    <Reward>
                        <Tittle>Market Rewards</Tittle>
                        <div className="flex items-center justify-center">
                            <div className="m-2 text-white">25</div>
                            <img src={Avax} width={20} />
                            <button className="px-2 m-2 text-white bg-red-800 rounded-md" >Calim</button>
                        </div>
                    </Reward>
                </RewardBox>

                <Tittle>My NFTs</Tittle>
                <NftBox>
                {nfts.length > 0 ? (
                    nfts.sort((a, b) => (a.id > b.id) ? 1 : -1).map((cryptoboy, index) => {
                        return (
                            <NftItemData key={index} img={img1} id={cryptoboy.id} name={cryptoboy.name} />
                        );
                    })
                ):null}
                </NftBox>
            </Container>
        </Section>
    );
}
 
export default MyNFT;
