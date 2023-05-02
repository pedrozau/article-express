import express,{Request,Response} from 'express'; 
import { database } from './Prisma/connect';
import { route } from './routes/routes';
import cors from 'cors'



const app = express() 


class App {
  
  static init_app() {
      app.use(express.json())
      app.use(cors())
      app.use("/article",route)
      app.listen(5000, ()=> console.log("Server running..."));

   }

}


App.init_app();