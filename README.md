# Localytics
The Push API is an interface for sending real-time push notifications that leverages the Localytics marketing platform using node.js 

Created Source Code for Localytics Service Custom Activity or Action with [flow](https://flow.built.io/)

If you have not yet integrated the Localytics SDK into your app then you can use [Localytics](https://docs.localytics.com/dev/push-api.html#getting-started)

Flow provides an action builder that lets you insert custom code and create an action that looks and works exactly the way other actions do.

To create a new custom action yo need to follow Some Conventions.
These conventions are mainly classified into 3 main blocks of program code as given below:

1. ``this.input``: This block includes the definition of form input fields.

2. ``this.output``: This block includes the definition of the output parameters that your action will return.

3. ``this.execute``: This block includes the program logic that will run inside Flow Engine.

 # request module: 
 
 This module helps you to make HTTP calls to third party applications. In order to do that, you need to provide values for following keys:

- ``Headers``: Pass the required values to create a connection.

- ``Method``: Specify the HTTP method to be used to make an API call.

- ``URL``: Provide the URL to which you wish to make HTTP request.

- ``Error handler``: Specify error handler function 'function (err,response,body)' for your action. If the action throws an error, it should return 'output(err)', and if the action is executed successfully, it should return 'output(body)'.
