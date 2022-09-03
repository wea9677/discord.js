//회원정보(user) Schema
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  
    wallet_addr: {
        type: String,
        required: true,
        // unique : true
    },

    discord_user_id: {
        type: String,
        required: true,
        // unique : true
    },

    Nft_Bonus: {
        type: Number,
     
    }


  
});


UserSchema.virtual('userId').get(function () {
    return this._id.toHexString();
  });
  UserSchema.set('toJSON', {
    virtuals: true,
  });



module.exports = mongoose.model('Users', UserSchema);