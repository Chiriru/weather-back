declare module "weather-js" {
  import { FindOptions } from "../../weather";  
  
  export function find(options: FindOptions, callback: Function): void;
}