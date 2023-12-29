import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import bcrypt from "bcrypt";
import { createToken, decodeToken } from "../config/jwt.js";

let model = initModels(sequelize);

const userSignUp = async (req, res) => {
  let { email, mat_khau, ho_ten, tuoi, anh_dai_dien } = req.body;

  //   check email
  let checkEmail = await model.nguoi_dung.findOne({
    where: {
      email: email,
    },
  });

  if (checkEmail) {
    res.send("Email existed!!");
    return;
  }
  //mã hoá password: yarn add bcrypt
  let passCrypt = bcrypt.hashSync(mat_khau, 10);

  let newData = {
    ho_ten,
    email,
    mat_khau: passCrypt,
    tuoi,
    anh_dai_dien: anh_dai_dien,
  };

  // INSERT INTO VALUES
  await model.nguoi_dung.create(newData);

  res.send("Sign up successfully!!");
};

const userLogin = async (req, res) => {
  let { email, mat_khau } = req.body;

  let checkEmail = await model.nguoi_dung.findOne({
    where: {
      email: email,
    },
  });

  if (checkEmail) {
    // check password(not hash) in login VS password(hash) in sign up is similar with?
    // compareSync() return true/false
    let checkPass = bcrypt.compareSync(mat_khau, checkEmail.mat_khau);

    if (checkPass) {
      //encode checkEmail(data user inputted) => token
      let token = createToken({ checkEmail, mat_khau: "" });
      res.send(token);
    } else {
      res.send("Password is wrong!!");
    }
  } else {
    res.send("Email is wrong!!");
  }
};

const createImage = (req, res) => {};

export { userSignUp, userLogin, createImage };
