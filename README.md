# neptune-backend
Transaction relayer for Zilly.

Check Zilly's repo is [here](https://github.com/LFGrow-Hackathon/lfgrow)
We are using a [relay](https://docs.openzeppelin.com/defender/relay) from OpenZeppelin Defender to broadcast the transactions.
This server is the link between Zilly's frontend and the defender

## Env file
Please create a `.env` file and add this (ask Kipit for the API key and secret from Defender):
```
PORT=8080
YOUR_API_KEY=""
YOUR_API_SECRET=""
```

## Server initialization
Before running the server, please launch the following command:

`npm install`

## Run server

At the root of the directory run : `npm run server`