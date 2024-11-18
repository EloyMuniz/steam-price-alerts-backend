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
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/repositories/UserRepository.ts
var UserRepository_exports = {};
__export(UserRepository_exports, {
  default: () => UserRepository_default
});
module.exports = __toCommonJS(UserRepository_exports);
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var UserRepository = class {
  findById(use_uuid) {
    return __async(this, null, function* () {
      const userData = yield prisma.users.findUnique({
        select: { use_uuid: true, use_name: true, use_email: true },
        where: { use_uuid }
      });
      return userData;
    });
  }
  findbyEMail(use_email) {
    return __async(this, null, function* () {
      const emailData = yield prisma.users.findFirst({
        select: { use_uuid: true, use_name: true, use_email: true },
        where: { use_email }
      });
      return emailData;
    });
  }
  createUser(use_email, use_password, use_name) {
    return __async(this, null, function* () {
      yield prisma.users.create({
        data: {
          use_email,
          use_password,
          use_name
        }
      });
      return true;
    });
  }
};
var UserRepository_default = new UserRepository();
