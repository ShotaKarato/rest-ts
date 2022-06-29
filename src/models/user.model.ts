import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

// mongodb structure
// database 👉 collections 👉 documents

// document: in mongodb document stands for a single data in BSON format. (BSON is type-rich version of JSON)
// Schema: Schema is a class which is basically a blueprint of a document. Just like database schema, we decide what kind of properties a document will have by invoking Schema class with parameters
// model: model is a method of mongoose that takes Schema and its name, then creates a class based on the schema

export interface UserDocument extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  let user = this as UserDocument;
  if (!user.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(config.get("saltWorkFactor"));
  const hash = await bcrypt.hashSync(user.password, salt);
  user.password = hash;
  return next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument;
  return bcrypt
    .compare(candidatePassword, user.password)
    .catch((error) => false);
};

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
