"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/utils/regex.ts
var regex_exports = {};
__export(regex_exports, {
  EMAIL_REGEX: () => EMAIL_REGEX,
  isValidEmail: () => isValidEmail
});
module.exports = __toCommonJS(regex_exports);
var EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
function isValidEmail(use_email) {
  return EMAIL_REGEX.test(use_email);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EMAIL_REGEX,
  isValidEmail
});
