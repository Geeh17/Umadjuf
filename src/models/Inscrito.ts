import { Schema, models, model, Types } from "mongoose";

const InscritoSchema = new Schema({
  cod_inscricao: { type: Types.ObjectId, ref: "Inscricao", required: true },
  nome: { type: String, required: true },
  email: { type: String, required: true },
  telefone: { type: String },
  dataNascimento: { type: Date },
  telefoneResponsavel: { type: String },
  nomeResponsavel: { type: String },
  bairroCongregacao: { type: String },
  telefoneEmergencia: { type: String },
  rua: { type: String },
  numero: { type: String },
  bairro: { type: String },
  cidade: { type: String },
  estado: { type: String, maxLength: 2 },
  lider: { type: String, maxLength: 100 },
  genero: { type: String, maxLength: 1 },
  complemento: { type: String, maxLength: 100 }
}, { timestamps: true });

export default models.Inscrito || model("Inscrito", InscritoSchema);
