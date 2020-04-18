const mongoose = require('mongoose');
const config = require('./config');
const Photo = require('./models/Photo');

const User = require('./models/User');
const {nanoid} = require("nanoid");

const run = async () => {
  await mongoose.connect(config.database, config.databaseOptions);

  const collections = await mongoose.connection.db.listCollections().toArray();

  for (let coll of collections) {
    await mongoose.connection.db.dropCollection(coll.name);
  }

const [user,admin] =  await User.create({
    username: 'user',
    password: '123',
    token: nanoid(),
  displayName:'User',

  }, {
    username: 'admin',
    password: 'admin123',
    role: 'admin',
  displayName:'Антон Пикачу',
    token: nanoid(),

  },{
  username: 'jon',
  password: '123',
  displayName:'Jon',
  role: 'user',
  token: nanoid(),

});

  await Photo.create({
   title:'picture',
    image: 'uploads/fixtures/big_930.jpg',
    user:user
  }, {
    title:'picture2',
    image: 'uploads/fixtures/big_215916.jpg',
    user:user
  }, {
    title:'picture3',
    image: 'uploads/fixtures/pina.jpg',
    user:admin
  },{
    title:'picture4',
    image: 'uploads/fixtures/big_930.jpg',
    user:user
  }, {
    title:'picture5',
    image: 'uploads/fixtures/pina.jpg',
    user:user
  });

  mongoose.connection.close();
};

run().catch(e => {
  mongoose.connection.close();
  throw e;
});