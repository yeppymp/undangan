function timeFromNow(date) {
  const detik = Math.floor((new Date() - new Date(date)) / 1000);
  const tahun = Math.floor(detik / 31536000);
  const bulan = Math.floor(detik / 2592000);
  const hari = Math.floor(detik / 86400);

  if (hari > 548) {
    return tahun + ' tahun yang lalu';
  }
  if (hari >= 320 && hari <= 547) {
    return 'satu tahun yang lalu';
  }
  if (hari >= 45 && hari <= 319) {
    return bulan + ' bulan yang lalu';
  }
  if (hari >= 26 && hari <= 45) {
    return 'satu bulan yang lalu';
  }

  const jam = Math.floor(detik / 3600);

  if (jam >= 36 && hari <= 25) {
    return hari + ' hari yang lalu';
  }
  if (jam >= 22 && jam <= 35) {
    return 'satu hari yang lalu';
  }

  const menit = Math.floor(detik / 60);

  if (menit >= 90 && jam <= 21) {
    return jam + ' jam yang lalu';
  }
  if (menit >= 45 && menit <= 89) {
    return 'satu jam yang lalu';
  }
  if (detik >= 90 && menit <= 44) {
    return menit + ' menit yang lalu';
  }
  if (detik >= 45 && detik <= 89) {
    return 'satu menit yang lalu';
  }
  if (detik >= 0 && detik <= 45) {
    return 'satu detik yang lalu';
  }
}

/* exported gapiLoaded */
/* exported gisLoaded */
/* exported handleAuthClick */
/* exported handleSignoutClick */

const serviceAccount = {
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDKydWngZS0e8iC\n5xGqZXLZOC2BvHnQxjntexyq/7wc07X32ODUc2wWz8fFcSlPJjQi5c6C/JXRqrE4\n6yGVf9PMzHreoMBPXbM+rfQOgs3uSy+a8//ZY99fim1Nap23ATGEWGT2LA7ZvQoz\nThrRAwpNtqzPvKXDUhqeWGMP8ka0pcCiZi9R0PDtfSvQ2K0ICo6b9f/0aroRgzwe\nAXUhRKD5KaC25o6DDJQxY/88NEIwB6lF+olM6ZOHbSs5fZuwp6eZ2q4h1ndA4oVC\nt7UQ94nP1+LHhdHQAaGW7orWzDqdYcFW3Y1l9byA+2JR+kELuPI10TJuuzTb6yXv\nEZm4x+KBAgMBAAECggEAA+T+rQ/+Zb1zVz0+D/xRCXYsXI+ctMtbyTFqNmgBKjoQ\nJnWEMtxRHPqKUwLGePJKQcnRTp9wdqV9MBNG8raw3//k07H5Y4TQiJGBbIZrU0pf\nHI4XUara+zwet4QGyaEUnP6wGLC1q82XPK9BMVaqO94YYUh1lAPXhkc7Bs8/t6An\nC5pUFOFxYWL49Y8XOEghHE6YuDmBZMdUxWoHvcF5zv1MwhA6fFUrP4njygGcMQpY\nvttJ7NMu2DvjjI9XOvG8ZZeRXvWmSLlhqHA2WNFF9GQyu9AfWmfiBTrx97dIZ3gN\nwE3gogNwd0MsHxMu1snAvBl1ibc9LZFpNLDDPdlQGQKBgQDlS49l0YOCV+fpvVpV\nrjAZmZIPMKK5GRgiLAMQzqvxf8lZkwwUwcM2AWTJG9Yc1byuJirnosZPy1TGwqyO\n3hjwukQRoJ/21S2Ht/GzsVldZP+osrnEM0KZOuPVi1g6F6DZI6nDivHEAstN+8Z2\nEFeGOPy72simiQGLnxYX6BJUiQKBgQDiZ/m1WQq9tv7TrR/BhkZ7h+3QAOGvGKlu\nqTFWJ2Ggz6ujBt9FV7E8e67novGEb3a6tTlqrG3tb2sKfzqn1DeKVs+ycMjSQz+N\niFvtSDPrcxOX3sYR7cByLdOzM9vpyuQ6UykFco6DbC89F8Yg+UbsvgRpUlI5i/j6\n1DJWFnaQOQKBgHxEbRzjZYB4n8l/w7t3wb2+CviMhUQHo5qxe5/aQjmJ5dfT59JA\nCMn2C2cq3OmXtMA1Ez+iahPIwNNPojFzkNS2PjnHcapWcmyBdk7KqQICwMPuyNra\nZReiYOPUtyYUtCm6OEEvxkNSuFg1QaOuy6CEtgQhWGlZCyteNp0SOwzxAoGBALV+\n9p3bEJI/NY8JNPDVrIDw2cKqQkE0evbcKVHQZiIc+JHLO4cCInHDENZeOFCbbkmE\nZ8/NBJ6Xd+7FSYcqx49dwkhgw4xTHopeKptQC1cPPEC99HiA6IpflFsPEpcb79OV\nwMe+KuLOAhxuh4T9cE7ukOjBdmrte53QJ739afR5AoGBANto+dpLPgQ1FwNvSr/m\n45q9s6bjXCW+sAfu3QjPeN/aToOGqdoHA4uBg5C6x5GaF+gtDRvY6N90BqUobn6L\n1g2Pu0EVX0b03v26GzG/JZZ1aqgMi2SAgKH+8QZJ7dk5dbJqhwR6/wkWHv8OiBAk\nq7ee4449gW/rhdytZicoK0L3\n-----END PRIVATE KEY-----\n",
  client_email: "yeppy-358@undangan-404911.iam.gserviceaccount.com",
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
};

// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOC = 'https://sheets.googleapis.com/$discovery/rest?version=v4';

const SHEET_ID = '1DMhwnJYkErVn5IMdWcbDf7mMZNVY9He19DgtydSs1ME';
const SHEET_RANGE = 'UD1!A1:G';

/**
 * Callback after api.js is loaded.
 */
function gapiLoaded() {
  gapi.load('client', initializeGapiClient);
}

/**
 * Callback after the API client is loaded. Loads the
 * discovery doc to initialize the API.
 */
async function initializeGapiClient() {
  await gapi.auth.setToken(await GetAccessTokenFromServiceAccount.do(serviceAccount));
  await gapi.client.init({
    discoveryDocs: [DISCOVERY_DOC],
  });
}
/**
       * Print the names and majors of students in a sample spreadsheet:
       * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
       */
async function listWishes() {
  let response;
  try {
    // Fetch first 10 files
    response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: SHEET_RANGE,
    });
  } catch (err) {
    console.log(err);
    return;
  }

  const range = response.result;

  if (!range || !range.values || range.values.length == 0) {
    console.log('No values found.');
    return;
  }

  const [headers, ...data] = range.values;
  const databaseAsObjectArray = data.map(row => {
    return row.reduce((acc, value, i) => {
      const key = headers[i];
      if (key === '') return acc;
      return { ...acc, [key]: value };
    }, {});
  });

  onWishesLoaded(databaseAsObjectArray);
}

let lastWishesId = null;

function onWishesLoaded(data) {
  const elWishes = document.getElementById('daftar-ucapan');

  if (data && data.length > 0 && elWishes) {
    lastWishesId = data[data.length - 1].id;
    data.reverse().map((wish) => {
      elWishes.insertAdjacentHTML('beforeend', `
        <div class="mb-3">
          <div class="card-body border bg-dark shadow p-3 m-0 rounded-4" data-parent="true"
              id="4e206228-42af-4b9e-aa2d-dd5fb7ebd5de">
              <div class="d-flex flex-wrap justify-content-between align-items-center">
                  <p class="text-light text-truncate m-0 p-0" style="font-size: 0.95rem;">
                      <strong class="me-1">${wish.name}</strong><i
                          class="fa-solid fa-circle-check text-success"></i>
                  </p>
                  <small class="text-light m-0 p-0" style="font-size: 0.75rem;">${timeFromNow(wish.datetime)}</small>
              </div>
              <hr class="text-light my-1">
              <p class="text-light mt-0 mb-1 mx-0 p-0" style="white-space: pre-line">${wish.content}</p>

              <div class="d-flex flex-wrap justify-content-end align-items-center">
                  <button style="font-size: 0.8rem;" onclick="like.like(this)"
                      data-uuid="4e206228-42af-4b9e-aa2d-dd5fb7ebd5de"
                      class="btn btn-sm rounded-2 py-0 px-0">
                      <div class="d-flex justify-content-start align-items-center">
                          <p class="my-0 mx-1">${wish.likes}</p>
                          <i class="py-1 me-1 p-0 fa fa-heart"></i>
                      </div>
                  </button>
              </div>
          </div>
        </div>
      `);
    });
  }
}

function writeSheet(values) {
  return gapi.client.sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: SHEET_RANGE,
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    resource: {
      values,
    },
  }).then(
    function(response) {
      const result = response.result;
      console.log(`${result.updates.updatedCells} cells appended.`);
    },
    function(error) {
      console.error('Error writing to Google Sheet:', error);
    }
  );
}

async function sendWishes() {
  const formName = document.getElementById('form-nama');
  const formAttendance = document.getElementById('form-kehadiran');
  const formWishes = document.getElementById('form-pesan');

  var data = [[
    String(parseInt(lastWishesId) + 1), // id,
    'UD1', // id_undangan,
    formName.value, // name,
    formWishes.value, // content,
    new Date().toISOString(), // datetime,
    '0', // likes,
    formAttendance.value, // attend,
  ]];

  await writeSheet(data);

  const elWishes = document.getElementById('daftar-ucapan');

  elWishes.insertAdjacentHTML('afterbegin', `
    <div class="mb-3">
      <div class="card-body border bg-dark shadow p-3 m-0 rounded-4" data-parent="true"
          id="4e206228-42af-4b9e-aa2d-dd5fb7ebd5de">
          <div class="d-flex flex-wrap justify-content-between align-items-center">
              <p class="text-light text-truncate m-0 p-0" style="font-size: 0.95rem;">
                  <strong class="me-1">${formName.value}</strong><i
                      class="fa-solid fa-circle-check text-success"></i>
              </p>
              <small class="text-light m-0 p-0" style="font-size: 0.75rem;">${timeFromNow(new Date().toISOString())}</small>
          </div>
          <hr class="text-light my-1">
          <p class="text-light mt-0 mb-1 mx-0 p-0" style="white-space: pre-line">${formWishes.value}</p>
      </div>
    </div>
  `);
}