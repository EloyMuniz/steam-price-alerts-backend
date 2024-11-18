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

// src/routes/users.ts
var users_exports = {};
__export(users_exports, {
  default: () => users_default
});
module.exports = __toCommonJS(users_exports);
var import_express = require("express");

// src/repositories/UserRepository.ts
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

// src/utils/regex.ts
var EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
function isValidEmail(use_email) {
  return EMAIL_REGEX.test(use_email);
}

// src/services/UserService.ts
var import_bcrypt = __toESM(require("bcrypt"));

// src/utils/email.ts
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

// src/services/UserService.ts
var ServiceError = class extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
};
var UserService = class {
  userRegister(use_email, use_name, use_password, use_confirm_password) {
    return __async(this, null, function* () {
      try {
        if (!isValidEmail(use_email)) {
          throw new ServiceError("Email inv\xE1lido!", 401);
        }
        const emailExists = yield UserRepository_default.findbyEMail(use_email);
        if (emailExists) {
          throw new ServiceError("O email j\xE1 existe!", 409);
        }
        if (use_password.length < 4) {
          throw new ServiceError("A senha precisa ter 4 ou mais caracteres!", 400);
        }
        if (use_password !== use_confirm_password) {
          throw new ServiceError("A senha e a confirma\xE7\xE3o precisam ser iguais!", 400);
        }
        const saltRounds = 10;
        const passwordHash = import_bcrypt.default.hashSync(use_password, saltRounds);
        const result = yield UserRepository_default.createUser(use_email, passwordHash, use_name);
        if (result) {
          const emailBody = `Seu cadastro foi efetuado com sucesso, ${use_name}!`;
          const subject = "Registro do usu\xE1rio";
          sendEmail(use_email, emailBody, subject);
          return { message: "Usu\xE1rio registrado com sucesso!" };
        }
        throw new ServiceError("Erro ao registrar o usu\xE1rio!", 500);
      } catch (error) {
        if (error instanceof ServiceError) {
          throw error;
        }
        throw new ServiceError("Erro interno no servidor!", 500);
      }
    });
  }
};
var UserService_default = new UserService();

// src/controllers/UserController.ts
var UserController = class {
  constructor() {
    this.userRegister = (req, res) => __async(this, null, function* () {
      try {
        const { use_email, use_password, use_name, use_confirm_password } = req.body;
        yield UserService_default.userRegister(
          use_email,
          use_name,
          use_password,
          use_confirm_password
        );
        return res.status(201).json({ message: "O usu\xE1rio foi cadastrado com sucesso!" });
      } catch (error) {
        if (error.statusCode) {
          return res.status(error.statusCode).json({ message: error.message });
        }
        return res.status(500).json({ message: "Erro interno no servidor!" });
      }
    });
  }
};
var UserController_default = new UserController();

// src/routes/users.ts
var usersRoutes = (0, import_express.Router)();
usersRoutes.post("/user-register", UserController_default.userRegister);
var users_default = usersRoutes;
