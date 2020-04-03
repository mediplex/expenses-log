const fs = require("fs");
const { google } = require("googleapis");
const scopes = [
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/drive",
];

const credentials = {
  type: "service_account",
  project_id: "golden-stream",
  private_key_id: "e5e3627a83932cd99ba59a14e146323b7236b413",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCXTq344mxJb+eA\nVfr//Thp+eNV0Zivb8mZwtEwsC/ME1U0mPyyUANxkziGEex3UO9T0GiJX1aRfngk\npQ/JhPNbDsCv4Hd1gA0Dvb8hnG+QeaEXf6oqLaOTUcs8SLE40ej1BCHey1hgFRfl\nq7NCt2QsUWr/nlOC8NSKnUu0qKujqiG1X/B1mT9Mv6lzx/nraVJap5W0sdOIW98c\nNhBVzJOMbDW5iCD5QsNGY/t7kMi5evRvj/YHV5KQ0q+Xrn5PNDfIHIsipHbjG1jC\nz5Z81KNsHX0vtnXuKuBjPI6bXqOmg0H63StPzzGbP5tg04NdOEWAW+DL19ETEmh2\nw9k6Af6JAgMBAAECggEAEkcUH3pUm+trcvaP90/yumSQGHwU/m5Z01v0ErZZ08Rr\nGMs5TV36iIQBAjsUjlZFzuFgW2XbqoA1SbHxzgVkM1X9I1HRhG1nRRItDkWcOX7j\n3ZeTqfww5BkvnJToaaV7x2tMHyJ/xr2NkTY0VaUbMfpU21OYIXtvpV36ePSeJUs2\nqxrvfDVAvZs9/NpLh0rn5fETTjA0+Up+9mlbTYyc8cVCNrL2kYl5bZZA2WDSI4Xo\nfi7AdcVhpTSz8JeOT4JZ0ANKJfnV6QhV0elYdXyCiBVS/YYujBA+WmVVrqq0JUbM\nsk59/m/MIVqOMfsBD5A2t9io45lG/obNNIz+r+tqoQKBgQDLjhQDsZpgZ22nXtSC\nB7WlHTaHffZGsLQFUgiwX9OTdp5txPI2f1t1kZnO2w3Ouv4PaQaC9erLnCgD6Rfw\n9HYcOZE6frjD6yCgP2YR95iMQ4/u/SVy5zs1IgPqkD5NUjC6EDIrCu2gNGRj4yVz\nEJlf5bWBd+JLUFc1ebDD+KgdeQKBgQC+Sn3TQ32fk88Em+494g4I72HVTRW3GzUl\nHM+ZotJyhQ0OWGLx585K2byFtbX2avmuQK2Y2j9vnr7T5iiUMQgI3ue6PiRfW9vg\nYmQpfZR/dO+6CNjHx1hccCjh3u0Ovr5bnLscb7vWUnhg7+TjjS4CV1p+yHQ65mF5\nW4oGcJl1kQKBgCwBUyJZSt58faApSBe0QvinEBrKiGtP2BsuWOKIVN0UT7u7UAGo\nFsWb7HxjruB6XGJIejflohTSdXQi+CIHN2FysIrMynTQaAU8r3xC4p+wG3W3FFl6\n07nw2JflBxMAKbiPt8jGXAi+StWtTXNKq12n801B9ZIClFfjLuuu3elBAoGAHkFR\nyClO6/RgUedI9eXfPWRyNavP7BETXhc6mr7cnwCwlrtO4A9vKU99PfUqPUe88wut\njkQFGgYvaRmLEiTJlj96sI340oCUcRSzwDULS0iYZQfLD9iOIARlO6RqJJIHSiGd\nTmQlhWoPYbpCtjtYOV8SMF5GvKaskNMRGv0EKUECgYA1IosQPNXety+9aoOrw9vG\n0AV6Ee0nOMoA8QjznYpEc/mp6Hfxvy3R+qUUBvK5qIIV2b5f9g71Hu3vB4tzQqkA\nhmR9PAn6tFL9usqR0wR6QFV7sBepRzNX/Wgc8XNiz02M5WFCftbTxqhPcCkUKH1j\np30rxJHYLlraaPSSvFZD9w==\n-----END PRIVATE KEY-----\n",
  client_email:
    "golden-stream-expenses-log-app@golden-stream.iam.gserviceaccount.com",
  client_id: "105281447857539195504",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/golden-stream-expenses-log-app%40golden-stream.iam.gserviceaccount.com",
};

const request = {
  spreadsheetId: "1RgDVfPPJDD3UoMDW3c2e3FwToyU8iwuoS6twq0Fs52Y",
  range: "Expenses Log!A:J",
};

const fileMetadata = {
  name: "photo.jpg",
  parents: ["1BymkLET87gEhjx0veRa5b58GApYdkXsY"],
};

const express = require("express");
const server = express();
const bodyParser = require("body-parser");
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

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
const googleDriveApi = google.drive({ version: "v3", auth: auth });

const getAllInvoices = async () => {
  const data = await googleSheetsApi.spreadsheets.values
    .get(request)
    .then((res) => res.data.values)
    .catch((err) => {
      console.log(err);
    });
  return data;
};

const addInvoice = async (values) => {
  data = await googleSheetsApi.spreadsheets.values.append({
    ...request,
    insertDataOption: "INSERT_ROWS",
    resource: { values },
    valueInputOption: "RAW",
  });


  


  googleDriveApi.files.create(
    {
      resource: fileMetadata,
      ocrLanguage: "tr",
      media: {
        mimeType: "image/jpeg",
        body: Buffer.from(, 'base64').toString()//fs.createReadStream("photo.jpg"),
      },
      fields: "id",
    },
    function (err, file) {
      if (err) {
        // Handle error
        console.error(err);
      } else {
        console.log("File Id: ", file.data.id);
      }
    }
  );
};

server.get("/api/getAllInvoices", async (req, res) => {
  const data = await getAllInvoices();
  res.json(data);
});

server.post("/api/addInvoice", async (req, res) => {
  const { values } = req.body;
  addInvoice(values);
  res.send("Done!");
});

const serverInstance = server.listen(8080, function () {
  var host = serverInstance.address().address;
  var port = serverInstance.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
