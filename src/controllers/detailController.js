import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { decodeToken } from "../config/jwt.js";

let model = initModels(sequelize);

const getImageInfo = async (req, res) => {
  let { hinhId } = req.params;

  let data = await model.hinh_anh.findByPk(hinhId, {
    where: {
      hinh_id: hinhId,
    },
    include: ["nguoi_dung"],
  });
  res.send(data);
};

const getCommentImage = async (req, res) => {
  let { hinhId } = req.params;
  let dataComment = await model.binh_luan.findAll({
    where: {
      hinh_id: hinhId,
    },
    include: ["nguoi_dung"],
  });

  res.send(dataComment);
};

const getSaveImage = async (req, res) => {
  let { hinhId } = req.params;
  let saveImage = true;

  let checkSave = await model.hinh_anh.findOne({
    where: {
      isSave: saveImage,
      hinh_id: hinhId,
    },
  });

  if (checkSave) {
    res.send("Saved Image");
  } else {
    res.send("Err Iamge has not saved");
  }
};

const postCommentImage = async (req, res) => {
  let { hinhId } = req.params;
  let { noi_dung } = req.body;
  let { token } = req.headers;

  let userInfo = decodeToken(token);

  let newData = {
    nguoi_dung_id: userInfo.data.checkEmail.nguoi_dung_id,
    hinh_id: hinhId,
    ngay_binh_luan: new Date(),
    noi_dung: noi_dung,
  };

  await model.binh_luan.create(newData);

  res.send(true);
};

export { getImageInfo, getCommentImage, getSaveImage, postCommentImage };
