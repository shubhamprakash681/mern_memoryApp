import mongoose from "mongoose";


const connectDatabase = () => {
    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: "true",
        useUnifiedTopology: "true",
        // useCreateIndex: "true"
    }).then((data) => {
        console.log(`MongoDb database connection successfull with cluster: ${data.connection.host}`);
    }).catch((err) => {
        console.log(err);
    })
}

export default connectDatabase;