"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/utils/email.ts
var email_exports = {};
__export(email_exports, {
  sendEmail: () => sendEmail
});
module.exports = __toCommonJS(email_exports);
var import_nodemailer = __toESM(require("nodemailer"));
var transporter = import_nodemailer.default.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  //Usar "false" para ambiente de desenvolvimento
  auth: {
    user: "noreplypricealerts@gmail.com",
    pass: process.env.PASSGMAIL
  },
  tls: {
    rejectUnauthorized: false
    //Usar "false" para ambiente de desenvolvimento
  }
});
function sendEmail(use_email, emailBody, subject) {
  const mailOptions = {
    from: "noreplypricealerts@gmail.com",
    to: [use_email],
    subject,
    html: emailBody
  };
  transporter.sendMail(mailOptions, function(error) {
    if (error) {
      throw error;
    } else {
      console.log("Email enviado com sucesso!");
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  sendEmail
});
