import app from "./app";
import mongoose from "mongoose";

const port = 5000
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tbsccmb.mongodb.net/authenticationWithExpress?retryWrites=true&w=majority&appName=Cluster0`);
    console.log("mongodb connect ✅")
    app.listen(port, () => {
        console.log(`authenticatiojn express running on`, port)
    })
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}