import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env file in development
if (process.env.NODE_ENV !== "production") {
  const envPath = path.resolve(process.cwd(), ".env");
  console.log(`Loading environment variables from: ${envPath}`);

  const res = dotenv.config({ path: envPath });

  if (res.error) {
    console.error("Error loading environment variables: ", res.error);
    process.exit(1);
  } else {
    console.log("Environment variables loaded successfully");
  }
}

// Export environment variables
export const { MONGO_URI, PORT, NODE_ENV } = process.env;
console.log("NODE_ENV:", NODE_ENV); // Debug log to check the value
