import { Schema, model } from 'mongoose';

const schema = new Schema({
    _id: { type: String, _id: false, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    annuality: { type: String, required: true },
    content: { type: String, required: true },
});

export const AddonSchema = model('Addon', schema);
