

export const postUsers = {
    tags: ['Users'],
    description: "Create a list of new users",
    operationId: 'postUsers',
    security: [
        {
            bearerAuth: []
        }
    ],      
    requestBody: {
        "content": {
            "application/json": {
                schema: {
                    example: [
                        {
                          "name": "james kwok",
                          "email": "james@james.com",
                          "meta": {
                            "isVerified": true,
                            "isExpired": false,
                            "addedOn": "addedOn"
                          }
                        }
                    ],
                    type: "array",
                    required: [ 'name', 'email', 'meta' ],
                    items: {
                        name: {
                            type: 'string',
                            description: 'user name'
                        },
                        email: {
                            type: 'string',
                            description: 'user email'
                        },
                        meta: {
                            type: 'object',
                            required: [ 'isVerified', 'addedOn' ],
                            properties: {
                                isVerified: {
                                    type: 'boolean',
                                    description: 'if verified'
                                },
                                isExpired: {
                                    type: 'boolean',
                                    description: 'if expired'
                                },
                                addedOn: {
                                    type: 'string',
                                    description: 'if added on'
                                }
                            }
                        }
                    }                 
                }
            }
        }
    },
    responses: {
        "200": {          
            description: "Create a list of new users",
            "content": {
                "application/json": {
                    schema: {
                        example: {
                            "status": "created"
                        },
                        type: "object",
                        description: 'creation status'                     
                    }
                }
            }
        }
    }
} 
export const getUsers = {
    tags: ['Users'],
    description: "Returns all users",
    operationId: 'getUsers',
    security: [
        {
            bearerAuth: []
        }
    ],
    responses: {
        "200": {          
            description: "A list of users.",
            "content": {
                "application/json": {
                    schema: {
                        example: [
                            {
                              "id": 1,
                              "name": "james kwok",
                              "email": "james@james.com",
                              "meta": {
                                "isVerified": true,
                                "isExpired": false,
                                "addedOn": "addedOn"
                              }
                            }
                        ],
                        type: "array",
                        required: [ 'name', 'email', 'meta' ],
                        items: {
                            id: {
                                type: 'number',
                                description: 'user identification number'
                            },
                            name: {
                                type: 'string',
                                description: 'user name'
                            },
                            email: {
                                type: 'string',
                                description: 'user email'
                            },
                            meta: {
                                type: 'object',
                                required: [ 'isVerified', 'addedOn' ],
                                properties: {
                                    isVerified: {
                                        type: 'boolean',
                                        description: 'if verified'
                                    },
                                    isExpired: {
                                        type: 'boolean',
                                        description: 'if expired'
                                    },
                                    addedOn: {
                                        type: 'string',
                                        description: 'if added on'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
} 