import mongoose from 'mongoose';
export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB connected');
        const db = mongoose.connection;
        db.on('connected', () => {
            console.log('MongoDB connected');
        })
        db.on('error', (error) => {
            console.log(error);
            process.exit();
        }
        )
    } catch (error) {
        console.log(error);
    }
}