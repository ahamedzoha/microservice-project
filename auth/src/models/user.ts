import { Schema, model, Model, Document } from "mongoose"

interface UserAttrs {
  email: string
  password: string
}

// An interface that describes the properties that a User Model has
interface UserModel extends Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc
}

// An interface that describes the properties that a User Document has
interface UserDoc extends Document {
  email: string
  password: string
}

const userSchema = new Schema<UserAttrs>({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs)
}

const User = model<UserDoc, UserModel>("User", userSchema)

export { User }
