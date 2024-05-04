import express from "express";
import prisma from "./Config/dbConfig.js";
import cron from "cron";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const job = new cron.CronJob("*/5 * * * * *", async () => {
  // Create a new user
  const abc = async () => {
    const { first_name, last_name, email, password } = {
      first_name: "Johnyyyyyyyyyyyyyyyy",
      last_name: "Doe",
      email: "john.doe@example.com",
      password: "securepassword123",
    };

    try {
      const newUser = await prisma.user.update({
        where: { id: 1 },
        data: {
          first_name,
          last_name,
          email,
          password,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  abc();
});
job.start();

(async () => {
  try {
    // Connect to the database
    await prisma.$connect();
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
})();
