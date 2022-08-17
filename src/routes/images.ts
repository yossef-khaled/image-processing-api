import express, { Response, Request } from 'express';
import fs from 'fs';

const imagesRoutes = express.Router();

imagesRoutes.get('/', (req: Request,res: Response) => {
    fs.readFile(`src/assets/originalImages/${req.query.fileName}.jpg`, (err, image) => {
        if(err) {
            if(err.message.includes('no such file or directory')) {
                res.send('<div><p>There is no photo with the file name provided in the URL.</p></div>');
                return;
            }
            throw err;
        }
        if(!image) {
            res.send('<div>Something went wrong</div>');    
        }

        res.writeHead(200, {'Content-type': 'image/jpg'});
        res.end(image);
    })
})

export default imagesRoutes;