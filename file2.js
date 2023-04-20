const hre = require("hardhat");
const Web3 = require("web3");
const { RouterAbi, RouterContractAddress, USDCAbi, USDCContractAddress, SwapperAbi, SwapperContractAddress } = require("./constants.js")


async function main() {

    const impersonatedSigner = await hre.ethers.getImpersonatedSigner("0x70997970C51812dc3A010C7d01b50e0d17dc79C8")
    const impersonatedSigner2 = await hre.ethers.getImpersonatedSigner("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")

    const web3 = new Web3("http://127.0.0.1:8545/")

    const USDCContract = new web3.eth.Contract(USDCAbi, USDCContractAddress);
    // console.log(USDCContract);

    const RouterContract = new web3.eth.Contract(RouterAbi, RouterContractAddress);
    // console.log(RouterContract);

    const SwapperContract = new web3.eth.Contract(SwapperAbi, SwapperContractAddress);
    // console.log(SwapperContract);

    const callData1 = USDCContract.methods.permit(
        "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
        RouterContractAddress, 
        2,
        2661766724,
        27,
        "0x760eec8e3b04e18fd8037be4f63859d279b88947ce6edc985e722281da70f14c",
        "0x2b86f6cded1fd85aa9d8f4812379ce6e957f58bf5fdacf8d240d42ff1998d5e5"
    ).encodeABI();

    //r: 0x760eec8e3b04e18fd8037be4f63859d279b88947ce6edc985e722281da70f14c, s: 0x2b86f6cded1fd85aa9d8f4812379ce6e957f58bf5fdacf8d240d42ff1998d5e5, v: 27

    // const txObj = {
    //     from: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    //     to: USDCContractAddress,
    //     data: callData1,
    // }

    // const estimatedGas = await web3.eth.estimateGas(txObj);
    // console.log(estimatedGas);

    // const signedTx = await impersonatedSigner.sendTransaction(txObj);
    // console.log(signedTx);

    //check allowance

    const callData2 = USDCContract.methods.transferFrom(
        "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
        RouterContractAddress,
        2
    ).encodeABI();

    const callData3 = SwapperContract.methods.simpleSwap(
        [
            "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
            "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
            "4000000",
            "3405849439231735374",
            "3422964260534407412",
            ["0xf3938337F7294fEf84e9B2c6D548A93F956Cc281"],
            "0x91a32b690000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa8417400000000000000000000000000000000000000000000000000000000003d090000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000d500b1d8e8ef31e21c99d1db9a6444d3adf127000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000001000000000000000000004de56e7a5fafcec6bb1e78bae2a1f0b612012bf14827",
            [0,228],
            [0],
            "0x4809d60B1062873C7f02A4983361cCcAb1d6c9f7",
            "0x000000000000000000717569636B737761707633",
            "452312848583266388373324160190187140051835877600158453279131187530910679040",
            "0x",
            "2661766724",
            "0x775fe98529f047449d4de66779fe7e43"
        ]
    ).encodeABI();


    const calls = [
        {
            "target": USDCContractAddress,                  //permit
            "callData": callData1
        },
        {
            "target": USDCContractAddress,                  //transferFrom
            "callData": callData2
        },
        {
            "target": SwapperContractAddress,               //simpleSwap
            "callData": callData3
        }
    ]

    const callData = RouterContract.methods.router(calls).encodeABI();
    
    const txObj = {
        from: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
        to: RouterContractAddress,
        data: callData
    }

    // const estimatedGas = await web3.eth.estimateGas(txObj);
    // console.log(estimatedGas);

    const tx = await RouterContract.methods.approveToken(SwapperContractAddress, 2, USDCContractAddress).send({from: impersonatedSigner2.address});
    console.log(tx);

    const signedTx = await impersonatedSigner.sendTransaction(txObj);
    console.log(signedTx);

    //get router USDC balance
    console.log(await USDCContract.methods.balanceOf(RouterContractAddress).call());

}
main()