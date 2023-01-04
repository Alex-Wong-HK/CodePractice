//@ts-nocheck
import Web3Modal from "web3modal";
import WalletConnectProvider from '@walletconnect/web3-provider';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import {ethers} from "ethers";

interface INETWORK_PARAMS{
    [key:number]:{
        chainId:string
        rpcUrls?:string
        chainName?:string
        nativeCurrency?:{
            name:string
            symbol:string
            decimals:number
        }
        blockExplorerUrls?:string[]
    }
}

const NETWORK_PARAMS = {
    1: {
        chainId: '0x1', // 137
    },
    137: {
        chainId: '0x89', // 137
        rpcUrls: "https://polygon-rpc.com",
        chainName: 'Polygon Mainnet',
        nativeCurrency: {
            name: 'MATIC',
            symbol: 'MATIC',
            decimals: 18,
        },
        blockExplorerUrls: ['https://polygonscan.com/'],
    },
    4689: {
        chainId: '0x1251', // 4689
        rpcUrls: [`https://babel-api.mainnet.iotex.io`],
        chainName: 'IoTeX',
        nativeCurrency: {
            name: 'IOTX',
            symbol: 'IOTX',
            decimals: 18,
        },
        blockExplorerUrls: ['https://iotexscan.io/'],
    },
    56: {
        chainId: '0x38', // 56
        rpcUrls: [`https://bsc-dataseed.binance.org/`],
        chainName: 'BNB',
        nativeCurrency: {
            name: 'BNB',
            symbol: 'BNB',
            decimals: 18,
        },
        blockExplorerUrls: [' https://bscscan.com'],
    },

}

async function sendCoinByWebsiteWallet(chainId:number, amount:number) {
    let saveProvide;
    const providerOptions = {
        walletconnect: {
            package: WalletConnectProvider,
            options: {
                infuraId: "infuraId",
            },
        },
        binancechainwallet: {
            package: true,
        },
        coinbasewallet: {
            package: CoinbaseWalletSDK,
            options: {
                appName: 'Alex Wong',
                infuraId: "infuraId",
            },
        },
    };
    const web3Modal = new Web3Modal({
        network: "mainnet",
        providerOptions,
        cacheProvider: true,
    });
    web3Modal.clearCachedProvider();
    const instance = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(instance);
    saveProvide = instance
    try {
        await provider.send('wallet_switchEthereumChain', [{chainId: NETWORK_PARAMS[chainId as keyof typeof NETWORK_PARAMS].chainId}]);
    } catch (error) {
        if ((error as any).code === 4902) {
            await provider.send('wallet_addEthereumChain', [NETWORK_PARAMS[chainId as keyof typeof NETWORK_PARAMS]]);
        } else {
            await handleSendETHOnClick(chainId,amount);
        }
    }


    const provider_afterChangeNetwork = new ethers.providers.Web3Provider(saveProvide);
    const signer = provider_afterChangeNetwork.getSigner();
    const tx = await signer.sendTransaction({
        to: "wallet address here",
        value: ethers.utils.parseEther(`${amount}`)
    });
}

async function sendCoinByPrivateKey(chainId:number, amount:number,privateKey:string) {
    const provider = new ethers.providers.JsonRpcProvider(NETWORK_PARAMS[chainId as keyof typeof NETWORK_PARAMS]?.rpcUrls);
    const signer = new ethers.Wallet(privateKey, provider);
    const tx = await signer.sendTransaction({
        to: "wallet address here",
        value: ethers.utils.parseEther(`${amount}`)
    });
}
