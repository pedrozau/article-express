import { Router, Request,Response } from "express";
import { database } from "../Prisma/connect";  



export const  route = Router();


class Handler {
   
    public static async Get(req: Request, res: Response) {
              const get_article = await database.article.findMany();
              // return article 
              return  res.json(get_article);
      }
  
     public static async Post(req: Request, res: Response) {
  
         try {
            
          const {title,description,content} = req.body 
          
          // create article 
          const create_article =  await database.article.create({
            data:{
               title,
               description,
               content
            }
          });
         
          res.json(create_article);
         
         }catch(err) {
           res.json({
             "error": err
           });
         }
           
  
  
      }
  
     public static async Delete(req: Request, res: Response) {
        const id  = req.params.id 
        const id_exist = await database.article.findFirst({
            where:{
                id
            }
        });
        
        if(!id_exist){
          
            res.json({
                 "error":"id is invalid!"
            })
        }
       

          const  delete_article = await database.article.delete({
             where: {
               id   
             }
          });

          return res.json(delete_article);
      }
  
     public static async Update(req: Request, res: Response) {
         const id = req.params.id 
        const id_exist = await database.article.findFirst({
            where:{
                id
            }
        });
        
        if(!id_exist){
          
            res.json({
                 "error":"id is invalid!"
            })
        }

          const {title,description,content} = req.body; 


          const update_article = await database.article.update({
            data:{
                title,
                description,
                content,
            },
            where:{
                id 
            }
          });

          return res.json(update_article);
        
      }
  
  }


route.route("/").post(Handler.Post).get(Handler.Get)
route.route("/:id").put(Handler.Update).delete(Handler.Delete)