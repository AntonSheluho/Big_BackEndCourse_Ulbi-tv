const {MongoClient} = require('mongodb')

const client = new MongoClient('mongodb+srv://MongoDB_tutorial:CLitXy0VNRjS7UVE@cluster0.7tzja.mongodb.net/?retryWrites=true&w=majority')

const start = async () => {
    try {
        await client.connect()
        console.log('connect access')
        // await client.db().createCollection('users')
        const users = client.db().collection('users')
        // await users.insertOne({name: "Anton", email: 'anton@gmail.com'})
        const user = await users.findOne({email: 'anton@gmail.com'})
        console.log('user: ', user)
    } catch (error) {
        console.log('error ------------------')
        console.log(error)
    }
}

start()