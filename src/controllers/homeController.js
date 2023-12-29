import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { Sequelize } from "sequelize";

let Op = Sequelize.Op;

let model = initModels(sequelize);

const getImageList = async (req, res) => {
  let data = await model.hinh_anh.findAll();

  res.send(data);
};

const searchImageList = async (req, res) => {
  let { ten_hinh } = req.params;

  let data = await model.hinh_anh.findAll({
    where: {
      ten_hinh: {
        [Op.like]: `%${ten_hinh}%`,
      },
    },
  });
  res.send(data);
};

export { getImageList, searchImageList };
