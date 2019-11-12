# Driver app

Application that track driver locations as they deliver parcels.

## Usage

To start the app
```bash
./start.sh
```
To stop the app
```bash
./stop.sh
```

If you want to test the application
```bash
npm install && npm test
```
* The application does not use mocked data at the moment, it use your current local database.

## Why
I used mongoDB cause of the simple implementation. You don't have to take care about migration. 
