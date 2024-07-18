import userModel from "../models/users.js"

const resolvers = {
    Query: {
        async getUsers() {
            const users = await userModel.find({})
            return users
        },
        async getUser(_, args) {
            const user = await userModel.findById(args.id)

            if(user) {
                return { 
                    response: {
                        code: 1,
                        msg: 'success', 
                    },
                    user 
                }
            }
            return {
                response: {
                    code: 0,
                    msg: 'failure',
                },
            } 
        }
    },
    Mutation: {
        async addUser(_, args) {       
            try {
                await userModel.create(args.user)
                console.log('added')

                return {
                    code: 1,
                    msg: 'success'
                }
            } catch(err) {
                console.error(err)

                return {
                    code: 0,
                    msg: 'failure'
                }
            }
        },
        async deleteUser(_, args) {
            try {
                await userModel.findByIdAndDelete(args.id)
                console.log('deleted')

                return {
                    code: 1,
                    msg: 'success'
                }
            } catch(err) {
                return {
                    code: 0,
                    msg: 'failure'
                }
            }
        }
    }
}

export default resolvers