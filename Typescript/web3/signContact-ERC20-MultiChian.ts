import {ERC20__factory} from "./typechain/factories/ERC20__factory";

const networkConfig = {
    5: {
        rpc: "https://rpc.ankr.com/eth_goerli",
        contactAddress: ""
    },
    137: {
        rpc: "https://polygon-rpc.com",
        contactAddress: "",
    },
    4690: {
        rpc: "https://babel-api.testnet.iotex.io",
        contactAddress: "",
    },
    4689: {
        rpc: "https://babel-api.mainnet.iotex.io",
        contactAddress: "",
    },
    65: {
        rpc: "https://exchaintestrpc.okex.org",
        contactAddress: "",
    },
}

async function signContract(chainId: number, targetAddress: string, amount: number, privateKey: string,) {
    const provider = new ethers.providers.JsonRpcProvider(networkConfig[chainId as keyof typeof networkConfig].rpc);
    const signer = new ethers.Wallet(privateKey, provider);
    const erc20Contract = ERC20__factory.connect(networkConfig[chainId as keyof typeof networkConfig].contactAddress, signer);
    await erc20Contract.transfer(targetAddress, amount)
}
