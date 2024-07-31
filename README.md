# Next.js & PocketBase Demo that supports SSR & App Router




[![Watch the video](https://blog.saif-hassan.com/wp-content/uploads/2024/07/screencast_00000.mp4)](https://blog.saif-hassan.com/wp-content/uploads/2024/07/screencast_00000.mp4)


### Pages

- Login
- Signup
- Account Page (to edit user meta or password)

### Features

- Turnstile captcha protection for login and signup pages
- Basic CSRF protection for account pages
- In-memory rate limiter
- Protected dashboard page
- Middleware

> [!IMPORTANT] 
> The in-memory rate limiter will only work if you're deploying to a VPS. If you're hosting on something 
> like Vercel, [please remove this part](https://github.com/Babylon1999/nextjs-pocketbase-starter-ssr/blob/0c69916e67fbafb360368facad5742e4c877e9de/pb/pbAccount.ts#L27-L32).
> 
# Instructions

## Pocketbase

### Generate key
First, create a folder named `pb_hook` next to your Pocketbase executable. Inside it, create a file named `main.pb.js` and add the code snippet below to it. Make sure to replace `your-secure-api-key-here` with a long random string. 

Without this key, Pocketbase will return a `403` error.

```javascript
function donotLetAnyoneIn(next) {
  return (c) => {
    const header = c.request().header.get("X-POCKETBASE-API-KEY");
    const secureAPIkey = "your-secure-api-key-here";
    if (header !== secureAPIkey) {
      throw new ForbiddenError("What are you doing here?");
    }
    return next(c);
  }
}

routerUse(donotLetAnyoneIn);
```
### Modify Users Schema

In order for the account page to work, you need to add two fields to the users collection `secret` (text) and `secretExpire` (number). These will be used in the form submission for CSRF protection.


## Environment Variables

There's already a  `.env.example` file, you only need to rename it to `.env` and add your values.

This demo uses [CloudFlare Turnstile](https://www.cloudflare.com/en-gb/products/turnstile/) captcha to secure the login/signup pages. If you don't have a Cloudflare account, you'll need to sign up.

 To generate your keys go to  `Dashboard` -> `Turnstile` -> `Add site`.

```env
# Your Pocketbase URL
PB_URL=http://127.0.0.1:6969

# Next.js website URL
WEBSITE_URL=http://localhost:3000

# Long secret key created earlier
SECURE_API_KEY=pBHsob5OszL5gD9cJT7tBKnGMQ7oTi9BmbVKLMxZdh0K7xEiOmKYqR59k8NIO7eb5LtM5Qvev9K8tLnOLvTCBnejiiR5HJ3x9BXvqLITjod7AAaeWEUT0E9I2Ti5sjO3

# Public key shipped to the browser
NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY=0x4AA

# Secret key used to validate the token on the server side
CLOUDFLARE_TURNSTILE_SECRET_KEY=0x4A
```


## NEXT.JS

To install the packages:

    npm run install


To run or build the app:

```
npm run dev

npm run build

npm run start

// will run both build and start
npm run preview
```

## Accessing the admin dashboard

Since your `pb` instance now expects an API key in the header, you will no longer be able to access the admin dashboard as well. 

To fix this, you'll need to pass your API key in the request header via something like [Requestly](https://requestly.com/).

