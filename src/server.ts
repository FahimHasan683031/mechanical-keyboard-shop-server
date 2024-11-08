import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";


async function main() {

    try {

        await mongoose.connect(config.bd_url as string);  
        app.listen(3000, () => {
            console.log(`Server is running on the port ${config.port}`)
          });
        
    } catch (error) {
        console.log(error)
    }

  }

  main();