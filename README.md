# weather-back
The backend side for a Weather app

It allows you to search for locations by their name and returns a list of matches with the current weather of that location, forecasts for the next few days, and more basic metadata

# Usage

Install all dependencies with
`npm install` and then run
```
npm start
```

This will start the server in port 5050, you can change the port directly on the code

A GET request can be made to the main `/` route, it should have the following queries:
- `lang`, a language code like `es_mx` or `en_us`
- `degreeType`, either C or F, case insensitive.
- `location`, the name of the location to search, like `Chicago, Illinois`, `Las Vegas` or `NY`

A valid url would be:
```
http://localhost:5050/?lang=es_mx&location=NY&degreeType=f
```

And the response would be shaped in this way:
```
{
 "matches": [
 
  {
   "location": {
    "name": "Nueva York, Estados Unidos",
    "lat": "42.939",
    "long": "-75.62",
    "timezone": "-4",
    "alert": "",
    "degreetype": "F",
    "imagerelativeurl": "http://blob.weather.microsoft.com/static/weather4/es-mx/"
   },
   "current": {
    "temperature": "29",
    "skycode": "31",
    "skytext": "Despejado",
    "date": "2022-04-17",
    "observationtime": "23:00:00",
    "observationpoint": "Nueva York",
    "feelslike": "25",
    "humidity": "67",
    "winddisplay": "5 mph Noroeste",
    "day": "domingo",
    "shortday": "dom.",
    "windspeed": "5 mph",
    "imageUrl": "http://blob.weather.microsoft.com/static/weather4/es-mx/law/31.gif"
   },
   "forecast": [
    {
     "low": "26",
     "high": "45",
     "skycodeday": "29",
     "skytextday": "Parc. nublado",
     "date": "2022-04-16",
     "day": "sábado",
     "shortday": "sáb.",
     "precip": ""
    },
    {
     "low": "26",
     "high": "39",
     "skycodeday": "28",
     "skytextday": "Muy nublado",
     "date": "2022-04-17",
     "day": "domingo",
     "shortday": "dom.",
     "precip": "0"
    },
    {
     "low": "33",
     "high": "51",
     ...
    }
    ... more forecasts, up to 5
   ]
 },
 ... more matches
 
 ]
}
```
