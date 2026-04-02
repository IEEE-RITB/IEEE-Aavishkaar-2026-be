import { mongodbClient } from "@/db";

const db = mongodbClient.getDb();
const registrationsCollection = db.collection("forms");

export{ registrationsCollection};