const { DefenderRelaySigner, DefenderRelayProvider } = require('defender-relay-client/lib/ethers');
const { ethers } = require('ethers');
const { LENS_HUB_ABI, LENS_HUB_CONTRACT_ADDRESS, LENS_FOLLOW_NFT_CONTRACT_ADDRESS, LENS_FOLLOW_NFT_ABI } = require("../config-abi.js");

class lensSingleton {

  constructor() {
    this.lensHub;
    this.followNftContract;
  }

  setLensHub() {
    const credentials = { apiKey: process.env.YOUR_API_KEY, apiSecret: process.env.YOUR_API_SECRET };
    const provider = new DefenderRelayProvider(credentials);
    const signer = new DefenderRelaySigner(credentials, provider, { speed: 'fast' });

    const lensHub = new ethers.Contract(
      LENS_HUB_CONTRACT_ADDRESS,
      LENS_HUB_ABI,
      signer
    );

    this.lensHub = lensHub;
    this.signer = signer;
  }

  async mirror(request) {
    console.log("request : ", request)

    const tx = await this.lensHub.mirror(request);

    const mined = await tx.wait();
    console.log(mined);
    return mined;
  }


  async unfollow(request) {
    console.log("unfollow request : ", request)

    const followNftContract = new ethers.Contract(
      request.contractAddress,
      LENS_FOLLOW_NFT_ABI,
      this.signer
    );

    const tx = await followNftContract.burnWithSig(request.tokenId, request.sig);

    const mined = await tx.wait();
    console.log(mined);
    return mined;
  }

  async follow(request) {
    console.log("request : ", request)

    const tx = await this.lensHub.followWithSig(request);

    const mined = await tx.wait();
    console.log(mined);
    return mined;
  }

  async createComment(request) {
    console.log("request : ", request)

    const tx = await this.lensHub.comment(request);

    const mined = await tx.wait();
    console.log(mined);
    return mined;
  }

  async createPost(request) {
    console.log("request : ", request)

    const tx = await this.lensHub.post(request);

    const mined = await tx.wait();
    console.log(mined);
    return mined;
  }

  async updateProfilPicture(request) {
    console.log("request : ", request)

    const tx = await this.lensHub.setProfileImageURI(request.profileId, request.url);

    const mined = await tx.wait();
    console.log(mined);
    return mined;
  }

  async setDispatcher(request) {
    const tx = await this.lensHub.setDispatcherWithSig(request)

    const mined = await tx.wait();
    console.log(mined);
    return mined;
  }
}

module.exports = new lensSingleton();
