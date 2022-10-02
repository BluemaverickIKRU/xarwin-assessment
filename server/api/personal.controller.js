const personalModel = require('../api/personal.model');

// Getting all the records
const getRec = async () => {
  try {
    const data = await personalModel.find({});
    return data;
  } catch (err) {
    return {
      message: 'Error occured while retrieving the data from DB !',
      err,
    };
  }
};

// Adding a single record
const addRec = (data) => {
  return new Promise((resolve, reject) => {
    const person = new personalModel();
    person.name = data.name;
    person.role = data.role;
    person.location = data.location;
    person.empId = data.empId;
    person.uniqueId = data.uniqueId;

    person.save((err, data) => {
      if (err)
        reject({
          message: 'Error occured while adding data to DB !',
          status: 501,
        });
      resolve({ message: 'Successfully added !', data });
    });
  });
};

// Updating the record
const updateRec = async (data) => {
  try {
    const updateRequest = await personalModel.findOneAndUpdate(
      { uniqueId: data.id },
      {
        name: data.name,
        role: data.role,
        location: data.location,
        empId: data.empId,
      }
    );
    return 'Updated Successfully !';
  } catch (err) {
    return { message: 'Error occured while updating the record in DB !', err };
  }
};

// Delete a record
const deleteRec = async (id) => {
  try {
    const data = await personalModel.deleteOne({ uniqueId: id });
    return { message: 'Successfully deleted !' };
  } catch (err) {
    return { message: 'Error occured while deleting the record !', err };
  }
};

module.exports = { addRec, getRec, updateRec, deleteRec };
