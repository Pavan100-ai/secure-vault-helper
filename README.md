# 🔐 Password Guardian

A real-time password strength checker built to demonstrate practical 
understanding of password security and entropy-based scoring, created 
as part of my cybersecurity coursework.

## 🎯 Why I Built This

Most password checkers rely on simple rules (length, special characters) 
which don't reflect real-world crackability. I wanted to build a tool 
that uses actual entropy-based analysis, similar to what security 
professionals use, to understand how password strength is really measured.

## ✨ Features

- Real-time strength scoring using the zxcvbn library (entropy-based)
- Estimated time-to-crack for the entered password
- Visual strength meter with 5 levels (Very Weak to Very Strong)
- Checklist for length, uppercase, lowercase, numbers, special characters
- Strong random password generator
- Copy-to-clipboard button
- Warning if password matches common leaked passwords
- 100% client-side — no password is ever sent or stored

## 🛠️ Tech Stack

- React
- Tailwind CSS
- zxcvbn (Dropbox's password strength estimation library)

## 📸 Screenshot

*(screenshot goes here — I'll show you how to add it next)*

## 🧠 What I Learned

- How entropy-based password scoring differs from simple rule-based checks
- Why "security-by-design" matters — never storing or transmitting sensitive input
- How to structure a React project and use component-based UI

## 🔮 Future Improvements

- Integrate Have I Been Pwned API for real breach checking
- Add password history tracking

## 📄 License

MIT
