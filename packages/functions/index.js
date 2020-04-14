const functions = require('firebase-functions');

const fs = require("fs");
const { google } = require("googleapis");
const os = require("os");
const uuid = require("uuid");
const path = require("path");

const scopes = [
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/drive",
];

const spreadsheetId ="1RgDVfPPJDD3UoMDW3c2e3FwToyU8iwuoS6twq0Fs52Y"

const salesFolderId = "16c9QRyyCqKVfTU_MiWbN-9e00Z-d3sIG";
const purchasesFolderId = "1BymkLET87gEhjx0veRa5b58GApYdkXsY";
const purchasesRange = "Purchases Log!A:J";
const salesRange = "Sales Log!A:J";

const credentials = {
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCXTq344mxJb+eA\nVfr//Thp+eNV0Zivb8mZwtEwsC/ME1U0mPyyUANxkziGEex3UO9T0GiJX1aRfngk\npQ/JhPNbDsCv4Hd1gA0Dvb8hnG+QeaEXf6oqLaOTUcs8SLE40ej1BCHey1hgFRfl\nq7NCt2QsUWr/nlOC8NSKnUu0qKujqiG1X/B1mT9Mv6lzx/nraVJap5W0sdOIW98c\nNhBVzJOMbDW5iCD5QsNGY/t7kMi5evRvj/YHV5KQ0q+Xrn5PNDfIHIsipHbjG1jC\nz5Z81KNsHX0vtnXuKuBjPI6bXqOmg0H63StPzzGbP5tg04NdOEWAW+DL19ETEmh2\nw9k6Af6JAgMBAAECggEAEkcUH3pUm+trcvaP90/yumSQGHwU/m5Z01v0ErZZ08Rr\nGMs5TV36iIQBAjsUjlZFzuFgW2XbqoA1SbHxzgVkM1X9I1HRhG1nRRItDkWcOX7j\n3ZeTqfww5BkvnJToaaV7x2tMHyJ/xr2NkTY0VaUbMfpU21OYIXtvpV36ePSeJUs2\nqxrvfDVAvZs9/NpLh0rn5fETTjA0+Up+9mlbTYyc8cVCNrL2kYl5bZZA2WDSI4Xo\nfi7AdcVhpTSz8JeOT4JZ0ANKJfnV6QhV0elYdXyCiBVS/YYujBA+WmVVrqq0JUbM\nsk59/m/MIVqOMfsBD5A2t9io45lG/obNNIz+r+tqoQKBgQDLjhQDsZpgZ22nXtSC\nB7WlHTaHffZGsLQFUgiwX9OTdp5txPI2f1t1kZnO2w3Ouv4PaQaC9erLnCgD6Rfw\n9HYcOZE6frjD6yCgP2YR95iMQ4/u/SVy5zs1IgPqkD5NUjC6EDIrCu2gNGRj4yVz\nEJlf5bWBd+JLUFc1ebDD+KgdeQKBgQC+Sn3TQ32fk88Em+494g4I72HVTRW3GzUl\nHM+ZotJyhQ0OWGLx585K2byFtbX2avmuQK2Y2j9vnr7T5iiUMQgI3ue6PiRfW9vg\nYmQpfZR/dO+6CNjHx1hccCjh3u0Ovr5bnLscb7vWUnhg7+TjjS4CV1p+yHQ65mF5\nW4oGcJl1kQKBgCwBUyJZSt58faApSBe0QvinEBrKiGtP2BsuWOKIVN0UT7u7UAGo\nFsWb7HxjruB6XGJIejflohTSdXQi+CIHN2FysIrMynTQaAU8r3xC4p+wG3W3FFl6\n07nw2JflBxMAKbiPt8jGXAi+StWtTXNKq12n801B9ZIClFfjLuuu3elBAoGAHkFR\nyClO6/RgUedI9eXfPWRyNavP7BETXhc6mr7cnwCwlrtO4A9vKU99PfUqPUe88wut\njkQFGgYvaRmLEiTJlj96sI340oCUcRSzwDULS0iYZQfLD9iOIARlO6RqJJIHSiGd\nTmQlhWoPYbpCtjtYOV8SMF5GvKaskNMRGv0EKUECgYA1IosQPNXety+9aoOrw9vG\n0AV6Ee0nOMoA8QjznYpEc/mp6Hfxvy3R+qUUBvK5qIIV2b5f9g71Hu3vB4tzQqkA\nhmR9PAn6tFL9usqR0wR6QFV7sBepRzNX/Wgc8XNiz02M5WFCftbTxqhPcCkUKH1j\np30rxJHYLlraaPSSvFZD9w==\n-----END PRIVATE KEY-----\n",
  client_email:
    "golden-stream-expenses-log-app@golden-stream.iam.gserviceaccount.com",
  };

const auth = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key,
  scopes
);

auth.authorize((err) => {
  if (err) {
    console.error("%c === Connection Denied", "color: red");
    console.error(err);
  } else {
    console.info(
      "%c === Connection Authorized To Access Google Drive and Google Sheets",
      "color: green"
    );
  }
});

const googleSheetsApi = google.sheets({ version: "v4", auth });
const googleDriveApi = google.drive({ version: "v3", auth });

// Purchase

const addPurchase = async ({ values, image }) => {
  const date = new Date(); // can use the date field

  const OperationId = `GSP-${date
    .getDate()
    .toString()
    .padStart(2, "0")}${date
    .getMonth()
    .toString()
    .padStart(2, "0")}${date
    .getFullYear()
    .toString()
    .padStart(4, "0")}-${Math.random()
    .toString(36)
    .substring(2, 11)
    .toUpperCase()}`;

  // upload data

  const buffer = Buffer.from(image, "base64");
  const { Duplex } = require("stream");

  const stream = new Duplex();
  stream.push(buffer);
  stream.push(null);

  const fileId = await googleDriveApi.files
    .create({
      resource: {
        name: OperationId,
        parents: [purchasesFolderId],
      },
      media: {
        mimeType: "image/jpeg",
        body: stream,
      },
      fields: "id",
    })
    .then((res) => {
      console.info("success: file uploaded");
      return res.data.id;
    })
    .catch((err) => console.error(err));

  // push photo url and invoice id

  values[0].splice(0, 0, `https://us-central1-golden-stream-turkey.cloudfunctions.net/server/retrivePurchaseInvoicePhoto/${fileId}`);
  values[0].splice(0, 0, OperationId);
  googleSheetsApi.spreadsheets.values
    .append({
      spreadsheetId,
      range: purchasesRange,
      insertDataOption: "INSERT_ROWS",
      resource: { values },
      valueInputOption: "RAW",
    })
    .then(() => console.log("Spreadsheet Updated"))
    .catch((err) => console.error(err));
};

const retrivePurchaseInvoicePhoto = async (fileId) => {
  return await googleDriveApi.files
    .get({ fileId, alt: "media" }, { responseType: "stream" })
    .then((res) => {
      return new Promise((resolve, reject) => {
        const filePath = path.join(os.tmpdir(), uuid.v4() + ".jpg");
        console.log(`writing to ${filePath}`);
        const dest = fs.createWriteStream(filePath);
        let progress = 0;

        res.data
          .on("end", () => {
            console.log("Done downloading file.");
            resolve(filePath);
          })
          .on("error", (err) => {
            console.error("Error downloading file.");
            reject(err);
          })
          .on("data", (d) => {
            progress += d.length;
            if (process.stdout.isTTY) {
              process.stdout.clearLine();
              process.stdout.cursorTo(0);
              process.stdout.write(`Downloaded ${progress} bytes`);
            }
          })
          .pipe(dest);

        return filePath;
      });
    });
};


// Sales

const addSale = async ({ values, image }) => {
  const date = new Date(); // can use the date field

  const OperationId = `GSS-${date
    .getDate()
    .toString()
    .padStart(2, "0")}${date
    .getMonth()
    .toString()
    .padStart(2, "0")}${date
    .getFullYear()
    .toString()
    .padStart(4, "0")}-${Math.random()
    .toString(36)
    .substring(2, 11)
    .toUpperCase()}`;

  // upload data

  const buffer = Buffer.from(image, "base64");
  const { Duplex } = require("stream");

  const stream = new Duplex();
  stream.push(buffer);
  stream.push(null);

  const fileId = await googleDriveApi.files
    .create({
      resource: {
        name: OperationId,
        parents: [salesFolderId],
      },
      media: {
        mimeType: "image/jpeg",
        body: stream,
      },
      fields: "id",
    })
    .then((res) => {
      console.info("success: file uploaded");
      return res.data.id;
    })
    .catch((err) => console.error(err));

  // push photo url and invoice id

  values[0].splice(0, 0, `https://us-central1-golden-stream-turkey.cloudfunctions.net/server/retriveSaleInvoicePhoto/${fileId}`);
  values[0].splice(0, 0, OperationId);
  googleSheetsApi.spreadsheets.values
    .append({
      spreadsheetId,
      range: salesRange,
      insertDataOption: "INSERT_ROWS",
      resource: { values },
      valueInputOption: "RAW",
    })
    .then(() => console.log("Spreadsheet Updated"))
    .catch((err) => console.error(err));
};

const retriveSaleInvoicePhoto = async (fileId) => {
  console.log("fileId: ",fileId)
  return await googleDriveApi.files
    .get({ fileId, alt: "media" }, { responseType: "stream" })
    .then((res) => {
      return new Promise((resolve, reject) => {
        const filePath = path.join(os.tmpdir(), uuid.v4() + ".jpg");
        console.log(`writing to ${filePath}`);
        const dest = fs.createWriteStream(filePath);
        let progress = 0;

        res.data
          .on("end", () => {
            console.log("Done downloading file.");
            resolve(filePath);
          })
          .on("error", (err) => {
            console.error("Error downloading file.");
            reject(err);
          })
          .on("data", (d) => {
            progress += d.length;
            if (process.stdout.isTTY) {
              process.stdout.clearLine();
              process.stdout.cursorTo(0);
              process.stdout.write(`Downloaded ${progress} bytes`);
            }
          })
          .pipe(dest);

        return filePath;
      });
    });
};


// Express

const express = require("express");
const cors = require("cors");
const server = express();
const bodyParser = require("body-parser");

server.use(bodyParser.json({ limit: "50mb" }));
server.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
server.use(cors());

server.post("/api/addPurchase", async (req, res, next) => {
  const { values, image } = req.body;
  addPurchase({ values, image });
  res.send("Done!");
});

server.get("/retrivePurchaseInvoicePhoto/:fileId", async (req, res, next) => {
  const fileId = req.params.fileId;
  const fileName = await retrivePurchaseInvoicePhoto(fileId);

  if (fileName) res.status(200).download(fileName);
  else res.status(404).end();
});

server.post("/api/addSale", async (req, res, next) => {
  const { values, image } = req.body;
  addSale({ values, image });
  res.send("Done!");
});

server.get("/retriveSaleInvoicePhoto/:fileId", async (req, res, next) => {
  const fileId = req.params.fileId;
  const fileName = await retriveSaleInvoicePhoto(fileId);

  if (fileName) res.status(200).download(fileName);
  else res.status(404).end();
});

exports.server = functions.https.onRequest(server);
