'use strict'

const data = [
    {
        id: '1',
        name: "Dogs",
        description: 'Only dog images here'
    },
    {
        id: '2',
        name: "Nature",
        description: 'What can be a better object for photography'
    },
    {
        id: '3',
        name: "cities",
        description: 'Creativ display of Urban settings'
    }
]

exports.handler = async (event) =>{
    console.log('Processing event: ', event)

    return {
        statusCode: 200,
        headers:{
            'Acess-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            items: data
        })
    }
}