import { fauna } from "../../../lib/faunadb"
import { query as q } from 'faunadb'
import { stripe } from "../../../lib/stripe"


export const saveSubscription = async (subscriptionId: string, customerId: string, createdAction = false) => {

    //buscar o usuário no banco de dados com id {customerId}//user_by_stripe_customer_id
    const user = await fauna.query(
        q.Select(
            "ref",
            q.Get(
                q.Match(
                    q.Index('user_by_stripe_customer_id'),
                    customerId
                )
            )
        )
    )


    //Salvar os dados da subscription no Banco de dados
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)//pegar todos os dados


    const subscriptionData = {
        id: subscription.id,
        userId: user,
        status: subscription.status,
        price_id: subscription.items.data[0]?.price.id,

    }

    if (createdAction) {
        await fauna.query(
            q.Create(
                q.Collection('subscriptions'),
                { data: subscriptionData }
            )
        )
    } else {
        //Replace vai atualizar todos os dados la
        await fauna.query(
            q.Replace(
                q.Select(
                    "ref",
                    q.Get(
                        q.Match(
                            q.Index("subscription_by_id"),
                            subscriptionId
                        )
                    )
                ),
                { data: subscriptionData }
            )
        )
    }
}
