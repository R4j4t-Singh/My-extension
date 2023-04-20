const ethers = require("ethers")
const Web3 = require("web3")

const { RouterAbi, RouterContractAddress, USDCAbi, USDCContractAddress, SwapperAbi, SwapperContractAddress } = require("./constants.js")

async function file() { 

    const web3 = new Web3("https://polygon-mainnet.g.alchemy.com/v2/smIKo0KbfLE_047a9vGoF4ffWwQUACjF")

    const provider = new ethers.providers.JsonRpcProvider("https://polygon-mainnet.g.alchemy.com/v2/smIKo0KbfLE_047a9vGoF4ffWwQUACjF");



    const USDCContract = new web3.eth.Contract(USDCAbi, USDCContractAddress);
    // console.log(USDCContract);
    
    const callData1 = USDCContract.methods.permit(
        "0x4809d60B1062873C7f02A4983361cCcAb1d6c9f7",
        RouterContractAddress,
        200000,
        2661766724,
        28,
        "0x36205327fb8dd0a2ba7f78e5bf0a0bf64a650daa3998a63b6b7b04230a4ccadd",
        "0x5d9e3107098d51b43f0408e04e7963b6655bb37d16ab7a4db357cd8ee9d0f71e"
    ).encodeABI();

        // 0x1dc9dd961b262cbc723b30276afc1da9cebac934e1603a6f2024cd746a635eec, s: 0x742b0e932bd40f2e75078ba5310c99aab5eb5e96fbfbae12ee5a298dfb1fbf02, v: 28,

    // console.log(callData1);
    
    // const SwapperContract = new web3.eth.Contract(SwapperAbi, SwapperContractAddress);
    // console.log(SwapperContract);
    // const callData2 = SwapperContract.methods.simpleSwap(
    //     [
    //         "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    //         "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    //         "4000000",
    //         "3405849439231735374",
    //         "3422964260534407412",
    //         ["0xf3938337F7294fEf84e9B2c6D548A93F956Cc281"],
    //         "0x91a32b690000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa8417400000000000000000000000000000000000000000000000000000000003d090000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000d500b1d8e8ef31e21c99d1db9a6444d3adf127000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000001000000000000000000004de56e7a5fafcec6bb1e78bae2a1f0b612012bf14827",
    //         [0,228],
    //         [0],
    //         "0x4809d60B1062873C7f02A4983361cCcAb1d6c9f7",
    //         "0x000000000000000000717569636B737761707633",
    //         "452312848583266388373324160190187140051835877600158453279131187530910679040",
    //         "0x",
    //         "2661766724",
    //         "0x775fe98529f047449d4de66779fe7e43"
    //     ]
    // ).encodeABI();

    // console.log(callData2);

    // const calls = [
    //     // {
    //     //     target: USDCContractAddress,
    //     //     callData: callData1
    //     // },
    //     {
    //         target: SwapperContractAddress,
    //         callData: callData2
    //     }
    // ]


    // const txObj = {
    //     from: "0x4809d60B1062873C7f02A4983361cCcAb1d6c9f7",
    //     to: SwapperContractAddress,
    //     data: callData2 
    // }
   
    const txObj = {
        from: "0x4809d60B1062873C7f02A4983361cCcAb1d6c9f7",
        to: USDCContractAddress,
        data: callData1
    }

    const estimatedGas = await web3.eth.estimateGas(txObj);
    console.log(estimatedGas);

    // const RouterContract = new web3.eth.Contract(RouterAbi, RouterContractAddress);

    // const callData = RouterContract.methods.router(calls).encodeABI();
    // console.log(callData);


    // const txObj = {
    //     from: "0x4809d60B1062873C7f02A4983361cCcAb1d6c9f7",
    //     to: RouterContractAddress,
    //     data: callData
    // }

    // const estimatedGas = await web3.eth.estimateGas(txObj);
    // console.log(estimatedGas);





    // const privateKey = ""

    // const signer = new ethers.Wallet(privateKey, provider);

    // const routerContract = new ethers.Contract(RouterContractAddress, RouterAbi, signer);
    // // console.log(routerContract);
    // // console.log(calls);

    // const tx = await routerContract.router(calls,{value: ethers.utils.parseEther("0.01"), gasLimit: "0x32193"})
    // console.log(tx);


    
}

file();

// r: 0x36205327fb8dd0a2ba7f78e5bf0a0bf64a650daa3998a63b6b7b04230a4ccadd, s: 0x5d9e3107098d51b43f0408e04e7963b6655bb37d16ab7a4db357cd8ee9d0f71e, v: 28, sig: 0x36205327fb8dd0a2ba7f78e5bf0a0bf64a650daa3998a63b6b7b04230a4ccadd5d9e3107098d51b43f0408e04e7963b6655bb37d16ab7a4db357cd8ee9d0f71e1c