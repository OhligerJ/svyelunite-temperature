export default class Thermometer {
    constructor(temperature_data, thresholds) {
        // set basic defaults
        this.array_key = 0; // current position in the JSON array
        this.current_temperature = 0;
        this.current_datetime;
        this.previous_temperature;
        this.previous_datetime;
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
        this.setCurrentTemperature(this.temperature_data.data[0].temperature, this.temperature_data.data[0].time);
        this.setTemperatureLanguage(this.units);
    }

    // setup methods
    setCurrentTemperature(temperature, datetime) {
        if(temperature && datetime) {
            this.current_temperature = parseFloat(temperature);
            this.current_datetime = new Date(datetime);
        } else {
            throw new Error("Invalid temperature entry given to setCurrentTemperature: ", temperature);
        }
    }

    setUnits(units) {
        if(units && (units == "Celsius" || units == "Fahrenheit" || units == "Kelvin")){
            this.units = units;
        } else {
            throw new Error("Unable to set units; please use a valid value such as Celsius, Fahrenheit, or Kelvin. Value given: ", units)
        }
    }

    setTemperatureData(temperature_data){
        if (temperature_data){
            this.temperature_data = JSON.parse(temperature_data);
        } else {
            throw new Error("Invalid temperature data supplied, please review and resubmit");
        }
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

    setPreviousTemperature(temperature, datetime){
        if(temperature && datetime){
            this.previous_temperature = parseFloat(temperature);
            this.previous_datetime = new Date(datetime);
        } else {
            throw new Error("Invalid temperature entry given to setPreviousTemperature: ", temperature);
        }
        
    }

    /* Here begin the methods for utilization and interaction */

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

    // checks if a threshold has been crossed and if the threshold preferences have been met. Primarily a helper function for crossedThreshold()
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

    // this function would be potentially more complex with potentially-unsorted data, like a livestream of data. As it is, we can feed it sorted data or sort it ourselves with a custom sort function. For now, assume a sorted array
    updateTemperatures() {
        if(!this.temperature_data.data[this.array_key+1] ){
            throw new Error('No more valid data! updateTemperatures() failed');
        } else {
            this.setPreviousTemperature(this.current_temperature, this.current_datetime);
            this.setCurrentTemperature(this.temperature_data.data[this.array_key+1].temperature, this.temperature_data.data[this.array_key+1].time)

            this.array_key++;
        }
    }
};