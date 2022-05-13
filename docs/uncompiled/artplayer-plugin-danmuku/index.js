// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"gEVO5":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _danmuku = require("./danmuku");
var _danmukuDefault = parcelHelpers.interopDefault(_danmuku);
var _setting = require("./setting");
var _settingDefault = parcelHelpers.interopDefault(_setting);
function artplayerPluginDanmuku(option) {
    return (art)=>{
        const danmuku = new _danmukuDefault.default(art, option);
        _settingDefault.default(art, danmuku);
        return {
            name: 'artplayerPluginDanmuku',
            emit: danmuku.emit.bind(danmuku),
            config: danmuku.config.bind(danmuku),
            hide: danmuku.hide.bind(danmuku),
            show: danmuku.show.bind(danmuku),
            get isHide () {
                return danmuku.isHide;
            },
            get isStop () {
                return danmuku.isStop;
            }
        };
    };
}
exports.default = artplayerPluginDanmuku;
window['artplayerPluginDanmuku'] = artplayerPluginDanmuku;

},{"./danmuku":"igPca","./setting":"8npWO","@parcel/transformer-js/src/esmodule-helpers.js":"8MjWm"}],"igPca":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _bilibili = require("./bilibili");
var _getDanmuTop = require("./getDanmuTop");
var _getDanmuTopDefault = parcelHelpers.interopDefault(_getDanmuTop);
class Danmuku {
    constructor(art, option){
        const { constructor , template  } = art;
        this.utils = constructor.utils;
        this.validator = constructor.validator;
        this.$danmuku = template.$danmuku;
        this.$player = template.$player;
        this.art = art;
        this.queue = [];
        this.option = {};
        this.$refs = [];
        this.isStop = false;
        this.isHide = false;
        this.timer = null;
        this.config(option);
        if (this.option.useWorker) try {
            this.worker = new Worker(require("27c3930ee158179a"));
        } catch (error) {
        //
        }
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.reset = this.reset.bind(this);
        this.destroy = this.destroy.bind(this);
        art.on('video:play', this.start);
        art.on('video:playing', this.start);
        art.on('video:pause', this.stop);
        art.on('video:waiting', this.stop);
        art.on('fullscreen', this.reset);
        art.on('fullscreenWeb', this.reset);
        art.on('destroy', this.destroy);
        this.load();
    }
    static get option() {
        return {
            danmuku: [],
            speed: 5,
            margin: [
                10,
                100
            ],
            opacity: 1,
            fontSize: 25,
            filter: ()=>true
            ,
            antiOverlap: true,
            useWorker: true,
            synchronousPlayback: false
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
            useWorker: 'boolean',
            synchronousPlayback: 'boolean'
        };
    }
    get isRotate() {
        return this.art.plugins.autoOrientation && this.art.plugins.autoOrientation.state;
    }
    get marginTop() {
        const { clamp  } = this.utils;
        const value = this.option.margin[0];
        const { clientHeight  } = this.$player;
        if (typeof value === 'number') return clamp(value, 0, clientHeight);
        if (typeof value === 'string' && value.endsWith('%')) {
            const ratio = parseFloat(value) / 100;
            return clamp(clientHeight * ratio, 0, clientHeight);
        }
        return Danmuku.option.margin[0];
    }
    get marginBottom() {
        const { clamp  } = this.utils;
        const value = this.option.margin[1];
        const { clientHeight  } = this.$player;
        if (typeof value === 'number') return clamp(value, 0, clientHeight);
        if (typeof value === 'string' && value.endsWith('%')) {
            const ratio = parseFloat(value) / 100;
            return clamp(clientHeight * ratio, 0, clientHeight);
        }
        return Danmuku.option.margin[1];
    }
    filter(state, callback) {
        return this.queue.filter((danmu)=>danmu.$state === state
        ).map(callback);
    }
    getLeft($ref) {
        const rect = $ref.getBoundingClientRect();
        return this.isRotate ? rect.top : rect.left;
    }
    getRef() {
        const $refCache = this.$refs.pop();
        if ($refCache) return $refCache;
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
    getReady() {
        const { currentTime  } = this.art;
        return this.queue.filter((danmu)=>{
            return danmu.$state === 'ready' || danmu.$state === 'wait' && currentTime + 0.1 >= danmu.time && danmu.time >= currentTime - 0.1;
        });
    }
    getEmits() {
        const result = [];
        const { clientWidth  } = this.$player;
        const clientLeft = this.getLeft(this.$player);
        this.filter('emit', (danmu)=>{
            const top = danmu.$ref.offsetTop;
            const left = this.getLeft(danmu.$ref) - clientLeft;
            const height = danmu.$ref.clientHeight;
            const width = danmu.$ref.clientWidth;
            const distance = left + width;
            const right = clientWidth - distance;
            const speed = distance / danmu.$restTime;
            const emit = {};
            emit.top = top;
            emit.left = left;
            emit.height = height;
            emit.width = width;
            emit.right = right;
            emit.speed = speed;
            emit.distance = distance;
            emit.time = danmu.$restTime;
            emit.mode = danmu.mode;
            result.push(emit);
        });
        return result;
    }
    postMessage(message = {}) {
        return new Promise((resolve)=>{
            if (this.option.useWorker && this.worker && this.worker.postMessage) {
                message.id = Date.now();
                this.worker.postMessage(message);
                this.worker.onmessage = (event)=>{
                    const { data  } = event;
                    if (data.id === message.id) resolve(data);
                };
            } else {
                const top = _getDanmuTopDefault.default(message);
                resolve({
                    top
                });
            }
        });
    }
    async load() {
        try {
            let danmus = [];
            if (typeof this.option.danmuku === 'function') danmus = await this.option.danmuku();
            else if (typeof this.option.danmuku.then === 'function') danmus = await this.option.danmuku;
            else if (typeof this.option.danmuku === 'string') danmus = await _bilibili.bilibiliDanmuParseFromUrl(this.option.danmuku);
            else danmus = this.option.danmuku;
            this.utils.errorHandle(Array.isArray(danmus), 'Danmuku need return an array as result');
            this.art.emit('artplayerPluginDanmuku:loaded', danmus);
            this.queue = [];
            this.$danmuku.innerText = '';
            danmus.forEach((danmu)=>this.emit(danmu)
            );
        } catch (error) {
            this.art.emit('artplayerPluginDanmuku:error', error);
            throw error;
        }
        return this;
    }
    config(option) {
        const { clamp  } = this.utils;
        this.option = Object.assign({}, Danmuku.option, this.option, option);
        this.validator(this.option, Danmuku.scheme);
        if (option.fontSize) this.reset();
        this.option.speed = clamp(this.option.speed, 1, 10);
        this.option.opacity = clamp(this.option.opacity, 0, 1);
        this.option.fontSize = clamp(this.option.fontSize, 12, 100);
        this.art.emit('artplayerPluginDanmuku:config', this.option);
        return this;
    }
    makeWait(danmu) {
        danmu.$state = 'wait';
        if (danmu.$ref) {
            danmu.$ref.style.visibility = 'hidden';
            danmu.$ref.style.marginLeft = '0px';
            danmu.$ref.style.transform = 'translateX(0px)';
            danmu.$ref.style.transition = 'transform 0s linear 0s';
            this.$refs.push(danmu.$ref);
            danmu.$ref = null;
        }
    }
    continue() {
        const { clientWidth  } = this.$player;
        this.filter('stop', (danmu)=>{
            danmu.$state = 'emit';
            danmu.$lastStartTime = Date.now();
            switch(danmu.mode){
                case 0:
                    {
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
        const { clientWidth  } = this.$player;
        this.filter('emit', (danmu)=>{
            danmu.$state = 'stop';
            switch(danmu.mode){
                case 0:
                    {
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
    reset() {
        this.queue.forEach((danmu)=>this.makeWait(danmu)
        );
        return this;
    }
    update() {
        this.timer = window.requestAnimationFrame(async ()=>{
            if (this.art.playing && !this.isHide) {
                this.filter('emit', (danmu)=>{
                    const emitTime = (Date.now() - danmu.$lastStartTime) / 1000;
                    danmu.$restTime -= emitTime;
                    danmu.$lastStartTime = Date.now();
                    if (danmu.$restTime <= 0) this.makeWait(danmu);
                });
                const readys = this.getReady();
                const { clientWidth , clientHeight  } = this.$player;
                for(let index = 0; index < readys.length; index++){
                    const danmu = readys[index];
                    danmu.$ref = this.getRef();
                    danmu.$ref.innerText = danmu.text;
                    this.$danmuku.appendChild(danmu.$ref);
                    danmu.$ref.style.left = `${clientWidth}px`;
                    danmu.$ref.style.opacity = this.option.opacity;
                    danmu.$ref.style.fontSize = `${this.option.fontSize}px`;
                    danmu.$ref.style.color = danmu.color || '#fff';
                    danmu.$ref.style.border = danmu.border ? `1px solid ${danmu.color || '#fff'}` : 'none';
                    danmu.$ref.style.marginLeft = '0px';
                    danmu.$lastStartTime = Date.now();
                    danmu.$restTime = this.option.synchronousPlayback && this.art.playbackRate ? this.option.speed / Number(this.art.playbackRate) : this.option.speed;
                    const target = {
                        mode: danmu.mode,
                        height: danmu.$ref.clientHeight,
                        speed: (clientWidth + danmu.$ref.clientWidth) / danmu.$restTime
                    };
                    const { top  } = await this.postMessage({
                        target,
                        emits: this.getEmits(),
                        antiOverlap: this.option.antiOverlap,
                        clientWidth: clientWidth,
                        clientHeight: clientHeight,
                        marginBottom: this.marginBottom,
                        marginTop: this.marginTop
                    });
                    if (danmu.$ref) {
                        if (!this.isStop && top !== undefined) {
                            danmu.$state = 'emit';
                            danmu.$ref.style.visibility = 'visible';
                            switch(danmu.mode){
                                case 0:
                                    {
                                        danmu.$ref.style.top = `${top}px`;
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
                            this.$refs.push(danmu.$ref);
                            danmu.$ref = null;
                        }
                    }
                }
            }
            if (!this.isStop) this.update();
        });
        return this;
    }
    stop() {
        this.isStop = true;
        this.suspend();
        window.cancelAnimationFrame(this.timer);
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
        this.start();
        this.$danmuku.style.display = 'block';
        this.art.emit('artplayerPluginDanmuku:show');
        return this;
    }
    hide() {
        this.isHide = true;
        this.stop();
        this.queue.forEach((item)=>this.makeWait(item)
        );
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
            border: 'boolean|undefined'
        });
        if (!danmu.text.trim()) return this;
        if (!this.option.filter(danmu)) return this;
        if (danmu.time) danmu.time = this.utils.clamp(danmu.time, 0, Infinity);
        else danmu.time = this.art.currentTime + 0.5;
        this.queue.push({
            mode: 0,
            ...danmu,
            $state: 'wait',
            $ref: null,
            $restTime: 0,
            $lastStartTime: 0
        });
        return this;
    }
    destroy() {
        this.stop();
        if (this.worker && this.worker.terminate) this.worker.terminate();
        this.art.off('video:play', this.start);
        this.art.off('video:playing', this.start);
        this.art.off('video:pause', this.stop);
        this.art.off('video:waiting', this.stop);
        this.art.off('fullscreen', this.reset);
        this.art.off('fullscreenWeb', this.reset);
        this.art.off('destroy', this.destroy);
        this.art.emit('artplayerPluginDanmuku:destroy');
    }
}
exports.default = Danmuku;

},{"./bilibili":"6a8GK","./getDanmuTop":"eLxSm","27c3930ee158179a":"7RMxU","@parcel/transformer-js/src/esmodule-helpers.js":"8MjWm"}],"6a8GK":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getMode", ()=>getMode
);
parcelHelpers.export(exports, "bilibiliDanmuParseFromXml", ()=>bilibiliDanmuParseFromXml
);
parcelHelpers.export(exports, "bilibiliDanmuParseFromUrl", ()=>bilibiliDanmuParseFromUrl
);
function getMode(key) {
    switch(key){
        case 1:
        case 2:
        case 3:
            return 0;
        case 4:
        case 5:
            return 1;
        default:
            return 0;
    }
}
function bilibiliDanmuParseFromXml(xmlString) {
    if (typeof xmlString !== 'string') return [];
    const srtList = xmlString.match(/<d([\S ]*?>[\S ]*?)<\/d>/gi);
    return srtList && srtList.length ? srtList.map((item)=>{
        const [, attrStr, text] = item.match(/<d p="(.+)">(.+)<\/d>/);
        const attr = attrStr.split(',');
        return attr.length === 8 && text.trim() ? {
            text,
            time: Number(attr[0]),
            mode: getMode(Number(attr[1])),
            fontSize: Number(attr[2]),
            color: `#${Number(attr[3]).toString(16)}`,
            timestamp: Number(attr[4]),
            pool: Number(attr[5]),
            userID: attr[6],
            rowID: Number(attr[7])
        } : null;
    }) : [];
}
function bilibiliDanmuParseFromUrl(url) {
    return fetch(url).then((res)=>res.text()
    ).then((xmlString)=>bilibiliDanmuParseFromXml(xmlString)
    );
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"8MjWm"}],"8MjWm":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"eLxSm":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function getDanmuTop({ target , emits , clientWidth , clientHeight , marginBottom , marginTop , antiOverlap ,  }) {
    const danmus = emits.filter((item)=>item.mode === target.mode && item.top <= clientHeight - marginBottom
    ).sort((prev, next)=>prev.top - next.top
    );
    if (danmus.length === 0) return marginTop;
    danmus.unshift({
        top: 0,
        left: 0,
        right: 0,
        height: marginTop,
        width: clientWidth,
        speed: 0,
        distance: clientWidth
    });
    danmus.push({
        top: clientHeight - marginBottom,
        left: 0,
        right: 0,
        height: marginBottom,
        width: clientWidth,
        speed: 0,
        distance: clientWidth
    });
    for(let index = 1; index < danmus.length; index += 1){
        const item = danmus[index];
        const prev = danmus[index - 1];
        const prevBottom = prev.top + prev.height;
        const diff = item.top - prevBottom;
        if (diff >= target.height) return prevBottom;
    }
    const topMap = [];
    for(let index1 = 1; index1 < danmus.length - 1; index1 += 1){
        const item = danmus[index1];
        if (topMap.length) {
            const last = topMap[topMap.length - 1];
            if (last[0].top === item.top) last.push(item);
            else topMap.push([
                item
            ]);
        } else topMap.push([
            item
        ]);
    }
    if (antiOverlap) switch(target.mode){
        case 0:
            {
                const result = topMap.find((list)=>{
                    return list.every((danmu)=>{
                        if (clientWidth < danmu.distance) return false;
                        if (target.speed < danmu.speed) return true;
                        const overlapTime = danmu.right / (target.speed - danmu.speed);
                        if (overlapTime > danmu.time) return true;
                        return false;
                    });
                });
                return result && result[0] ? result[0].top : undefined;
            }
        case 1:
            return undefined;
        default:
            break;
    }
    else {
        switch(target.mode){
            case 0:
                topMap.sort((prev, next)=>{
                    const nextMinRight = Math.min(...next.map((item)=>item.right
                    ));
                    const prevMinRight = Math.min(...prev.map((item)=>item.right
                    ));
                    return nextMinRight * next.length - prevMinRight * prev.length;
                });
                break;
            case 1:
                topMap.sort((prev, next)=>{
                    const nextMaxWidth = Math.max(...next.map((item)=>item.width
                    ));
                    const prevMaxWidth = Math.max(...prev.map((item)=>item.width
                    ));
                    return prevMaxWidth * prev.length - nextMaxWidth * next.length;
                });
                break;
            default:
                break;
        }
        return topMap[0][0].top;
    }
}
exports.default = getDanmuTop;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"8MjWm"}],"7RMxU":[function(require,module,exports) {
module.exports = "data:application/javascript,function%20getDanmuTop%28%7B%20target%20%2C%20emits%20%2C%20clientWidth%20%2C%20clientHeight%20%2C%20marginBottom%20%2C%20marginTop%20%2C%20antiOverlap%20%20%7D%29%20%7B%0A%20%20%20%20const%20danmus%20%3D%20emits.filter%28%28item%29%3D%3Eitem.mode%20%3D%3D%3D%20target.mode%20%26%26%20item.top%20%3C%3D%20clientHeight%20-%20marginBottom%0A%20%20%20%20%29.sort%28%28prev%2C%20next%29%3D%3Eprev.top%20-%20next.top%0A%20%20%20%20%29%3B%0A%20%20%20%20if%20%28danmus.length%20%3D%3D%3D%200%29%20return%20marginTop%3B%0A%20%20%20%20danmus.unshift%28%7B%0A%20%20%20%20%20%20%20%20top%3A%200%2C%0A%20%20%20%20%20%20%20%20left%3A%200%2C%0A%20%20%20%20%20%20%20%20right%3A%200%2C%0A%20%20%20%20%20%20%20%20height%3A%20marginTop%2C%0A%20%20%20%20%20%20%20%20width%3A%20clientWidth%2C%0A%20%20%20%20%20%20%20%20speed%3A%200%2C%0A%20%20%20%20%20%20%20%20distance%3A%20clientWidth%0A%20%20%20%20%7D%29%3B%0A%20%20%20%20danmus.push%28%7B%0A%20%20%20%20%20%20%20%20top%3A%20clientHeight%20-%20marginBottom%2C%0A%20%20%20%20%20%20%20%20left%3A%200%2C%0A%20%20%20%20%20%20%20%20right%3A%200%2C%0A%20%20%20%20%20%20%20%20height%3A%20marginBottom%2C%0A%20%20%20%20%20%20%20%20width%3A%20clientWidth%2C%0A%20%20%20%20%20%20%20%20speed%3A%200%2C%0A%20%20%20%20%20%20%20%20distance%3A%20clientWidth%0A%20%20%20%20%7D%29%3B%0A%20%20%20%20for%28let%20index%20%3D%201%3B%20index%20%3C%20danmus.length%3B%20index%20%2B%3D%201%29%7B%0A%20%20%20%20%20%20%20%20const%20item%20%3D%20danmus%5Bindex%5D%3B%0A%20%20%20%20%20%20%20%20const%20prev%20%3D%20danmus%5Bindex%20-%201%5D%3B%0A%20%20%20%20%20%20%20%20const%20prevBottom%20%3D%20prev.top%20%2B%20prev.height%3B%0A%20%20%20%20%20%20%20%20const%20diff%20%3D%20item.top%20-%20prevBottom%3B%0A%20%20%20%20%20%20%20%20if%20%28diff%20%3E%3D%20target.height%29%20return%20prevBottom%3B%0A%20%20%20%20%7D%0A%20%20%20%20const%20topMap%20%3D%20%5B%5D%3B%0A%20%20%20%20for%28let%20index1%20%3D%201%3B%20index1%20%3C%20danmus.length%20-%201%3B%20index1%20%2B%3D%201%29%7B%0A%20%20%20%20%20%20%20%20const%20item%20%3D%20danmus%5Bindex1%5D%3B%0A%20%20%20%20%20%20%20%20if%20%28topMap.length%29%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20const%20last%20%3D%20topMap%5BtopMap.length%20-%201%5D%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20if%20%28last%5B0%5D.top%20%3D%3D%3D%20item.top%29%20last.push%28item%29%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20else%20topMap.push%28%5B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20item%0A%20%20%20%20%20%20%20%20%20%20%20%20%5D%29%3B%0A%20%20%20%20%20%20%20%20%7D%20else%20topMap.push%28%5B%0A%20%20%20%20%20%20%20%20%20%20%20%20item%0A%20%20%20%20%20%20%20%20%5D%29%3B%0A%20%20%20%20%7D%0A%20%20%20%20if%20%28antiOverlap%29%20switch%28target.mode%29%7B%0A%20%20%20%20%20%20%20%20case%200%3A%0A%20%20%20%20%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20const%20result%20%3D%20topMap.find%28%28list%29%3D%3E%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20return%20list.every%28%28danmu%29%3D%3E%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20%28clientWidth%20%3C%20danmu.distance%29%20return%20false%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20%28target.speed%20%3C%20danmu.speed%29%20return%20true%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20const%20overlapTime%20%3D%20danmu.right%20%2F%20%28target.speed%20-%20danmu.speed%29%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20%28overlapTime%20%3E%20danmu.time%29%20return%20true%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20return%20false%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%29%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%29%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20return%20result%20%26%26%20result%5B0%5D%20%3F%20result%5B0%5D.top%20%3A%20undefined%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20case%201%3A%0A%20%20%20%20%20%20%20%20%20%20%20%20return%20undefined%3B%0A%20%20%20%20%20%20%20%20default%3A%0A%20%20%20%20%20%20%20%20%20%20%20%20break%3B%0A%20%20%20%20%7D%0A%20%20%20%20else%20%7B%0A%20%20%20%20%20%20%20%20switch%28target.mode%29%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20case%200%3A%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20topMap.sort%28%28prev%2C%20next%29%3D%3E%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20const%20nextMinRight%20%3D%20Math.min%28...next.map%28%28item%29%3D%3Eitem.right%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%29%29%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20const%20prevMinRight%20%3D%20Math.min%28...prev.map%28%28item%29%3D%3Eitem.right%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%29%29%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20return%20nextMinRight%20%2a%20next.length%20-%20prevMinRight%20%2a%20prev.length%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%29%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20break%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20case%201%3A%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20topMap.sort%28%28prev%2C%20next%29%3D%3E%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20const%20nextMaxWidth%20%3D%20Math.max%28...next.map%28%28item%29%3D%3Eitem.width%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%29%29%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20const%20prevMaxWidth%20%3D%20Math.max%28...prev.map%28%28item%29%3D%3Eitem.width%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%29%29%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20return%20prevMaxWidth%20%2a%20prev.length%20-%20nextMaxWidth%20%2a%20next.length%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%29%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20break%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20default%3A%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20break%3B%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20return%20topMap%5B0%5D%5B0%5D.top%3B%0A%20%20%20%20%7D%0A%7D%0Aonmessage%20%3D%20%28event%29%3D%3E%7B%0A%20%20%20%20const%20%7B%20data%20%20%7D%20%3D%20event%3B%0A%20%20%20%20const%20top%20%3D%20getDanmuTop%28data%29%3B%0A%20%20%20%20self.postMessage%28%7B%0A%20%20%20%20%20%20%20%20top%2C%0A%20%20%20%20%20%20%20%20id%3A%20data.id%0A%20%20%20%20%7D%29%3B%0A%7D%3B%0A%0A";

},{}],"8npWO":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _danmuOnSvg = require("bundle-text:./img/danmu-on.svg");
var _danmuOnSvgDefault = parcelHelpers.interopDefault(_danmuOnSvg);
var _danmuOffSvg = require("bundle-text:./img/danmu-off.svg");
var _danmuOffSvgDefault = parcelHelpers.interopDefault(_danmuOffSvg);
function setting(art, danmuku) {
    const { addClass , append , setStyle  } = art.constructor.utils;
    function getIcon(svg, key) {
        const icon = document.createElement('i');
        append(icon, svg);
        addClass(icon, 'art-icon');
        addClass(icon, `art-icon-${key}`);
        setStyle(icon, 'width', '22px');
        setStyle(icon, 'height', '22px');
        return icon;
    }
    const $danmuOn = getIcon(_danmuOnSvgDefault.default, 'danmu-on');
    const $danmuOff = getIcon(_danmuOffSvgDefault.default, 'danmu-off');
    art.on('ready', ()=>{
        art.controls.add({
            position: 'right',
            name: 'danmuku',
            click: function() {
                if (danmuku.isHide) {
                    danmuku.show();
                    art.notice.show = '弹幕显示';
                    setStyle($danmuOn, 'display', null);
                    setStyle($danmuOff, 'display', 'none');
                } else {
                    danmuku.hide();
                    art.notice.show = '弹幕隐藏';
                    setStyle($danmuOn, 'display', 'none');
                    setStyle($danmuOff, 'display', null);
                }
            },
            mounted ($ref) {
                append($ref, $danmuOn);
                append($ref, $danmuOff);
                setStyle($danmuOff, 'display', 'none');
            }
        });
        art.setting.add({
            name: 'danmuku',
            html: '弹幕设置',
            selector: [
                {
                    html: '弹幕防重叠',
                    icon: '',
                    switch: danmuku.option.antiOverlap,
                    onSwitch (item) {
                        danmuku.config({
                            antiOverlap: !item.switch
                        });
                        return !item.switch;
                    }
                },
                {
                    html: '同步播放速度',
                    icon: '',
                    switch: danmuku.option.synchronousPlayback,
                    onSwitch (item) {
                        danmuku.config({
                            synchronousPlayback: !item.switch
                        });
                        return !item.switch;
                    }
                }, 
            ]
        });
    });
}
exports.default = setting;

},{"bundle-text:./img/danmu-on.svg":"94Qzj","bundle-text:./img/danmu-off.svg":"jZVzM","@parcel/transformer-js/src/esmodule-helpers.js":"8MjWm"}],"94Qzj":[function(require,module,exports) {
module.exports = "<?xml version=\"1.0\" standalone=\"no\"?>\n<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n<svg class=\"icon\" viewBox=\"0 0 1152 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\">\n<path fill=\"#fff\" d=\"M311.466667 661.333333c0 4.266667-4.266667 8.533333-8.533334 12.8 0 4.266667 0 4.266667-4.266666 8.533334h-12.8c-4.266667 0-8.533333-4.266667-17.066667-8.533334-8.533333-8.533333-17.066667-8.533333-25.6-8.533333-8.533333 0-12.8 4.266667-17.066667 12.8-4.266667 12.8-8.533333 21.333333-4.266666 29.866667 4.266667 8.533333 12.8 17.066667 25.6 21.333333 17.066667 8.533333 34.133333 17.066667 46.933333 17.066667 12.8 0 21.333333-4.266667 34.133333-8.533334 8.533333-4.266667 17.066667-17.066667 25.6-29.866666 8.533333-12.8 12.8-34.133333 17.066667-55.466667 4.266667-21.333333 4.266667-51.2 4.266667-85.333333 0-12.8 0-21.333333-4.266667-29.866667 0-8.533333-4.266667-12.8-8.533333-17.066667-4.266667-4.266667-8.533333-8.533333-12.8-8.533333-4.266667 0-12.8-4.266667-21.333334-4.266667H273.066667s-4.266667-4.266667 0-8.533333l4.266666-38.4c0-4.266667 0-8.533333 4.266667-8.533333h46.933333c17.066667 0 25.6-4.266667 34.133334-12.8 8.533333-8.533333 12.8-21.333333 12.8-42.666667V324.266667c0-17.066667-4.266667-34.133333-8.533334-42.666667-12.8-12.8-25.6-17.066667-42.666666-17.066667H243.2c-8.533333 0-17.066667 0-21.333333 4.266667-4.266667 8.533333-4.266667 12.8-4.266667 25.6 0 8.533333 0 17.066667 4.266667 21.333333 4.266667 4.266667 12.8 8.533333 21.333333 8.533334h64c4.266667 0 8.533333 0 8.533333 4.266666v34.133334c0 8.533333 0 12.8-4.266666 12.8 0 0-4.266667 4.266667-8.533334 4.266666h-34.133333c-8.533333 0-12.8 0-21.333333 4.266667-4.266667 0-8.533333 4.266667-8.533334 4.266667-4.266667 4.266667-8.533333 12.8-8.533333 17.066666 0 8.533333-4.266667 17.066667-4.266667 25.6l-8.533333 72.533334v29.866666c0 8.533333 4.266667 12.8 8.533333 17.066667 4.266667 4.266667 8.533333 4.266667 17.066667 8.533333h68.266667c4.266667 0 8.533333 0 8.533333 4.266667s4.266667 8.533333 4.266667 17.066667c0 21.333333 0 42.666667-4.266667 55.466666 0 8.533333-4.266667 21.333333-8.533333 25.6zM896 486.4c-93.866667 0-174.933333 51.2-217.6 123.733333h-106.666667v-34.133333H640c21.333333 0 34.133333-4.266667 42.666667-12.8 8.533333-8.533333 12.8-21.333333 12.8-42.666667V358.4c0-21.333333-4.266667-34.133333-12.8-42.666667-8.533333-8.533333-21.333333-12.8-42.666667-12.8 0-4.266667 4.266667-4.266667 4.266667-8.533333-4.266667 0-4.266667-4.266667-4.266667-4.266667 4.266667-12.8 8.533333-21.333333 4.266667-25.6 0-8.533333-4.266667-12.8-12.8-21.333333-8.533333-4.266667-17.066667-4.266667-21.333334-4.266667-8.533333 4.266667-12.8 8.533333-21.333333 21.333334-4.266667 8.533333-8.533333 12.8-12.8 21.333333-4.266667 8.533333-8.533333 12.8-12.8 21.333333H512c-4.266667-8.533333-8.533333-17.066667-8.533333-21.333333-4.266667-8.533333-8.533333-12.8-12.8-21.333333-4.266667-12.8-12.8-17.066667-21.333334-17.066667s-17.066667 0-25.6 8.533333c-8.533333 8.533333-12.8 12.8-12.8 21.333334s0 17.066667 8.533334 25.6l4.266666 4.266666 4.266667 4.266667c-17.066667 0-29.866667 4.266667-38.4 12.8-8.533333 4.266667-12.8 21.333333-12.8 38.4v157.866667c0 21.333333 4.266667 34.133333 12.8 42.666666 8.533333 8.533333 21.333333 12.8 42.666667 12.8H512v34.133334H413.866667c-12.8 0-21.333333 0-25.6 4.266666-4.266667 4.266667-8.533333 8.533333-8.533334 21.333334v17.066666c0 4.266667 4.266667 8.533333 4.266667 8.533334 4.266667 0 4.266667 4.266667 8.533333 4.266666H512v55.466667c0 12.8 4.266667 21.333333 8.533333 25.6 4.266667 4.266667 12.8 8.533333 21.333334 8.533333 12.8 0 21.333333-4.266667 25.6-8.533333 4.266667-4.266667 4.266667-12.8 4.266666-25.6v-55.466667h81.066667c-8.533333 25.6-12.8 51.2-12.8 76.8 0 140.8 115.2 256 256 256s256-115.2 256-256-115.2-251.733333-256-251.733333z m-328.533333-128h55.466666c4.266667 0 4.266667 0 4.266667 4.266667v46.933333h-59.733333V358.4z m0 102.4h59.733333V512h-55.466667v-51.2zM512 516.266667h-55.466667V465.066667H512v51.2z m0-102.4h-59.733333V366.933333v-4.266666H512v51.2z m384 499.2c-93.866667 0-170.666667-76.8-170.666667-170.666667s76.8-170.666667 170.666667-170.666667 170.666667 76.8 170.666667 170.666667-76.8 170.666667-170.666667 170.666667z\"></path>\n<path fill=\"#fff\" d=\"M951.466667 669.866667l-72.533334 72.533333-29.866666-25.6c-17.066667-17.066667-42.666667-12.8-59.733334 4.266667-17.066667 17.066667-12.8 42.666667 4.266667 59.733333l59.733333 51.2c8.533333 8.533333 17.066667 8.533333 29.866667 8.533333 12.8 0 21.333333-4.266667 29.866667-12.8l102.4-102.4c17.066667-17.066667 17.066667-42.666667 0-59.733333-21.333333-12.8-46.933333-12.8-64 4.266667zM580.266667 878.933333H213.333333c-72.533333 0-128-55.466667-128-119.466666V230.4c0-64 55.466667-119.466667 128-119.466667h512c72.533333 0 128 55.466667 128 119.466667v140.8c0 25.6 17.066667 42.666667 42.666667 42.666667s42.666667-17.066667 42.666667-42.666667V230.4c0-115.2-93.866667-204.8-213.333334-204.8H213.333333C93.866667 25.6 0 119.466667 0 230.4v529.066667c0 115.2 93.866667 204.8 213.333333 204.8h366.933334c25.6 0 42.666667-17.066667 42.666666-42.666667s-21.333333-42.666667-42.666666-42.666667z\"></path>\n</svg>";

},{}],"jZVzM":[function(require,module,exports) {
module.exports = "<?xml version=\"1.0\" standalone=\"no\"?>\n<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n<svg class=\"icon\" viewBox=\"0 0 1152 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\">\n<path fill=\"#fff\" d=\"M311.296 661.504c0 4.096-4.096 8.704-8.704 12.8 0 4.096 0 4.096-4.096 8.704h-12.8c-4.096 0-8.704-4.096-16.896-8.704-8.704-8.704-16.896-8.704-25.6-8.704s-12.8 4.096-16.896 12.8c-4.096 12.8-8.704 21.504-4.096 29.696 4.096 8.704 12.8 16.896 25.6 21.504 16.896 8.704 34.304 16.896 47.104 16.896 12.8 0 21.504-4.096 34.304-8.704 8.704-4.096 16.896-16.896 25.6-29.696 8.704-12.8 12.8-34.304 16.896-55.296 4.096-21.504 4.096-51.2 4.096-85.504 0-12.8 0-21.504-4.096-29.696 0-8.704-4.096-12.8-8.704-16.896-4.096-4.096-8.704-8.704-12.8-8.704s-12.8-4.096-21.504-4.096H272.896s-4.096-4.096 0-8.704l4.096-38.4c0-4.096 0-8.704 4.096-8.704h47.104c16.896 0 25.6-4.096 34.304-12.8 8.704-8.704 12.8-21.504 12.8-42.496V324.096c0-16.896-4.096-34.304-8.704-42.496-12.8-12.8-25.6-16.896-42.496-16.896H243.2c-8.704 0-16.896 0-21.504 4.096-4.096 8.704-4.096 12.8-4.096 25.6 0 8.704 0 16.896 4.096 21.504 4.096 4.096 12.8 8.704 21.504 8.704H307.2c4.096 0 8.704 0 8.704 4.096v34.304c0 8.704 0 12.8-4.096 12.8 0 0-4.096 4.096-8.704 4.096h-34.304c-8.704 0-12.8 0-21.504 4.096-4.096 0-8.704 4.096-8.704 4.096-4.096 4.096-8.704 12.8-8.704 16.896 0 8.704-4.096 16.896-4.096 25.6l-8.704 72.704v29.696c0 8.704 4.096 12.8 8.704 16.896s8.704 4.096 16.896 8.704h68.096c4.096 0 8.704 0 8.704 4.096s4.096 8.704 4.096 16.896c0 21.504 0 42.496-4.096 55.296 0.512 9.216-3.584 22.016-8.192 26.624zM896 486.4c-93.696 0-175.104 51.2-217.6 123.904h-106.496v-34.304H640c21.504 0 34.304-4.096 42.496-12.8 8.704-8.704 12.8-21.504 12.8-42.496V358.4c0-21.504-4.096-34.304-12.8-42.496-8.704-8.704-21.504-12.8-42.496-12.8 0-4.096 4.096-4.096 4.096-8.704-4.096 0-4.096-4.096-4.096-4.096 4.096-12.8 8.704-21.504 4.096-25.6 0-8.704-4.096-12.8-12.8-21.504-8.704-4.096-16.896-4.096-21.504-4.096-8.704 4.096-12.8 8.704-21.504 21.504-4.096 8.704-8.704 12.8-12.8 21.504-4.096 8.704-8.704 12.8-12.8 21.504h-51.2c-4.096-8.704-8.704-16.896-8.704-21.504-4.096-8.704-8.704-12.8-12.8-21.504-4.096-12.8-12.8-16.896-21.504-16.896s-16.896 0-25.6 8.704C434.176 261.12 430.08 265.216 430.08 273.92c0 8.704 0 16.896 8.704 25.6l4.096 4.096 4.096 4.096c-16.896 0-29.696 4.096-38.4 12.8-8.704 4.096-12.8 21.504-12.8 38.4v157.696c0 21.504 4.096 34.304 12.8 42.496 8.704 8.704 21.504 12.8 42.496 12.8H512v34.304H413.696c-12.8 0-21.504 0-25.6 4.096-4.096 4.096-8.704 8.704-8.704 21.504v16.896c0 4.096 4.096 8.704 4.096 8.704 4.096 0 4.096 4.096 8.704 4.096H512V716.8c0 12.8 4.096 21.504 8.704 25.6 4.096 4.096 12.8 8.704 21.504 8.704 12.8 0 21.504-4.096 25.6-8.704 4.096-4.096 4.096-12.8 4.096-25.6v-55.296h80.896c-8.704 25.6-12.8 51.2-12.8 76.8 0 140.8 115.2 256 256 256s256-115.2 256-256S1036.8 486.4 896 486.4z m-328.704-128h55.296c4.096 0 4.096 0 4.096 4.096V409.6h-59.904V358.4z m0 102.4h59.904v51.2h-55.296V460.8h-4.608zM512 516.096H456.704v-51.2H512v51.2z m0-102.4H452.096v-51.2H512v51.2z m384 499.2c-93.696 0-170.496-76.8-170.496-170.496s76.8-170.496 170.496-170.496 170.496 76.8 170.496 170.496-76.8 170.496-170.496 170.496z\"></path>\n<path fill=\"#fff\" d=\"M580.096 879.104H213.504c-72.704 0-128-55.296-128-119.296V230.4c0-64 55.296-119.296 128-119.296h512c72.704 0 128 55.296 128 119.296v140.8c0 25.6 16.896 42.496 42.496 42.496s42.496-16.896 42.496-42.496V230.4c0-115.2-93.696-204.8-213.504-204.8h-512C93.696 25.6 0 119.296 0 230.4v528.896c0 115.2 93.696 204.8 213.504 204.8h367.104c25.6 0 42.496-16.896 42.496-42.496 0-25.6-21.504-42.496-43.008-42.496z m171.52 10.752c-15.36-15.36-15.36-40.96 0-56.32l237.568-237.568c15.36-15.36 40.96-15.36 56.32 0s15.36 40.96 0 56.32l-237.568 237.568c-15.36 15.36-40.448 15.36-56.32 0z\"></path>\n</svg>";

},{}]},["gEVO5"], "gEVO5", "parcelRequire93cf")

//# sourceMappingURL=index.js.map
