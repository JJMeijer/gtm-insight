# GTM Vision

a Web App to analyze GTM containers.

## Setup

Make sure the package manager [npm](https://www.npmjs.com/get-npm) is installed.

### install dependencies.

```bash
npm install
```

### Build & Start

After building the application will be available at [localhost](http://localhost:3000)

```bash
npm run build && npm start
```

## Firestore database

a Google Cloud Firestore database is used to store GTM ID's of scraped websites. This is to prevent websites to be scraped more than once. During development this database can be emulated using the instructions [here](https://cloud.google.com/sdk/gcloud/reference/beta/emulators/firestore). For this emulation the [Google Cloud SDK](https://cloud.google.com/sdk) needs to be installed.
