# GeoDB Sample Angular App
This Angular app shows how much I enjoy eating my own geo dog food. Also, how you might go about implementing some typical use-cases using the [GeoDB API](https://rapidapi.com/user/wirefreethought/package/GeoDB).

## Prerequisites

1. Install [Node.js](https://nodejs.org/en/).
2. Install [angular-cli](https://github.com/angular/angular-cli).

## Install
1. Create a file called **.env.json** at the project root.
2. Open **.env.json** for editing and paste in the following:
```
{
  "service": {
    "endpoint": "https://wft-geo-db.p.mashape.com"
  },
  "mashape": {
    "key": "YOUR_MASHAPE_KEY"
  }
}

```

## Run
1. From a shell window, go to the project root and type: ```npm start```
3. Open your browser to: ```http://localhost:4200```
