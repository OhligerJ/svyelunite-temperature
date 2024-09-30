# svyelunite-temperature

## Foreword

I believe that an assignment like this is designed with two primary goals: to see how the candidate thinks, and to see how the candidate codes.

Given that I am a candidate for a UX-focused position, much of my work in this assignment will involve creating a good user experience. I've included additional thoughts in the afterword. 

### Assumptions

- We get to choose the format the data comes in. I choose data that comes in the following JSON format: {time: datetime, temperature: float}, with temperature unit type (Celsius, Fahrenheit, Kelvin, etc) being in the primary JSON body. Examples can be found in [try_this_json.json](./try_this_json.json)
- Temperature data all comes in with the same units.
- This is a library that a front-end might call as needed. So the front-end would decide the data source and then use this library to process incoming data. This would give it the flexibility to process (and potentially visualize) manually-input batches of data as well as listening to a stream of incoming data

### Capabilities

- User can input JSON-formatted data (in lieu of an open connection)
- Thresholds are customizable, and the user can request a notification when the temp rises to a threshold, falls to a threshold, or both
- Visually, watch the temperature shift over time while a list of notifications and their timestamps appear at threshold points. 

### General Approach

[thermometer.js](./src/thermometer.js) provides the tools to perform the requirements of the assignment, and the front-end talks with the Thermometer class to update inputs and receive data information. The JSON format is designed to mimic a potential incoming data source, and includes a datetime under the assumption that computer errors and sometimes physics mess with the timing of the datastream. If it became enough of a problem, we could hold onto our data long enough to update the history and trigger threshold messages that say "{threshold} crossed at {datetime}!"

## Get it up and running

Open a terminal window, navigate to this project's folder, and run `npm install` , then `npm run dev`. Some dependencies may require you to update your version of `npm`.

Navigate your browser to the URL that shows up when it's done building (mine is http://localhost:5173). 

To exit the process, return to the terminal window running this code, and use `Ctrl+C` (`Command .` in OSX, I believe)

## Try It Out

You can find examples in the file `try_this_json.json` for input examples. Then update the JSON and thresholds variables in [thermometer.test.js](./src/thermometer.test.js) for testing or [Thermometer.vue](./src/components/Thermometer.vue) for a visual output.

## Primary Interaction Method

After getting this project up and running with `npm run dev`, navigate to the appropriate localhost URL. You should see the temperatures go rolling by every 0.5 seconds, with notifications triggering at appropriate thresholds. 

## How To Run Tests

In the same terminal as mentioned above, run `npm run test`. If you wish to make changes to the test, you can do so in the file located at [thermometer.test.js](./thermometer.test.js). The tests will rerun automatically after updating and saving a file. These tests were created using Vitest, the guide of which can be found here: [https://vitest.dev/guide/](https://vitest.dev/guide/)

## Another Interaction Method

Include the thermometer.js file in a Javascript environment of your own. After instantiating, I recommend using a loop to call updateTemperatures()*, then using crossedThreshold() to determine whether to call thresholdMessage(). How you output the threshold message is up to you.

*while there's still a valid next entry in the data

### Afterword

My general coding style is, to borrow from Einstein: as simple as possible, and no simpler. Since front-end code runs on a variety of browsers on a large variety of machines, one-off bugs are prevalent. Simple code decreases their prevalence and eases their debugging

Here are additional features I considered for the backend and chose not to implement:
- More robust error and exception checking and messaging. Including: tracking a given source's frequency of bad data and adding messaging logic to various behaviors common to real-space use
- Creating a meta-class to handle multiple instances of the thermometer class at once. Consider the example of a front-end tracking multiple temperature sensors and an architecture that relegates the science and logic to the back-end.
- A basic database to allow for the storage and analytics of historic data (basic because this a take-home assignment)
- Reconnection protocols for our data sources
- Capability of reading data transferred in batches in non-JSON format