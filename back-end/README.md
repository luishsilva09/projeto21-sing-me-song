<p align="center"> 
    <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/320/apple/225/studio-microphone_1f399.png">
</p>

<h1 align="center">Sing me a Song</h1>

<div align="center">
  <h3>Built With</h3>
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
 <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>  
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" heigth="30px">
  <img src="https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white">
  <!--  Badges  source:  https://dev.to/envoy_/150-badges-for-github-pnk  -->
</div>

# Description

Sing a Song is aplication for anonymous song recommendation. The more people like a recommendation, the more likely it is to be recommended to other.

# Features

- Create recommendation
- Upvote to recommendation
- Downvote to a recommendation
- Get 10 last recommendations
- Get a random recommendation
- Get top recommendations
- Get only one recommendation

# API references

### Create recommendation:

```http
    POST /recommendations
```

Request:
|Body | Type | Description |
|----------------|--------|---------------------------|
|`name` |`string`|**Reuqired**. name recommendation |
|`youtubeLink` |`string`|**Reuqired**. youtube link video|

</br>

### Upvote to recommendation:

```http
    POST /recommnedations/{id}/upvote
```

Request:

| Params | Type     | Description                     |
| ------ | -------- | ------------------------------- |
| `id`   | `number` | **Reuqired**. recommendation id |

</br>

### Downvote to recommendation:

```http
    POST /recommnedations/{id}/downvote
```

Request:

| Params | Type     | Description                     |
| ------ | -------- | ------------------------------- |
| `id`   | `number` | **Reuqired**. recommendation id |

`for recommendations with points less than 5 will be deleted`

</br>

### Get 10 last recommendations:

```http
    GET /recommendations
```

Response:

```json
[
  {
    "id": 1,
    "name": "Chitãozinho E Xororó - Evidências",
    "youtubeLink": "https://www.youtube.com/watch?v=ePjtnSPFWK8&ab_channel=CHXVEVO",
    "score": 245
  }
]
```

</br>

### Get a random recommendation:

```http
    GET /recommendations/random
```

Response:

```json
{
  "id": 1,
  "name": "Chitãozinho E Xororó - Evidências",
  "youtubeLink": "https://www.youtube.com/watch?v=ePjtnSPFWK8&ab_channel=CHXVEVO",
  "score": 245
}
```

</br>

### Get top recommendations:

```http
   GET /recommendations/top/{amount}
```

Request:

| Params   | Type     | Description                      |
| -------- | -------- | -------------------------------- |
| `amount` | `number` | **Reuqired**. length of response |

Response:

```json
[
	{
		"id": 150,
		"name": "Chitãozinho E Xororó - Evidências",
		"youtubeLink": "https://www.youtube.com/watch?v=ePjtnSPFWK8&ab_channel=CHXVEVO",
		"score": 245
	},
	{
		"id": 12,
		"name": "Falamansa - Xote dos Milagres",
		"youtubeLink": "https://www.youtube.com/watch?v=ePjtnSPFWK8&ab_channel=CHXVEVO",
		"score": 112
	},
	...
]
```

</br>

### Get only one recommendation:

```http
   GET /recommendations/{id}
```

Request:

| Params | Type     | Description                     |
| ------ | -------- | ------------------------------- |
| `id`   | `number` | **Reuqired**. recommendation id |

Response:

```json
{
  "id": 1,
  "name": "Chitãozinho E Xororó - Evidências",
  "youtubeLink": "https://www.youtube.com/watch?v=ePjtnSPFWK8&ab_channel=CHXVEVO",
  "score": 245
}
```

</br>

# Tests

To run this test, you will need to add the following environment variables to your .env.test file

`DATABASE_URL = postgres://UserName:Password@Hostname:5432/DatabaseName`

`PORT = number #recommended:4000`

To run all test:

```bash
    npm run test
```

To run unit test:

```bash
    npm run test:unit
```

To run integration test:

```bash
    npm run test:integration
```

# Run Locally

Clone the project:

```bash

  git clone https://github.com/luishsilva09/

```

Install dependencies:

```bash

  npm install

```

Configuration and create database:

```bash

  npx prisma migrate dev

```

To run:

```bash
npm start
```

# Environment Variables

To run this project in local, you will need to add the following environment variables to your .env file

`DATABASE_URL = postgres://UserName:Password@Hostname:5432/DatabaseName`

`PORT = number #recommended:4000`

`NODE_ENV = test` just use this for run test with your frontend

# Authors

​

- Luís Henrique da Silva

​

https://github.com/luishsilva09
