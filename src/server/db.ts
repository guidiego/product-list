import mongoose from 'mongoose';

type TInput = {
  db: string;
};

export const mongoConnect = ({ db }: TInput) => {
  return mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => {
      return console.info(`Successfully connected to ${db}`);
    })
    .catch((error) => {
      console.error('Error connecting to database: ', error);
      return process.exit(1);
    });
};

export default mongoConnect;
