import express from 'express'
// import http from 'http'
// import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginLandingPageProductionDefault } from '@apollo/server/plugin/landingPage/default';
import cors from 'cors'
import { ApolloServer } from '@apollo/server' 
import { expressMiddleware } from '@apollo/server/express4'
import connectMongoDB from './connectMongo.js'
import dotenv from'dotenv'

dotenv.config()

import typeDefs from './schema/apolloSchema.js'
import resolvers from './resolvers/resolvers.js'

const PORT = 8000 || process.env.PORT
const app = express()
// const httpServer = http.createServer(app)

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true
})

// start apollo graphql server
await apolloServer.start()

// connect mongo db
connectMongoDB(process.env.MONGO_URL)
.then(() => console.log('Mongo connected'))

app.use(cors())
app.use(express.json())

// use apollo provided middleware to integrate with express
app.use('/api/graphql', expressMiddleware(apolloServer))

app.get('/', (req, res) => res.send(`<p>server is running 🚀</p>
    <p>GraphQl endpoint : /api/graphql</p>    
    `))

app.listen(PORT, () => console.log(`🚀 Listening on port : ${PORT}`))

export default app

// await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve))
// console.log(`🚀 Server ready at http://localhost:${PORT}/`);