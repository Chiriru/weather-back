import { app } from "./server";
import { AddressInfo } from "net";
import { config } from "dotenv";

config();
type ENV = {
  PORT?: number
}

const { PORT = 5050 } = process.env as ENV;

const httpServer = app.listen(PORT, () => console.log("Listening !!! @", (httpServer.address() as AddressInfo).port || "an unknown port"));