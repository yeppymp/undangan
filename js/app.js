const formatDate = (stringDate) => {
    const date = new Date(stringDate)
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString("id", options);
}

const renderMetadata = (meta) => {
    document.title = meta.title;

    document.querySelector('meta[property="og:title"]').setAttribute("content", meta.title);
    document.querySelector('meta[property="og:description"]').setAttribute("content", meta.description);
    document.querySelector('meta[property="og:image:alt"]').setAttribute("content", meta.description);
    document.querySelector('meta[property="og:site_name"]').setAttribute("content", meta.site_name);
    document.querySelector('meta[property="og:url"]').setAttribute("content", meta.url);
}

const renderMenu = (menu) => {
    document.getElementById('nav-home').innerHTML = menu.home;
    document.getElementById('nav-bride').innerHTML = menu.bride;
    document.getElementById('nav-date').innerHTML = menu.date;
    // document.getElementById('nav-gallery').innerHTML = menu.gallery;
    document.getElementById('nav-wishes').innerHTML = menu.wishes;
}

const renderCover = (cover) => {
    document.getElementById('cover-title').innerHTML = cover.title;
    document.getElementById('cover-bride-name').innerHTML = cover.bride_name;
    document.getElementById('cover-date').innerHTML = formatDate(cover.date);
}

const renderHome = (home) => {
    document.getElementById('home-title').innerHTML = home.title;
    document.getElementById('home-bride-name').innerHTML = home.bride_name;
    document.getElementById('home-date').innerHTML = formatDate(home.date);
}

const renderContent = (content) => {
    document.getElementById('content-date').innerHTML = formatDate(content.date);
    document.getElementById('content-groom-name').innerHTML = content.groom.name;
    document.getElementById('content-groom-parent').innerHTML = content.groom.parent;
    document.getElementById('content-bride-name').innerHTML = content.bride.name;
    document.getElementById('content-bride-parent').innerHTML = content.bride.parent;
}

window.addEventListener('DOMContentLoaded', (event) => {
    // Fetch the JSON data
    // fetch('https://raw.githubusercontent.com/yeppymp/undangan/main/data.json')
    fetch('../data.json')
        .then(response => response.json())
        .then(data => {
            renderMetadata(data.meta);
            renderMenu(data.menus);
            renderCover(data.cover);
            renderHome(data.home);
            renderContent(data.content);
        })
        .catch(error => console.error('Error fetching JSON:', error));
});

const util = (() => {

    // OK
    const opacity = (nama) => {
        let nm = document.getElementById(nama);
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
    };

    // OK
    const escapeHtml = (unsafe) => {
        return unsafe
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    };

    // OK
    const salin = (btn, msg = null, timeout = 1500) => {
        navigator.clipboard.writeText(btn.getAttribute('data-nomer'));

        let tmp = btn.innerHTML;
        btn.innerHTML = msg ?? 'Tersalin';
        btn.disabled = true;

        let clear = null;
        clear = setTimeout(() => {
            btn.innerHTML = tmp;
            btn.disabled = false;
            btn.focus();

            clearTimeout(clear);
            clear = null;
            return;
        }, timeout);
    };

    // OK
    const timer = () => {
        let countDownDate = (new Date(document.getElementById('tampilan-waktu').getAttribute('data-waktu').replace(' ', 'T'))).getTime();

        let clear = null;
        clear = setInterval(() => {
            let distance = countDownDate - (new Date()).getTime();

            if (distance < 0) {
                clearInterval(clear);
                clear = null;
                return;
            }

            document.getElementById('hari').innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
            document.getElementById('jam').innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            document.getElementById('menit').innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            document.getElementById('detik').innerText = Math.floor((distance % (1000 * 60)) / 1000);
        }, 1000);
    };

    // OK
    const play = (btn) => {
        if (btn.getAttribute('data-status') !== 'true') {
            btn.setAttribute('data-status', 'true');
            audio.play();
            btn.innerHTML = '<i class="fa-solid fa-circle-pause"></i>';
        } else {
            btn.setAttribute('data-status', 'false');
            audio.pause();
            btn.innerHTML = '<i class="fa-solid fa-circle-play"></i>';
        }
    };

    // OK
    const modal = (img) => {
        document.getElementById('show-modal-image').src = img.src;
        (new bootstrap.Modal('#modal-image')).show();
    };

    // OK
    const tamu = () => {
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
    };

    // OK
    const animation = async () => {
        const duration = 10 * 1000;
        const animationEnd = Date.now() + duration;
        let skew = 1;

        let randomInRange = (min, max) => {
            return Math.random() * (max - min) + min;
        };

        (async function frame() {
            const timeLeft = animationEnd - Date.now();
            const ticks = Math.max(200, 500 * (timeLeft / duration));

            skew = Math.max(0.8, skew - 0.001);

            await confetti({
                particleCount: 1,
                startVelocity: 0,
                ticks: ticks,
                origin: {
                    x: Math.random(),
                    y: Math.random() * skew - 0.2,
                },
                colors: ["FFC0CB", "FF69B4", "FF1493", "C71585"],
                shapes: ["heart"],
                gravity: randomInRange(0.5, 1),
                scalar: randomInRange(1, 2),
                drift: randomInRange(-0.5, 0.5),
            });

            if (timeLeft > 0) {
                requestAnimationFrame(frame);
            }
        })();
    };

    // OK
    const buka = async () => {
        document.querySelector('body').style.overflowY = 'scroll';
        AOS.init();
        audio.play();
        listWishes();

        opacity('welcome');
        document.getElementById('tombol-musik').style.display = 'block';
        timer();

        await confetti({
            origin: { y: 0.8 },
            zIndex: 1057
        });
        await animation();
    };

    return {
        buka: buka,
        tamu: tamu,
        modal: modal,
        play: play,
        salin: salin,
        escapeHtml: escapeHtml,
        opacity: opacity
    };
})(); // OK

const progress = (() => {

    const assets = document.querySelectorAll('img');
    const info = document.getElementById('progress-info');
    const bar = document.getElementById('bar');

    let total = assets.length;
    let loaded = 0;

    const progress = () => {
        loaded += 1;

        bar.style.width = Math.min((loaded / total) * 100, 100).toString() + "%";
        info.innerText = `Loading assets (${loaded}/${total}) [${parseInt(bar.style.width).toFixed(0)}%]`;

        if (loaded != total) {
            return;
        }

        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        window.scrollTo(0, 0);

        util.tamu();
        util.opacity('loading');
    };

    assets.forEach((asset) => {
        if (asset.complete && asset.naturalWidth !== 0) {
            progress();
        } else {
            asset.addEventListener('load', () => {
                progress();
            });
        }
    });
})(); // OK

const audio = (() => {
    let audio = null;

    const singleton = () => {
        if (!audio) {
            audio = new Audio();
            audio.autoplay = true;
            audio.src = document.getElementById('tombol-musik').getAttribute('data-url');
            audio.load();
            audio.currentTime = 0;
            audio.volume = 1;
            audio.muted = false;
            audio.loop = true;
        }

        return audio;
    };

    return {
        play: () => singleton().play(),
        pause: () => singleton().pause(),
    };
})(); // OK
