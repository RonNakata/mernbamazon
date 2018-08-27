const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const departmentSchema = new Schema({
  departmentname: { type: String, required: true },
  overheadcost: { type: Number, required: true },
});

const Department = mongoose.model("Department", departmentSchema);

module.exports = Department;
