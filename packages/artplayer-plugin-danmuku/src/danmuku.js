import { bilibiliDanmuParseFromUrl } from './bilibili';
import getDanmuTop from './getDanmuTop';

export default class Danmuku {
    constructor(art, option) {
        this.art = art;
        this.utils = art.constructor.utils;
        this.validator = art.constructor.validator;

        this.queue = [];
        this.option = {};
        this.config(option);
        this.isStop = false;
        this.isHide = false;
        this.animationFrameTimer = null;
        this.$danmuku = art.template.$danmuku;
        this.$player = art.template.$player;

        art.on('video:play', this.start.bind(this));
        art.on('video:playing', this.start.bind(this));
        art.on('video:pause', this.stop.bind(this));
        art.on('video:waiting', this.stop.bind(this));
        art.on('resize', this.resize.bind(this));
        art.on('destroy', this.stop.bind(this));
        art.on('fullscreen', this.reset.bind(this));
        art.on('fullscreenWeb', this.reset.bind(this));

        this.load();
    }

    static get option() {
        return {
            danmuku: [],
            speed: 5,
            margin: [10, 100],
            opacity: 1,
            fontSize: 25,
            filter: () => true,
            antiOverlap: false,
            synchronousPlayback: false,
        };
    }

    static get scheme() {
        return {
            danmuku: 'array|function|string',
            speed: 'number',
            margin: 'array',
            opacity: 'number',
            fontSize: 'number',
            filter: 'function',
            antiOverlap: 'boolean',
            synchronousPlayback: 'boolean',
        };
    }

    get isRotate() {
        return this.art.plugins.autoOrientation && this.art.plugins.autoOrientation.state;
    }

    get marginTop() {
        const { clamp } = this.utils;
        const { $player } = this.art.template;
        const value = this.option.margin[0];

        if (typeof value === 'number') {
            return clamp(value, 0, $player.clientHeight);
        }

        if (typeof value === 'string' && value.endsWith('%')) {
            const ratio = parseFloat(value) / 100;
            return clamp($player.clientHeight * ratio, 0, $player.clientHeight);
        }

        return Danmuku.option.margin[0];
    }

    get marginBottom() {
        const { clamp } = this.utils;
        const { $player } = this.art.template;
        const value = this.option.margin[1];

        if (typeof value === 'number') {
            return clamp(value, 0, $player.clientHeight);
        }

        if (typeof value === 'string' && value.endsWith('%')) {
            const ratio = parseFloat(value) / 100;
            return clamp($player.clientHeight * ratio, 0, $player.clientHeight);
        }

        return Danmuku.option.margin[1];
    }

    filter(state, callback) {
        return this.queue.filter((danmu) => danmu.$state === state).map(callback);
    }

    getLeft($ref) {
        const rect = $ref.getBoundingClientRect();
        return this.isRotate ? rect.top : rect.left;
    }

    getRef() {
        const result = this.queue.find((danmu) => {
            return danmu.$ref && danmu.$state === 'wait';
        });

        if (result) {
            const { $ref } = result;
            result.$ref = null;
            return $ref;
        }

        const $ref = document.createElement('div');

        $ref.style.cssText = `
            user-select: none;
            position: absolute;
            white-space: pre;
            pointer-events: none;
            perspective: 500px;
            display: inline-block;
            will-change: transform;
            font-weight: normal;
            line-height: 1.125;
            visibility: hidden;
            font-family: SimHei, "Microsoft JhengHei", Arial, Helvetica, sans-serif;
            text-shadow: rgb(0, 0, 0) 1px 0px 1px, rgb(0, 0, 0) 0px 1px 1px, rgb(0, 0, 0) 0px -1px 1px, rgb(0, 0, 0) -1px 0px 1px;
        `;

        return $ref;
    }

    getReady(danmu) {
        const { $state, time } = danmu;
        const { currentTime } = this.art;
        return $state === 'ready' || ($state === 'wait' && currentTime + 0.1 >= time && time >= currentTime - 0.1);
    }

    async load() {
        try {
            let danmus = [];
            if (typeof this.option.danmuku === 'function') {
                danmus = await this.option.danmuku();
            } else if (typeof this.option.danmuku.then === 'function') {
                danmus = await this.option.danmuku;
            } else if (typeof this.option.danmuku === 'string') {
                danmus = await bilibiliDanmuParseFromUrl(this.option.danmuku);
            } else {
                danmus = this.option.danmuku;
            }

            this.utils.errorHandle(Array.isArray(danmus), 'Danmuku need return an array as result');
            this.art.emit('artplayerPluginDanmuku:loaded', danmus);

            this.queue = [];
            this.$danmuku.innerText = '';
            danmus.forEach((danmu) => this.emit(danmu));
        } catch (error) {
            this.art.emit('artplayerPluginDanmuku:error', error);
            throw error;
        }

        return this;
    }

    config(option) {
        const { clamp } = this.utils;

        this.option = Object.assign({}, Danmuku.option, this.option, option);
        this.validator(this.option, Danmuku.scheme);

        this.option.speed = clamp(this.option.speed, 1, 10);
        this.option.opacity = clamp(this.option.opacity, 0, 1);
        this.option.fontSize = clamp(this.option.fontSize, 0, 100);

        this.art.emit('artplayerPluginDanmuku:config', this.option);

        return this;
    }

    makeWait(danmu) {
        danmu.$state = 'wait';
        if (danmu.$ref) {
            danmu.$ref.style.border = 'none';
            danmu.$ref.style.visibility = 'hidden';
            danmu.$ref.style.marginLeft = '0px';
            danmu.$ref.style.transform = 'translateX(0px)';
            danmu.$ref.style.transition = 'transform 0s linear 0s';
        }
    }

    continue() {
        const { clientWidth } = this.$player;
        this.filter('stop', (danmu) => {
            danmu.$state = 'emit';
            danmu.$lastStartTime = Date.now();
            switch (danmu.mode) {
                case 0: {
                    const translateX = clientWidth + danmu.$ref.clientWidth;
                    danmu.$ref.style.transform = `translateX(${-translateX}px)`;
                    danmu.$ref.style.transition = `transform ${danmu.$restTime}s linear 0s`;
                    break;
                }
                default:
                    break;
            }
        });

        return this;
    }

    suspend() {
        const { clientWidth } = this.$player;
        this.filter('emit', (danmu) => {
            danmu.$state = 'stop';
            switch (danmu.mode) {
                case 0: {
                    const translateX = clientWidth - (this.getLeft(danmu.$ref) - this.getLeft(this.$player));
                    danmu.$ref.style.transform = `translateX(${-translateX}px)`;
                    danmu.$ref.style.transition = 'transform 0s linear 0s';
                    break;
                }
                default:
                    break;
            }
        });

        return this;
    }

    resize() {
        console.log('resize');
        return this;
    }

    reset() {
        this.queue.forEach((danmu) => this.makeWait(danmu));
    }

    update() {
        const { clientWidth } = this.$player;
        this.animationFrameTimer = window.requestAnimationFrame(() => {
            if (this.art.playing && !this.isHide) {
                this.filter('emit', (danmu) => {
                    const emitTime = (Date.now() - danmu.$lastStartTime) / 1000;
                    danmu.$restTime -= emitTime;
                    danmu.$lastStartTime = Date.now();
                    if (danmu.$restTime <= 0) {
                        this.makeWait(danmu);
                    }
                });

                this.queue
                    .filter((danmu) => this.getReady(danmu))
                    .forEach((danmu) => {
                        danmu.$ref = danmu.$ref || this.getRef();
                        danmu.$ref.innerText = danmu.text;
                        this.$danmuku.appendChild(danmu.$ref);

                        danmu.$ref.style.opacity = this.option.opacity;
                        danmu.$ref.style.fontSize = `${this.option.fontSize || danmu.fontSize}px`;
                        danmu.$ref.style.color = danmu.color || '#fff';
                        danmu.$ref.style.border = danmu.border ? `1px solid ${danmu.color || '#fff'}` : 'none';

                        danmu.$lastStartTime = Date.now();
                        danmu.$restTime =
                            this.option.synchronousPlayback && this.art.playbackRate
                                ? this.option.speed / Number(this.art.playbackRate)
                                : this.option.speed;

                        const top = getDanmuTop(this, danmu);

                        if (top !== undefined) {
                            danmu.$state = 'emit';
                            danmu.$ref.style.visibility = 'visible';

                            switch (danmu.mode) {
                                case 0: {
                                    danmu.$ref.style.top = `${top}px`;
                                    danmu.$ref.style.left = `${clientWidth}px`;
                                    const translateX = clientWidth + danmu.$ref.clientWidth;
                                    danmu.$ref.style.transform = `translateX(${-translateX}px)`;
                                    danmu.$ref.style.transition = `transform ${danmu.$restTime}s linear 0s`;
                                    break;
                                }
                                case 1:
                                    danmu.$ref.style.left = '50%';
                                    danmu.$ref.style.top = `${top}px`;
                                    danmu.$ref.style.marginLeft = `-${danmu.$ref.clientWidth / 2}px`;
                                    break;
                                default:
                                    break;
                            }
                        } else {
                            danmu.$state = 'ready';
                            danmu.$ref.style.visibility = 'hidden';
                        }
                    });
            }

            if (!this.isStop) {
                this.update();
            }
        });
        return this;
    }

    stop() {
        this.isStop = true;
        this.suspend();
        window.cancelAnimationFrame(this.animationFrameTimer);
        this.art.emit('artplayerPluginDanmuku:stop');
        return this;
    }

    start() {
        this.isStop = false;
        this.continue();
        this.update();
        this.art.emit('artplayerPluginDanmuku:start');
        return this;
    }

    show() {
        this.isHide = false;
        this.$danmuku.style.display = 'block';
        this.art.emit('artplayerPluginDanmuku:show');
        return this;
    }

    hide() {
        this.isHide = true;
        this.$danmuku.style.display = 'none';
        this.art.emit('artplayerPluginDanmuku:hide');
        return this;
    }

    emit(danmu) {
        this.validator(danmu, {
            text: 'string',
            mode: 'number|undefined',
            color: 'string|undefined',
            time: 'number|undefined',
            border: 'boolean|undefined',
        });

        if (!danmu.text.trim()) return this;
        if (!this.option.filter(danmu)) return this;

        if (danmu.time) {
            danmu.time = this.utils.clamp(danmu.time, 0, Infinity);
        } else {
            danmu.time = this.art.currentTime + 0.5;
        }

        this.queue.push({
            mode: 0,
            ...danmu,
            $state: 'wait',
            $ref: null,
            $restTime: 0,
            $lastStartTime: 0,
        });

        return this;
    }
}
