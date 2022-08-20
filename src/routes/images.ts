import express, { Response, Request } from 'express';
import fs from 'fs';
import getImage from '../utilities/getImage';
import resizeImage from '../utilities/resizeImage';

const imagesRoutes = express.Router();

imagesRoutes.get('/', async (req: Request,res: Response) => {
    const width = parseInt(`${req.query.width}`);
    const height = parseInt(`${req.query.height}`);

    if(!width || !height) {
        res.writeHead(400, {'Content-Type' : 'text/html'});
        res.end('<div><p>Unvalid width or height.</p></div>');
        return;
    }

    if(!fs.existsSync(`src/assets/originalImages/${req.query.fileName}.jpg`)) {
        res.writeHead(404, {'Content-Type' : 'text/html'});
        res.end('<div><p>No image with the provided file name.</p></div>');
        return;
    }

    if (!fs.existsSync(`src/assets/editedImages/${req.query.fileName}_${width}x${height}.jpg`)){
        const path = `src/assets/originalImages/${req.query.fileName}.jpg`;
        const destination = `src/assets/editedImages/${req.query.fileName}_${width}x${height}.jpg`;
        
        await resizeImage(path, destination, width, height)
        .catch((err) => {
            console.log(err.message);
        })
        const image = await getImage(destination)
        .catch((err) => {
            console.log(err.message);
        })

        res.writeHead(200, {'Content-Type' : 'image/jpg'});
        res.end(image);

    } else {
        const path = `src/assets/editedImages/${req.query.fileName}_${width}x${height}.jpg`;
        const image = await getImage(path)
        .catch((err) => {
            console.log(err.message);
        }) 

        res.writeHead(200, {'Content-Type' : 'image/jpg'});
        res.end(image);

    }
})

export default imagesRoutes;