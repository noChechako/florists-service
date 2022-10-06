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
	securityDefinitions: {},
	definitions: {},
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
					"_id": "632add196a27c57f3ecf1ab2",
					"email": "test@gmail.com",
					"username": "username",
					"password": "password",
					"role": {
						"enum": [
							"ADMIN",
							"USER"
						]
					}
			},
			"AccessToken": {
					"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluMTIiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2NjQ3OTQ2NDMsImV4cCI6MTY2NDc5NTg0M30.UdETDmIqA1Yaf5n6aaQjM61YtxDVBP7w0M7hgiwzUkk"
			},
			"UserAuth": {
					"username": "username",
					"password": "password"
			},
			"UserInput": {
					"email": "test@gmail.com",
					"username": "username",
					"password": "password",
					"role": {
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
