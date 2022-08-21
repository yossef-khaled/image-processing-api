import express, { Response, Request } from 'express';
import fs from 'fs';
import getImage from '../utilities/getImage';
import resizeImage from '../utilities/resizeImage';
import path from 'path';

const imagesRoutes = express.Router();

imagesRoutes.get('/', async (req: Request,res: Response) => {
    const width: number = parseInt(`${req.query.width}`);
    const height: number = parseInt(`${req.query.height}`);

    if(!width || !height) {
        res.writeHead(400, {'Content-Type' : 'text/html'});
        res.end('<div><p>Unvalid width or height.</p></div>');
        return;
    }

    if(!fs.existsSync(path.join(__dirname, `../assets/originalImages/${req.query.fileName}.jpg`))) {
        res.writeHead(404, {'Content-Type' : 'text/html'});
        res.end('<div><p>No image with the provided file name.</p></div>');
        return;
    }

    if (!fs.existsSync(path.join(__dirname, `../assets/editedImages/${req.query.fileName}_${width}x${height}.jpg`))){
        const imagePath: string = path.join(__dirname, `../assets/originalImages/${req.query.fileName}.jpg`);
        const destination: string = path.join(__dirname, `../assets/editedImages/${req.query.fileName}_${width}x${height}.jpg`);
        
        await resizeImage(imagePath, destination, width, height)
        .catch((err: NodeJS.ErrnoException) => {
            console.log(err.message);
        })
        const image = await getImage(destination)
        .catch((err: NodeJS.ErrnoException) => {
            console.log(err.message);
        })

        res.writeHead(200, {'Content-Type' : 'image/jpg'});
        res.end(image);

    } else {
        const imagePath: string = path.join(__dirname, `../assets/editedImages/${req.query.fileName}_${width}x${height}.jpg`);
        const image: Buffer | void = await getImage(imagePath)
        .catch((err: NodeJS.ErrnoException) => {
            console.log(err.message);
        }) 

        res.writeHead(200, {'Content-Type' : 'image/jpg'});
        res.end(image);

    }
})

export default imagesRoutes;