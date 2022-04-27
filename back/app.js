const express = require('express');
const { get } = require('http');


const expenseRoutes = require("./routes/expenseRoutes");
const incomesRoutes = require('./routes/incomesRoutes');
const registerRoutes = require('./routes/registerRoutes');
const loginRoutes = require('./routes/loginRoutes');

const app = express();

app.use(express.json());

app.use(function(req, res, next) {

	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	next();
});

app.use('/api/v1/8d59e57a-6b8f-4a54-b585-2e2c3edcd3ea/register', registerRoutes);
app.use('/api/v1/8d59e57a-6b8f-4a54-b585-2e2c3edcd3ea/login', loginRoutes);
app.use('/api/v1/income', incomesRoutes);
app.use("/api/v1/expense", expenseRoutes);

module.exports = app;
