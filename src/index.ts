import { app } from "./server";
import { AddressInfo } from "net";

// Should later be changed to automatically get the port provided by heroku in the environment
const PORT = 5050;

const httpServer = app.listen(PORT, () => console.log("Listening !!! @", (httpServer.address() as AddressInfo).port || "an unknown port"));