import { CONFIGS } from "@/configs";
import { isProduction } from "@/helpers";
import { MongoClient } from "mongodb";

class MongoDBClient {
    private url: string;
    private dbName: string;
    private client: MongoClient;

    constructor() {
        this.url = CONFIGS.db.connection_string;
        this.dbName = isProduction() ? CONFIGS.db.name : "test";
        this.client = new MongoClient(this.url);
    }

    async init() {
        console.log("Connecting to mongodb...");
        try {
            await this.client.connect();
            console.log("Connected to mongodb");
        } catch (error) {
            console.error(`dbError: could not connect to mongodb`);
        }
    }

    getDb() {
        return this.client.db(this.dbName);
    }

    getCollection(collectionName:string) {
        return this.getDb().collection(collectionName);
    }

    startSession() {
        return this.client.startSession();
    }

    close() {
        this.client.close();
    }
}

export const mongodbClient = new MongoDBClient;