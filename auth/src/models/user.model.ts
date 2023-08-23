import mongoose from "mongoose";
import { Password } from "../services/password";


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

// middleware in mongoose
// "function" let us user THIS in the context on the class !!!
// otherwise, it would be in the context of the file
userSchema.pre('save', async function(done){
    if(this.isModified('password')){
        const hashed = await Password.toHash(this.get('password'))
        this.set('password', hashed);
    }
    done();
})

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

// to protec the inputs with a function
userSchema.statics.build = (attrs: IUserAttrs) => {
  return new User(attrs);
};

export { User };
