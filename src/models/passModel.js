
import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    info: {
        type: String,
        required: true,
    },
     userId:{
        type: String,
        required: true,
    }
});

const passData = mongoose.models.passinfo || mongoose.model('passinfo', blogSchema);

export default passData;
