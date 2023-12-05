import app from './app';
import config from './app/config';
import {Server} from 'http';

let server: Server;

// getting-started.js
import mongoose from 'mongoose';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();


process.on('unhandledRejection', ()=>{
  console.log(`UnhandledRejection is detected, shutting down...`)
  if(server){
    server.close(()=>{
      process.exit(1)
    })
  }else{
    process.exit();
  }
})


process.on('uncaughtException', ()=>{
  console.log(`uncaughtException is detected, shutting down...`)
 
  process.exit(1);
})
