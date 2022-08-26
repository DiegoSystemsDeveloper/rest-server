const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log('bases de datos online')

    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit(1)
    }
}

module.exports = { dbConnection }