(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["second-second-module"],{

/***/ "./node_modules/crypto-js/core.js":
/*!****************************************!*\
  !*** ./node_modules/crypto-js/core.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory();
	}
	else {}
}(this, function () {

	/**
	 * CryptoJS core components.
	 */
	var CryptoJS = CryptoJS || (function (Math, undefined) {
	    /*
	     * Local polyfil of Object.create
	     */
	    var create = Object.create || (function () {
	        function F() {};

	        return function (obj) {
	            var subtype;

	            F.prototype = obj;

	            subtype = new F();

	            F.prototype = null;

	            return subtype;
	        };
	    }())

	    /**
	     * CryptoJS namespace.
	     */
	    var C = {};

	    /**
	     * Library namespace.
	     */
	    var C_lib = C.lib = {};

	    /**
	     * Base object for prototypal inheritance.
	     */
	    var Base = C_lib.Base = (function () {


	        return {
	            /**
	             * Creates a new object that inherits from this object.
	             *
	             * @param {Object} overrides Properties to copy into the new object.
	             *
	             * @return {Object} The new object.
	             *
	             * @static
	             *
	             * @example
	             *
	             *     var MyType = CryptoJS.lib.Base.extend({
	             *         field: 'value',
	             *
	             *         method: function () {
	             *         }
	             *     });
	             */
	            extend: function (overrides) {
	                // Spawn
	                var subtype = create(this);

	                // Augment
	                if (overrides) {
	                    subtype.mixIn(overrides);
	                }

	                // Create default initializer
	                if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
	                    subtype.init = function () {
	                        subtype.$super.init.apply(this, arguments);
	                    };
	                }

	                // Initializer's prototype is the subtype object
	                subtype.init.prototype = subtype;

	                // Reference supertype
	                subtype.$super = this;

	                return subtype;
	            },

	            /**
	             * Extends this object and runs the init method.
	             * Arguments to create() will be passed to init().
	             *
	             * @return {Object} The new object.
	             *
	             * @static
	             *
	             * @example
	             *
	             *     var instance = MyType.create();
	             */
	            create: function () {
	                var instance = this.extend();
	                instance.init.apply(instance, arguments);

	                return instance;
	            },

	            /**
	             * Initializes a newly created object.
	             * Override this method to add some logic when your objects are created.
	             *
	             * @example
	             *
	             *     var MyType = CryptoJS.lib.Base.extend({
	             *         init: function () {
	             *             // ...
	             *         }
	             *     });
	             */
	            init: function () {
	            },

	            /**
	             * Copies properties into this object.
	             *
	             * @param {Object} properties The properties to mix in.
	             *
	             * @example
	             *
	             *     MyType.mixIn({
	             *         field: 'value'
	             *     });
	             */
	            mixIn: function (properties) {
	                for (var propertyName in properties) {
	                    if (properties.hasOwnProperty(propertyName)) {
	                        this[propertyName] = properties[propertyName];
	                    }
	                }

	                // IE won't copy toString using the loop above
	                if (properties.hasOwnProperty('toString')) {
	                    this.toString = properties.toString;
	                }
	            },

	            /**
	             * Creates a copy of this object.
	             *
	             * @return {Object} The clone.
	             *
	             * @example
	             *
	             *     var clone = instance.clone();
	             */
	            clone: function () {
	                return this.init.prototype.extend(this);
	            }
	        };
	    }());

	    /**
	     * An array of 32-bit words.
	     *
	     * @property {Array} words The array of 32-bit words.
	     * @property {number} sigBytes The number of significant bytes in this word array.
	     */
	    var WordArray = C_lib.WordArray = Base.extend({
	        /**
	         * Initializes a newly created word array.
	         *
	         * @param {Array} words (Optional) An array of 32-bit words.
	         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.lib.WordArray.create();
	         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
	         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
	         */
	        init: function (words, sigBytes) {
	            words = this.words = words || [];

	            if (sigBytes != undefined) {
	                this.sigBytes = sigBytes;
	            } else {
	                this.sigBytes = words.length * 4;
	            }
	        },

	        /**
	         * Converts this word array to a string.
	         *
	         * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
	         *
	         * @return {string} The stringified word array.
	         *
	         * @example
	         *
	         *     var string = wordArray + '';
	         *     var string = wordArray.toString();
	         *     var string = wordArray.toString(CryptoJS.enc.Utf8);
	         */
	        toString: function (encoder) {
	            return (encoder || Hex).stringify(this);
	        },

	        /**
	         * Concatenates a word array to this word array.
	         *
	         * @param {WordArray} wordArray The word array to append.
	         *
	         * @return {WordArray} This word array.
	         *
	         * @example
	         *
	         *     wordArray1.concat(wordArray2);
	         */
	        concat: function (wordArray) {
	            // Shortcuts
	            var thisWords = this.words;
	            var thatWords = wordArray.words;
	            var thisSigBytes = this.sigBytes;
	            var thatSigBytes = wordArray.sigBytes;

	            // Clamp excess bits
	            this.clamp();

	            // Concat
	            if (thisSigBytes % 4) {
	                // Copy one byte at a time
	                for (var i = 0; i < thatSigBytes; i++) {
	                    var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                    thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
	                }
	            } else {
	                // Copy one word at a time
	                for (var i = 0; i < thatSigBytes; i += 4) {
	                    thisWords[(thisSigBytes + i) >>> 2] = thatWords[i >>> 2];
	                }
	            }
	            this.sigBytes += thatSigBytes;

	            // Chainable
	            return this;
	        },

	        /**
	         * Removes insignificant bits.
	         *
	         * @example
	         *
	         *     wordArray.clamp();
	         */
	        clamp: function () {
	            // Shortcuts
	            var words = this.words;
	            var sigBytes = this.sigBytes;

	            // Clamp
	            words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
	            words.length = Math.ceil(sigBytes / 4);
	        },

	        /**
	         * Creates a copy of this word array.
	         *
	         * @return {WordArray} The clone.
	         *
	         * @example
	         *
	         *     var clone = wordArray.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);
	            clone.words = this.words.slice(0);

	            return clone;
	        },

	        /**
	         * Creates a word array filled with random bytes.
	         *
	         * @param {number} nBytes The number of random bytes to generate.
	         *
	         * @return {WordArray} The random word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.lib.WordArray.random(16);
	         */
	        random: function (nBytes) {
	            var words = [];

	            var r = (function (m_w) {
	                var m_w = m_w;
	                var m_z = 0x3ade68b1;
	                var mask = 0xffffffff;

	                return function () {
	                    m_z = (0x9069 * (m_z & 0xFFFF) + (m_z >> 0x10)) & mask;
	                    m_w = (0x4650 * (m_w & 0xFFFF) + (m_w >> 0x10)) & mask;
	                    var result = ((m_z << 0x10) + m_w) & mask;
	                    result /= 0x100000000;
	                    result += 0.5;
	                    return result * (Math.random() > .5 ? 1 : -1);
	                }
	            });

	            for (var i = 0, rcache; i < nBytes; i += 4) {
	                var _r = r((rcache || Math.random()) * 0x100000000);

	                rcache = _r() * 0x3ade67b7;
	                words.push((_r() * 0x100000000) | 0);
	            }

	            return new WordArray.init(words, nBytes);
	        }
	    });

	    /**
	     * Encoder namespace.
	     */
	    var C_enc = C.enc = {};

	    /**
	     * Hex encoding strategy.
	     */
	    var Hex = C_enc.Hex = {
	        /**
	         * Converts a word array to a hex string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The hex string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var hexChars = [];
	            for (var i = 0; i < sigBytes; i++) {
	                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                hexChars.push((bite >>> 4).toString(16));
	                hexChars.push((bite & 0x0f).toString(16));
	            }

	            return hexChars.join('');
	        },

	        /**
	         * Converts a hex string to a word array.
	         *
	         * @param {string} hexStr The hex string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
	         */
	        parse: function (hexStr) {
	            // Shortcut
	            var hexStrLength = hexStr.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < hexStrLength; i += 2) {
	                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
	            }

	            return new WordArray.init(words, hexStrLength / 2);
	        }
	    };

	    /**
	     * Latin1 encoding strategy.
	     */
	    var Latin1 = C_enc.Latin1 = {
	        /**
	         * Converts a word array to a Latin1 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The Latin1 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var latin1Chars = [];
	            for (var i = 0; i < sigBytes; i++) {
	                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                latin1Chars.push(String.fromCharCode(bite));
	            }

	            return latin1Chars.join('');
	        },

	        /**
	         * Converts a Latin1 string to a word array.
	         *
	         * @param {string} latin1Str The Latin1 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
	         */
	        parse: function (latin1Str) {
	            // Shortcut
	            var latin1StrLength = latin1Str.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < latin1StrLength; i++) {
	                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
	            }

	            return new WordArray.init(words, latin1StrLength);
	        }
	    };

	    /**
	     * UTF-8 encoding strategy.
	     */
	    var Utf8 = C_enc.Utf8 = {
	        /**
	         * Converts a word array to a UTF-8 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The UTF-8 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            try {
	                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
	            } catch (e) {
	                throw new Error('Malformed UTF-8 data');
	            }
	        },

	        /**
	         * Converts a UTF-8 string to a word array.
	         *
	         * @param {string} utf8Str The UTF-8 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
	         */
	        parse: function (utf8Str) {
	            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
	        }
	    };

	    /**
	     * Abstract buffered block algorithm template.
	     *
	     * The property blockSize must be implemented in a concrete subtype.
	     *
	     * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
	     */
	    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
	        /**
	         * Resets this block algorithm's data buffer to its initial state.
	         *
	         * @example
	         *
	         *     bufferedBlockAlgorithm.reset();
	         */
	        reset: function () {
	            // Initial values
	            this._data = new WordArray.init();
	            this._nDataBytes = 0;
	        },

	        /**
	         * Adds new data to this block algorithm's buffer.
	         *
	         * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
	         *
	         * @example
	         *
	         *     bufferedBlockAlgorithm._append('data');
	         *     bufferedBlockAlgorithm._append(wordArray);
	         */
	        _append: function (data) {
	            // Convert string to WordArray, else assume WordArray already
	            if (typeof data == 'string') {
	                data = Utf8.parse(data);
	            }

	            // Append
	            this._data.concat(data);
	            this._nDataBytes += data.sigBytes;
	        },

	        /**
	         * Processes available data blocks.
	         *
	         * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
	         *
	         * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
	         *
	         * @return {WordArray} The processed data.
	         *
	         * @example
	         *
	         *     var processedData = bufferedBlockAlgorithm._process();
	         *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
	         */
	        _process: function (doFlush) {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;
	            var dataSigBytes = data.sigBytes;
	            var blockSize = this.blockSize;
	            var blockSizeBytes = blockSize * 4;

	            // Count blocks ready
	            var nBlocksReady = dataSigBytes / blockSizeBytes;
	            if (doFlush) {
	                // Round up to include partial blocks
	                nBlocksReady = Math.ceil(nBlocksReady);
	            } else {
	                // Round down to include only full blocks,
	                // less the number of blocks that must remain in the buffer
	                nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
	            }

	            // Count words ready
	            var nWordsReady = nBlocksReady * blockSize;

	            // Count bytes ready
	            var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

	            // Process blocks
	            if (nWordsReady) {
	                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
	                    // Perform concrete-algorithm logic
	                    this._doProcessBlock(dataWords, offset);
	                }

	                // Remove processed words
	                var processedWords = dataWords.splice(0, nWordsReady);
	                data.sigBytes -= nBytesReady;
	            }

	            // Return processed words
	            return new WordArray.init(processedWords, nBytesReady);
	        },

	        /**
	         * Creates a copy of this object.
	         *
	         * @return {Object} The clone.
	         *
	         * @example
	         *
	         *     var clone = bufferedBlockAlgorithm.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);
	            clone._data = this._data.clone();

	            return clone;
	        },

	        _minBufferSize: 0
	    });

	    /**
	     * Abstract hasher template.
	     *
	     * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
	     */
	    var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
	        /**
	         * Configuration options.
	         */
	        cfg: Base.extend(),

	        /**
	         * Initializes a newly created hasher.
	         *
	         * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
	         *
	         * @example
	         *
	         *     var hasher = CryptoJS.algo.SHA256.create();
	         */
	        init: function (cfg) {
	            // Apply config defaults
	            this.cfg = this.cfg.extend(cfg);

	            // Set initial values
	            this.reset();
	        },

	        /**
	         * Resets this hasher to its initial state.
	         *
	         * @example
	         *
	         *     hasher.reset();
	         */
	        reset: function () {
	            // Reset data buffer
	            BufferedBlockAlgorithm.reset.call(this);

	            // Perform concrete-hasher logic
	            this._doReset();
	        },

	        /**
	         * Updates this hasher with a message.
	         *
	         * @param {WordArray|string} messageUpdate The message to append.
	         *
	         * @return {Hasher} This hasher.
	         *
	         * @example
	         *
	         *     hasher.update('message');
	         *     hasher.update(wordArray);
	         */
	        update: function (messageUpdate) {
	            // Append
	            this._append(messageUpdate);

	            // Update the hash
	            this._process();

	            // Chainable
	            return this;
	        },

	        /**
	         * Finalizes the hash computation.
	         * Note that the finalize operation is effectively a destructive, read-once operation.
	         *
	         * @param {WordArray|string} messageUpdate (Optional) A final message update.
	         *
	         * @return {WordArray} The hash.
	         *
	         * @example
	         *
	         *     var hash = hasher.finalize();
	         *     var hash = hasher.finalize('message');
	         *     var hash = hasher.finalize(wordArray);
	         */
	        finalize: function (messageUpdate) {
	            // Final message update
	            if (messageUpdate) {
	                this._append(messageUpdate);
	            }

	            // Perform concrete-hasher logic
	            var hash = this._doFinalize();

	            return hash;
	        },

	        blockSize: 512/32,

	        /**
	         * Creates a shortcut function to a hasher's object interface.
	         *
	         * @param {Hasher} hasher The hasher to create a helper for.
	         *
	         * @return {Function} The shortcut function.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
	         */
	        _createHelper: function (hasher) {
	            return function (message, cfg) {
	                return new hasher.init(cfg).finalize(message);
	            };
	        },

	        /**
	         * Creates a shortcut function to the HMAC's object interface.
	         *
	         * @param {Hasher} hasher The hasher to use in this HMAC helper.
	         *
	         * @return {Function} The shortcut function.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
	         */
	        _createHmacHelper: function (hasher) {
	            return function (message, key) {
	                return new C_algo.HMAC.init(hasher, key).finalize(message);
	            };
	        }
	    });

	    /**
	     * Algorithm namespace.
	     */
	    var C_algo = C.algo = {};

	    return C;
	}(Math));


	return CryptoJS;

}));

/***/ }),

/***/ "./node_modules/crypto-js/enc-hex.js":
/*!*******************************************!*\
  !*** ./node_modules/crypto-js/enc-hex.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "./node_modules/crypto-js/core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	return CryptoJS.enc.Hex;

}));

/***/ }),

/***/ "./node_modules/crypto-js/sha256.js":
/*!******************************************!*\
  !*** ./node_modules/crypto-js/sha256.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "./node_modules/crypto-js/core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	(function (Math) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_algo = C.algo;

	    // Initialization and round constants tables
	    var H = [];
	    var K = [];

	    // Compute constants
	    (function () {
	        function isPrime(n) {
	            var sqrtN = Math.sqrt(n);
	            for (var factor = 2; factor <= sqrtN; factor++) {
	                if (!(n % factor)) {
	                    return false;
	                }
	            }

	            return true;
	        }

	        function getFractionalBits(n) {
	            return ((n - (n | 0)) * 0x100000000) | 0;
	        }

	        var n = 2;
	        var nPrime = 0;
	        while (nPrime < 64) {
	            if (isPrime(n)) {
	                if (nPrime < 8) {
	                    H[nPrime] = getFractionalBits(Math.pow(n, 1 / 2));
	                }
	                K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));

	                nPrime++;
	            }

	            n++;
	        }
	    }());

	    // Reusable object
	    var W = [];

	    /**
	     * SHA-256 hash algorithm.
	     */
	    var SHA256 = C_algo.SHA256 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new WordArray.init(H.slice(0));
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcut
	            var H = this._hash.words;

	            // Working variables
	            var a = H[0];
	            var b = H[1];
	            var c = H[2];
	            var d = H[3];
	            var e = H[4];
	            var f = H[5];
	            var g = H[6];
	            var h = H[7];

	            // Computation
	            for (var i = 0; i < 64; i++) {
	                if (i < 16) {
	                    W[i] = M[offset + i] | 0;
	                } else {
	                    var gamma0x = W[i - 15];
	                    var gamma0  = ((gamma0x << 25) | (gamma0x >>> 7))  ^
	                                  ((gamma0x << 14) | (gamma0x >>> 18)) ^
	                                   (gamma0x >>> 3);

	                    var gamma1x = W[i - 2];
	                    var gamma1  = ((gamma1x << 15) | (gamma1x >>> 17)) ^
	                                  ((gamma1x << 13) | (gamma1x >>> 19)) ^
	                                   (gamma1x >>> 10);

	                    W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
	                }

	                var ch  = (e & f) ^ (~e & g);
	                var maj = (a & b) ^ (a & c) ^ (b & c);

	                var sigma0 = ((a << 30) | (a >>> 2)) ^ ((a << 19) | (a >>> 13)) ^ ((a << 10) | (a >>> 22));
	                var sigma1 = ((e << 26) | (e >>> 6)) ^ ((e << 21) | (e >>> 11)) ^ ((e << 7)  | (e >>> 25));

	                var t1 = h + sigma1 + ch + K[i] + W[i];
	                var t2 = sigma0 + maj;

	                h = g;
	                g = f;
	                f = e;
	                e = (d + t1) | 0;
	                d = c;
	                c = b;
	                b = a;
	                a = (t1 + t2) | 0;
	            }

	            // Intermediate hash value
	            H[0] = (H[0] + a) | 0;
	            H[1] = (H[1] + b) | 0;
	            H[2] = (H[2] + c) | 0;
	            H[3] = (H[3] + d) | 0;
	            H[4] = (H[4] + e) | 0;
	            H[5] = (H[5] + f) | 0;
	            H[6] = (H[6] + g) | 0;
	            H[7] = (H[7] + h) | 0;
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
	            data.sigBytes = dataWords.length * 4;

	            // Hash final blocks
	            this._process();

	            // Return final computed hash
	            return this._hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        }
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA256('message');
	     *     var hash = CryptoJS.SHA256(wordArray);
	     */
	    C.SHA256 = Hasher._createHelper(SHA256);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA256(message, key);
	     */
	    C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
	}(Math));


	return CryptoJS.SHA256;

}));

/***/ }),

/***/ "./node_modules/neologin/constants.js":
/*!********************************************!*\
  !*** ./node_modules/neologin/constants.js ***!
  \********************************************/
/*! exports provided: ArgumentDataType, EventName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArgumentDataType", function() { return ArgumentDataType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventName", function() { return EventName; });
const ArgumentDataType = {
	STRING: 'String',
	BOOLEAN: 'Boolean',
	HASH160: 'Hash160',
	HASH256: 'Hash256',
	INTEGER: 'Integer',
	BYTEARRAY: 'ByteArray',
	ARRAY: 'Array',
	ADDRESS: 'Address',
};

const EventName = {
	READY: 'READY',
	ACCOUNT_CHANGED: 'ACCOUNT_CHANGED',
	CONNECTED: 'CONNECTED',
	DISCONNECTED: 'DISCONNECTED',
	NETWORK_CHANGED: 'NETWORK_CHANGED',
	BLOCK_HEIGHT_CHANGED: 'BLOCK_HEIGHT_CHANGED',
	TRANSACTION_CONFIRMED: 'TRANSACTION_CONFIRMED',
};




/***/ }),

/***/ "./node_modules/neologin/index.js":
/*!****************************************!*\
  !*** ./node_modules/neologin/index.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var penpal_lib_connectToChild__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! penpal/lib/connectToChild */ "./node_modules/penpal/lib/connectToChild.js");
/* harmony import */ var penpal_lib_connectToChild__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(penpal_lib_connectToChild__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var crypto_js_sha256__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! crypto-js/sha256 */ "./node_modules/crypto-js/sha256.js");
/* harmony import */ var crypto_js_sha256__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(crypto_js_sha256__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var crypto_js_enc_hex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! crypto-js/enc-hex */ "./node_modules/crypto-js/enc-hex.js");
/* harmony import */ var crypto_js_enc_hex__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(crypto_js_enc_hex__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ "./node_modules/neologin/constants.js");





let heights = []
let isReady = null;

function sendEvent(ev, data) { //{type, data}
	registeredEvents[ev].map((cb) => cb(data));
	if (ev === 'READY') {
		isReady = data;
	}
}

let registeredEvents = {
	'READY': [],
	'ACCOUNT_CHANGED': [],
	'NETWORK_CHANGED': [],
	'CONNECTED': [],
	'DISCONNECTED': [],
	'BLOCK_HEIGHT_CHANGED': [],
	'TRANSACTION_CONFIRMED': [],
};

function checkEvent(ev) {
	if (Object.keys(registeredEvents).includes(ev)) {
		return true;
	} else {
		console.error(`The event used ("${ev}") is not supported. The only events supported are ${Object.keys(registeredEvents)}.`);
		return false;
	}
}

function addEventListener(ev, cb) {
	if (ev === 'READY' && isReady !== null) {
		cb(isReady);
	} else {
		if (checkEvent(ev)) {
			registeredEvents[ev].push(cb);
		}
	}
}

function removeEventListener(ev) {
	if (checkEvent(ev)) {
		registeredEvents[ev] = [];
	}
}

const iframe = document.createElement('iframe');
iframe.src = 'https://neologin.io/widget/';

const iframeDeskStyle = {
	position: 'fixed',
	top: '1.5rem',
	right: '1.5rem',
	boxShadow: '0 5px 40px rgba(0,0,0,.16)',
	borderRadius: '4px',
	border: '0',
	width: '375px',
	background: 'white',
	"z-index": 99999,
}

const iframeMobileStyle = {
	position: 'fixed',
	bottom: '0',
	boxShadow: '0 5px 40px rgba(0,0,0,.16)',
	borderRadius: '0px',
	width: '100%',
	border: '0',
	background: 'white',
	"z-index": 99999,
}

function setIframeStyle() {
	// Get width and height of the window excluding scrollbars
	const w = document.documentElement.clientWidth;
	const h = document.documentElement.clientHeight;

	//Adapt iframe to window
	let iframeStyle = w > 576 ? iframeDeskStyle : iframeMobileStyle;
	let actualHeight = iframe.style['height']
	iframe.style = null;
	for (let style in iframeStyle) {
		iframe.style[style] = iframeStyle[style];
	}
	iframe.style['height'] = actualHeight
}

const appendIframe = () => {
	document.body.appendChild(iframe);
	setIframeStyle();
};
if (document.readyState === "complete"
	|| document.readyState === "loaded"
	|| document.readyState === "interactive") {
	appendIframe();
} else {
	document.addEventListener("DOMContentLoaded", () => {
		appendIframe();
	});
}

const connection = penpal_lib_connectToChild__WEBPACK_IMPORTED_MODULE_0___default()({
	// The iframe to which a connection should be made
	iframe,
	// Methods the parent is exposing to the child
	methods: {
		sendEvent,
		displayWidget,
		closeWidget,
		updateWidgetHeight
	}
});

const promiseMethods = ["getProvider", "getNetworks", "getAccount", "getPublicKey", "getBalance", "getStorage", "invokeRead", "verifyMessage", "getBlock", "getBlockHeight", "getTransaction", "getApplicationLog", "send", "invoke", "invokeMulti", "signMessage", "deploy", "encrypt", "decrypt", "disconnect"]; //Doesn't include addEventListener nor removeEventListener as these don't return promises

let neologin = { removeEventListener, addEventListener };

for (let i = 0; i < promiseMethods.length; i++) {
	let method = promiseMethods[i];
	neologin[method] = function (...args) {
		return connection.promise.then(child => child[method](...args));
	};
}

function displayWidget(widgetHeight) {
	iframe.style['height'] = widgetHeight + 'px';
}

function updateWidgetHeight(widgetHeight) {
	heights[heights.length - 1] = widgetHeight
	iframe.style['height'] = widgetHeight + 'px';
}

function closeWidget() {
	iframe.style['height'] = '0px';
}

window.addEventListener("resize", setIframeStyle);
closeWidget()

// UTILS

let reverseHex = (hex) => hex.match(/.{2}/g).reverse().join('');

function sha256(data) {
	const hex = crypto_js_enc_hex__WEBPACK_IMPORTED_MODULE_2___default.a.parse(data);
	const sha = crypto_js_sha256__WEBPACK_IMPORTED_MODULE_1___default()(hex).toString();
	return sha;
}

neologin.utils = {
	hex2str: (hexx) => {
		var hex = hexx.toString();//force conversion
		var str = '';
		for (var i = 0; (i < hex.length && hex.substr(i, 2) !== '00'); i += 2)
			str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
		return str;
	},
	str2hex: (str) => {
		var arr = [];
		for (var i = 0, l = str.length; i < l; i++) {
			var hex = Number(str.charCodeAt(i)).toString(16);
			arr.push(hex.length > 1 && hex || "0" + hex);
		}
		return arr.join('');
	},
	hex2int: (hex) => parseInt(reverseHex(hex), 16),
	int2hex: (int) => {
		let hex = int.toString(16);
		return reverseHex(hex.length % 2 ? '0' + hex : hex)
	},
	reverseHex,
	// Functions taken directly from o3's implementation (MIT licensed)
	address2scriptHash: (address) => {
		const hash = base58tohex(address);
		return hash.substr(2, 40);
	},
	scriptHash2address: (scriptHash) => {
		const ADDR_VERSION = '17';
		scriptHash = scriptHash.substr(0, 40);
		const firstSha = sha256(ADDR_VERSION + scriptHash);
		const secondSha = sha256(firstSha);
		const shaChecksum = secondSha.substr(0, 8);
		const hex = "0x" + ADDR_VERSION + scriptHash + shaChecksum;
		return hextobase58(hex);
	}
};

const Base58alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

// Needed to fix build systems that don't recognize the latest JS build-ins
/* global BigInt */

// TODO: Fix leading zeros
function hextobase58(hex) {
    let decimal = BigInt(hex);
    let base58 = "";
    while(decimal > 0){
        base58 += Base58alphabet[decimal % BigInt(58)];
        decimal /= BigInt(58);
    }   
    return base58.split("").reverse().join("");
}

// TODO: Fix leading zeros
function base58tohex(base58) {
    let decimal = BigInt(0);
    let power = BigInt(1);
    for(let i=base58.length-1; i>=0; i--){
        decimal += BigInt(Base58alphabet.indexOf(base58[i]))*power;
        power*=BigInt(58);
    }
    return decimal.toString(16);
}

// CONSTANTS

neologin.Constants = {
	ArgumentDataType: _constants__WEBPACK_IMPORTED_MODULE_3__["ArgumentDataType"],
	EventName: _constants__WEBPACK_IMPORTED_MODULE_3__["EventName"]
};

/* harmony default export */ __webpack_exports__["default"] = (neologin);


/***/ }),

/***/ "./node_modules/penpal/lib/connectCallReceiver.js":
/*!********************************************************!*\
  !*** ./node_modules/penpal/lib/connectCallReceiver.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _constants = __webpack_require__(/*! ./constants */ "./node_modules/penpal/lib/constants.js");

var _errorSerialization = __webpack_require__(/*! ./errorSerialization */ "./node_modules/penpal/lib/errorSerialization.js");

/**
 * Listens for "call" messages coming from the remote, executes the corresponding method, and
 * responds with the return value.
 * @param {Object} info Information about the local and remote windows.
 * @param {Object} methods The keys are the names of the methods that can be called by the remote
 * while the values are the method functions.
 * @param {Promise} destructionPromise A promise resolved when destroy() is called on the penpal
 * connection.
 * @returns {Function} A function that may be called to disconnect the receiver.
 */
var _default = (info, methods, log) => {
  const localName = info.localName,
        local = info.local,
        remote = info.remote,
        originForSending = info.originForSending,
        originForReceiving = info.originForReceiving;
  let destroyed = false;
  log(`${localName}: Connecting call receiver`);

  const handleMessageEvent = event => {
    if (event.source !== remote || event.data.penpal !== _constants.CALL) {
      return;
    }

    if (event.origin !== originForReceiving) {
      log(`${localName} received message from origin ${event.origin} which did not match expected origin ${originForReceiving}`);
      return;
    }

    const _event$data = event.data,
          methodName = _event$data.methodName,
          args = _event$data.args,
          id = _event$data.id;
    log(`${localName}: Received ${methodName}() call`);

    const createPromiseHandler = resolution => {
      return returnValue => {
        log(`${localName}: Sending ${methodName}() reply`);

        if (destroyed) {
          // It's possible to throw an error here, but it would need to be thrown asynchronously
          // and would only be catchable using window.onerror. This is because the consumer
          // is merely returning a value from their method and not calling any function
          // that they could wrap in a try-catch. Even if the consumer were to catch the error,
          // the value of doing so is questionable. Instead, we'll just log a message.
          log(`${localName}: Unable to send ${methodName}() reply due to destroyed connection`);
          return;
        }

        const message = {
          penpal: _constants.REPLY,
          id,
          resolution,
          returnValue
        };

        if (resolution === _constants.REJECTED && returnValue instanceof Error) {
          message.returnValue = (0, _errorSerialization.serializeError)(returnValue);
          message.returnValueIsError = true;
        }

        try {
          remote.postMessage(message, originForSending);
        } catch (err) {
          // If a consumer attempts to send an object that's not cloneable (e.g., window),
          // we want to ensure the receiver's promise gets rejected.
          if (err.name === _constants.DATA_CLONE_ERROR) {
            remote.postMessage({
              penpal: _constants.REPLY,
              id,
              resolution: _constants.REJECTED,
              returnValue: (0, _errorSerialization.serializeError)(err),
              returnValueIsError: true
            }, originForSending);
          }

          throw err;
        }
      };
    };

    new Promise(resolve => resolve(methods[methodName].apply(methods, args))).then(createPromiseHandler(_constants.FULFILLED), createPromiseHandler(_constants.REJECTED));
  };

  local.addEventListener(_constants.MESSAGE, handleMessageEvent);
  return () => {
    destroyed = true;
    local.removeEventListener(_constants.MESSAGE, handleMessageEvent);
  };
};

exports.default = _default;
module.exports = exports.default;

/***/ }),

/***/ "./node_modules/penpal/lib/connectCallSender.js":
/*!******************************************************!*\
  !*** ./node_modules/penpal/lib/connectCallSender.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _constants = __webpack_require__(/*! ./constants */ "./node_modules/penpal/lib/constants.js");

var _errorCodes = __webpack_require__(/*! ./errorCodes */ "./node_modules/penpal/lib/errorCodes.js");

var _generateId = _interopRequireDefault(__webpack_require__(/*! ./generateId */ "./node_modules/penpal/lib/generateId.js"));

var _errorSerialization = __webpack_require__(/*! ./errorSerialization */ "./node_modules/penpal/lib/errorSerialization.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Augments an object with methods that match those defined by the remote. When these methods are
 * called, a "call" message will be sent to the remote, the remote's corresponding method will be
 * executed, and the method's return value will be returned via a message.
 * @param {Object} callSender Sender object that should be augmented with methods.
 * @param {Object} info Information about the local and remote windows.
 * @param {Array} methodNames Names of methods available to be called on the remote.
 * @param {Promise} destructionPromise A promise resolved when destroy() is called on the penpal
 * connection.
 * @returns {Object} The call sender object with methods that may be called.
 */
var _default = (callSender, info, methodNames, destroyConnection, log) => {
  const localName = info.localName,
        local = info.local,
        remote = info.remote,
        originForSending = info.originForSending,
        originForReceiving = info.originForReceiving;
  let destroyed = false;
  log(`${localName}: Connecting call sender`);

  const createMethodProxy = methodName => {
    return function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      log(`${localName}: Sending ${methodName}() call`); // This handles the case where the iframe has been removed from the DOM
      // (and therefore its window closed), the consumer has not yet
      // called destroy(), and the user calls a method exposed by
      // the remote. We detect the iframe has been removed and force
      // a destroy() immediately so that the consumer sees the error saying
      // the connection has been destroyed. We wrap this check in a try catch
      // because Edge throws an "Object expected" error when accessing
      // contentWindow.closed on a contentWindow from an iframe that's been
      // removed from the DOM.

      let iframeRemoved;

      try {
        if (remote.closed) {
          iframeRemoved = true;
        }
      } catch (e) {
        iframeRemoved = true;
      }

      if (iframeRemoved) {
        destroyConnection();
      }

      if (destroyed) {
        const error = new Error(`Unable to send ${methodName}() call due ` + `to destroyed connection`);
        error.code = _errorCodes.ERR_CONNECTION_DESTROYED;
        throw error;
      }

      return new Promise((resolve, reject) => {
        const id = (0, _generateId.default)();

        const handleMessageEvent = event => {
          if (event.source !== remote || event.data.penpal !== _constants.REPLY || event.data.id !== id) {
            return;
          }

          if (event.origin !== originForReceiving) {
            log(`${localName} received message from origin ${event.origin} which did not match expected origin ${originForReceiving}`);
            return;
          }

          log(`${localName}: Received ${methodName}() reply`);
          local.removeEventListener(_constants.MESSAGE, handleMessageEvent);
          let returnValue = event.data.returnValue;

          if (event.data.returnValueIsError) {
            returnValue = (0, _errorSerialization.deserializeError)(returnValue);
          }

          (event.data.resolution === _constants.FULFILLED ? resolve : reject)(returnValue);
        };

        local.addEventListener(_constants.MESSAGE, handleMessageEvent);
        remote.postMessage({
          penpal: _constants.CALL,
          id,
          methodName,
          args
        }, originForSending);
      });
    };
  };

  methodNames.reduce((api, methodName) => {
    api[methodName] = createMethodProxy(methodName);
    return api;
  }, callSender);
  return () => {
    destroyed = true;
  };
};

exports.default = _default;
module.exports = exports.default;

/***/ }),

/***/ "./node_modules/penpal/lib/connectToChild.js":
/*!***************************************************!*\
  !*** ./node_modules/penpal/lib/connectToChild.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _constants = __webpack_require__(/*! ./constants */ "./node_modules/penpal/lib/constants.js");

var _errorCodes = __webpack_require__(/*! ./errorCodes */ "./node_modules/penpal/lib/errorCodes.js");

var _createDestructor2 = _interopRequireDefault(__webpack_require__(/*! ./createDestructor */ "./node_modules/penpal/lib/createDestructor.js"));

var _getOriginFromSrc = _interopRequireDefault(__webpack_require__(/*! ./getOriginFromSrc */ "./node_modules/penpal/lib/getOriginFromSrc.js"));

var _createLogger = _interopRequireDefault(__webpack_require__(/*! ./createLogger */ "./node_modules/penpal/lib/createLogger.js"));

var _connectCallReceiver = _interopRequireDefault(__webpack_require__(/*! ./connectCallReceiver */ "./node_modules/penpal/lib/connectCallReceiver.js"));

var _connectCallSender = _interopRequireDefault(__webpack_require__(/*! ./connectCallSender */ "./node_modules/penpal/lib/connectCallSender.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CHECK_IFRAME_IN_DOC_INTERVAL = 60000;
/**
 * @typedef {Object} Child
 * @property {Promise} promise A promise which will be resolved once a connection has
 * been established.
 * @property {Function} destroy A method that, when called, will disconnect any
 * messaging channels. You may call this even before a connection has been established.
 */

/**
 * Creates an iframe, loads a webpage into the URL, and attempts to establish communication with
 * the iframe.
 * @param {Object} options
 * @param {HTMLIframeElement} options.iframe The iframe to connect to.
 * @param {Object} [options.methods={}] Methods that may be called by the iframe.
 * @param {String} [options.childOrigin] The child origin to use to secure communication. If
 * not provided, the child origin will be derived from the iframe's src or srcdoc value.
 * @param {Number} [options.timeout] The amount of time, in milliseconds, Penpal should wait
 * for the child to respond before rejecting the connection promise.
 * @return {Child}
 */

var _default = (_ref) => {
  let iframe = _ref.iframe,
      _ref$methods = _ref.methods,
      methods = _ref$methods === void 0 ? {} : _ref$methods,
      childOrigin = _ref.childOrigin,
      timeout = _ref.timeout,
      debug = _ref.debug;
  const log = (0, _createLogger.default)(debug);
  const parent = window;

  const _createDestructor = (0, _createDestructor2.default)(),
        destroy = _createDestructor.destroy,
        onDestroy = _createDestructor.onDestroy;

  if (!childOrigin) {
    if (!iframe.src && !iframe.srcdoc) {
      const error = new Error('Iframe must have src or srcdoc property defined.');
      error.code = _errorCodes.ERR_NO_IFRAME_SRC;
      throw error;
    }

    childOrigin = (0, _getOriginFromSrc.default)(iframe.src);
  } // If event.origin is "null", the remote protocol is
  // file:, data:, and we must post messages with "*" as targetOrigin
  // when sending and allow
  // [1] https://developer.mozilla.org/fr/docs/Web/API/Window/postMessage#Utiliser_window.postMessage_dans_les_extensions


  const originForSending = childOrigin === 'null' ? '*' : childOrigin;
  const promise = new Promise((resolveConnectionPromise, reject) => {
    let connectionTimeoutId;

    if (timeout !== undefined) {
      connectionTimeoutId = setTimeout(() => {
        const error = new Error(`Connection to child timed out after ${timeout}ms`);
        error.code = _errorCodes.ERR_CONNECTION_TIMEOUT;
        reject(error);
        destroy();
      }, timeout);
    } // We resolve the promise with the call sender. If the child reconnects (for example, after
    // refreshing or navigating to another page that uses Penpal, we'll update the call sender
    // with methods that match the latest provided by the child.


    const callSender = {};
    let receiverMethodNames;
    let destroyCallReceiver;

    const handleMessage = event => {
      const child = iframe.contentWindow;

      if (event.source !== child || event.data.penpal !== _constants.HANDSHAKE) {
        return;
      }

      if (event.origin !== childOrigin) {
        log(`Parent received handshake from origin ${event.origin} which did not match expected origin ${childOrigin}`);
        return;
      }

      log('Parent: Received handshake, sending reply');
      event.source.postMessage({
        penpal: _constants.HANDSHAKE_REPLY,
        methodNames: Object.keys(methods)
      }, originForSending);
      const info = {
        localName: 'Parent',
        local: parent,
        remote: child,
        originForSending: originForSending,
        originForReceiving: childOrigin
      }; // If the child reconnected, we need to destroy the previous call receiver before setting
      // up a new one.

      if (destroyCallReceiver) {
        destroyCallReceiver();
      }

      destroyCallReceiver = (0, _connectCallReceiver.default)(info, methods, log);
      onDestroy(destroyCallReceiver); // If the child reconnected, we need to remove the methods from the previous call receiver
      // off the sender.

      if (receiverMethodNames) {
        receiverMethodNames.forEach(receiverMethodName => {
          delete callSender[receiverMethodName];
        });
      }

      receiverMethodNames = event.data.methodNames;
      const destroyCallSender = (0, _connectCallSender.default)(callSender, info, receiverMethodNames, destroy, log);
      onDestroy(destroyCallSender);
      clearTimeout(connectionTimeoutId);
      resolveConnectionPromise(callSender);
    };

    parent.addEventListener(_constants.MESSAGE, handleMessage);
    log('Parent: Awaiting handshake'); // This is to prevent memory leaks when the iframe is removed
    // from the document and the consumer hasn't called destroy().
    // Without this, event listeners attached to the window would
    // stick around and since the event handlers have a reference
    // to the iframe in their closures, the iframe would stick around
    // too.

    var checkIframeInDocIntervalId = setInterval(() => {
      if (!document.contains(iframe)) {
        clearInterval(checkIframeInDocIntervalId);
        destroy();
      }
    }, CHECK_IFRAME_IN_DOC_INTERVAL);
    onDestroy(() => {
      parent.removeEventListener(_constants.MESSAGE, handleMessage);
      clearInterval(checkIframeInDocIntervalId);
      const error = new Error('Connection destroyed');
      error.code = _errorCodes.ERR_CONNECTION_DESTROYED;
      reject(error);
    });
  });
  return {
    promise,
    destroy
  };
};

exports.default = _default;
module.exports = exports.default;

/***/ }),

/***/ "./node_modules/penpal/lib/constants.js":
/*!**********************************************!*\
  !*** ./node_modules/penpal/lib/constants.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DATA_CLONE_ERROR = exports.MESSAGE = exports.REJECTED = exports.FULFILLED = exports.REPLY = exports.CALL = exports.HANDSHAKE_REPLY = exports.HANDSHAKE = void 0;
const HANDSHAKE = 'handshake';
exports.HANDSHAKE = HANDSHAKE;
const HANDSHAKE_REPLY = 'handshake-reply';
exports.HANDSHAKE_REPLY = HANDSHAKE_REPLY;
const CALL = 'call';
exports.CALL = CALL;
const REPLY = 'reply';
exports.REPLY = REPLY;
const FULFILLED = 'fulfilled';
exports.FULFILLED = FULFILLED;
const REJECTED = 'rejected';
exports.REJECTED = REJECTED;
const MESSAGE = 'message';
exports.MESSAGE = MESSAGE;
const DATA_CLONE_ERROR = 'DataCloneError';
exports.DATA_CLONE_ERROR = DATA_CLONE_ERROR;

/***/ }),

/***/ "./node_modules/penpal/lib/createDestructor.js":
/*!*****************************************************!*\
  !*** ./node_modules/penpal/lib/createDestructor.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = () => {
  const callbacks = [];
  let destroyed = false;
  return {
    destroy() {
      destroyed = true;
      callbacks.forEach(callback => {
        callback();
      });
    },

    onDestroy(callback) {
      destroyed ? callback() : callbacks.push(callback);
    }

  };
};

exports.default = _default;
module.exports = exports.default;

/***/ }),

/***/ "./node_modules/penpal/lib/createLogger.js":
/*!*************************************************!*\
  !*** ./node_modules/penpal/lib/createLogger.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = debug => {
  return function () {
    if (debug) {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      console.log('[Penpal]', ...args); // eslint-disable-line no-console
    }
  };
};

exports.default = _default;
module.exports = exports.default;

/***/ }),

/***/ "./node_modules/penpal/lib/errorCodes.js":
/*!***********************************************!*\
  !*** ./node_modules/penpal/lib/errorCodes.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ERR_NO_IFRAME_SRC = exports.ERR_NOT_IN_IFRAME = exports.ERR_CONNECTION_TIMEOUT = exports.ERR_CONNECTION_DESTROYED = void 0;
const ERR_CONNECTION_DESTROYED = 'ConnectionDestroyed';
exports.ERR_CONNECTION_DESTROYED = ERR_CONNECTION_DESTROYED;
const ERR_CONNECTION_TIMEOUT = 'ConnectionTimeout';
exports.ERR_CONNECTION_TIMEOUT = ERR_CONNECTION_TIMEOUT;
const ERR_NOT_IN_IFRAME = 'NotInIframe';
exports.ERR_NOT_IN_IFRAME = ERR_NOT_IN_IFRAME;
const ERR_NO_IFRAME_SRC = 'NoIframeSrc';
exports.ERR_NO_IFRAME_SRC = ERR_NO_IFRAME_SRC;

/***/ }),

/***/ "./node_modules/penpal/lib/errorSerialization.js":
/*!*******************************************************!*\
  !*** ./node_modules/penpal/lib/errorSerialization.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deserializeError = exports.serializeError = void 0;

/**
 * Converts an error object into a plain object.
 * @param {Error} Error object.
 * @returns {Object}
 */
const serializeError = (_ref) => {
  let name = _ref.name,
      message = _ref.message,
      stack = _ref.stack;
  return {
    name,
    message,
    stack
  };
};
/**
 * Converts a plain object into an error object.
 * @param {Object} Object with error properties.
 * @returns {Error}
 */


exports.serializeError = serializeError;

const deserializeError = obj => {
  const deserializedError = new Error();
  Object.keys(obj).forEach(key => deserializedError[key] = obj[key]);
  return deserializedError;
};

exports.deserializeError = deserializeError;

/***/ }),

/***/ "./node_modules/penpal/lib/generateId.js":
/*!***********************************************!*\
  !*** ./node_modules/penpal/lib/generateId.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
let id = 0;
/**
 * @return {number} A unique ID (not universally unique)
 */

var _default = () => ++id;

exports.default = _default;
module.exports = exports.default;

/***/ }),

/***/ "./node_modules/penpal/lib/getOriginFromSrc.js":
/*!*****************************************************!*\
  !*** ./node_modules/penpal/lib/getOriginFromSrc.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const DEFAULT_PORTS = {
  'http:': '80',
  'https:': '443'
};
const URL_REGEX = /^(https?:)?\/\/([^/:]+)?(:(\d+))?/;
const opaqueOriginSchemes = ['file:', 'data:'];
/**
 * Converts a src value into an origin.
 * @param {string} src
 * @return {string} The URL's origin
 */

var _default = src => {
  if (src && opaqueOriginSchemes.find(scheme => src.startsWith(scheme))) {
    // The origin of the child document is an opaque origin and its
    // serialization is "null"
    // https://html.spec.whatwg.org/multipage/origin.html#origin
    return 'null';
  } // Note that if src is undefined, then srcdoc is being used instead of src
  // and we can follow this same logic below to get the origin of the parent,
  // which is the origin that we will need to use.


  const location = document.location;
  const regexResult = URL_REGEX.exec(src);
  let protocol;
  let hostname;
  let port;

  if (regexResult) {
    // It's an absolute URL. Use the parsed info.
    // regexResult[1] will be undefined if the URL starts with //
    protocol = regexResult[1] ? regexResult[1] : location.protocol;
    hostname = regexResult[2];
    port = regexResult[4];
  } else {
    // It's a relative path. Use the current location's info.
    protocol = location.protocol;
    hostname = location.hostname;
    port = location.port;
  } // If the port is the default for the protocol, we don't want to add it to the origin string
  // or it won't match the message's event.origin.


  const portSuffix = port && port !== DEFAULT_PORTS[protocol] ? `:${port}` : '';
  return `${protocol}//${hostname}${portSuffix}`;
};

exports.default = _default;
module.exports = exports.default;

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/second/neotest/neotest.component.html":
/*!*********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/second/neotest/neotest.component.html ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h3>This is the component where i imported neologin and it belongs to the second module</h3>\n<h5>Check the console for the error</h5>\n\n\n<h4>For neologin to launch takes about 5mins or less</h4>\n");

/***/ }),

/***/ "./src/app/second/neotest/neotest.component.scss":
/*!*******************************************************!*\
  !*** ./src/app/second/neotest/neotest.component.scss ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NlY29uZC9uZW90ZXN0L25lb3Rlc3QuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/second/neotest/neotest.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/second/neotest/neotest.component.ts ***!
  \*****************************************************/
/*! exports provided: NeotestComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NeotestComponent", function() { return NeotestComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var neologin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! neologin */ "./node_modules/neologin/index.js");



let NeotestComponent = class NeotestComponent {
    constructor() { }
    ngOnInit() {
        neologin__WEBPACK_IMPORTED_MODULE_2__["default"].getAccount().then((account) => {
            console.log("Provider address: " + account.address);
        });
    }
};
NeotestComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "app-neotest",
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./neotest.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/second/neotest/neotest.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./neotest.component.scss */ "./src/app/second/neotest/neotest.component.scss")).default]
    })
], NeotestComponent);



/***/ }),

/***/ "./src/app/second/second.module.ts":
/*!*****************************************!*\
  !*** ./src/app/second/second.module.ts ***!
  \*****************************************/
/*! exports provided: SecondModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SecondModule", function() { return SecondModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _neotest_neotest_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./neotest/neotest.component */ "./src/app/second/neotest/neotest.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");





const routes = [{ path: "", component: _neotest_neotest_component__WEBPACK_IMPORTED_MODULE_3__["NeotestComponent"] }];
let SecondModule = class SecondModule {
};
SecondModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes), _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"]],
        declarations: [_neotest_neotest_component__WEBPACK_IMPORTED_MODULE_3__["NeotestComponent"]],
        providers: [],
    })
], SecondModule);



/***/ })

}]);
//# sourceMappingURL=second-second-module-es2015.js.map