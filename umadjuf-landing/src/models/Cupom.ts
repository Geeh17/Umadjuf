// models/Cupom.ts
import { Schema, model, models } from "mongoose";

const cupomSchema = new Schema(
  {
    codigo: { type: String, unique: true },
    quantidade: Number,
    restante: { type: Number, default: 0 },
    data_cadastro: { type: Date, default: () => new Date() },
    data_fim: Date,
    situacao: { type: String, default: "Ativo" },
    desconto: Number,
  },
  { timestamps: true }
);

export const Cupom = models.Cupom || model("Cupom", cupomSchema);
