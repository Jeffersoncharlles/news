import { NextApiRequest, NextApiResponse } from "next"

import Stripe from "stripe";
import { stripe } from "../../lib/stripe";
import { buffer } from "../../utils/createBuffer";


const relevantEvents = new Set([
    'checkout.session.completed'
])


export const config = {
    api: {
        bodyParser: false
    }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method === 'POST') {
        const buf = await buffer(req)
        const secret = req.headers['stripe-signature'] as string

        //================================= construir evento ===========================//
        let event: Stripe.Event
        try {
            event = stripe.webhooks.constructEvent(buf, secret, process.env.STRIPE_WEBHOOK_SECRET!)
        } catch (error: any) {
            res.status(400).send(`WebHook error: ${error.message}`)
        }
        const { type } = event


        //================================= verificar o evento ===========================//
        if (relevantEvents.has(type)) {
            console.log('evento recebido', event)

            try {
                switch (type) {
                    case 'checkout.session.completed':

                        break;
                    default:
                        throw new Error('unhandled event.')
                }
            } catch (error) {
                return res.json({ error: 'webhook handler failed' })
            }
        }



        //================================= construir evento ===========================//

        res.json({ received: true })
    } else {
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method not allowed')
    }
}
