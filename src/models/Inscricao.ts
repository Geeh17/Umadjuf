import { Schema, models, model, Types } from "mongoose";

const InscricaoSchema = new Schema({
  situacao_pagamento: { type: String, enum: ["pendente", "pago", "falhou"], default: "pendente" },
  cod_formulario: { type: Types.ObjectId, ref: "Formulario", required: true },
  link_pagamento: { type: String },
  id_transacao: { type: String },
  desconto: { type: Number, default: 0 },      // decimal(4,2)
  total_pago: { type: Number, default: 0 },    // decimal(4,2)
  total_pagar: { type: Number, default: 0 },   // decimal(4,2)
  // campos rápidos do atalho anterior (para compatibilidade)
  nome: { type: String },
  email: { type: String },
  cpf: { type: String },
  telefone: { type: String },
  cupomCodigo: { type: String }
}, { timestamps: true });

export default models.Inscricao || model("Inscricao", InscricaoSchema);
