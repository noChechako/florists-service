const options = {
	openapi: '3.0.0',
	autoHeaders: false,
}
const swaggerAutogen = require('swagger-autogen')(options);

const doc = {
	info: {
		version: '1.0.0',
		title: 'Florists',
		description: 'Florists Application API',
		license: {
			name: 'MIT',
			url: 'https://opensource.org/licenses/MIT'
		}
	},
	security: [
		{
			bearerAuth: []
		}
	],
	host: 'localhost:3000',
	basePath: '/',
	schemes: [
		'http'
	],
	consumes: [
		'application/json'
	],
	produces: [
		'application/json'
	],
	securityDefinitions: {},  // by default: empty object
	definitions: {},          // by default: empty object (Swagger 2.0)
	components: {
		securitySchemes: {
			bearerAuth: {
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT'
			}
		},
		"schemas": {
			"UserOutput": {
					"_id": {
						"type": "string"
					},
					"email": {
						"type": "string"
					},
					"username": {
						"type": "string"
					},
					"password": {
						"type": "string"
					},
					"role": {
						"type": "string",
						"enum": [
							"ADMIN",
							"USER"
						]
					}
			},
			"AccessToken": {
					"accessToken": {
						"type": "string"
					}
			},
			"UserAuth": {
					"username": {
						"type": "string"
					},
					"password": {
						"type": "string"
					}
			},
			"UserInput": {
					"email": {
						"type": "string"
					},
					"username": {
						"type": "string"
					},
					"password": {
						"type": "string"
					},
					"role": {
						"type": "string",
						"enum": [
							"ADMIN",
							"USER"
						]
					}
			}
		},
		"examples": {
			"UserNotFoundException": {
				"value": {
					"code": "UserNotFoundException",
					"message": "User with id 632add196a27c57f3ecf1ab2 not found"
				}
			},
			"UnauthorizedException": {
				"value": {
					"code": "UnauthorizedException",
					"message": "Unauthorized"
				}
			},
			"InternalServerError": {
				"value": {
					"code": "InternalServerError",
					"message": "Internal server error"
				}
			}
		}
	}
};

const outputFile = '../swagger-output.json';
const endpointsFiles = ['./app.ts'];

swaggerAutogen(outputFile, endpointsFiles, doc);
