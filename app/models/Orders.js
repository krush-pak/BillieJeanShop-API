const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    amount: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: "products"
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = User = mongoose.model("orders", UserSchema);
