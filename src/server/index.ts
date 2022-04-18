import { Router, Application, Request, Response, NextFunction, default as express } from "express";
import { AcceptedLanguages, getDegree, getWeather } from "../weather/";
import { getLanguage } from "../weather";

/*
Other possibilities
  const routes4 = {
    "/": [
      {
        method: "get",
        handler: (req, res) => res.send("XD"),
      }
    ]
  }
  const routes3 = {
    "get": [
      {
        "route": "/",
        "handler": (req, res) => res.send("0w0")
      }
    ]
  }
  const routes2 = {
    "get": {
      "/": (req, res) => res.send("0w0")
    }
  }
*/
export enum Methods {
  GET,
  POST,
  PUT,
  DELETE,
  PATCH,
  ALL
}
type RouteEntry = {
  method: Lowercase<keyof typeof Methods>,
  handler: (req: Request, res: Response) => any
}
type MiddlewareEntry = {
  preflight: boolean,
  route: string,
  handler: (req: Request, res: Response, next: NextFunction) => any
}
const acceptedLanguages: AcceptedLanguages[] = Object.values(AcceptedLanguages).filter(item => Number.parseInt(item) === NaN);
const hasParams = <K extends string>(reqParameters: any, expectedParameters: K[] = []): reqParameters is Record<K, string> => {
  for (const key of expectedParameters) {
    if (typeof reqParameters[key] !== "string") return false;
  }
  return true;
}
const reqError = (res: Response, code: number = 500, message: string | object = "An error has ocurred") => {
  const payload: string = typeof message === "object" ? JSON.stringify(message) : message;
  return res.status(code).send(payload);
}

const routes: { [path: string]: RouteEntry[]} = {
  "/": [
    {
      method: "get",
      async handler(req, res) {
        const parameters = ["lang", "location", "degreeType"] as const;

        const { query } = req;
        if (!hasParams(query, [ ...parameters ])) return reqError(res, 400, "Missing parameters!, required parameters: " + parameters.join(" ,"));

        if (!getLanguage(query.lang)) return reqError(res, 400, "Invalid language!. Accepted languages: " + acceptedLanguages.join(" ,"));
        if (!getDegree(query.degreeType)) return reqError(res, 400, "Invalid Degree type. Valid degree types: 'C' and 'F'");

        const location = query.location;
        const lang = getLanguage(query.lang);
        const degreeType = getDegree(query.degreeType) || "C";
        try {
          const matches = await getWeather({ search: location, lang, degreeType });
          res.send(JSON.stringify({ matches }));
        } catch (err) {
          console.log("Error seraching weather", err);
          res.status(500).send({ message: "Error while fetching weather" });
        }
      }
    }
  ]
};
const middleware: MiddlewareEntry[] = [
  {
    preflight: false,
    route: "*",
    handler: (req, res) => res.status(404).send("404 not found")
  },
  {
    preflight: true,
    route: "*",
    handler: (req, res, next) => {
      console.log("Received request!!", req.ip);
      next();
    }
  }
];

export const getRouter = (): Router => {
  const router = Router();
  const [preflightMiddleware, postflightMiddleware] = middleware.reduce((array, cur) => {
    if (cur.preflight) array[0].push(cur);
    else array[1].push(cur);

    return array;
  }, ([ [], [] ] as [ MiddlewareEntry[], MiddlewareEntry[] ]));
  for (const entry of preflightMiddleware)
    router.use(entry.route, entry.handler);

  for (const path in routes) {
    const entries = routes[path];
    for (const entry of entries)
      router[entry.method](path, entry.handler);
  }

  for (const entry of postflightMiddleware)
    router.use(entry.route, entry.handler);

  return router;
}

export const app: Application = express().use("/", getRouter());