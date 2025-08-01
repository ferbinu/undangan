import { progress } from './progress.js';
import { util } from '../../common/util.js';
import { cache } from '../../connection/cache.js';
import { HTTP_GET, request } from '../../connection/request.js';

export const video = (() => {

    /**
     * @type {ReturnType<typeof cache>|null}
     */
    let c = null;

    /**
     * @returns {Promise<void>}
     */
    const load = () => {
        const wrap = document.getElementById('video-love-stroy');
        if (!wrap || !wrap.hasAttribute('data-src')) {
            wrap?.remove();
            progress.complete('video', true);
            return Promise.resolve();
        }

        const src = wrap.getAttribute('data-src');
        if (!src) {
            progress.complete('video', true);
            return Promise.resolve();
        }

        const vid = document.createElement('video');
        vid.className = wrap.getAttribute('data-vid-class');
        vid.loop = true;
        vid.muted = true;
        vid.controls = true;
        vid.autoplay = false;
        vid.playsInline = true;
        vid.preload = 'metadata';
        vid.disableRemotePlayback = true;
        vid.disablePictureInPicture = true;
        vid.controlsList = 'noremoteplayback nodownload noplaybackrate';

        const observer = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting ? vid.play() : vid.pause()));

        /**
         * @param {Response} res 
         * @returns {Promise<Response>}
         */
        const resToVideo = (res) => {
            vid.addEventListener('loadedmetadata', () => {
                vid.style.removeProperty('height');
                document.getElementById('video-love-stroy-loading')?.remove();
            }, { once: true });

            return res.clone().blob().then((b) => {
                vid.src = URL.createObjectURL(b);
                return res;
            });
        };

        /**
         * @returns {Promise<Response>}
         */
        const fetchBasic = () => {
            const bar = document.getElementById('progress-bar-video-love-stroy');
            const inf = document.getElementById('progress-info-video-love-stroy');
            const loaded = new Promise((res) => vid.addEventListener('loadedmetadata', res, { once: true }));

            const ab = new AbortController();
            vid.addEventListener('error', () => progress.invalid('video'), { signal: ab.signal, once: true });

            vid.src = util.escapeHtml(src);
            wrap.appendChild(vid);

            return loaded.then(() => {
                ab.abort();
                progress.complete('video');

                const height = vid.getBoundingClientRect().width * (vid.videoHeight / vid.videoWidth);
                vid.style.height = `${height}px`;

                return request(HTTP_GET, vid.src)
                    .withProgressFunc((a, b) => {
                        const result = Number((a / b) * 100).toFixed(0) + '%';

                        bar.style.width = result;
                        inf.innerText = result;
                    })
                    .withRetry()
                    .default()
                    .then(resToVideo)
                    .catch((err) => {
                        bar.style.backgroundColor = 'red';
                        inf.innerText = `Error loading video`;
                        console.error(err);
                    })
                    .finally(() => observer.observe(vid));
            });
        };

        if (!window.isSecureContext) {
            return fetchBasic();
        }

        return c.has(src).then((res) => {
            if (!res) {
                return c.del(src).then(fetchBasic).then((r) => c.set(src, r));
            }

            progress.complete('video');
            return resToVideo(res).finally(() => {
                wrap.appendChild(vid);
                observer.observe(vid);
            });
        });
    };

    /**
     * @returns {object}
     */
    const init = () => {
        progress.add();
        c = cache('video').withForceCache();

        return {
            load,
        };
    };

    return {
        init,
    };
})();