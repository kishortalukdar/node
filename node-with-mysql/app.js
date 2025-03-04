import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express();

const corsOpts = {
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOpts));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());







export { app };
