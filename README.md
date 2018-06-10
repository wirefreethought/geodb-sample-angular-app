# GeoDB Sample Angular App
This app shows how much I enjoy eating my own geo dog food. Also, how you might go about implementing some typical use-cases using the [GeoDB API](http://geodb-cities-api.wirefreethought.com).

![Find Cities](/src/assets/screenshots/find-cities.png?raw=true "Find Cities")

## Prerequisites

1. Install [Node.js](https://nodejs.org/en/).
2. Install [angular-cli](https://github.com/angular/angular-cli).
3. ```npm install -g yargs@latest```

## Install
1. ```git clone https://github.com/wirefreethought/geo-db-sample-angular-app.git```
2. ```npm install```
3. Create a file called **.env.json** at the project root.
4. Open **.env.json** for editing and paste in the following:
```
{
  "service": {
    "apiKey": "",
    "uri": "http://geodb-free-service.wirefreethought.com"    
  }
}
```

## Run
1. ```npm start```
3. Open your browser to: ```http://localhost:4200```
