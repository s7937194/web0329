import React, {useState, useEffect} from 'react'
import img1 from '../../assets/Nfts/bighead.svg';
import tw from 'tailwind-styled-components/dist/tailwind';
import Avax from  './avax.svg'



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
    
    const [isSwitch,setIsSwitch] = useState(false)
    const clickPop =() =>{
        if (isSwitch ==false) {
            setIsSwitch(true)
        }else {
            setIsSwitch(false)
        }
    }

    const Popup = () => {
        return(
            <div class="bg-black bg-opacity-80 absolute inset-0  justify-center items-center flex z-30 h-[220%]">
                <div class="bg-gray-200 max-w-sm py-4 px-5 rounded shadow-xl text-gray-800 w-[15%] top-[20%] absolute">
                    <div class="flex justify-between items-center">
                        <h4 class="text-lg font-bold my-2">Sell your NFT </h4>
                        <svg onClick={clickPop} class="h-6 w-6 cursor-pointer p-1 hover:bg-gray-300 rounded-full" id="close-modal" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clip-rule="evenodd">
    
                            </path>
                        </svg>
                    </div>
    
                    <div class="mt-2 text-sm">
                        <input type="number"  step="0.01"  className="block w-full px-3 py-2 mt-1 text-sm bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"/>
                        <p>Price in AVAX</p>
                    </div>
                    <div class="mt-3 flex justify-end space-x-3">
                        <button onClick={clickPop} class="px-3 py-1 rounded hover:bg-red-300 hover:bg-opacity-50 hover:text-red-900">Cancel</button>
                        <button class="px-3 py-1 bg-red-800 text-gray-200 hover:bg-red-600 rounded">List NFT</button>
                    </div>
                </div>
            </div>
        )
    }

    

   
    return ( 
        <Section>
            {isSwitch && <Popup/>}
            
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
                
                    <NftItem>
                        <img src={img1} width={300} />
                        <div className="flex bg-gray-800">
                            <div className="m-2 text-2xl font-bold text-white flex-2">Weirdos #666</div>
                            <button onClick={clickPop} className="flex-1 w-screen text-white bg-red-800"> Sell</button>
                        </div>
                    </NftItem>

                    <NftItem>
                        <img src={img1} width={300} />
                        <div className="flex bg-gray-800">
                            <div className="m-2 text-2xl font-bold text-white flex-2">Weirdos #666</div>
                            <button onClick={clickPop} className="flex-1 w-screen text-white bg-red-800"> Sell</button>
                        </div>
                    </NftItem>
                    <NftItem>
                        <img src={img1} width={300} />
                        <div className="flex bg-gray-800">
                            <div className="m-2 text-2xl font-bold text-white flex-2">Weirdos #666</div>
                            <button onClick={clickPop} className="flex-1 w-screen text-white bg-red-800"> Sell</button>
                        </div>
                    </NftItem>
                    <NftItem>
                        <img src={img1} width={300} />
                        <div className="flex bg-gray-800">
                            <div className="m-2 text-2xl font-bold text-white flex-2">Weirdos #666</div>
                            <button onClick={clickPop} className="flex-1 w-screen text-white bg-red-800"> Sell</button>
                        </div>
                    </NftItem>
                    <NftItem>
                        <img src={img1} width={300} />
                        <div className="flex bg-gray-800">
                            <div className="m-2 text-2xl font-bold text-white flex-2">Weirdos #666</div>
                            <button onClick={clickPop} className="flex-1 w-screen text-white bg-red-800"> Sell</button>
                        </div>
                    </NftItem>

                    
                </NftBox>
            </Container>
        </Section>
    );
}
 
export default MyNFT;
