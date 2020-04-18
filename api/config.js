const path = require('path');

const rootPath = __dirname;

module.exports = {
  rootPath,
  uploadPath: path.join(rootPath, 'public'),
  database: 'mongodb://localhost/gallery',
  databaseOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  facebook: {
    appId:'643212349805713',
    appSecret:'ccee06980e479746f0f8c92b1efd5f3a',
  }
};