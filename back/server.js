const mongoose = require("mongoose");
const app = require("./app");


const DB =
  "mongodb+srv://root:CwSRDBXOBt93A0BT@cluster0.yvqlo.mongodb.net/BudgetingApp?retryWrites=true&w=majority";
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Prisijungta prie DB...:)");
  });

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});