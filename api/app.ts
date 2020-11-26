import { server } from './server'

server.listen(process.env.SERVER_PORT).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})