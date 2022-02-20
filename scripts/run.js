

const main = async () => {
    const [owner, sender] = await hre.ethers.getSigners();
    const greetingsContractFactory = await hre.ethers.getContractFactory("GreetingsPortal");
    const greetingsContract = await greetingsContractFactory.deploy();
    await greetingsContract.deployed();
    console.log("Contract deployed to:", greetingsContract.address);

    console.log("Contract owner:", owner.address);

    let upVoteCount;
    upVoteCount = await greetingsContract.getTotalUpVotes();

    let txn = await greetingsContract.upVote();
    await txn.wait();

    let upVoteTxn = await greetingsContract.connect(sender).upVote();
    await upVoteTxn.wait();

    upVoteCount = await greetingsContract.getTotalUpVotes();
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        process.exit(1);
    }
}

runMain();