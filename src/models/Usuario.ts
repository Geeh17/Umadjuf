import { Schema, models, model } from "mongoose";
const UsuarioSchema = new Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["admin"], default: "admin" }
}, { timestamps: true });
export default models.Usuario || model("Usuario", UsuarioSchema);
