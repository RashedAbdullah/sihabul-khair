import mongoose, { Connection, Mongoose } from "mongoose";

const MONGO_URI: string | undefined = process.env.MONGO_URI;

interface CachedConnection {
  connection?: Connection;
  promise?: Promise<Mongoose>;
}

const cached: CachedConnection = {};

async function database_connection(): Promise<Connection> {
  if (!MONGO_URI) {
    throw new Error(
      "Please define the MONGO_URI environment variable inside .env"
    );
  }

  if (cached.connection) {
    return cached.connection;
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(MONGO_URI, opts);
  }

  try {
    cached.connection = (await cached.promise).connection;
  } catch (e) {
    cached.promise = undefined;
    throw e;
  }

  return cached.connection;
}

export { database_connection };
