import React, {useState, useEffect} from 'react'
import img1 from '../../assets/Nfts/bighead.svg';
import tw from 'tailwind-styled-components/dist/tailwind';
import Avax from  './avax.svg'
import 'antd/dist/antd.css';
import { Select } from 'antd';

import { useMoralis } from "react-moralis"
import {marketAddress, chain } from "../../config"
import MarketContract from "../../abis/Market.json"

const { Option } = Select;
function handleChange(value) {
    console.log(`selected ${value}`);
}

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
const InfoBox = tw.div`
    m-20
    flex 
    justify-evenly 
    items-center
`
const Info = tw.div`
    mx-20
`
const Tittle = tw.div`
    text-white
    text-2xl
    font-bold
`
const PriceBox = tw.div`
    w-[40%]
    m-10
    flex 
    justify-evenly 
    items-center
`
const Price = tw.div`
    text-center
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


const Market = () => {
    
    const { Moralis } = useMoralis();
    const [ nfts, setNFTs ] = useState([]);

    const [ isPopSwitch, setIsPopSwitch ] = useState(false)
    const [ isRecentSwitch, setIsRecentSwitch ] = useState(false)
    const [ isFilterSwitch, setIsFilterSwitch ] = useState(false)
    
    const clickPop =() => {
        if (!isPopSwitch) {
            setIsPopSwitch(true)
        }else {
            setIsPopSwitch(false)
        }
    }

    const clickRecent =() => {
        if (!isRecentSwitch) {
            setIsRecentSwitch(true)
        }else {
            setIsRecentSwitch(false)
        }
    }

    const clickFilter =() => {
        if (!isFilterSwitch) {
            setIsFilterSwitch(true)
        }else {
            setIsFilterSwitch(false)
        }
    }

    const allNFTs = async () => {

        await Moralis.enableWeb3();
        const options = {
            contractAddress: marketAddress,
            abi: MarketContract,
        };

        const listings = await Moralis.executeFunction({
            functionName: "getActiveListings",
            params : { from: 0, length: 100 }, 
            ...options,
        });
        console.log(listings);

        setNFTs([]);
        listings.forEach( function(nft){

            let url = fixUrl(nft.tokenURI);
            console.log(url);

            fetch(url).then(res => res.json()).then(data => {

                console.log(data);

                var newElement = {
                    'img' : fixImageUrl(data.image),
                    'name': data.name,
                    'id'  : nft.tokenId,
                }
                setNFTs(nfts => [...nfts, newElement]);
            });
        })
    };

    function fixUrl(url) {
        if (url.startsWith("ipfs")) {
            return "https://gateway.pinata.cloud/ipfs/" + url.split("ipfs://")[1]+".json?format=json";
        } else {
            if (url.endsWith("json")) {
                return url + "?format=json";
            }else {
                return url + ".json?format=json";
            }
        }
    };

    function fixImageUrl(url) {
        if (url.startsWith("ipfs")) {
            return "https://gateway.pinata.cloud/ipfs/" + url.split("ipfs://")[1];
        }
        return url
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
                                clip-rule="evenodd">
    
                            </path>
                        </svg>
                    </div>
    
                    <div className="mt-2 text-sm">
                        <input type="number"  step="0.01"  className="block w-full px-3 py-2 mt-1 text-sm bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"/>
                        <p>Price in AVAX</p>
                    </div>
                    <div className="mt-3 flex justify-end space-x-3">
                        <button onClick={clickPop} className="px-3 py-1 rounded hover:bg-red-300 hover:bg-opacity-50 hover:text-red-900">Cancel</button>
                        <button className="px-3 py-1 bg-red-800 text-gray-200 hover:bg-red-600 rounded">List NFT</button>
                    </div>
                </div>
            </div>
        )
    }

    const NftItemData = ({ img, id=0, name="" }) => {
        return(
            <NftItem>
                <img src={img1} width={300} />
                <div className="flex bg-gray-800">
                    <div className="m-2 text-2l font-bold text-white flex-2">{name}</div>
                    <button className="flex-1 w-screen text-white bg-red-800"> Buy</button>
                </div>
            </NftItem>
        )
    } 

    const Recent = () => {
        return(
            <div className="bg-black bg-opacity-80 absolute inset-0  justify-center items-center flex z-30 h-[220%]">
                <div className="flex flex-col z-20 bg-[#182028] text-white rounded-10 w-full h-full top-[20%] max-w-[600px] max-h-[640px] fixed ">
                    <div className="flex items-center justify-between m-3 border-b-2 border-gray-500 px-lg py-md xs:p-md">
                        <div className="flex flex-col">
                            <div>
                                <strong className="text-2xl">Recent Market Sales</strong>
                                <span className="mx-3 underline cursor-pointer ml-md">Refresh</span>
                            </div>
                            <span className="flex items-center">
                                Last 30 transaction
                                <div className="flex items-center m-2 text-lg">
                                    121.24
                                    <img className="m-2"src={Avax} width={20} />
                                </div>
                            </span>
                        </div>
                        <span className="flex flex-1"></span>
                        <svg onClick={clickRecent} className="h-6 w-6 cursor-pointer p-1 hover:bg-gray-300 rounded-full" id="close-modal" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clip-rule="evenodd">
        
                                </path>
                            </svg>
                    </div>

                    
                    <div className="sc-kDTinF dICsIU px-lg xs:px-md text-white overflow-auto max-h-[100%]">
                        <div className="px-3 text-sm ">
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col w-full">

                                    <div className="pb-4 my-2 border-b-2 border-gray-500">
                                        <div className="flex mx-1 text-gray-500 mt-xs">
                                            <div className="flex xs:flex-col">
                                                <strong>TX ID: &nbsp;</strong>
                                                <a className="flex mr-2 text-white underline" href="">0x2df5...13d531</a>
                                            </div>
                                            <div className="flex xs:flex-col">
                                                <strong>Token ID:&nbsp;</strong>
                                                <a className="flex mr-2 text-white underline" href="">5083</a>
                                            </div>
                                            <span className="flex flex-1"></span>
                                            <span className="text-xs text-gray-300"> 2022/4/9 下午4:16:19</span>
                                        </div>
                                        <div className="flex items-center">
                                            <img className="cursor-pointer rounded-[4px] w-[50px] mr-3 bg-white" src={img1} alt="" />
                                            <div className="flex flex-col text-gray-500">
                                                <span>From</span>
                                                <a className="text-white underline" href="">0xddc1...7de2bc</a>
                                            </div>
                                            <div className="px-4 text-2xl xs:px-xs"> >></div>
                                            <div className="flex flex-col text-gray-500">
                                                <span>To</span>
                                                <a className="text-white underline" href="">0xa5b7...c68de6</a>
                                            </div>
                                            <div className="flex justify-end flex-1 pr-lg">
                                                <span className="text-white px-2 xs:px-[4px] rounded-10 bg-green-500 m-2 rounded-md">Common</span>
                                            </div>
                                            <div className="flex justify-end min-w-[50px]">
                                                <div className="flex items-center ">
                                                    2.69
                                                    <img className="m-2"src={Avax} width={20} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pb-4 my-2 border-b-2 border-gray-500">
                                        <div className="flex mx-1 text-gray-500 mt-xs">
                                            <div className="flex xs:flex-col">
                                                <strong>TX ID: &nbsp;</strong>
                                                <a className="flex mr-2 text-white underline" href="">0x2df5...13d531</a>
                                            </div>
                                            <div className="flex xs:flex-col">
                                                <strong>Token ID:&nbsp;</strong>
                                                <a className="flex mr-2 text-white underline" href="">5083</a>
                                            </div>
                                            <span className="flex flex-1"></span>
                                            <span className="text-xs text-gray-300"> 2022/4/9 下午4:16:19</span>
                                        </div>
                                        <div className="flex items-center">
                                            <img className="cursor-pointer rounded-[4px] w-[50px] mr-3 bg-white" src={img1} alt="" />
                                            <div className="flex flex-col text-gray-500">
                                                <span>From</span>
                                                <a className="text-white underline" href="">0xddc1...7de2bc</a>
                                            </div>
                                            <div className="px-4 text-2xl xs:px-xs"> >></div>
                                            <div className="flex flex-col text-gray-500">
                                                <span>To</span>
                                                <a className="text-white underline" href="">0xa5b7...c68de6</a>
                                            </div>
                                            <div className="flex justify-end flex-1 pr-lg">
                                                <span className="text-white px-2 xs:px-[4px] rounded-10 bg-green-500 m-2 rounded-md">Common</span>
                                            </div>
                                            <div className="flex justify-end min-w-[50px]">
                                                <div className="flex items-center ">
                                                    2.69
                                                    <img className="m-2"src={Avax} width={20} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pb-4 my-2 border-b-2 border-gray-500">
                                        <div className="flex mx-1 text-gray-500 mt-xs">
                                            <div className="flex xs:flex-col">
                                                <strong>TX ID: &nbsp;</strong>
                                                <a className="flex mr-2 text-white underline" href="">0x2df5...13d531</a>
                                            </div>
                                            <div className="flex xs:flex-col">
                                                <strong>Token ID:&nbsp;</strong>
                                                <a className="flex mr-2 text-white underline" href="">5083</a>
                                            </div>
                                            <span className="flex flex-1"></span>
                                            <span className="text-xs text-gray-300"> 2022/4/9 下午4:16:19</span>
                                        </div>
                                        <div className="flex items-center">
                                            <img className="cursor-pointer rounded-[4px] w-[50px] mr-3 bg-white" src={img1} alt="" />
                                            <div className="flex flex-col text-gray-500">
                                                <span>From</span>
                                                <a className="text-white underline" href="">0xddc1...7de2bc</a>
                                            </div>
                                            <div className="px-4 text-2xl xs:px-xs"> >></div>
                                            <div className="flex flex-col text-gray-500">
                                                <span>To</span>
                                                <a className="text-white underline" href="">0xa5b7...c68de6</a>
                                            </div>
                                            <div className="flex justify-end flex-1 pr-lg">
                                                <span className="text-white px-2 xs:px-[4px] rounded-10 bg-green-500 m-2 rounded-md">Common</span>
                                            </div>
                                            <div className="flex justify-end min-w-[50px]">
                                                <div className="flex items-center ">
                                                    2.69
                                                    <img className="m-2"src={Avax} width={20} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pb-4 my-2 border-b-2 border-gray-500">
                                        <div className="flex mx-1 text-gray-500 mt-xs">
                                            <div className="flex xs:flex-col">
                                                <strong>TX ID: &nbsp;</strong>
                                                <a className="flex mr-2 text-white underline" href="">0x2df5...13d531</a>
                                            </div>
                                            <div className="flex xs:flex-col">
                                                <strong>Token ID:&nbsp;</strong>
                                                <a className="flex mr-2 text-white underline" href="">5083</a>
                                            </div>
                                            <span className="flex flex-1"></span>
                                            <span className="text-xs text-gray-300"> 2022/4/9 下午4:16:19</span>
                                        </div>
                                        <div className="flex items-center">
                                            <img className="cursor-pointer rounded-[4px] w-[50px] mr-3 bg-white" src={img1} alt="" />
                                            <div className="flex flex-col text-gray-500">
                                                <span>From</span>
                                                <a className="text-white underline" href="">0xddc1...7de2bc</a>
                                            </div>
                                            <div className="px-4 text-2xl xs:px-xs"> >></div>
                                            <div className="flex flex-col text-gray-500">
                                                <span>To</span>
                                                <a className="text-white underline" href="">0xa5b7...c68de6</a>
                                            </div>
                                            <div className="flex justify-end flex-1 pr-lg">
                                                <span className="text-white px-2 xs:px-[4px] rounded-10 bg-green-500 m-2 rounded-md">Common</span>
                                            </div>
                                            <div className="flex justify-end min-w-[50px]">
                                                <div className="flex items-center ">
                                                    2.69
                                                    <img className="m-2"src={Avax} width={20} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pb-4 my-2 border-b-2 border-gray-500">
                                        <div className="flex mx-1 text-gray-500 mt-xs">
                                            <div className="flex xs:flex-col">
                                                <strong>TX ID: &nbsp;</strong>
                                                <a className="flex mr-2 text-white underline" href="">0x2df5...13d531</a>
                                            </div>
                                            <div className="flex xs:flex-col">
                                                <strong>Token ID:&nbsp;</strong>
                                                <a className="flex mr-2 text-white underline" href="">5083</a>
                                            </div>
                                            <span className="flex flex-1"></span>
                                            <span className="text-xs text-gray-300"> 2022/4/9 下午4:16:19</span>
                                        </div>
                                        <div className="flex items-center">
                                            <img className="cursor-pointer rounded-[4px] w-[50px] mr-3 bg-white" src={img1} alt="" />
                                            <div className="flex flex-col text-gray-500">
                                                <span>From</span>
                                                <a className="text-white underline" href="">0xddc1...7de2bc</a>
                                            </div>
                                            <div className="px-4 text-2xl xs:px-xs"> >></div>
                                            <div className="flex flex-col text-gray-500">
                                                <span>To</span>
                                                <a className="text-white underline" href="">0xa5b7...c68de6</a>
                                            </div>
                                            <div className="flex justify-end flex-1 pr-lg">
                                                <span className="text-white px-2 xs:px-[4px] rounded-10 bg-green-500 m-2 rounded-md">Common</span>
                                            </div>
                                            <div className="flex justify-end min-w-[50px]">
                                                <div className="flex items-center ">
                                                    2.69
                                                    <img className="m-2"src={Avax} width={20} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pb-4 my-2 border-b-2 border-gray-500">
                                        <div className="flex mx-1 text-gray-500 mt-xs">
                                            <div className="flex xs:flex-col">
                                                <strong>TX ID: &nbsp;</strong>
                                                <a className="flex mr-2 text-white underline" href="">0x2df5...13d531</a>
                                            </div>
                                            <div className="flex xs:flex-col">
                                                <strong>Token ID:&nbsp;</strong>
                                                <a className="flex mr-2 text-white underline" href="">5083</a>
                                            </div>
                                            <span className="flex flex-1"></span>
                                            <span className="text-xs text-gray-300"> 2022/4/9 下午4:16:19</span>
                                        </div>
                                        <div className="flex items-center">
                                            <img className="cursor-pointer rounded-[4px] w-[50px] mr-3 bg-white" src={img1} alt="" />
                                            <div className="flex flex-col text-gray-500">
                                                <span>From</span>
                                                <a className="text-white underline" href="">0xddc1...7de2bc</a>
                                            </div>
                                            <div className="px-4 text-2xl xs:px-xs"> >> </div>
                                            <div className="flex flex-col text-gray-500">
                                                <span>To</span>
                                                <a className="text-white underline" href="">0xa5b7...c68de6</a>
                                            </div>
                                            <div className="flex justify-end flex-1 pr-lg">
                                                <span className="text-white px-2 xs:px-[4px] rounded-10 bg-green-500 m-2 rounded-md">Common</span>
                                            </div>
                                            <div className="flex justify-end min-w-[50px]">
                                                <div className="flex items-center ">
                                                    2.69
                                                    <img className="m-2"src={Avax} width={20} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    return ( 
        <Section>
            {isPopSwitch && <Popup />}
            {isRecentSwitch  && <Recent /> }
            
            <Container>
                <InfoBox>
                    <Info>
                        <Tittle>Total Volume</Tittle>
                        <div className="flex items-center justify-center">
                            <div className="m-2 text-white">51852.1644</div>
                            <img src={Avax} width={20} />
                        </div>
                    </Info>
                    <Info>
                        <Tittle>Total Sales</Tittle>
                        <div className="flex items-center justify-center">
                            <div className="m-2 text-white">6735</div>
                        </div>
                    </Info>
                    <Info>
                        <Tittle>Highest Sale Price</Tittle>
                        <div className="flex items-center justify-center">
                            <div className="m-2 text-white">1200</div>
                            <img src={Avax} width={20} />
                        </div>
                    </Info>
                    <Info>
                        <Tittle>Distributed</Tittle>
                        <div className="flex items-center justify-center">
                            <div className="m-2 text-white">1037.0433</div>
                            <img src={Avax} width={20} />
                        </div>
                    </Info>
                </InfoBox>

                <Tittle>Floor Price</Tittle>

                <PriceBox>
                    <Price>
                        <div className="text-green-500">Common</div>
                        <div className="flex items-center justify-center">
                            <div className="m-2 text-white">1.9</div>
                            <img src={Avax} width={20} />
                        </div>
                    </Price>
                    <Price>
                        <div className="text-blue-600">Rare</div>
                        <div className="flex items-center justify-center">
                            <div className="m-2 text-white">2.3</div>
                            <img src={Avax} width={20} />
                        </div>
                    </Price>
                    <Price>
                        <div className="text-red-600">Exceptional</div>
                        <div className="flex items-center justify-center">
                            <div className="m-2 text-white">4.2</div>
                            <img src={Avax} width={20} />
                        </div>
                    </Price>
                    <Price>
                        <div className="text-purple-600">Epic</div>
                        <div className="flex items-center justify-center">
                            <div className="m-2 text-white">10.5</div>
                            <img src={Avax} width={20} />
                        </div>
                    </Price>
                    <Price>
                        <div className="text-yellow-600">Legendary</div>
                        <div className="flex items-center justify-center">
                            <div className="m-2 text-white">50</div>
                            <img src={Avax} width={20} />
                        </div>
                    </Price>
                </PriceBox>

                <div className="items-center sticky top-0 z-[2] bg-black w-[100%] ">
                    <div className="items-center p-lg bg-black z-[2] w-[100%]">
                        {isFilterSwitch &&
                        <div className="grid grid-cols-5 sc-bqiRlB hBAORa lg:grid-cols-4 xs:grid-cols-3 gap-x-lg gap-y-sm pb-lg ">
                            <div className="flex-[1] m-4">
                                <span className="text-white capitalize text-md">Image ID</span>
                                <div>
                                    <input autocomplete="off" role="spinbutton" step="1" placeholder="Search for id" className="h-8 w-[200px]"  />
                                </div>
                            </div>

                            <div className="flex-[1] m-4">
                                <span className="text-white capitalize text-md">Status</span>
                                <div>
                                    <Select  defaultValue="Please select" style={{ width: 200 }} onChange={handleChange}>
                                        <Option value="jack">Jack</Option>
                                        <Option value="lucy">Lucy</Option>
                                    </Select>
                                </div>
                            </div>
                            <div className="flex-[1] m-4">
                                <span className="text-white capitalize text-md">Color</span>
                                <div>
                                    <Select  defaultValue="Please select" style={{ width: 200 }} onChange={handleChange}>
                                        <Option value="jack">Jack</Option>
                                        <Option value="lucy">Lucy</Option>
                                    </Select>
                                </div>
                            </div>
                            <div className="flex-[1] m-4">
                                <span className="text-white capitalize text-md">Fur</span>
                                <div>
                                    <Select  defaultValue="Please select" style={{ width: 200 }} onChange={handleChange}>
                                        <Option value="jack">Jack</Option>
                                        <Option value="lucy">Lucy</Option>
                                    </Select>
                                </div>
                            </div>
                            <div className="flex-[1] m-4">
                                <span className="text-white capitalize text-md">Cloth</span>
                                <div>
                                    <Select  defaultValue="Please select" style={{ width: 200 }} onChange={handleChange}>
                                        <Option value="jack">Jack</Option>
                                        <Option value="lucy">Lucy</Option>
                                    </Select>
                                </div>
                            </div>
                            <div className="flex-[1] m-4">
                                <span className="text-white capitalize text-md">Earring</span>
                                <div>
                                    <Select  defaultValue="Please select" style={{ width: 200 }} onChange={handleChange}>
                                        <Option value="jack">Jack</Option>
                                        <Option value="lucy">Lucy</Option>
                                    </Select>
                                </div>
                            </div>
                            <div className="flex-[1] m-4">
                                <span className="text-white capitalize text-md">Glass</span>
                                <div>
                                    <Select  defaultValue="Please select" style={{ width: 200 }} onChange={handleChange}>
                                        <Option value="jack">Jack</Option>
                                        <Option value="lucy">Lucy</Option>
                                    </Select>
                                </div>
                            </div>
                            <div className="flex-[1] m-4">
                                <span className="text-white capitalize text-md">Hat</span>
                                <div>
                                    <Select  defaultValue="Please select" style={{ width: 200 }} onChange={handleChange}>
                                        <Option value="jack">Jack</Option>
                                        <Option value="lucy">Lucy</Option>
                                    </Select>
                                </div>
                            </div>
                        </div>
                        }
                        
                        <div className="relative flex items-center justify-between w-[100%] my-10">
                            {/* <div className="text-white underline text-cursor-pointer text-md">Back to top</div> */}
                            <div className="left-1/2 transform translate-x-[-50%] absolute flex justify-center">
                                <button onClick={clickRecent} className="px-4 py-2 text-white bg-green-600 rounded-lg">VIEW RECENT SALES</button>
                            </div>
                            {isFilterSwitch ? (
                                <button onClick={clickFilter} className="text-right text-white underline cursor-pointer text-md">Hide Filters</button>
                            ):(
                                <button onClick={clickFilter} className="text-right text-white underline cursor-pointer text-md">Show Filters</button>
                            )}
                        </div>
                    </div>
                </div>

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
 
export default Market;
