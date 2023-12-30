---
title: 'How to setup a Stripe Webhook'
status: 'published'
author:
  name: 'Tim Moreton Jr'
  picture: 'https://avatars.githubusercontent.com/u/5090418?v=4'
slug: 'stripe-webhook'
description: ''
coverImage: ''
publishedAt: '2023-12-29'
---

```jsx
import Stripe from 'stripe'
import getRawBody from 'raw-body'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
})

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  try {
    const sig = req.headers['stripe-signature'];
    const rawBody = await getRawBody(req);
    const event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET)
    // @ts-ignore
    switch (event.type) {
      case 'customer.subscription.updated':
        // Do stuff here
        break;
      case 'customer.subscription.created':
        // Do stuff here
        break;
      case 'customer.subscription.deleted':
        // Do stuff here
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    return res.status(200).json({ data: event })
  } catch (e) {
    console.error(e)
    throw new Error(e)
  }
}
```