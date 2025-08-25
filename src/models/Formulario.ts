import { Schema, models, model } from "mongoose";

const FormularioSchema = new Schema({
  descricao: { type: String, required: true },
  valor: { type: Number, required: true },
  data_inicio: { type: Date, required: true },
  data_fim: { type: Date, required: true },
}, { timestamps: true });

export default models.Formulario || model("Formulario", FormularioSchema);
