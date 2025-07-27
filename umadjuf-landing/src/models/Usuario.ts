// models/Usuario.ts
import { Schema, model, models } from "mongoose";

const usuarioSchema = new Schema(
  {
    login: String,
    email: String,
    senha: String,
    nome: String,
  },
  { timestamps: true }
);

export const Usuario = models.Usuario || model("Usuario", usuarioSchema);
