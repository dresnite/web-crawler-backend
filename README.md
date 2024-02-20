# Web Crawler 

This project serves as the backend for a web crawler website, providing an interface to extract links from given URLs

## Installation

To install the project, follow these steps:

1. **Install Node.js**: Make sure you have the latest version of Node.js installed on your system.

2. **Clone the Repository**: Clone the project repository to your local machine using the following command:

    > git clone https://github.com/dresnite/web-crawler-backend

3. **Install Dependencies**: Navigate into the project directory and install the necessary dependencies using npm:

    > npm install --save-dev


4. **Set Environment Variables**: Before running the server, you need to set up the required environment variables. These variables are used for configuration purposes. Here's a breakdown of the environment variables and their purposes:
- `DEVELOPMENT`: Set this to `true` for development mode.
- `MONGODB_URI`: MongoDB connection URI. Default: `mongodb://localhost:27017/crawlerDev`.
- `PORT`: Port number for the server. Default: `3001`.
- `JWT_SECRET`: Secret key for JWT token generation.
- `REDIS_URI`: Redis connection URI. Default: `redis://localhost:6380`.
- `CLIENT_URL`: URL of the client application. Default: `http://localhost:3000`.

5. **Start the Server**: Once the environment variables are set, you can start the local server using the following command:

    > npm run dev


## Running with Docker

If you prefer using Docker, you can easily set up Redis and MongoDB containers to save you some time. Here's how:

### Redis Container

> docker run -p 6380:6379 --name redis_container_name -d redis


### MongoDB Container

> docker run -p 27017:27017 --name mongo_container_name -d mongo


I intend to turn this project into a containerized applications, but I haven't had enough time to get that done yet.

## Technologies Used

The project utilizes the following technologies:

- **GraphQL** ([PR #1](https://github.com/dresnite/web-crawler-backend/pull/2)): Used for managing crawling jobs.
- **MongoDB and Mongoose**: Database for storing crawler data.
- **BullMQ** ([PR #3](https://github.com/dresnite/web-crawler-backend/pull/3)): Background job processing for crawling jobs, allowing for horizontal scalability.
- **Cheerio**: Library for web scraping and crawling.

For more detailed information, please refer to the relevant Pull Requests in the repository.

Feel free to reach out if you have any questions or need further assistance!


