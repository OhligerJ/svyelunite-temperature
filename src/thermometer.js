// thermometer class

export default class Thermometer {
    constructor(temperature_data, thresholds) {
        // set basic defaults
        this.current_temperature = 0;
        this.previous_temperature;
        this.units = "";
        this.temperature_language;
        this.temperature_data;
        
        // data on when to notify user, w/ title, direction, when to send a message, and message preferences
        /* structure: array of objects, each object being
        {
            temperature: float, -- the threshold we care about being crossed
            preference: string, -- values of rising_to, falling_to, both
            notification_leeway: float, -- how small a temperature fluctuation to not notify user
            message: string, -- optional. 
        }
        */
        this.thresholds = thresholds;

        this.setTemperatureData(temperature_data);
        this.setUnits(this.temperature_data.units);
        this.setCurrentTemperature(this.temperature_data.data[0].temperature);
        this.setTemperatureLanguage(this.units);
    }

    // setup methods
    setCurrentTemperature(temperature) {
        if(temperature) {
            this.current_temperature = parseFloat(temperature);
        } else {
            throw new Error("Invalid temperature entry given to setCurrentTemperature: ", temperature);
        }
    }

    setUnits(units) {
        this.units = units;
    }

    setTemperatureData(temperature_data){
        this.temperature_data = JSON.parse(temperature_data);
    }

    setTemperatureLanguage(units){
        if (units.toLowerCase() == "celsius") {
            this.temperature_language = "degrees Celsius";
        } else if (units.toLowerCase() == "fahrenheit"){
            this.temperature_language = "degrees Fahrenheit";
        } else if (units.toLowerCase() == "kelvin"){
            this.temperature_language = "Kelvin";
        } else {
            throw new Error('Temperature units not recognized: ', this.units);
        }
    }

    setPreviousTemperature(temperature){
        if(temperature){
            this.previous_temperature = parseFloat(temperature);
        } else {
            throw new Error("Invalid temperature entry given to setPreviousTemperature: ", temperature);
        }
        
    }

    // determine if temperature has crossed or landed on threshold
    // returns the relevant threshold object, or null if one isn't found
    crossedThreshold() {
        
        // using a for loop because JS forEach underperforms and can lead to multiple return values
        for (let i = 0; i < this.thresholds.length; i++){
            if (this.isThresholdValid(this.current_temperature, this.thresholds[i], this.previous_temperature)) {
                console.log(this.thresholds[i])
                return this.thresholds[i];
            }
        }

        return null;
    }

    // This would probably be part of front-end logic in a more differentiated codebase, but I include it here for ease of reading
    thresholdMessage(threshold) {
        if (threshold.message && threshold.message != "") {
            return threshold.message;
        }

        if (this.current_temperature == threshold.temperature){
            return "The temperature is now " + this.current_temperature + " " + this.temperature_language;
        } else if (this.current_temperature > this.previous_temperature){
            return "The temperature has risen to " + this.current_temperature + " " + this.temperature_language;
        } else if (this.current_temperature < this.previous_temperature){
            return "The temperature has fallen to " + this.current_temperature + " " + this.temperature_language;
        }
    }

    // checks if a threshold has been crossed and if the threshold preferences have been met
    isThresholdValid(cur_temp, threshold, prev_temp){
        if (cur_temp <= prev_temp && 
            (threshold.preference == "falling_to" || threshold.preference == "both") && 
            Math.abs(cur_temp - prev_temp) > threshold.notification_leeway){
                return (threshold.temperature >= cur_temp && threshold.temperature <= prev_temp);
        } else if((threshold.preference == "rising_to" || threshold.preference == "both") && Math.abs(cur_temp - prev_temp) > threshold.notification_leeway) {
            return (threshold.temperature <= cur_temp && threshold.temperature >= prev_temp);
        }

        return false;
    }
};