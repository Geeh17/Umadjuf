// models/Inscricao.ts
import { Schema, model, models } from "mongoose";

const inscricaoSchema = new Schema(
  {
    situacao_pagamento: { type: String, default: "Pendente" },
    link_pagamento: String,
    id_transacao: String,
    desconto: { type: Number, default: 0.0 },
    total_pago: { type: Number, default: 0.0 },
    total_pagar: { type: Number, default: 0.0 },
    evento: String,
    formularioId: {
      type: Schema.Types.ObjectId,
      ref: "Formulario",
    },
  },
  { timestamps: true }
);

export const Inscricao =
  models.Inscricao || model("Inscricao", inscricaoSchema);
