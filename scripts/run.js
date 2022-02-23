

const main = async () => {
    const [owner, sender] = await hre.ethers.getSigners();
    const greetingsContractFactory = await hre.ethers.getContractFactory("GreetingsPortal");
    const greetingsContract = await greetingsContractFactory.deploy();
    await greetingsContract.deployed();
    console.log("Contract address:", greetingsContract.address);
    console.log("Contract owner:", owner.address);

    let upVoteCount;
    upVoteCount = await greetingsContract.getTotalUpVotes();
    console.log("upVotes: ", upVoteCount);

    let txn = await greetingsContract.upVote("How does it look?");
    await txn.wait();

    const [_, randomPerson] = await hre.ethers.getSigners();
    let upVoteTxn = await greetingsContract.connect(randomPerson).upVote("Looks rare");
    await upVoteTxn.wait();

    let allUpVotes = await greetingsContract.getAllUpVotes();
    console.log(allUpVotes);
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