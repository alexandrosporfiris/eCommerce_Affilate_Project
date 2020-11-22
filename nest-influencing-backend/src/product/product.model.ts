import { Schema, Document } from 'mongoose';
import * as mongoose from 'mongoose';

// Uncomment to print db queries
// mongoose.set('debug', true);

export interface IProduct extends Document {
    product_id: string;
    product_name: string;
    description: string;
    category: string;
    subcategory: string;
    mainCategory: string;
    gender: string;
    brand_name: string;
    tracking_url: string;
    in_stock: string;
    availability: string;
    price: number;
    full_price: number;
    discount: number;
    size: string[];
    colour: string;
    images: string[];
}

export const ProductSchema = new Schema<IProduct>({
    product_id: {
        type: Schema.Types.String,
    },
    product_name: {
        type: Schema.Types.String,
    },
    description: {
        type: Schema.Types.String,
    },
    category: {
        type: Schema.Types.String,
    }
    ,
    subcategory: {
        type: Schema.Types.String,
    },
    mainCategory: {
        type: Schema.Types.String,
    },
    gender: {
        type: Schema.Types.String,
    },
    brand_name: {
        type: Schema.Types.String,
    },
    tracking_url: {
        type: Schema.Types.String,
    },
    in_stock: {
        type: Schema.Types.String,
    },
    availability: {
        type: Schema.Types.String,
    },
    price: {
        type: Schema.Types.Number,
    },
    full_price: {
        type: Schema.Types.Number,
    },
    discount: {
        type: Schema.Types.Number,
    },
    size: [
        String,
    ],
    colour: {
        type: Schema.Types.String,
    },
    images: [
        String,
    ],
}).index({
    product_name: 'text',
    description: 'text',
    category: 'text',
    subcategory: 'text',
    mainCategory: 'text',
    gender: 'text',
    brand_name: 'text',
},
);
