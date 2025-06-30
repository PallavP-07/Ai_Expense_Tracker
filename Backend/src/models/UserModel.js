import mongoose from "mongoose";
import bcrypt from "bcrypt";

const CreateUserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      require: true,
      trim: true,
      maxLength: 100,
    },
    uname: {
      type: String,
      require: true,
      trim: true,
      maxLength: 50,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      trim: true,
      minlength: 6,
    },
  },
  { timestamps: true }
);
CreateUserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

CreateUserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
export default mongoose.model("Users", CreateUserSchema);
