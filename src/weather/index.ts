import { default as weather } from "weather-js";

// TODO add all languages or the most important
export enum AcceptedLanguages {
  es_ve = "es_ve",
  es_mx = "es_mx",
  en_us = "en_us"
}
enum DegreeType {
  C = "C",
  F = "F",
  c = "c",
  f = "f"
}
export type FindOptions = {
  lang?: keyof typeof AcceptedLanguages,
  degreeType?: keyof typeof DegreeType,
  timeout?: number,
  search?: string,
};
export type Location = {
  name: string,
  zipcode: string,
  lat: string,
  long: string,
  timezone: string,
  alet: string,
  degreetype: string,
  imagerelativeurl: string
}
export type CurrentWeather = {
  temperature: string,
  skycode: string,
  skytext: string,
  date: string,
  observationtime: string,
  observationpoint: string,
  feelslike: string,
  humidity: string,
  winddisplay: string,
  day: string,
  shortday: string,
  windspeed: string,
  imageurl: string
}
export type WeatherForecast = {
  low: string,
  high: string,
  skycodeday: string,
  skytextday: string,
  date: string,
  day: string,
  shortday: string,
  precip: string
}
export type FindObject = {
  location: Location,
  current: CurrentWeather,
  forecast: [ WeatherForecast ]
}

export const getLanguage = (maybeLanguage: string): AcceptedLanguages | undefined => {
  const language: AcceptedLanguages = AcceptedLanguages[maybeLanguage as keyof typeof AcceptedLanguages];
  return language;
}
export const getDegree = (maybeDegreeType: string): DegreeType | undefined => {
  const degreeType: DegreeType = DegreeType[maybeDegreeType as keyof typeof DegreeType];
  return degreeType;
}
export const getWeather = ({ lang = "en_us", degreeType, timeout, search }: FindOptions) => {
  return new Promise((resolve: (value: [FindObject]) => void, reject: (err: Error) => void) => {
    const language = lang as string;
    const options = {
      lang: language.includes("_") ? language.split("_").join("-") : language,
      degreeType,
      timeout,
      search
    };

    console.log("Passed options:", options);
    weather.find(options, (err: Error, result: [ FindObject ]) => {
      if (err) reject(err);
      if (!result || !result.length) reject(new Error("No results found"));
      resolve(result);
    });
  })
}