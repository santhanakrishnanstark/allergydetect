export const getJSONFromResponse = (responseText) => {
    // Regular expression to capture the JSON block
    const jsonRegex = /```json\n([\s\S]*?)\n```/;

    // Apply the regex to the response text
    const jsonMatch = responseText.match(jsonRegex);

    // Extract the JSON string
    if (jsonMatch && jsonMatch[1]) {
    const jsonString = jsonMatch[1];
    
    // Parse the JSON string to a JavaScript object
    let jsonData;
    try {
        jsonData = JSON.parse(jsonString);
        // console.log("Extracted JSON Data:", jsonData);

        return jsonData;
    } catch (error) {
        // console.error("Failed to parse JSON:", error);

        return error;
    }
    } else {
        // console.error("No JSON data found.");

        return [];
    }
}


export function extractAndParseJSON(inputString) {
    const jsonRegex = /```json\s*([\s\S]*?)\s*```/g;
    const jsonObjects = [];
    let match;

    let data = {};

    while ((match = jsonRegex.exec(inputString)) !== null) {
        try {


            data = {
                ...data,
                ...JSON.parse(match[1])
            }

            
            console.log('DDD: ', data)
        } catch (error) {
            console.error("Failed to parse JSON:", error);
        }
    }

    console.log('**** Data: ', data);
    return data;
    // return {...jsonObjects};
}

export function camelCaseToNormalText(camelCaseString) {
    // Replace every uppercase letter with a space followed by the lowercase version of that letter
    // Then capitalize the first letter
    return camelCaseString.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); });
} 

export const setSessionStorage = (key, value) => {
    sessionStorage.setItem(key, value);
}

export const getSessionStorage = (key) => {
    return sessionStorage.getItem(key);
}

function isValidJson(jsonString) {
    try {
        JSON.parse(jsonString);
        return true;
    } catch (e) {
        return false;
    }
}

export function toHtmlDateString(isoString) {
    // Create a Date object from the ISO string
    const date = new Date(isoString);

    // Extract the year, month, and day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');

    // Format to YYYY-MM-DD
    return `${year}-${month}-${day}`;
}