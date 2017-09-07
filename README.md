# GeoDB Sample Angular App
This Angular app shows how much I enjoy eating my own geo dog food. Also, how you might go about implementing some typical use-cases using the [GeoDB API](https://rapidapi.com/user/wirefreethought/package/GeoDB).

## Prerequisites

1. Install [Node.js](https://nodejs.org/en/).
2. Install [angular-cli](https://github.com/angular/angular-cli).
3. ```npm install -g yargs@latest```

## Install
1. ```git clone https://github.com/wirefreethought/geo-db-sample-angular-app.git```
2. Create a file called **.env.json** at the project root.
3. Open **.env.json** for editing and paste in the following:
```
{
  "service": {
    "endpoint": "https://wft-geo-db.p.mashape.com",
    "apiKey": "YOUR_MASHAPE_KEY"
  }
}

```
4. Create an account on [RapidAPI](https://rapidapi.com). As part of account creation, Rapid asks for credit-card info. As long as you **stay within the free usage limits** of the Basic plan, your credit card **will not be charged**.
5. [Subscribe](https://rapidapi.com/user/wirefreethought/package/GeoDB/pricing) to the GeoDB basic plan.
6. In **.env.json**, substitute YOUR_MASHAPE_KEY for the key assigned to you by Rapid.
7. ```npm install```

## Run
1. ```npm start```
3. Open your browser to: ```http://localhost:4200```
