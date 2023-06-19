import mongoose from "mongoose"

const { MONGODB_URI } = process.env

if(!MONGODB_URI) throw new Error('Deberia de existir la variable de entorno MONGODB_URI')

export const connectDB = async () => {
    try {
        const { connection } = await mongoose.connect(MONGODB_URI)
        if(connection.readyState === 1){
            console.log('Mongo conectado')
            return Promise.resolve(true)
        }
    } catch (error) {
        console.log(error)
        return Promise.reject(false)
    }
}