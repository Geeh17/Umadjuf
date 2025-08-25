require("dotenv").config();
const bcrypt = require("bcryptjs");
const pwd = process.argv[2];
if (!pwd) {
  console.log("Uso: npm run hash -- <senha>");
  process.exit(1);
}
bcrypt.hash(pwd, 10).then((h) => {
  console.log(h);
});
