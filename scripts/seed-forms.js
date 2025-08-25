require("dotenv").config();
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("Defina MONGODB_URI no .env");
  process.exit(1);
}

const FormularioSchema = new mongoose.Schema({
  descricao: String,
  valor: Number,
  data_inicio: Date,
  data_fim: Date,
});
const Formulario = mongoose.model("Formulario", FormularioSchema);

(async () => {
  try {
    await mongoose.connect(MONGODB_URI);

    const items = [
      {
        descricao: "AVIVA UMADJUF 2025",
        valor: 100,
        data_inicio: new Date("2025-01-01"),
        data_fim: new Date("2025-06-30"),
      },
      {
        descricao: "ACAMP UMADJUF 2026",
        valor: 150,
        data_inicio: new Date("2026-01-01"),
        data_fim: new Date("2026-03-31"),
      },
    ];

    for (const it of items) {
      const exists = await Formulario.findOne({ descricao: it.descricao });
      if (!exists) {
        await Formulario.create(it);
        console.log("Criado:", it.descricao);
      } else {
        console.log("Já existe:", it.descricao);
      }
    }

    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
