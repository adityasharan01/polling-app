# Polling App Backend

A RESTful API backend for a real-time polling application built with Node.js, Express, and MongoDB.

## Project Structure

```
backend/
├── src/
│   ├── routes/
│   │   └── poll.routes.js
│   ├── controllers/
│   │   └── poll.controller.js
│   ├── models/
│   │   └── poll.model.js
│   ├── config/
│   │   └── db.config.js
│   └── app.js
├── .env
└── package.json
```


## API Endpoints

### Polls

|
 Method 
|
 Endpoint 
|
 Description 
|
|
--------
|
----------
|
-------------
|
|
 GET 
|
`/api/polls`
|
 Get all polls 
|
|
 POST 
|
`/api/polls/new`
|
 Create a new poll 
|
|
 GET 
|
`/api/polls/:id`
|
 Get a specific poll 
|
|
 PUT 
|
`/api/polls/:id/vote`
|
 Vote on a poll 
|

### Request & Response Examples

#### Create a Poll

Request:
```json
POST /api/polls
{
    "question": "What's your favorite programming language?",
    "options": [
        "JavaScript",
        "Python",
        "Java",
        "C++"
    ]
}
```

Response:
```json
{
    "id": "123abc...",
    "question": "What's your favorite programming language?",
    "options": [
        {
            "text": "JavaScript",
            "votes": 0
        },
        {
            "text": "Python",
            "votes": 0
        },
        {
            "text": "Java",
            "votes": 0
        },
        {
            "text": "C++",
            "votes": 0
        }
    ],
    "totalVotes": 0,
    "createdAt": "2024-02-16T10:00:00.000Z",
    "updatedAt": "2024-02-16T10:00:00.000Z"
}
```

#### Vote on a Poll

Request:
```json
PUT /api/polls/123abc.../vote
{
    "optionIndex": 0
}
```

Response:
```json
{
    "id": "123abc...",
    "question": "What's your favorite programming language?",
    "options": [
        {
            "text": "JavaScript",
            "votes": 1
        },
        // ... other options
    ],
    "totalVotes": 1
}
```
