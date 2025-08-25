import { Schema, models, model, Types } from "mongoose";

const CupomSchema = new Schema(
  {
    codigo: { type: String, required: true, unique: true },
    tipo: { type: String, enum: ["percentual", "fixo"], required: true },
    valor: { type: Number, required: true },

    quantidade: { type: Number, required: true, default: 0 },
    restante: { type: Number, required: true, default: 0 },

    data_cadastro: { type: Date, default: () => new Date() },
    data_fim: { type: Date, required: true },
    situacao: { type: String, default: "Ativo" },

    cod_formulario: { type: Types.ObjectId, ref: "Formulario", default: null },
  },
  { timestamps: true }
);

export default models.Cupom || model("Cupom", CupomSchema);
