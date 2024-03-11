const { connect, connection } = require('mongoose')


const mongoURI = 'mongodb://localhost:27017/SocialNet';

connect(mongoURI)

module.exports = connection 