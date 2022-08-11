exports.handler = async (event) => {
    // TODO implement
    console.log('Event: ', event)

    return{
        result: "welcome to Udacity",
        taste: `Hello ${event.name}!`
    }
 };
