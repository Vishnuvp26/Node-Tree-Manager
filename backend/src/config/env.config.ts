import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../../.env") });

export const env = {
    get PORT() {
        return process.env.PORT
    },
    get MONGODB_URL() {
        return process.env.MONGODB_URL
    },
    get CLIENT_URL() {
        return process.env.CLIENT_URL!
    },
}