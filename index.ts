import express from 'express';
import mongoose from 'mongoose';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// @ts-ignore
mongoose.connect('mongodb://localhost:27017', {useUnifiedTopology: true, useNewUrlParser: true});

// @ts-ignore
app.listen(process.env.EXTERNAL_PORT || 3000, () => console.log(`Server up at http://localhost:${process.env.EXTERNAL_PORT || 3000}`));
