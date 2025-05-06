const mongoose = require("mongoose");
const initData  = require("./data.js");
const Listing = require("../Models/listingModel.js")

const Mongo_URL = "mongodb://127.0.0.1:27017/Staybnb"
main()
    .then((res) => {
        console.log("DB connected successfully.");
    })
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect(Mongo_URL);
}

const initDB = async () => {
   await Listing.deleteMany({});
   initData.data = initData.data.map((obj) => ({...obj, owner: "68124f2be57c7dc91480a43f"}) )
   await Listing.insertMany(initData.data);
   console.log("Data was initialized.");
}

initDB();