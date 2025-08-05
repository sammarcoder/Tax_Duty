// const express = require('express');
// const morgan = require('morgan');
// require('dotenv').config();
// require('./config/mongo'); // Connect to MongoDB

// // const routes = require('./routes');

// const app = express();

// app.use(express.json());
// app.use(morgan('dev'));
// app.use('/api/v1', ((req,res)=>{
// res.send({message:'name is'})
// }));

// app.use((req, res) => res.status(404).json({ message: 'Not Found' }));

// module.exports = app;
















const express = require('express');
const morgan = require('morgan');

require('dotenv').config();
const sequelize = require('./config/database');
const routes = require('./routes');
const app = express();
const cors = require('cors')

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use('/api/v1', routes);

app.use((req, res) => res.status(404).json({ message: 'Not Found' }));


sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connected');
    return sequelize.sync({alter :true});
  })
  .then(() => {
    console.log('✅ Models synced');
  })
  .catch(err => {
    console.error('❌ DB connection error:', err);
  });


module.exports = app;
