// models/Formulario.ts
import { Schema, model, models } from "mongoose";

const formularioSchema = new Schema(
  {
    descricao: String,
    valor: Number,
    data_inicio: Date,
    data_fim: Date,
  },
  { timestamps: true }
);

export const Formulario =
  models.Formulario || model("Formulario", formularioSchema);
