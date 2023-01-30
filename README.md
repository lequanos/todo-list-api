# todo-list-api

Api for the todo list created with NodeJs

## Install

To install the dependencies :

```bash
npm i
```

Create a .env file following the .env.example file.

If you want to receive the email, you have to create an account on [Mailjet](https://www.mailjet.com/fr/).
You will have to create the API key and Secret key and register a sender email.

Create first a docker network:

```bash
docker network create -d bridge my-bridge-network
```

To run the app :

```bash
docker compose up
```
