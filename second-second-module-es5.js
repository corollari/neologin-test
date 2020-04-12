function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["second-second-module"], {
  /***/
  "./node_modules/crypto-js/core.js":
  /*!****************************************!*\
    !*** ./node_modules/crypto-js/core.js ***!
    \****************************************/

  /*! no static exports found */

  /***/
  function node_modulesCryptoJsCoreJs(module, exports, __webpack_require__) {
    ;

    (function (root, factory) {
      if (true) {
        // CommonJS
        module.exports = exports = factory();
      } else {}
    })(this, function () {
      /**
       * CryptoJS core components.
       */
      var CryptoJS = CryptoJS || function (Math, undefined) {
        /*
         * Local polyfil of Object.create
         */
        var create = Object.create || function () {
          function F() {}

          ;
          return function (obj) {
            var subtype;
            F.prototype = obj;
            subtype = new F();
            F.prototype = null;
            return subtype;
          };
        }();
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

        var Base = C_lib.Base = function () {
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
            extend: function extend(overrides) {
              // Spawn
              var subtype = create(this); // Augment

              if (overrides) {
                subtype.mixIn(overrides);
              } // Create default initializer


              if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
                subtype.init = function () {
                  subtype.$super.init.apply(this, arguments);
                };
              } // Initializer's prototype is the subtype object


              subtype.init.prototype = subtype; // Reference supertype

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
            create: function create() {
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
            init: function init() {},

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
            mixIn: function mixIn(properties) {
              for (var propertyName in properties) {
                if (properties.hasOwnProperty(propertyName)) {
                  this[propertyName] = properties[propertyName];
                }
              } // IE won't copy toString using the loop above


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
            clone: function clone() {
              return this.init.prototype.extend(this);
            }
          };
        }();
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
          init: function init(words, sigBytes) {
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
          toString: function toString(encoder) {
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
          concat: function concat(wordArray) {
            // Shortcuts
            var thisWords = this.words;
            var thatWords = wordArray.words;
            var thisSigBytes = this.sigBytes;
            var thatSigBytes = wordArray.sigBytes; // Clamp excess bits

            this.clamp(); // Concat

            if (thisSigBytes % 4) {
              // Copy one byte at a time
              for (var i = 0; i < thatSigBytes; i++) {
                var thatByte = thatWords[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;
                thisWords[thisSigBytes + i >>> 2] |= thatByte << 24 - (thisSigBytes + i) % 4 * 8;
              }
            } else {
              // Copy one word at a time
              for (var i = 0; i < thatSigBytes; i += 4) {
                thisWords[thisSigBytes + i >>> 2] = thatWords[i >>> 2];
              }
            }

            this.sigBytes += thatSigBytes; // Chainable

            return this;
          },

          /**
           * Removes insignificant bits.
           *
           * @example
           *
           *     wordArray.clamp();
           */
          clamp: function clamp() {
            // Shortcuts
            var words = this.words;
            var sigBytes = this.sigBytes; // Clamp

            words[sigBytes >>> 2] &= 0xffffffff << 32 - sigBytes % 4 * 8;
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
          clone: function clone() {
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
          random: function random(nBytes) {
            var words = [];

            var r = function r(m_w) {
              var m_w = m_w;
              var m_z = 0x3ade68b1;
              var mask = 0xffffffff;
              return function () {
                m_z = 0x9069 * (m_z & 0xFFFF) + (m_z >> 0x10) & mask;
                m_w = 0x4650 * (m_w & 0xFFFF) + (m_w >> 0x10) & mask;
                var result = (m_z << 0x10) + m_w & mask;
                result /= 0x100000000;
                result += 0.5;
                return result * (Math.random() > .5 ? 1 : -1);
              };
            };

            for (var i = 0, rcache; i < nBytes; i += 4) {
              var _r = r((rcache || Math.random()) * 0x100000000);

              rcache = _r() * 0x3ade67b7;
              words.push(_r() * 0x100000000 | 0);
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
          stringify: function stringify(wordArray) {
            // Shortcuts
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes; // Convert

            var hexChars = [];

            for (var i = 0; i < sigBytes; i++) {
              var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;
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
          parse: function parse(hexStr) {
            // Shortcut
            var hexStrLength = hexStr.length; // Convert

            var words = [];

            for (var i = 0; i < hexStrLength; i += 2) {
              words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << 24 - i % 8 * 4;
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
          stringify: function stringify(wordArray) {
            // Shortcuts
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes; // Convert

            var latin1Chars = [];

            for (var i = 0; i < sigBytes; i++) {
              var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;
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
          parse: function parse(latin1Str) {
            // Shortcut
            var latin1StrLength = latin1Str.length; // Convert

            var words = [];

            for (var i = 0; i < latin1StrLength; i++) {
              words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << 24 - i % 4 * 8;
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
          stringify: function stringify(wordArray) {
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
          parse: function parse(utf8Str) {
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
          reset: function reset() {
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
          _append: function _append(data) {
            // Convert string to WordArray, else assume WordArray already
            if (typeof data == 'string') {
              data = Utf8.parse(data);
            } // Append


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
          _process: function _process(doFlush) {
            // Shortcuts
            var data = this._data;
            var dataWords = data.words;
            var dataSigBytes = data.sigBytes;
            var blockSize = this.blockSize;
            var blockSizeBytes = blockSize * 4; // Count blocks ready

            var nBlocksReady = dataSigBytes / blockSizeBytes;

            if (doFlush) {
              // Round up to include partial blocks
              nBlocksReady = Math.ceil(nBlocksReady);
            } else {
              // Round down to include only full blocks,
              // less the number of blocks that must remain in the buffer
              nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
            } // Count words ready


            var nWordsReady = nBlocksReady * blockSize; // Count bytes ready

            var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes); // Process blocks

            if (nWordsReady) {
              for (var offset = 0; offset < nWordsReady; offset += blockSize) {
                // Perform concrete-algorithm logic
                this._doProcessBlock(dataWords, offset);
              } // Remove processed words


              var processedWords = dataWords.splice(0, nWordsReady);
              data.sigBytes -= nBytesReady;
            } // Return processed words


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
          clone: function clone() {
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
          init: function init(cfg) {
            // Apply config defaults
            this.cfg = this.cfg.extend(cfg); // Set initial values

            this.reset();
          },

          /**
           * Resets this hasher to its initial state.
           *
           * @example
           *
           *     hasher.reset();
           */
          reset: function reset() {
            // Reset data buffer
            BufferedBlockAlgorithm.reset.call(this); // Perform concrete-hasher logic

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
          update: function update(messageUpdate) {
            // Append
            this._append(messageUpdate); // Update the hash


            this._process(); // Chainable


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
          finalize: function finalize(messageUpdate) {
            // Final message update
            if (messageUpdate) {
              this._append(messageUpdate);
            } // Perform concrete-hasher logic


            var hash = this._doFinalize();

            return hash;
          },
          blockSize: 512 / 32,

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
          _createHelper: function _createHelper(hasher) {
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
          _createHmacHelper: function _createHmacHelper(hasher) {
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
      }(Math);

      return CryptoJS;
    });
    /***/

  },

  /***/
  "./node_modules/crypto-js/enc-hex.js":
  /*!*******************************************!*\
    !*** ./node_modules/crypto-js/enc-hex.js ***!
    \*******************************************/

  /*! no static exports found */

  /***/
  function node_modulesCryptoJsEncHexJs(module, exports, __webpack_require__) {
    ;

    (function (root, factory) {
      if (true) {
        // CommonJS
        module.exports = exports = factory(__webpack_require__(
        /*! ./core */
        "./node_modules/crypto-js/core.js"));
      } else {}
    })(this, function (CryptoJS) {
      return CryptoJS.enc.Hex;
    });
    /***/

  },

  /***/
  "./node_modules/crypto-js/sha256.js":
  /*!******************************************!*\
    !*** ./node_modules/crypto-js/sha256.js ***!
    \******************************************/

  /*! no static exports found */

  /***/
  function node_modulesCryptoJsSha256Js(module, exports, __webpack_require__) {
    ;

    (function (root, factory) {
      if (true) {
        // CommonJS
        module.exports = exports = factory(__webpack_require__(
        /*! ./core */
        "./node_modules/crypto-js/core.js"));
      } else {}
    })(this, function (CryptoJS) {
      (function (Math) {
        // Shortcuts
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var Hasher = C_lib.Hasher;
        var C_algo = C.algo; // Initialization and round constants tables

        var H = [];
        var K = []; // Compute constants

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
            return (n - (n | 0)) * 0x100000000 | 0;
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
        })(); // Reusable object


        var W = [];
        /**
         * SHA-256 hash algorithm.
         */

        var SHA256 = C_algo.SHA256 = Hasher.extend({
          _doReset: function _doReset() {
            this._hash = new WordArray.init(H.slice(0));
          },
          _doProcessBlock: function _doProcessBlock(M, offset) {
            // Shortcut
            var H = this._hash.words; // Working variables

            var a = H[0];
            var b = H[1];
            var c = H[2];
            var d = H[3];
            var e = H[4];
            var f = H[5];
            var g = H[6];
            var h = H[7]; // Computation

            for (var i = 0; i < 64; i++) {
              if (i < 16) {
                W[i] = M[offset + i] | 0;
              } else {
                var gamma0x = W[i - 15];
                var gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3;
                var gamma1x = W[i - 2];
                var gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;
                W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
              }

              var ch = e & f ^ ~e & g;
              var maj = a & b ^ a & c ^ b & c;
              var sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22);
              var sigma1 = (e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25);
              var t1 = h + sigma1 + ch + K[i] + W[i];
              var t2 = sigma0 + maj;
              h = g;
              g = f;
              f = e;
              e = d + t1 | 0;
              d = c;
              c = b;
              b = a;
              a = t1 + t2 | 0;
            } // Intermediate hash value


            H[0] = H[0] + a | 0;
            H[1] = H[1] + b | 0;
            H[2] = H[2] + c | 0;
            H[3] = H[3] + d | 0;
            H[4] = H[4] + e | 0;
            H[5] = H[5] + f | 0;
            H[6] = H[6] + g | 0;
            H[7] = H[7] + h | 0;
          },
          _doFinalize: function _doFinalize() {
            // Shortcuts
            var data = this._data;
            var dataWords = data.words;
            var nBitsTotal = this._nDataBytes * 8;
            var nBitsLeft = data.sigBytes * 8; // Add padding

            dataWords[nBitsLeft >>> 5] |= 0x80 << 24 - nBitsLeft % 32;
            dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
            dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
            data.sigBytes = dataWords.length * 4; // Hash final blocks

            this._process(); // Return final computed hash


            return this._hash;
          },
          clone: function clone() {
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
      })(Math);

      return CryptoJS.SHA256;
    });
    /***/

  },

  /***/
  "./node_modules/neologin/constants.js":
  /*!********************************************!*\
    !*** ./node_modules/neologin/constants.js ***!
    \********************************************/

  /*! exports provided: ArgumentDataType, EventName */

  /***/
  function node_modulesNeologinConstantsJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ArgumentDataType", function () {
      return ArgumentDataType;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "EventName", function () {
      return EventName;
    });

    var ArgumentDataType = {
      STRING: 'String',
      BOOLEAN: 'Boolean',
      HASH160: 'Hash160',
      HASH256: 'Hash256',
      INTEGER: 'Integer',
      BYTEARRAY: 'ByteArray',
      ARRAY: 'Array',
      ADDRESS: 'Address'
    };
    var EventName = {
      READY: 'READY',
      ACCOUNT_CHANGED: 'ACCOUNT_CHANGED',
      CONNECTED: 'CONNECTED',
      DISCONNECTED: 'DISCONNECTED',
      NETWORK_CHANGED: 'NETWORK_CHANGED',
      BLOCK_HEIGHT_CHANGED: 'BLOCK_HEIGHT_CHANGED',
      TRANSACTION_CONFIRMED: 'TRANSACTION_CONFIRMED'
    };
    /***/
  },

  /***/
  "./node_modules/neologin/index.js":
  /*!****************************************!*\
    !*** ./node_modules/neologin/index.js ***!
    \****************************************/

  /*! exports provided: default */

  /***/
  function node_modulesNeologinIndexJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony import */


    var penpal_lib_connectToChild__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! penpal/lib/connectToChild */
    "./node_modules/penpal/lib/connectToChild.js");
    /* harmony import */


    var penpal_lib_connectToChild__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(penpal_lib_connectToChild__WEBPACK_IMPORTED_MODULE_0__);
    /* harmony import */


    var crypto_js_sha256__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! crypto-js/sha256 */
    "./node_modules/crypto-js/sha256.js");
    /* harmony import */


    var crypto_js_sha256__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(crypto_js_sha256__WEBPACK_IMPORTED_MODULE_1__);
    /* harmony import */


    var crypto_js_enc_hex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! crypto-js/enc-hex */
    "./node_modules/crypto-js/enc-hex.js");
    /* harmony import */


    var crypto_js_enc_hex__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(crypto_js_enc_hex__WEBPACK_IMPORTED_MODULE_2__);
    /* harmony import */


    var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./constants */
    "./node_modules/neologin/constants.js");

    var heights = [];
    var isReady = null;

    function sendEvent(ev, data) {
      //{type, data}
      registeredEvents[ev].map(function (cb) {
        return cb(data);
      });

      if (ev === 'READY') {
        isReady = data;
      }
    }

    var registeredEvents = {
      'READY': [],
      'ACCOUNT_CHANGED': [],
      'NETWORK_CHANGED': [],
      'CONNECTED': [],
      'DISCONNECTED': [],
      'BLOCK_HEIGHT_CHANGED': [],
      'TRANSACTION_CONFIRMED': []
    };

    function checkEvent(ev) {
      if (Object.keys(registeredEvents).includes(ev)) {
        return true;
      } else {
        console.error("The event used (\"".concat(ev, "\") is not supported. The only events supported are ").concat(Object.keys(registeredEvents), "."));
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

    var iframe = document.createElement('iframe');
    iframe.src = 'https://neologin.io/widget/';
    var iframeDeskStyle = {
      position: 'fixed',
      top: '1.5rem',
      right: '1.5rem',
      boxShadow: '0 5px 40px rgba(0,0,0,.16)',
      borderRadius: '4px',
      border: '0',
      width: '375px',
      background: 'white',
      "z-index": 99999
    };
    var iframeMobileStyle = {
      position: 'fixed',
      bottom: '0',
      boxShadow: '0 5px 40px rgba(0,0,0,.16)',
      borderRadius: '0px',
      width: '100%',
      border: '0',
      background: 'white',
      "z-index": 99999
    };

    function setIframeStyle() {
      // Get width and height of the window excluding scrollbars
      var w = document.documentElement.clientWidth;
      var h = document.documentElement.clientHeight; //Adapt iframe to window

      var iframeStyle = w > 576 ? iframeDeskStyle : iframeMobileStyle;
      var actualHeight = iframe.style['height'];
      iframe.style = null;

      for (var style in iframeStyle) {
        iframe.style[style] = iframeStyle[style];
      }

      iframe.style['height'] = actualHeight;
    }

    var appendIframe = function appendIframe() {
      document.body.appendChild(iframe);
      setIframeStyle();
    };

    if (document.readyState === "complete" || document.readyState === "loaded" || document.readyState === "interactive") {
      appendIframe();
    } else {
      document.addEventListener("DOMContentLoaded", function () {
        appendIframe();
      });
    }

    var connection = penpal_lib_connectToChild__WEBPACK_IMPORTED_MODULE_0___default()({
      // The iframe to which a connection should be made
      iframe: iframe,
      // Methods the parent is exposing to the child
      methods: {
        sendEvent: sendEvent,
        displayWidget: displayWidget,
        closeWidget: closeWidget,
        updateWidgetHeight: updateWidgetHeight
      }
    });
    var promiseMethods = ["getProvider", "getNetworks", "getAccount", "getPublicKey", "getBalance", "getStorage", "invokeRead", "verifyMessage", "getBlock", "getBlockHeight", "getTransaction", "getApplicationLog", "send", "invoke", "invokeMulti", "signMessage", "deploy", "encrypt", "decrypt", "disconnect"]; //Doesn't include addEventListener nor removeEventListener as these don't return promises

    var neologin = {
      removeEventListener: removeEventListener,
      addEventListener: addEventListener
    };

    var _loop = function _loop(i) {
      var method = promiseMethods[i];

      neologin[method] = function () {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        return connection.promise.then(function (child) {
          return child[method].apply(child, args);
        });
      };
    };

    for (var i = 0; i < promiseMethods.length; i++) {
      _loop(i);
    }

    function displayWidget(widgetHeight) {
      iframe.style['height'] = widgetHeight + 'px';
    }

    function updateWidgetHeight(widgetHeight) {
      heights[heights.length - 1] = widgetHeight;
      iframe.style['height'] = widgetHeight + 'px';
    }

    function closeWidget() {
      iframe.style['height'] = '0px';
    }

    window.addEventListener("resize", setIframeStyle);
    closeWidget(); // UTILS

    var reverseHex = function reverseHex(hex) {
      return hex.match(/.{2}/g).reverse().join('');
    };

    function sha256(data) {
      var hex = crypto_js_enc_hex__WEBPACK_IMPORTED_MODULE_2___default.a.parse(data);
      var sha = crypto_js_sha256__WEBPACK_IMPORTED_MODULE_1___default()(hex).toString();
      return sha;
    }

    neologin.utils = {
      hex2str: function hex2str(hexx) {
        var hex = hexx.toString(); //force conversion

        var str = '';

        for (var i = 0; i < hex.length && hex.substr(i, 2) !== '00'; i += 2) {
          str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        }

        return str;
      },
      str2hex: function str2hex(str) {
        var arr = [];

        for (var i = 0, l = str.length; i < l; i++) {
          var hex = Number(str.charCodeAt(i)).toString(16);
          arr.push(hex.length > 1 && hex || "0" + hex);
        }

        return arr.join('');
      },
      hex2int: function hex2int(hex) {
        return parseInt(reverseHex(hex), 16);
      },
      int2hex: function int2hex(_int) {
        var hex = _int.toString(16);

        return reverseHex(hex.length % 2 ? '0' + hex : hex);
      },
      reverseHex: reverseHex,
      // Functions taken directly from o3's implementation (MIT licensed)
      address2scriptHash: function address2scriptHash(address) {
        var hash = base58tohex(address);
        return hash.substr(2, 40);
      },
      scriptHash2address: function scriptHash2address(scriptHash) {
        var ADDR_VERSION = '17';
        scriptHash = scriptHash.substr(0, 40);
        var firstSha = sha256(ADDR_VERSION + scriptHash);
        var secondSha = sha256(firstSha);
        var shaChecksum = secondSha.substr(0, 8);
        var hex = "0x" + ADDR_VERSION + scriptHash + shaChecksum;
        return hextobase58(hex);
      }
    };
    var Base58alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"; // Needed to fix build systems that don't recognize the latest JS build-ins

    /* global BigInt */
    // TODO: Fix leading zeros

    function hextobase58(hex) {
      var decimal = BigInt(hex);
      var base58 = "";

      while (decimal > 0) {
        base58 += Base58alphabet[decimal % BigInt(58)];
        decimal /= BigInt(58);
      }

      return base58.split("").reverse().join("");
    } // TODO: Fix leading zeros


    function base58tohex(base58) {
      var decimal = BigInt(0);
      var power = BigInt(1);

      for (var _i = base58.length - 1; _i >= 0; _i--) {
        decimal += BigInt(Base58alphabet.indexOf(base58[_i])) * power;
        power *= BigInt(58);
      }

      return decimal.toString(16);
    } // CONSTANTS


    neologin.Constants = {
      ArgumentDataType: _constants__WEBPACK_IMPORTED_MODULE_3__["ArgumentDataType"],
      EventName: _constants__WEBPACK_IMPORTED_MODULE_3__["EventName"]
    };
    /* harmony default export */

    __webpack_exports__["default"] = neologin;
    /***/
  },

  /***/
  "./node_modules/penpal/lib/connectCallReceiver.js":
  /*!********************************************************!*\
    !*** ./node_modules/penpal/lib/connectCallReceiver.js ***!
    \********************************************************/

  /*! no static exports found */

  /***/
  function node_modulesPenpalLibConnectCallReceiverJs(module, exports, __webpack_require__) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = void 0;

    var _constants = __webpack_require__(
    /*! ./constants */
    "./node_modules/penpal/lib/constants.js");

    var _errorSerialization = __webpack_require__(
    /*! ./errorSerialization */
    "./node_modules/penpal/lib/errorSerialization.js");
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


    var _default = function _default(info, methods, log) {
      var localName = info.localName,
          local = info.local,
          remote = info.remote,
          originForSending = info.originForSending,
          originForReceiving = info.originForReceiving;
      var destroyed = false;
      log("".concat(localName, ": Connecting call receiver"));

      var handleMessageEvent = function handleMessageEvent(event) {
        if (event.source !== remote || event.data.penpal !== _constants.CALL) {
          return;
        }

        if (event.origin !== originForReceiving) {
          log("".concat(localName, " received message from origin ").concat(event.origin, " which did not match expected origin ").concat(originForReceiving));
          return;
        }

        var _event$data = event.data,
            methodName = _event$data.methodName,
            args = _event$data.args,
            id = _event$data.id;
        log("".concat(localName, ": Received ").concat(methodName, "() call"));

        var createPromiseHandler = function createPromiseHandler(resolution) {
          return function (returnValue) {
            log("".concat(localName, ": Sending ").concat(methodName, "() reply"));

            if (destroyed) {
              // It's possible to throw an error here, but it would need to be thrown asynchronously
              // and would only be catchable using window.onerror. This is because the consumer
              // is merely returning a value from their method and not calling any function
              // that they could wrap in a try-catch. Even if the consumer were to catch the error,
              // the value of doing so is questionable. Instead, we'll just log a message.
              log("".concat(localName, ": Unable to send ").concat(methodName, "() reply due to destroyed connection"));
              return;
            }

            var message = {
              penpal: _constants.REPLY,
              id: id,
              resolution: resolution,
              returnValue: returnValue
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
                  id: id,
                  resolution: _constants.REJECTED,
                  returnValue: (0, _errorSerialization.serializeError)(err),
                  returnValueIsError: true
                }, originForSending);
              }

              throw err;
            }
          };
        };

        new Promise(function (resolve) {
          return resolve(methods[methodName].apply(methods, args));
        }).then(createPromiseHandler(_constants.FULFILLED), createPromiseHandler(_constants.REJECTED));
      };

      local.addEventListener(_constants.MESSAGE, handleMessageEvent);
      return function () {
        destroyed = true;
        local.removeEventListener(_constants.MESSAGE, handleMessageEvent);
      };
    };

    exports["default"] = _default;
    module.exports = exports["default"];
    /***/
  },

  /***/
  "./node_modules/penpal/lib/connectCallSender.js":
  /*!******************************************************!*\
    !*** ./node_modules/penpal/lib/connectCallSender.js ***!
    \******************************************************/

  /*! no static exports found */

  /***/
  function node_modulesPenpalLibConnectCallSenderJs(module, exports, __webpack_require__) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = void 0;

    var _constants = __webpack_require__(
    /*! ./constants */
    "./node_modules/penpal/lib/constants.js");

    var _errorCodes = __webpack_require__(
    /*! ./errorCodes */
    "./node_modules/penpal/lib/errorCodes.js");

    var _generateId = _interopRequireDefault(__webpack_require__(
    /*! ./generateId */
    "./node_modules/penpal/lib/generateId.js"));

    var _errorSerialization = __webpack_require__(
    /*! ./errorSerialization */
    "./node_modules/penpal/lib/errorSerialization.js");

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        "default": obj
      };
    }
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


    var _default = function _default(callSender, info, methodNames, destroyConnection, log) {
      var localName = info.localName,
          local = info.local,
          remote = info.remote,
          originForSending = info.originForSending,
          originForReceiving = info.originForReceiving;
      var destroyed = false;
      log("".concat(localName, ": Connecting call sender"));

      var createMethodProxy = function createMethodProxy(methodName) {
        return function () {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          log("".concat(localName, ": Sending ").concat(methodName, "() call")); // This handles the case where the iframe has been removed from the DOM
          // (and therefore its window closed), the consumer has not yet
          // called destroy(), and the user calls a method exposed by
          // the remote. We detect the iframe has been removed and force
          // a destroy() immediately so that the consumer sees the error saying
          // the connection has been destroyed. We wrap this check in a try catch
          // because Edge throws an "Object expected" error when accessing
          // contentWindow.closed on a contentWindow from an iframe that's been
          // removed from the DOM.

          var iframeRemoved;

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
            var error = new Error("Unable to send ".concat(methodName, "() call due ") + "to destroyed connection");
            error.code = _errorCodes.ERR_CONNECTION_DESTROYED;
            throw error;
          }

          return new Promise(function (resolve, reject) {
            var id = (0, _generateId["default"])();

            var handleMessageEvent = function handleMessageEvent(event) {
              if (event.source !== remote || event.data.penpal !== _constants.REPLY || event.data.id !== id) {
                return;
              }

              if (event.origin !== originForReceiving) {
                log("".concat(localName, " received message from origin ").concat(event.origin, " which did not match expected origin ").concat(originForReceiving));
                return;
              }

              log("".concat(localName, ": Received ").concat(methodName, "() reply"));
              local.removeEventListener(_constants.MESSAGE, handleMessageEvent);
              var returnValue = event.data.returnValue;

              if (event.data.returnValueIsError) {
                returnValue = (0, _errorSerialization.deserializeError)(returnValue);
              }

              (event.data.resolution === _constants.FULFILLED ? resolve : reject)(returnValue);
            };

            local.addEventListener(_constants.MESSAGE, handleMessageEvent);
            remote.postMessage({
              penpal: _constants.CALL,
              id: id,
              methodName: methodName,
              args: args
            }, originForSending);
          });
        };
      };

      methodNames.reduce(function (api, methodName) {
        api[methodName] = createMethodProxy(methodName);
        return api;
      }, callSender);
      return function () {
        destroyed = true;
      };
    };

    exports["default"] = _default;
    module.exports = exports["default"];
    /***/
  },

  /***/
  "./node_modules/penpal/lib/connectToChild.js":
  /*!***************************************************!*\
    !*** ./node_modules/penpal/lib/connectToChild.js ***!
    \***************************************************/

  /*! no static exports found */

  /***/
  function node_modulesPenpalLibConnectToChildJs(module, exports, __webpack_require__) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = void 0;

    var _constants = __webpack_require__(
    /*! ./constants */
    "./node_modules/penpal/lib/constants.js");

    var _errorCodes = __webpack_require__(
    /*! ./errorCodes */
    "./node_modules/penpal/lib/errorCodes.js");

    var _createDestructor2 = _interopRequireDefault(__webpack_require__(
    /*! ./createDestructor */
    "./node_modules/penpal/lib/createDestructor.js"));

    var _getOriginFromSrc = _interopRequireDefault(__webpack_require__(
    /*! ./getOriginFromSrc */
    "./node_modules/penpal/lib/getOriginFromSrc.js"));

    var _createLogger = _interopRequireDefault(__webpack_require__(
    /*! ./createLogger */
    "./node_modules/penpal/lib/createLogger.js"));

    var _connectCallReceiver = _interopRequireDefault(__webpack_require__(
    /*! ./connectCallReceiver */
    "./node_modules/penpal/lib/connectCallReceiver.js"));

    var _connectCallSender = _interopRequireDefault(__webpack_require__(
    /*! ./connectCallSender */
    "./node_modules/penpal/lib/connectCallSender.js"));

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        "default": obj
      };
    }

    var CHECK_IFRAME_IN_DOC_INTERVAL = 60000;
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

    var _default = function _default(_ref) {
      var iframe = _ref.iframe,
          _ref$methods = _ref.methods,
          methods = _ref$methods === void 0 ? {} : _ref$methods,
          childOrigin = _ref.childOrigin,
          timeout = _ref.timeout,
          debug = _ref.debug;
      var log = (0, _createLogger["default"])(debug);
      var parent = window;

      var _createDestructor = (0, _createDestructor2["default"])(),
          destroy = _createDestructor.destroy,
          onDestroy = _createDestructor.onDestroy;

      if (!childOrigin) {
        if (!iframe.src && !iframe.srcdoc) {
          var error = new Error('Iframe must have src or srcdoc property defined.');
          error.code = _errorCodes.ERR_NO_IFRAME_SRC;
          throw error;
        }

        childOrigin = (0, _getOriginFromSrc["default"])(iframe.src);
      } // If event.origin is "null", the remote protocol is
      // file:, data:, and we must post messages with "*" as targetOrigin
      // when sending and allow
      // [1] https://developer.mozilla.org/fr/docs/Web/API/Window/postMessage#Utiliser_window.postMessage_dans_les_extensions


      var originForSending = childOrigin === 'null' ? '*' : childOrigin;
      var promise = new Promise(function (resolveConnectionPromise, reject) {
        var connectionTimeoutId;

        if (timeout !== undefined) {
          connectionTimeoutId = setTimeout(function () {
            var error = new Error("Connection to child timed out after ".concat(timeout, "ms"));
            error.code = _errorCodes.ERR_CONNECTION_TIMEOUT;
            reject(error);
            destroy();
          }, timeout);
        } // We resolve the promise with the call sender. If the child reconnects (for example, after
        // refreshing or navigating to another page that uses Penpal, we'll update the call sender
        // with methods that match the latest provided by the child.


        var callSender = {};
        var receiverMethodNames;
        var destroyCallReceiver;

        var handleMessage = function handleMessage(event) {
          var child = iframe.contentWindow;

          if (event.source !== child || event.data.penpal !== _constants.HANDSHAKE) {
            return;
          }

          if (event.origin !== childOrigin) {
            log("Parent received handshake from origin ".concat(event.origin, " which did not match expected origin ").concat(childOrigin));
            return;
          }

          log('Parent: Received handshake, sending reply');
          event.source.postMessage({
            penpal: _constants.HANDSHAKE_REPLY,
            methodNames: Object.keys(methods)
          }, originForSending);
          var info = {
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

          destroyCallReceiver = (0, _connectCallReceiver["default"])(info, methods, log);
          onDestroy(destroyCallReceiver); // If the child reconnected, we need to remove the methods from the previous call receiver
          // off the sender.

          if (receiverMethodNames) {
            receiverMethodNames.forEach(function (receiverMethodName) {
              delete callSender[receiverMethodName];
            });
          }

          receiverMethodNames = event.data.methodNames;
          var destroyCallSender = (0, _connectCallSender["default"])(callSender, info, receiverMethodNames, destroy, log);
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

        var checkIframeInDocIntervalId = setInterval(function () {
          if (!document.contains(iframe)) {
            clearInterval(checkIframeInDocIntervalId);
            destroy();
          }
        }, CHECK_IFRAME_IN_DOC_INTERVAL);
        onDestroy(function () {
          parent.removeEventListener(_constants.MESSAGE, handleMessage);
          clearInterval(checkIframeInDocIntervalId);
          var error = new Error('Connection destroyed');
          error.code = _errorCodes.ERR_CONNECTION_DESTROYED;
          reject(error);
        });
      });
      return {
        promise: promise,
        destroy: destroy
      };
    };

    exports["default"] = _default;
    module.exports = exports["default"];
    /***/
  },

  /***/
  "./node_modules/penpal/lib/constants.js":
  /*!**********************************************!*\
    !*** ./node_modules/penpal/lib/constants.js ***!
    \**********************************************/

  /*! no static exports found */

  /***/
  function node_modulesPenpalLibConstantsJs(module, exports, __webpack_require__) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.DATA_CLONE_ERROR = exports.MESSAGE = exports.REJECTED = exports.FULFILLED = exports.REPLY = exports.CALL = exports.HANDSHAKE_REPLY = exports.HANDSHAKE = void 0;
    var HANDSHAKE = 'handshake';
    exports.HANDSHAKE = HANDSHAKE;
    var HANDSHAKE_REPLY = 'handshake-reply';
    exports.HANDSHAKE_REPLY = HANDSHAKE_REPLY;
    var CALL = 'call';
    exports.CALL = CALL;
    var REPLY = 'reply';
    exports.REPLY = REPLY;
    var FULFILLED = 'fulfilled';
    exports.FULFILLED = FULFILLED;
    var REJECTED = 'rejected';
    exports.REJECTED = REJECTED;
    var MESSAGE = 'message';
    exports.MESSAGE = MESSAGE;
    var DATA_CLONE_ERROR = 'DataCloneError';
    exports.DATA_CLONE_ERROR = DATA_CLONE_ERROR;
    /***/
  },

  /***/
  "./node_modules/penpal/lib/createDestructor.js":
  /*!*****************************************************!*\
    !*** ./node_modules/penpal/lib/createDestructor.js ***!
    \*****************************************************/

  /*! no static exports found */

  /***/
  function node_modulesPenpalLibCreateDestructorJs(module, exports, __webpack_require__) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = void 0;

    var _default = function _default() {
      var callbacks = [];
      var destroyed = false;
      return {
        destroy: function destroy() {
          destroyed = true;
          callbacks.forEach(function (callback) {
            callback();
          });
        },
        onDestroy: function onDestroy(callback) {
          destroyed ? callback() : callbacks.push(callback);
        }
      };
    };

    exports["default"] = _default;
    module.exports = exports["default"];
    /***/
  },

  /***/
  "./node_modules/penpal/lib/createLogger.js":
  /*!*************************************************!*\
    !*** ./node_modules/penpal/lib/createLogger.js ***!
    \*************************************************/

  /*! no static exports found */

  /***/
  function node_modulesPenpalLibCreateLoggerJs(module, exports, __webpack_require__) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = void 0;

    var _default = function _default(debug) {
      return function () {
        if (debug) {
          var _console;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          (_console = console).log.apply(_console, ['[Penpal]'].concat(args)); // eslint-disable-line no-console

        }
      };
    };

    exports["default"] = _default;
    module.exports = exports["default"];
    /***/
  },

  /***/
  "./node_modules/penpal/lib/errorCodes.js":
  /*!***********************************************!*\
    !*** ./node_modules/penpal/lib/errorCodes.js ***!
    \***********************************************/

  /*! no static exports found */

  /***/
  function node_modulesPenpalLibErrorCodesJs(module, exports, __webpack_require__) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ERR_NO_IFRAME_SRC = exports.ERR_NOT_IN_IFRAME = exports.ERR_CONNECTION_TIMEOUT = exports.ERR_CONNECTION_DESTROYED = void 0;
    var ERR_CONNECTION_DESTROYED = 'ConnectionDestroyed';
    exports.ERR_CONNECTION_DESTROYED = ERR_CONNECTION_DESTROYED;
    var ERR_CONNECTION_TIMEOUT = 'ConnectionTimeout';
    exports.ERR_CONNECTION_TIMEOUT = ERR_CONNECTION_TIMEOUT;
    var ERR_NOT_IN_IFRAME = 'NotInIframe';
    exports.ERR_NOT_IN_IFRAME = ERR_NOT_IN_IFRAME;
    var ERR_NO_IFRAME_SRC = 'NoIframeSrc';
    exports.ERR_NO_IFRAME_SRC = ERR_NO_IFRAME_SRC;
    /***/
  },

  /***/
  "./node_modules/penpal/lib/errorSerialization.js":
  /*!*******************************************************!*\
    !*** ./node_modules/penpal/lib/errorSerialization.js ***!
    \*******************************************************/

  /*! no static exports found */

  /***/
  function node_modulesPenpalLibErrorSerializationJs(module, exports, __webpack_require__) {
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

    var serializeError = function serializeError(_ref) {
      var name = _ref.name,
          message = _ref.message,
          stack = _ref.stack;
      return {
        name: name,
        message: message,
        stack: stack
      };
    };
    /**
     * Converts a plain object into an error object.
     * @param {Object} Object with error properties.
     * @returns {Error}
     */


    exports.serializeError = serializeError;

    var deserializeError = function deserializeError(obj) {
      var deserializedError = new Error();
      Object.keys(obj).forEach(function (key) {
        return deserializedError[key] = obj[key];
      });
      return deserializedError;
    };

    exports.deserializeError = deserializeError;
    /***/
  },

  /***/
  "./node_modules/penpal/lib/generateId.js":
  /*!***********************************************!*\
    !*** ./node_modules/penpal/lib/generateId.js ***!
    \***********************************************/

  /*! no static exports found */

  /***/
  function node_modulesPenpalLibGenerateIdJs(module, exports, __webpack_require__) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = void 0;
    var id = 0;
    /**
     * @return {number} A unique ID (not universally unique)
     */

    var _default = function _default() {
      return ++id;
    };

    exports["default"] = _default;
    module.exports = exports["default"];
    /***/
  },

  /***/
  "./node_modules/penpal/lib/getOriginFromSrc.js":
  /*!*****************************************************!*\
    !*** ./node_modules/penpal/lib/getOriginFromSrc.js ***!
    \*****************************************************/

  /*! no static exports found */

  /***/
  function node_modulesPenpalLibGetOriginFromSrcJs(module, exports, __webpack_require__) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = void 0;
    var DEFAULT_PORTS = {
      'http:': '80',
      'https:': '443'
    };
    var URL_REGEX = /^(https?:)?\/\/([^/:]+)?(:(\d+))?/;
    var opaqueOriginSchemes = ['file:', 'data:'];
    /**
     * Converts a src value into an origin.
     * @param {string} src
     * @return {string} The URL's origin
     */

    var _default = function _default(src) {
      if (src && opaqueOriginSchemes.find(function (scheme) {
        return src.startsWith(scheme);
      })) {
        // The origin of the child document is an opaque origin and its
        // serialization is "null"
        // https://html.spec.whatwg.org/multipage/origin.html#origin
        return 'null';
      } // Note that if src is undefined, then srcdoc is being used instead of src
      // and we can follow this same logic below to get the origin of the parent,
      // which is the origin that we will need to use.


      var location = document.location;
      var regexResult = URL_REGEX.exec(src);
      var protocol;
      var hostname;
      var port;

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


      var portSuffix = port && port !== DEFAULT_PORTS[protocol] ? ":".concat(port) : '';
      return "".concat(protocol, "//").concat(hostname).concat(portSuffix);
    };

    exports["default"] = _default;
    module.exports = exports["default"];
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/second/neotest/neotest.component.html":
  /*!*********************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/second/neotest/neotest.component.html ***!
    \*********************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppSecondNeotestNeotestComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<h3>This is the component where i imported neologin and it belongs to the second module</h3>\n<h5>Check the console for the error</h5>\n\n\n<h4>For neologin to launch takes about 5mins or less</h4>\n";
    /***/
  },

  /***/
  "./src/app/second/neotest/neotest.component.scss":
  /*!*******************************************************!*\
    !*** ./src/app/second/neotest/neotest.component.scss ***!
    \*******************************************************/

  /*! exports provided: default */

  /***/
  function srcAppSecondNeotestNeotestComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NlY29uZC9uZW90ZXN0L25lb3Rlc3QuY29tcG9uZW50LnNjc3MifQ== */";
    /***/
  },

  /***/
  "./src/app/second/neotest/neotest.component.ts":
  /*!*****************************************************!*\
    !*** ./src/app/second/neotest/neotest.component.ts ***!
    \*****************************************************/

  /*! exports provided: NeotestComponent */

  /***/
  function srcAppSecondNeotestNeotestComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "NeotestComponent", function () {
      return NeotestComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var neologin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! neologin */
    "./node_modules/neologin/index.js");

    var NeotestComponent = /*#__PURE__*/function () {
      function NeotestComponent() {
        _classCallCheck(this, NeotestComponent);
      }

      _createClass(NeotestComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          neologin__WEBPACK_IMPORTED_MODULE_2__["default"].getAccount().then(function (account) {
            console.log("Provider address: " + account.address);
          });
        }
      }]);

      return NeotestComponent;
    }();

    NeotestComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: "app-neotest",
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./neotest.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/second/neotest/neotest.component.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./neotest.component.scss */
      "./src/app/second/neotest/neotest.component.scss"))["default"]]
    })], NeotestComponent);
    /***/
  },

  /***/
  "./src/app/second/second.module.ts":
  /*!*****************************************!*\
    !*** ./src/app/second/second.module.ts ***!
    \*****************************************/

  /*! exports provided: SecondModule */

  /***/
  function srcAppSecondSecondModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "SecondModule", function () {
      return SecondModule;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/fesm2015/common.js");
    /* harmony import */


    var _neotest_neotest_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./neotest/neotest.component */
    "./src/app/second/neotest/neotest.component.ts");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");

    var routes = [{
      path: "",
      component: _neotest_neotest_component__WEBPACK_IMPORTED_MODULE_3__["NeotestComponent"]
    }];

    var SecondModule = function SecondModule() {
      _classCallCheck(this, SecondModule);
    };

    SecondModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      imports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes), _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]],
      exports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"]],
      declarations: [_neotest_neotest_component__WEBPACK_IMPORTED_MODULE_3__["NeotestComponent"]],
      providers: []
    })], SecondModule);
    /***/
  }
}]);
//# sourceMappingURL=second-second-module-es5.js.map