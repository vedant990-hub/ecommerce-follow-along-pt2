const mongoose = require('mongoose');

const connectDatabase = () => {
    const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://heramb:inamke@cluster0.wycsh.mongodb.net/test?retryWrites=true&w=majority&tls=true';

    if (!mongoURI) {
        console.error("❌ MONGODB_URI is not defined in the environment variables.");
        process.exit(1);
    }

    mongoose
        .connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then((data) => {
            console.log(`✅ Database connected successfully: ${data.connection.host}`);
        })
        .catch((err) => {
            console.error("❌ Database connection failed:", err.message);
            process.exit(1);
        });
};

module.exports = connectDatabase;