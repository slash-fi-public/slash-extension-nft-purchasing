async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());
    const ERC1155Demo = await ethers.getContractFactory("ERC1155Demo");
    const nft = await ERC1155Demo.deploy();
    console.log("Deployed address:", nft.address);
   }

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
  