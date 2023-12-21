---
title: 'Email Capture with Nodemailer'
status: 'published'
author:
  name: 'Tim Moreton Jr'
  picture: 'https://avatars.githubusercontent.com/u/5090418?v=4'
slug: 'email-capture-with-nodemailer'
description: 'The first thing we do when we get a landing page up and running to test out an idea is that there''s one main feature that''s a requirement, and that''s a way to capture emails from potential customers. A longer-term solution is using a service like Mailchimp, Klaviyo & etc but to get something up and running quickly we can just use Nodemailer to send ourselves the emails of potential customers.'
coverImage: ''
publishedAt: '2023-10-11T13:52:24.888Z'
---

The first thing we do when we get a landing page up and running to test out an idea is that there's one main feature that's a requirement, and that's a way to capture emails from potential customers. A longer-term solution is using a service like Mailchimp, Klaviyo & etc but to get something up and running quickly we can just use Nodemailer to send ourselves the emails of potential customers. Below we will create our own mini email service that will leverage Next.js API endpoints for Node functionality without having to decide between the hundreds of newsletter services just yet.

Prerequisites: Before diving into the implementation, ensure you have the following prerequisites:

1. Basic understanding of JavaScript and Node.js
2. Familiarity with Next.js framework
3. Node.js and npm (Node Package Manager) installed on your machine
4. A Next.js project is set up and ready for development

## Step 1: Setting up the Next.js Project

Assuming you have a Next.js project already initialized, open your project in your preferred code editor. If you don't have a project set up, follow the official Next.js documentation to create a new one.

## Step 2: Installing Nodemailer

To use Nodemailer in your Next.js project, open your terminal and navigate to your project directory. Run the following command to install the Nodemailer package:

```bash
npm install nodemailer
```

## Step 3: Creating a Newsletter Form

In your Next.js project, locate the page or component where you want to display the newsletter form. Add an HTML form element that includes an input field for the email address and a submit button. Here's an example:

### components/NewsletterForm.jsx

```jsx
import React, { useState } from 'react'

const NewsletterForm = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch(`/api/nodemailer`, {
      body: JSON.stringify({
        email: inputEl.current.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Subscribe</button>
    </form>
  )
}

export default NewsletterForm
```

## Step 4: Implementing Nodemailer Functionality

Inside the `handleSubmit` function in your newsletter form component, you will capture the user's email address and send it via Nodemailer to your desired email destination. Modify the `handleSubmit` function as follows:

### api/nodemailer.js

```js
const nodemailer = require('nodemailer')

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const { email } = req.body
  if (!email) {
    return res.status(400).json({ error: 'Email Is Required' })
  }

  // Double check its a valid email
  const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
  if (email === '' || !email.match(emailFormat)) {
    return res.status(400).json({ error: 'Invalid Email' })
  }

  const message = {
    from: process.env.EMAIL_ADDRESS,
    to: 'EMAIL YOU WANT TO SEND TO',
    subject: `${req.body.email} signed up for the newsletter`,
    html: `<p>${req.body.email} signed up for the newsletter</p>`,
  }

  let transporter = nodemailer.createTransport({
    host: 'my.smtp.host',
    secure: false,
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  })

  try {
    // IMPORTANT to add await below as without it, it will work in development but not in vercel when testing in production
    await transporter.sendMail(message)
    return res.status(201).json({ error: null })
  } catch (error) {
    return res.status(500).json({ error: error.message || error.toString() })
  }
}
```

Make sure to replace the email provider settings, such as `user` and `pass`, with your actual email and password. Additionally, update the \`to

`field in the`mailOptions\` object to specify the destination email address where you want to receive the captured email subscriptions.

## Step 5: Integrating the NewsletterForm Component

To use the `NewsletterForm` component, import it into the page or component where you want to display the newsletter form. For example:

```jsx
import React from 'react'
import NewsletterForm from '../components/NewsletterForm'

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to My Newsletter</h1>
      <NewsletterForm />
    </div>
  )
}

export default HomePage
```

## Step 6: Styling and Customization

Feel free to style the newsletter form and adapt it to your project's design. You can add CSS classes, apply custom styles, or use popular CSS frameworks like Tailwind CSS or Bootstrap.