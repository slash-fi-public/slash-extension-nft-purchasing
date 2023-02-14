async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());
    const PurchaseNftExtension = await ethers.getContractFactory("PurchaseNftExtension");
    const ext = await PurchaseNftExtension.deploy();
    console.log("Deployed address:", ext.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
  