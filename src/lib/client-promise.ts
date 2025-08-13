import { MongoClient, ServerApiVersion, MongoClientOptions } from "mongodb";

if (!process.env.MONGO_URI) {
  throw new Error('Missing environment variable: "MONGO_URI"');
}

const uri: string = process.env.MONGO_URI;
const options: MongoClientOptions = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

// Extend the global type to include our mongo client promise
declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable to preserve the connection
  // across module reloads caused by HMR (Hot Module Replacement)
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, create a new connection each time
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export { clientPromise };
