"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyValidation = void 0;
const bodyValidation = (body) => {
    const { name, pwd, word, shopId } = JSON.parse(body);
    return !!(name && pwd && word && [1, 2, 3, 4, 5].includes(shopId));
};
exports.bodyValidation = bodyValidation;
