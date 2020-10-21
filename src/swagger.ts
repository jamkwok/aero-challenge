import { getUsers, postUsers } from './openAPI/users.swagger';

const swaggerDocument = {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'Aero Challenge',
    description: 'A simple user Api',
    termsOfService: '',
    contact: {
      name: 'James Kwok'
    },
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
    }
  },
  components: {
    schemas: {},
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  },
  paths: {
    '/users': {
      get: getUsers,
      post: postUsers
    }
  }
};

export default swaggerDocument;
