const hre = require('hardhat');
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay * 1000));

// const nftContractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const nftContractAddress = '0xcDAca389D68f88aaB259C0f88d39f1677C8b09E0';
const nftAbi = require('../abi/ERC1155Demo.json');

const extAddress = '0x516AB6054a3f968ee44AD736890137Acf1ba3008';

async function main() {
    const [account] = await ethers.getSigners();
    const contract = new hre.ethers.Contract(nftContractAddress, nftAbi, account);
    
    for (i=0; i<5; i++) {
        await contract.mint(i, 100);
        await sleep(10);
        res = await contract.balanceOf(account.address, i);
        console.log(res);
        await contract.safeTransferFrom(
            account.address,
            extAddress,
            i,
            100,
            "0x"
        )
        await sleep(10);
        res = await contract.balanceOf(extAddress, i);
        console.log(res);
    }
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});