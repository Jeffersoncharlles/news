import Stripe from 'stripe'
import { version } from '../../package.json'



export const stripe = new Stripe(
    process.env.STRIPE_API_KEY!,//! pq e opcional em .env
    {
        apiVersion: '2022-08-01',
        appInfo: {
            name: 'News',
            version
        }
    }
)
