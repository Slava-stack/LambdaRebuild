"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dash = void 0;
const getCountryCode_1 = __importDefault(require("../helpers/getCountryCode"));
console.log(getCountryCode_1);
const getIATA_1 = __importDefault(require("../helpers/getIATA"));
console.log(getIATA_1);
const Dash = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    if (ip && !Array.isArray(ip)) {
      try {
        const code = yield (0, getCountryCode_1.default)(ip);
        if (code) {
          res.send({
            countryCode: code,
            colo: yield (0, getIATA_1.default)(code),
          });
        }
      } catch (err) {
        next(err);
      }
    }
  });
exports.Dash = Dash;
