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
    console.log("request payload is : ", request)

    const tx = await this.lensHub.mirror(request);

    return tx.hash;
  }


  async unfollow(request) {
    console.log("request payload is : ", request)

    const followNftContract = new ethers.Contract(
      request.contractAddress,
      LENS_FOLLOW_NFT_ABI,
      this.signer
    );

    const tx = await followNftContract.burnWithSig(request.tokenId, request.sig);

    return tx.hash;
  }

  async follow(request) {
    console.log("request payload is : ", request)
    const tx = await this.lensHub.followWithSig(request);

    return tx.hash;
  }

  async createComment(request) {
    console.log("request payload is : ", request)
    const tx = await this.lensHub.comment(request);

    return tx.hash;
  }

  async createPost(request) {
    console.log("request payload is : ", request)
    const tx = await this.lensHub.post(request);

    return tx.hash;
  }

  async updateProfilPicture(request) {
    console.log("request payload is : ", request)
    const tx = await this.lensHub.setProfileImageURI(request.profileId, request.url);

    return tx.hash;
  }

  async setDispatcher(request) {
    console.log("request : ", request)
    const tx = await this.lensHub.setDispatcherWithSig(request)

    return tx.hash;
  }
}

module.exports = new lensSingleton();
