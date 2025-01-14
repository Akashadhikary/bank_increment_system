const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  accountId: { type: Number, required: true, unique: true },
  introducerId: { type: Number, default: null },
  beneficiaryId: { type: Number, default: null },
});

module.exports = mongoose.model('Customer', customerSchema);
