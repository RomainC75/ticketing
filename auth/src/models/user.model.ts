import mongoose from "mongoose";

interface IUserAttrs {
  email: string;
  password: string;
}

interface UserModel  extends mongoose.Model<UserDoc>{
    build(attrs: IUserAttrs): UserDoc;
}

interface UserDoc extends mongoose.Document{
    email: string;
    password: string;
    createAt: string;
    updatedAt: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

// to protec the inputs with a function
userSchema.statics.build = (attrs: IUserAttrs) => {
  return new User(attrs);
};

export { User };
