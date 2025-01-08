const mongoose = require('mongoose');

const connectToDataBase = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.fiw0k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
    console.log('Conectado ao MongoDB');
  } catch(error) {
    console.error('ERRO AO SE CONECTAR AO MONGODB: ', error);
  }
};

module.exports = connectToDataBase;