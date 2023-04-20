const hre = require("hardhat");

async function main() {
    const impersonatedSigner2 = await hre.ethers.getImpersonatedSigner("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
    
    const Router = await ethers.getContractFactory("Router", impersonatedSigner2);
    const router = await Router.deploy();
    await router.deployed();
    console.log("Router deployed to:", router.address);
}

main()