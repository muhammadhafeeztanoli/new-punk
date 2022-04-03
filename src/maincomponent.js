import './App.css';
import  React,{useState,useEffect} from "react";
import Button from '@mui/material/Button';
import { ethers } from 'ethers'; 
import contract from './SmithPunksABI.json';
import Loader from 'react-loader-advanced'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


const BigNumber = require('bignumber.js');

const { ethereum } = window;
const contractAddress = "0x421E925E92aF2D594Bc787029A24eA52E74BE3EA";
// const contractAddress = "0x0e8b63045cc9efe0720fe45356c14a17200dd82e";
const abi = contract;


const Maincomponent = () => {
  
    const [value,setValue] = useState(1) ;
    const [id,setId] = useState(0) ;
    const [price , setPrice]=useState() ;
    const [limittoken , setlimittoken] = useState() ;
    
    const connectedwallet = async () => {
       await ethereum.request({ method: 'eth_requestAccounts' });
       setlimittoken(5000) ;
       let provider = new ethers.providers.Web3Provider(ethereum);
       let signer = provider.getSigner();
       let nftContract = new ethers.Contract(contractAddress, abi,signer);
       let ether ; 
       await nftContract.PRICE.call().then((result)=>{ether=BigNumber(result._hex)})
       let string=new BigNumber(ether.shiftedBy(-18)).toString();
       setPrice(string) ;
       await nftContract.totalSupply.call().then((result)=>{ether=BigNumber(result._hex)})
       string = ether.toString() ;
       setId(string);
    }
      
   useEffect(()=>{
    if(ethereum){  
      window.ethereum.on('accountsChanged' , async ()=>{
        connectedwallet() ;
      });
    }
   },[])

   useEffect(async() => {
    if(ethereum){
      const interval = setInterval(async () => {
       connectedwallet() ;
      }, 15000);
      return () => clearInterval(interval);
    }
   },[])
   useEffect(async ()=>{
       await ethereum.request({ method: 'eth_requestAccounts' });
       setlimittoken(5000) ;
       let provider = new ethers.providers.Web3Provider(ethereum);
       let signer = provider.getSigner();
       let nftContract = new ethers.Contract(contractAddress, abi,signer);
       let ether ; 
       await nftContract.PRICE.call().then((result)=>{ether=BigNumber(result._hex)})
       let string=new BigNumber(ether.shiftedBy(-18)).toString();
       setPrice(string) ;
       await nftContract.totalSupply.call().then((result)=>{ether=BigNumber(result._hex)})
       string = ether.toString() ;
       setId(string);
  },[])

    function onclick(){
        mints();
    }
    const mints = async()=>{
      if(ethereum) {
        let provider = new ethers.providers.Web3Provider(ethereum);
        let signer = provider.getSigner();
        let nftContract = new ethers.Contract(contractAddress, abi, signer);
        let a= parseFloat(price) * value;
        if(limittoken-id>=value){
          let txhash 
          await nftContract.mint(value,{ value: ethers.utils.parseEther(`${a}`) })
            .catch((err)=>{
                if(err){
                  console.log(err.error.message.split(':')[1].toUpperCase()); 
                }else {
                }
            })
            .then(err=>{
              txhash=err.hash
              console.log(txhash)
            })

        }  
        let ether  ;
        await nftContract.totalSupply.call().then((result)=>{ether=BigNumber(result._hex)})
        let string = ether.toString() ;
        setId(string);      
      }
    }

    return(
      <div>
        <div className="main">
          <div>
                <div className='minted_text'>{(id == null) ? '0': id }/5000</div>
                 <div className='comment_Maximum'>{price} ETH each</div>
                <div className='minted_button'>
                  <div>
                    <div className='row_element btn_group'>
                          <div className='col-md-3 '>
                              <ArrowBackIosIcon 
                                onClick={() => {if(value>1){setValue((value - 1));}}} 
                                className="arrow_btn">
                                
                                </ArrowBackIosIcon>
                          </div>
                          <div className='col-md-1 text_nftcount'>{value}</div>
                          <div className='col-md-3'>
                              <ArrowForwardIosIcon  
                                  onClick={() => {if(value<limittoken-id && value < 25){setValue((value + 1));}}} 
                                  className="arrow_btn"
                                  ></ArrowForwardIosIcon>
                          </div>
                    </div>
                  </div>
                  <div className='row row_element group'>
                          <Button onClick= {onclick} style={{backgroundColor: 'red' , color: 'white',maxWidth: '300px', maxHeight: '45px', minHeight: '45px'}} variant="contained">MINT</Button>
                  </div>
                </div>
          </div>
            
           
          </div>
      </div>  
    )
}
export default Maincomponent;
