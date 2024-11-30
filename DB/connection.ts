import mongoose from 'mongoose'

export default async () => {
    mongoose.connect('mongodb+srv://kianlucifer0098:Lucifer25255225@cluster0.egc60ev.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then((res) => {
        console.log('data base successfully connected . . .')
    }).catch((err)=>{
        console.log(`${err}`)
    })
}