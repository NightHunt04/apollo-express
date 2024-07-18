# Apollo with express and mongo [simple demonstration]

Integrating Apollo i.e., a library/tool for building data graphs with GraphQl with Express along with Mongo as a database.


## Endpoint

Base URL: `https://apollo-express.vercel.app`

Endpoint for graphql api: `/api/graphql`

Send a POST request on this endpoint by cURL given below:
```
curl --request POST \
  --header 'content-type: application/json' \
  --url 'https://apollo-express.vercel.app/api/graphql' \
  --data '{"query":"query { getUsers { username } }"}'
```
The above code, may give you a response with all the usernames stored inside the database.
This api and database are just for the demonstration purpose.

Along with the `username`, you can get `id (MongoDB object id)`, `email (mock email)`, `ipAddress (fake)` from the database using the gql.



## Resolvers

The methods for retrieving or manipulating data inside the database for this api are:

### Query

`getUsers` <-- retrieves all the users stored

```
query get {
    getUsers {
        id
        username
        email
        ipAddress
    }
}
```

The above request is to retrieve every information regarding user stored in DB.

`getUser(id: ID!)` <-- retrieve a single user by providing it's id

```
query get($id: ID!) {
    getUser(id: $id) {
        id
        username
        email
        ipAddress
    }
}
```

### Mutation

`addUser(user: AddUserInput!)` <-- adds a new user in DB

```
mutation add($user: AddUserInput!) {
	addUser(user: $user) {
		code
		msg
	}
}
```

Variables for above request are down below:
```
{
	"user": {
		"username": "nginxCoffeeShake",
		"email": "cofee@latte.shake",
		"ipAddress": "255.255.255.255"
	}
}
```

`deleteUser(id: ID!)` <-- deletes a user by it's id

```
mutation del($id: ID!) {
	deleteUser(id: $id) {
		code
		msg
	}
}

```

Variables for above request are down below (example):
```
{
    "id": "6698d3ec92af1695bc1147dc"
}
```
