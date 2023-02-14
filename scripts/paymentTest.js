const { ethers } = require('hardhat');
const hre = require('hardhat');

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay * 1000));

// const nftAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';    // local
const nftAddress = '0xcDAca389D68f88aaB259C0f88d39f1677C8b09E0'; // goerli
const nftAbi = require('../abi/ERC1155Demo.json');

// const extAddress = '0x998abeb3E57409262aE5b751f60747921B33613E';    // local
const extAddress = '0x516AB6054a3f968ee44AD736890137Acf1ba3008'; // goerli
const extAbi = require('../abi/PurchaseNftExtension.json');

const slashAddress = '0xC71A13aE98f0aDD70B84f0C6b46B48787EE3Ec86';
const slashAbi = require('../abi/SlashPayment.json');

async function main() {
    const [account] = await ethers.getSigners();
    const ext = new hre.ethers.Contract(extAddress, extAbi, account);
    const nft = new hre.ethers.Contract(nftAddress, nftAbi, account);
    const slash = new hre.ethers.Contract(slashAddress, slashAbi, account);

    recipient = account.address;
    tokenId = 3;
    
    res = await nft.balanceOf(recipient, tokenId);
    console.log(res);

    exReserved = ethers.utils.AbiCoder.prototype.encode(
        ["address", "uint256", "address", "uint256"],
        [
            nftAddress,
            tokenId,
            recipient,
            10
        ]
    );

    res = await slash.submitTransaction(
            [
                "0x17db71f034839f206fd5f4209745545f",
                "0x6AD196dBcd43996F17638B924d2fdEDFF6Fdd677",
                "0x0000000000000000000000000000000000000000",
                "0x0",
                1000000,
                1000000,
                "",
                "",
                ethers.utils.AbiCoder.prototype.encode(
                    ["address","address"],
                    ["0x6AD196dBcd43996F17638B924d2fdEDFF6Fdd677", "0x6AD196dBcd43996F17638B924d2fdEDFF6Fdd677"]
                ),
                "0x",
                exReserved
            ]
    )

    console.log(res);

    await sleep(10);

    res = await nft.balanceOf(recipient, tokenId);
    console.log(res);

}
main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});