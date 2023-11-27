import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandeler from './app/middlwares/globalErrorHandler';
import notFound from './app/middlwares/notFound';
import router from './app/routes';

const app: Application = express();

//--->parser
app.use(express.json());
app.use(cors());

//--->application routes
app.use('/api/v1', router);


app.get('/', (req: Request, res: Response,) => {
  res.send('Server is running successfully!!!');
});


//--> global error
app.use(globalErrorHandeler);


//---> Not Found 
app.use(notFound);

export default app;
