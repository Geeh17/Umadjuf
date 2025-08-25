require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

if (!MONGODB_URI || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error("Defina MONGODB_URI, ADMIN_EMAIL e ADMIN_PASSWORD no .env");
  process.exit(1);
}

const UsuarioSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["admin"], default: "admin" },
});
const Usuario =
  mongoose.models.Usuario || mongoose.model("Usuario", UsuarioSchema);

(async () => {
  await mongoose.connect(MONGODB_URI);
  const exists = await Usuario.findOne({ email: ADMIN_EMAIL });
  if (exists) {
    console.log("Admin já existe:", ADMIN_EMAIL);
    process.exit(0);
  }
  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
  await Usuario.create({ email: ADMIN_EMAIL, passwordHash, role: "admin" });
  console.log("Admin criado com sucesso:", ADMIN_EMAIL);
  process.exit(0);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
