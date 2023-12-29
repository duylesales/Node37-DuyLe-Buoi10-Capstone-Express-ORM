import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { decodeToken } from "../config/jwt.js";

let model = initModels(sequelize);

const getUserInfo = async (req, res) => {
  let { token } = req.headers;
  let userInfo = decodeToken(token);
  console.log(token);

  let data = await model.nguoi_dung.findAll({
    where: {
      nguoi_dung_id: userInfo.data.checkEmail.nguoi_dung_id,
    },
  });

  res.send(data);
};
const getSavedImageByUserId = async (req, res) => {
  let { userId } = req.params;
  let saveImage = true;

  let checkSave = await model.hinh_anh.findAll({
    where: {
      isSave: saveImage,
      nguoi_dung_id: userId,
    },
    include: ["nguoi_dung"],
  });

  res.send(checkSave);
};

const deleteImage = async (req, res) => {
  let { hinhId } = req.params;

  await model.hinh_anh.destroy({
    where: {
      hinh_id: hinhId,
    },
  });

  res.send("Deleted Success");
};

export { getUserInfo, getSavedImageByUserId, deleteImage };
