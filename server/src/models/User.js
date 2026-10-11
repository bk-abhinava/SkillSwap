const mongoose = require("mongoose");
 const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required:true,
            trim:true,
        },
         email:{
            type: String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
        },
         password:{
            type: String,
            required:function(){
                return !this.googleId;
            },
            minlength:6,
        },
        googleId: {
  type: String,
  sparse: true,
  unique: true,
},
         bio:{
            type: String,
            default:"",
            trim:true,
        },
        skillsHave:{
            type:[String],
            default:[],
        },
         skillsWant:{
            type:[String],
            default:[],
        },

        },
        {
            timestamps:true,
        }
    
 );

 module.exports = mongoose.model("User",userSchema);