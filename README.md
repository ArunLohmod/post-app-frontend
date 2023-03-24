# PostApp

- In this app you can post something the image of the post will be stored in the ipfs, and the other content will be stored to the blockchain.

## Technologies Used

- react

- [NFT.storage](https://nft.storage/) for storing images to IPFS

## Installation

1. Clone this repo:

```console
git clone git@github.com:ArunLohmod/post-app-frontend.git
```

2. Install NPM packages:

```console
cd post-app-frontend
npm install
```

## Deployment

- Create the .env file and fill in `REACT_APP_NFT_STORAGE_KEY`. The values for the `REACT_APP_NFT_STORAGE_KEY` can be obtained from the [NFT.Storage](https://nft.storage/) website. If you don't have an account, you can create one for free.

## Run script:

```console
npx run start
```

## Brief Intro

- First you have to connect your metamask to the website, then you will be able to see all the posts on the home page.

- In POST section you can post, when you will post something then an alert will pop up which will show you some detail about post.

- In the `uploadToIPFS` function of `Create.js` file, i am using the `slice` method to get the appropriate url to retrieve the image from IPFS.

- In the `createPost` function of `Create.js` file, i am listning to the `NewPost` event which is defiend in the smart contract.
