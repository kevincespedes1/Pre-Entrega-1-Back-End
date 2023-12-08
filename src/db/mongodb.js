import mongoose from 'mongoose'

const URL = 'mongodb+srv://coder_55605:coder_55605@cluster0.fuyh6ix.mongodb.net/'

export const init = async () => {

    try {

        await mongoose.connect (URL)
        console.log ('Database Connected ')
        
    } catch (error) {
        console.log ('Error to connect to database', error.message)
    }
}