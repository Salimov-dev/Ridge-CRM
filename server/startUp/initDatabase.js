// models
// import User from "../models/User.js"
// import Object from "../models/Object.js"
// import ObjectStatus from "../models/Object-status.js"
// import Company from "../models/Company.js"
// import Metro from "../models/Metro.js"
// import District from "../models/District.js"
// import WorkingPosition from "../models/Working-position.js"
import EstateType from "../models/Estate-type.js"
// mock
// import usersMock from "../mock/users.json"
// import objectsMock from "../mock/objects.json"
// import workingPositionsMock from "../mock/working-positions.json"
// import objectStatusMock from "../mock/objects-status.json"
// import companiesMock from "../mock/companies.json"
// import metrosMock from "../mock/metro.json"
// import districtsMock from "../mock/districts.json"
import estateTypesMock from "../mock/estate-types.jы"

module.exports = async () => {
  const estateTypes = await EstateType.find();
  if (estateTypes.length !== estateTypesMock.length) {
    await createInitialEntity(EstateType, estateTypesMock);
  }

//   const objects = await Object.find();
//   if (objects.length !== objectsMock.length) {
//     await createInitialEntity(Object, objectsMock);
//   }

//   const users = await User.find();
//   if (users.length !== usersMock.length) {
//     await createInitialEntity(User, usersMock);
//   }

//   const workingPositions = await WorkingPosition.find();
//   if (workingPositions.length !== workingPositionsMock.length) {
//     await createInitialEntity(WorkingPosition, workingPositionsMock);
//   }

//   const objectStatus = await ObjectStatus.find();
//   if (objectStatus.length !== objectStatusMock.length) {
//     await createInitialEntity(ObjectStatus, objectStatusMock);
//   }

//   const companies = await Company.find();
//   if (companies.length !== companiesMock.length) {
//     await createInitialEntity(Company, companiesMock);
//   }

//   const metros = await Metro.find();
//   if (metros.length !== metrosMock.length) {
//     await createInitialEntity(Metro, metrosMock);
//   }

//   const districts = await District.find();
//   if (districts.length !== districtsMock.length) {
//     await createInitialEntity(District, districtsMock);
//   }
};

async function createInitialEntity(Model, data) {
  await Model.collection.drop();

  return Promise.all(
    data.map(async (item) => {
      try {
        delete item._id;
        const newItem = new Model(item);
        await newItem.save();
        return newItem;
      } catch (e) {
        return e;
      }
    })
  );
}
