// models/Inscrito.ts
import { Schema, model, models } from "mongoose";

const inscritoSchema = new Schema(
  {
    nome: String,
    email: String,
    telefone: String,
    dataNascimento: Date,
    telefoneResponsavel: String,
    nomeResponsavel: String,
    bairroCongregacao: String,
    telefoneEmergencia: String,
    rua: String,
    numero: String,
    complemento: String,
    bairro: String,
    cidade: String,
    estado: String,
    lider: String,
    genero: { type: String, enum: ["M", "F"] },
    cupom: String,
    inscricaoId: {
      type: Schema.Types.ObjectId,
      ref: "Inscricao",
    },
  },
  { timestamps: true }
);

export const Inscrito = models.Inscrito || model("Inscrito", inscritoSchema);
