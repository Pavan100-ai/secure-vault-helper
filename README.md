# Password Guardian

Build a password strength checker web app with the following features:

1. A password input field with a "show/hide password" toggle

2. Real-time strength analysis as the user types, using the zxcvbn 

   JavaScript library (npm package: zxcvbn) for entropy-based scoring

3. A visual strength meter (progress bar) with 5 levels: 

   Very Weak, Weak, Fair, Strong, Very Strong — color coded 

   (red to green)

4. Display estimated "time to crack" based on zxcvbn's crack-time 

   estimate output

5. Show specific feedback on WHY the password is weak (e.g. "too 

   short", "common word", "predictable pattern") using zxcvbn's 

   feedback.warning and feedback.suggestions

6. A checklist showing pass/fail for: minimum length (8+), 

   uppercase letter, lowercase letter, number, special character

7. Clean, modern dark-themed UI with a card layout, centered on 

   the page

8. Add a small disclaimer at the bottom: "This tool runs entirely 

   in your browser. Your password is never sent or stored anywhere."

Use React with Tailwind CSS. Keep the design minimal and professional, 

similar to a security tool dashboard.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://secure-vault-helper.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/feda2d3e-7e72-4559-bfdc-e58c704d5c7b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
