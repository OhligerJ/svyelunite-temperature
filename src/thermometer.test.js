import { expect, test } from 'vitest'
import Thermometer from './thermometer.js'

let therm_test_data = {
    units: "Celsius",
    data: [
        {"time": "2012-04-23T18:25:43.511Z", "temperature": "14.5"},
        {"time": "2012-04-23T18:25:44.511Z", "temperature": "12.0"},
    ]
}
let therm_test_data_string = JSON.stringify(therm_test_data);
let therm_thresholds = [
    {temperature: 13.0, preference: "both", notification_leeway: 0}
]

let therm = new Thermometer(therm_test_data_string, therm_thresholds);


/*********************************************************** */

test('Returns error if no temperature data given', () =>{
    expect(()=> therm.setCurrentTemperature(undefined)).toThrowError(/setCurrentTemperature/)
});

test('Returns current temperature of 14.5', () => {
    expect(therm.current_temperature).toBe(14.5)
})

test('Returns current datetime of April 23 2012, 6:25:43.511Z', () => {
    expect(therm.current_datetime).toStrictEqual(new Date("2012-04-23T18:25:43.511Z"))
})

test('Returns previous temperature of undefined', () => {
    expect(therm.previous_temperature).toBe(undefined)
})

test('Returns Celsius for our temperature units', () => {
    expect(therm.units).toBe("Celsius")
})

/********************************************************** */

let therm2 = new Thermometer(therm_test_data_string, therm_thresholds)

therm2.updateTemperatures();
// therm2.current_temperature = 12.0;
// therm2.previous_temperature = 14.5;

/************************************************************ */
test('Returns Celsius for our therm2 temperature units', () => {
    expect(therm2.units).toBe("Celsius")
})

test('Returns current therm2 temperature as 12.0', () => {
    expect(therm2.current_temperature).toBe(12)
})

test('Returns previous therm2 temperature as 14.5', () => {
    expect(therm2.previous_temperature).toBe(14.5)
})

test('Returns a threshold', () => {
    expect(therm2.crossedThreshold()).toStrictEqual({temperature: 13, preference: 'both', notification_leeway: 0})
})