import { app } from "./server";
import { AddressInfo } from "net";
import { config } from "dotenv";

config();

const { PORT = 5050 } = process.env;

const httpServer = app.listen(PORT, () => console.log("Listening !!! @", (httpServer.address() as AddressInfo).port || "an unknown port"));