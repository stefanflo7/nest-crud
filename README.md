## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running the app using Docker

```bash
$ docker-compose up -d --build nest-crud
```

### Environment variables

I use [DotEnv](https://github.com/motdotla/dotenv) in this project.

| Variable                | Description                                               |
| ----------------------- | --------------------------------------------------------- |
| `POSTGRES_USER `        | The username for the PostgreSQL database connection.      |
| `POSTGRES_PASSWORD`     | The password for the PostgreSQL database connection.      |
| `POSTGRES_DB`           | The database name for the PostgreSQL database connection. |
| `DB_PORT`               | The port for the PostgreSQL database connection.          |
| `CLOUDINARY_API_KEY`    | The cloudinary API KEY.                                   |
| `CLOUDINARY_API_SECRET` | The cloudinary API SECRET.                                |
| `CLOUDINARY_CLOUD_NAME` | The cloudinary cloud name.                                |
| `JWT_SECRET`            | The JWT Secret key.                                       |

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

This project's idea is to implement a simple CRUD application using a 3 tier architecture: `Controller` -> `Service` -> `Entity`.  
This project consists of 3 different entities: `User`, `Observation`, `Image`.
The `Observation` controller contains endpoints for every single CRUD operation.
The `User` controller only contains endpoints for retrieving all the users and creating a single user.
The `Image` controller a single endpoint that fetches all the images.

Usually you can use this project in the following way:

#### 1. Create a user

```
curl --location --request POST 'http://localhost:3001/users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "YOUR_USERNAME",
    "password": "YOUR_PASSWORD"
}'
```

#### 2. Login with your credentials and get the JWT token

```
curl --location --request POST 'http://localhost:3001/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "YOUR_USERNAME",
    "password": "YOUR_PASSWORD"
}'
```

This step gives you a JWT access token which you can use for calling the only guarded route which is the default one: `/`. I only built it for testing purposes and I let the other endpoints unguarded in order to be easier to test.
Be aware that currently the JWT token expires every 60s. That means that after you log in with an username and a password you are only able to successfully call the guraded endpoint for the next minute.

#### 3. Call the default endpoint using the JWT token

```
curl --location --request GET 'http://localhost:3001' \
--header 'Authorization: Bearer YOUR_JWT_TOKEN'
```

Here you should modify the above code to change `YOUR_JWT_TOKEN` with the JWT token you got on the previous step.
If you do this in the first minute after getting the jwt token you should be able to get a response with a `Hello World!` string.
If the JWT is not correct or 1 minute already passed, you should get an error of this type:

```
{
    "statusCode": 401,
    "message": "Unauthorized"
}
```

#### 4. Creating an Observation

```
curl --location --request POST 'http://localhost:3001/observations' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "observation name",
    "description": "observation description",
    "date": "2022-03-06T11:00:00.000Z",
    "userId": "2728f189-4442-4a59-8626-3b40cc50bfe7"
}'
```

In order to create an observation a user should already be present. You should get an userId(by calling a `GET` request on this endpoint for example `http://localhost:3001/users`) and inside the body of the `POST` request you should pass as in the example the `name`, `description`, `date` and `userId` of the observation.

#### 5. Adding an image to the Observation

In order to be able to upload files to [Cloudinary](https://cloudinary.com/) you should create a free acount and add your `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `CLOUDINARY_CLOUD_NAME` inside `.env` file.
After doing that run `source .env` inside the terminal in order to load the variables from the env file.

curl --location --request POST 'http://localhost:3001/observations/YOUR_OBSERVATION_ID/image' \
--header 'Content-Type: application/json' \
--data-raw '{
"imageUrl":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSff8JL9ALjQrQ11mS8MNLOGgyOXjRTJEckCA&usqp=CAU"
}'

As in the above example, an observation ID should be passed to the POST endpoint, so you should change `YOUR_OBSERVATION_ID` to your observationId.

This endpoint uploads a file to your cloudinary cloud and returns to you all the images attached to the observation.
There could be up to 10 images attached for a single observation.

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
