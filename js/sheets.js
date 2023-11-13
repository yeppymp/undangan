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

const UNDANGAN_ID = 'UD1';

const SHEET_ID = '1DMhwnJYkErVn5IMdWcbDf7mMZNVY9He19DgtydSs1ME';
const SHEET_RANGE_WISHES  = `${UNDANGAN_ID}!A17:G`;
const SHEET_RANGE_META    = `${UNDANGAN_ID}!A2:D3`;
const SHEET_RANGE_MENU    = `${UNDANGAN_ID}!F2:J3`;
const SHEET_RANGE_COVER   = `${UNDANGAN_ID}!A7:C8`;
const SHEET_RANGE_HOME    = `${UNDANGAN_ID}!E7:H8`;
const SHEET_RANGE_CONTENT = `${UNDANGAN_ID}!A12:I13`;

function gapiLoaded() {
  gapi.load('client', initializeGapiClient);
}

async function initializeGapiClient() {
  await gapi.auth.setToken(await GetAccessTokenFromServiceAccount.do(serviceAccount));
  await gapi.client.init({
    discoveryDocs: [DISCOVERY_DOC],
  });

  let progressTotal = 75;

  await loadMeta();
  progressTotal = 75 + 8.33333333333;
  bar.style.width = `${progressTotal}%`;
  info.innerText = `Loading assets (10/12) [${parseInt(bar.style.width).toFixed(0)}%]`;
  await loadMenu();
  progressTotal = 75 + (8.33333333333 * 2);
  bar.style.width = `${progressTotal}%`;
  info.innerText = `Loading assets (11/12) [${parseInt(bar.style.width).toFixed(0)}%]`;
  await loadCover();
  progressTotal = 75 + (8.33333333333 * 3);
  bar.style.width = `${progressTotal}%`;
  info.innerText = `Loading assets (12/12) [${parseInt(bar.style.width).toFixed(0)}%]`;

  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  window.scrollTo(0, 0);

  let name = (new URLSearchParams(window.location.search)).get('to') ?? '';

  if (name.length == 0) {
      document.getElementById('nama-tamu').remove();
      return;
  }

  let div = document.createElement('div');
  div.classList.add('m-2');
  div.innerHTML = `<p class="mt-4 mb-1 mx-0 p-0 text-light">Kepada Yth Bapak/Ibu/Saudara/i</p><h2 class="text-light">${escapeHtml(name)}</h2>`;

  // document.getElementById('form-nama').value = name;
  document.getElementById('nama-tamu').appendChild(div);

  loadHome();
  loadContent();

  let nm = document.getElementById('loading');
  let op = parseInt(nm.style.opacity);
  let clear = null;

  clear = setInterval(() => {
      if (op >= 0) {
          nm.style.opacity = op.toString();
          op -= 0.025;
      } else {
          clearInterval(clear);
          clear = null;
          nm.remove();
          return;
      }
  }, 10);
}

async function loadStaticData(range, type='META') {
  let response;
  try {
    // Fetch first 10 files
    response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range,
    });
  } catch (err) {
    console.log(`[${type}] Error: `, err);
    return;
  }

  const rangeResult = response.result;

  if (!rangeResult || !rangeResult.values || rangeResult.values.length == 0) {
    console.log(`[${type}] Error: No values found.`);
    return;
  }

  const [headers, ...data] = rangeResult.values;
  const staticData = data.map(row => {
    return row.reduce((acc, value, i) => {
      const key = headers[i];
      if (key === '') return acc;
      return { ...acc, [key]: value };
    }, {});
  })[0];

  return staticData;
}

// META
const renderMetadata = (meta) => {
  document.title = meta.title;

  document.querySelector('meta[property="og:title"]').setAttribute("content", meta.title);
  document.querySelector('meta[property="og:description"]').setAttribute("content", meta.description);
  document.querySelector('meta[property="og:image:alt"]').setAttribute("content", meta.description);
  document.querySelector('meta[property="og:site_name"]').setAttribute("content", meta.site_name);
  document.querySelector('meta[property="og:url"]').setAttribute("content", meta.url);
}

async function loadMeta() {
  const meta = await loadStaticData(SHEET_RANGE_META, 'META');
  renderMetadata(meta);
}

// MENU
const renderMenu = (menu) => {
  document.getElementById('nav-home').innerHTML = menu.home;
  document.getElementById('nav-bride').innerHTML = menu.bride;
  document.getElementById('nav-date').innerHTML = menu.date;
  // document.getElementById('nav-gallery').innerHTML = menu.gallery;
  document.getElementById('nav-wishes').innerHTML = menu.wishes;
}

async function loadMenu() {
  const menu = await loadStaticData(SHEET_RANGE_MENU, 'MENU');
  renderMenu(menu);
}

// COVER
const renderCover = (cover) => {
  document.getElementById('cover-title').innerHTML = cover.title;
  document.getElementById('cover-bride-name').innerHTML = cover.bride_name;
  document.getElementById('cover-date').innerHTML = formatDate(cover.date);
}

async function loadCover() {
  const cover = await loadStaticData(SHEET_RANGE_COVER, 'COVER');
  renderCover(cover);
}

// HOME
const renderHome = (home) => {
  document.getElementById('home-title').innerHTML = home.title;
  document.getElementById('home-bride-name').innerHTML = home.bride_name;
  document.getElementById('home-date').innerHTML = formatDate(home.date);
  document.getElementById('home-calendar').setAttribute('href', home.calendar_url);
}

async function loadHome() {
  const home = await loadStaticData(SHEET_RANGE_HOME, 'HOME');
  renderHome(home);
}

// CONTENT
const renderContent = (content) => {
  document.getElementById('content-date').innerHTML = formatDate(content.date);
  document.getElementById('content-groom-name').innerHTML = content.groom_name;
  document.getElementById('content-groom-parent').innerHTML = content.groom_parent;
  document.getElementById('content-bride-name').innerHTML = content.bride_name;
  document.getElementById('content-bride-parent').innerHTML = content.bride_parent;
  document.getElementById('content-akad').innerHTML = `Pukul ${content.akad_time} - Selesai`;
  document.getElementById('content-resepsi').innerHTML = `Pukul ${content.resepsi_time} - Selesai`;
  document.getElementById('content-address').innerHTML = content.address;
  document.getElementById('content-maps').setAttribute('href', content.maps);
}

async function loadContent() {
  const home = await loadStaticData(SHEET_RANGE_CONTENT, 'CONTENT');
  renderContent(home);
}

// WISHES
async function listWishes() {
  let response;
  try {
    // Fetch first 10 files
    response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: SHEET_RANGE_WISHES,
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

              ${wish.likes > 0 ? `
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
              ` : ''}
          </div>
        </div>
      `);
    });
  }
}

function writeSheet(values) {
  return gapi.client.sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: SHEET_RANGE_WISHES,
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
    'UNDANGAN_ID', // id_undangan,
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