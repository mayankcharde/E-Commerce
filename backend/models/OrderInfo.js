import mongoose from 'mongoose';

const orderInfoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  cart: { type: Array, required: true },
  total: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

export default mongoose.model('OrderInfo', orderInfoSchema);
