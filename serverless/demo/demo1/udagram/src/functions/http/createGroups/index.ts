import { handlerPath } from "@libs/handler-resolver";

export default {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            http: {
                method: 'post',
                path: 'createGroups',
                cors: true,
                request: {
                    schemas: {
                        'application/json': '${file(models/create-group-request.json)}'
                    }
                }
            },
        },
    ],
};