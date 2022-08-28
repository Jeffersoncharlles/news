import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { query as q } from 'faunadb'
import { fauna } from "../../../lib/faunadb"


export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        // ...add more providers here
    ],
    callbacks: {
        async signIn({ user, account, profile, credentials }) {

            try {
                //create db data
                await fauna.query(
                    q.Create(
                        q.Collection('users'),
                        { data: { email: user.email } }
                    )
                )
                ////


                return true
            } catch (error) {

                return false
            }

        },
    }
})
