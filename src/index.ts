// import express
import express from 'express';

// import routes
import imagesRoutes from './routes/images';

const port = 3000;
const app = express();

app.use('/images', imagesRoutes);

app.listen(port, () => {
    console.log(`🚀🚀 Image processing API Server started on port ${port}...`);
});
