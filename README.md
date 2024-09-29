# svyelunite-temperature

## Foreword

I believe that an assignment like this is designed with two primary goals: to see how the candidate thinks, and to see how the candidate codes.

Given that I am a candidate for a UX-focused position, much of my work in this assignment will involve creating a good user experience. Here are additional features I considered for the backend and chose not to implement:
- More robust error and exception checking and messaging. Specifically, tracking a given source's frequency of bad data and adding messaging logic to various behaviors and thresholds
- Creating a meta-class to handle multiple instances of the thermometer class at once. Consider the example of a front-end tracking multiple temperature sensors and an architecture that relegates the science and logic to the back-end.
- A basic database to allow for the storage and analytics of historic data (basic because this a take-home assignment)
- Reconnection protocols for our data sources
- Capability of reading data transferred in batches in non-JSON format

### Assumptions

- We get to choose the format the data comes in. I choose data that comes in the following format: {time: datetime, system: string(fahrenheit, celsius, etc), temperature: float}
- The user will be a scientist or software engineer

### Intentional Capabilities

- User can input JSON-formatted data singularly or in batches (in lieu of an open connection)
- Thresholds are displayed, customizable, and the user can request a notification when the temp rises to a threshold, falls to a threshold, or both
- Ideally, a chart showing data change over time

## Usage Instructions

Open a terminal window, navigate to this project's folder, and run `npm install` , then `npm run dev`. Navigate your browser to the URL that shows up when it's done building (mine is http://localhost:5173). 

To exit the process, return to the terminal window running this code, and use `Ctrl+C` (`Command .` in OSX, I believe)

## How To Run Tests

