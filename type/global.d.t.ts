import { MongoClient } from "mongodb";
export {};
declare global {
  var _mongo: Promise<MongoClient> | undefined;
}
