var request = require('request');

module.exports = function () {
    this.id = "localytics-push-notification"; // An id given to uniquely identify the activity.
    this.label = "Send Push Notification"; // Label means name given to the activity, will be used as title.

    this.input = { // JSON schema . Structure can be checked on http://json-schema.org/
        "title": "Send Push Notification", // String , mandatory
        "type": "object", // Do not change
        //Inputs which the activity will take along with their validation rules(if any)
        "properties": {
            "access_token": {
                "type": "string",
                "title": "Authorize Localytics",
                "oauth": "localytics",
                "minLength": 1
            },
            "key": {
                "title": "Key",
                "type": "string",
                "description": "API Keys for Localytics Push Notification"
            },
            "secret": {
                "title": "App Secret",
                "type": "string",
                "description": "App Secret for Localytics Push Notification"
            },
            "target_type": {
                "title": "Target Type",
                "type": "string",
                "description": "Specifying the Target type "
            },
            "target": {
                "title": "Target",
                "type": "string",
                "description": "Target Type for Push Notification"
            },
            "title": {
                "title": "Title",
                "type": "string",
                "description": "Title of the Notification"
            },
            "body": {
                "title": "Body",
                "type": "string",
                "description": "Text Body of the Push Notification"
            }
        }
    };

    // will contain the text for the tooltip shown besides the activity title
    this.help = "API for Localytics Push Notification";

    this.output = { // JSON schema . Structure can be checked on http://json-schema.org/
        "title": "output",
        "type": "object",
        "properties": {
            "message": {
                "title": "message",
                "type": "string",
                "displayTitle": "Message"
            },
            "result": {
                "title": "Result",
                "type": "string",
                "displayTitle": "Result"
            }
        },
        "displayTitle": "Output"
    };

    this.execute = function (input, output) {

        // the core logic for the activity. this would be executed inside the flow engine.
        //user can write anything norestriction.

        // inputs parameter will provide you with the inputs given by the user to the activity

        // output is function used to indicate the engine that activity execution is completed.
        //  syntax output(error,data,[logs])
        //  if error then use (error,data,[logs])
        //  if no error then use (null,data,[logs])
        var app_id = input.access_token;
        var body = {
            "target_type": input.target_type,
            "messages": [{
                "target": input.target,
                "alert": {
                    "title": input.title,
                    "body": input.body
                },
                "android": {
                    "priority": "normal"
                },
                "ios": {
                    "sound": "default.wav",
                    "badge": 1
                }
            }]
        };
        request({
            method: 'POST',
            url: 'https://messaging.localytics.com/v2/push/' + app_id,
            body: body,
            headers: {
                Authorization: "Basic " + new Buffer(input.key + ':' + input.secret, 'utf8').toString('base64')
            },
            json: true
        }, function (error, response, body) {
            if (error) {
                return output(error)
            }
            if (typeof (body) === 'string') {
                try {
                    body = JSON.parse(body);
                } catch (e) {
                    return output(e)
                }
            }
            body.result = "Notification Send Successfully";
            if (response.statusCode && response.statusCode >= 200 && response.statusCode < 400) {
                return output(null, body);
            }
            if (response.statusCode && response.statusCode === 400) {
                return output(body.error);
            }
            if (response.statusCode && response.statusCode === 401) {
                return output(body.error);
            }
            if (response.statusCode && response.statusCode === 403) {
                return output(body.error);
            }
        })
    };
}
