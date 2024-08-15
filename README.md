## _Devstars Challenge_

#### _Alejandro Herrera_

For this project, the main milestone its a simple kanban board.

```
Develop "Mini Trello/Kanban" interface - With Drag & Drop of cards between columns, Basic Add / Remove / Update Card

Frontend: React / Hooks + Tailwind css (or equivalent) / Apollo Client GraphQL (no redux preferably)
Backend: Python / Graphene
DB: DynamoDB Local

Notes:
•⁠  ⁠The Trello/Kanban like interface must be implemented from scratch not re-using a fully featured Kanban board package. However the drag and drop functionality can leverage a react library
•⁠  ⁠The stack is pretty much what our production stack is - so that gives an idea of our production stack

Bonus: Package / Run App in Docker container and/or AWS
```

## Main Features

- API GraphQl to perform crud operations on 3 entities(Board, Columns, Cards).
- Kanban Board (React, tailwind)

## Tech

For this project, I am using:

- [Python] - FastAPI, starlette_grapql
- [Docker] - To deploy locally.
- [NodeJs] - React for the frontEnd

## Requirements

```
-Docker
-MakeFile
```

## Environment Variables

For correct deployment, create your own `.env` file. on each project

```sh
# for API put on ./api/.env
DYNAMODB_URL=http://dynamodb:8000
AWS_REGION="us-east-1"
AWS_ACCESS_KEY_ID=Akira
AWS_SECRET_ACCESS_KEY=secrets
```

```sh
# for API put on ./app/.env
VITE_REACT_APP_GRAPHQL=http://localhost:8000/graphql
```

## Installation

All the commands are simplified using a Makefile. [Makefile tutorial](https://makefiletutorial.com/#why-do-makefiles-exist)

#### Run

just run

```sh
make start-local
```

if its a windows env you could try with the bat file
```
run_project.bat
```

---

