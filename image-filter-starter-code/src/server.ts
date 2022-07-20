import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';
import {isUri} from 'valid-url';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  app.get("/filteredimage",async (request,response) => {
    const {image_url: imageUrl} : {image_url:string} = request.query;
      //    1. validate the image_url query
    if (!imageUrl || !isUri(imageUrl)) {
      return response.status(400).send({auth: false, message: 'Image url is missing or malformed'});
    }

      //    2. call filterImageFromURL(image_url) to filter the image
    const filteredPath = await filterImageFromURL(imageUrl);
     //    3. send the resulting file in the response and deletes any files on the server on finish of the response
    response.sendFile(filteredPath, {},()=> deleteLocalFiles([filteredPath]))
  })

   
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( request, response ) => {
    response.send(`try http://localhost:${port}/filteredimage?image_url=...`)
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();