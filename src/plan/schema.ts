import { Schema, model } from 'mongoose';

const schema = new Schema({
    _id: { type: String, _id: false, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    annuality: { type: String, required: true },
    image: { type: String, required: true },
});

export const PlanSchema = model('Plan', schema);
