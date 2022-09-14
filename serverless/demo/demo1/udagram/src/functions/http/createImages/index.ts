import { handlerPath } from "@libs/handler-resolver";

export default {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            http: {
                method: 'post',
                path: 'groups/{groupId}/images',
                cors: true,
                request: {
                    schemas: {
                        'application/json': '${file(models/create-image-request.json)}'
                    }
                }
            },
        },
    ],
};