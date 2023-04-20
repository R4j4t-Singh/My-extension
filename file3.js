const hre = require("hardhat")
const Web3 = require("web3")
const { USDCAbi, USDCContractAddress } = require("./constants.js")


async function main() { 
    const impersonatedSigner = await hre.ethers.getImpersonatedSigner("0x6426114c0C3531D90Ed8B9f7c09A0dc115F4aaee")

    const web3 = new Web3("http://127.0.0.1:8545/")

    const USDCContract = new web3.eth.Contract(USDCAbi, USDCContractAddress);

    //transfer USDC from 0x6426114c0C3531D90Ed8B9f7c09A0dc115F4aaee to 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
    const callData1 = USDCContract.methods.transfer(
        "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
        200000
    ).encodeABI();

    const txObj = {
        from: "0x6426114c0C3531D90Ed8B9f7c09A0dc115F4aaee",
        to: USDCContractAddress,
        data: callData1,
    }

    // const estimatedGas = await web3.eth.estimateGas(txObj);
    // console.log(estimatedGas);

    // const signedTx = await impersonatedSigner.sendTransaction(txObj);
    // console.log(signedTx);

    //check balance of 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
    
    console.log(await USDCContract.methods.balanceOf("0x70997970C51812dc3A010C7d01b50e0d17dc79C8").call());

}
main()