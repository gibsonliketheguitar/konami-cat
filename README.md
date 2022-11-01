## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.


# Live Link
https://konami-cat.vercel.app/

## Enter Konamai password
injects3crets

## Assigned Requirement
[# The Konami Code.pdf](https://github.com/gibsonliketheguitar/konami-cat/files/9913226/The.Konami.Code.pdf)
```
# The Konami Code
You are the leader of Anonymous - the group of hackers. For the last couple of months your
main way of communication with your teammates was Twitter. Now FBI knows about it, and they
are following all your Twitter accounts. Before your group started using tweets, the Anonymous
hackers were using a secret website to share information. It looked like a standard website with
sweet kittens, but after typing the Konami Code, all of the secret messages were shown.
Unfortunately, the website is down, and the source code is lost. Your challenge is to develop this
kind of site from scratch to provide a way of communication for your teammates.
## Tasks
1) Create basic page with "Sweet kittens" header
2) Add JavaScript code that will do the following things:
- After typing Konami Code 'injects3crets' make a request for secret data(described under the
task)
- Display 5 newest issues names and nickname of the author
- After 15 seconds hide all issues
## Source of data
As a smart hacker, you've found a safe way to communicate - Using the names of the Github
issues to receive messages. Every day your teammates are posting
issues on a different repository and the name of every one is another secret message. Today
you and your team have choosed elixir language repository. To get the data just fetch JSON
form this URL: https://api.github.com/repos/elixir-lang/elixir/issues
## Prerequisites
1) 'ESC' key cancels currently written part of the Konami Code
2) Max timestamp between each next pressed key is 5 seconds(after that time Konami Code
should be reset)
3) Size of the letter matters(upper/lower case)
4) Do not use jQuery
## Helpful Links
If you don't know how the Konami Code looks like check this:
- https://en.wikipedia.org/wiki/Konami_Code

```

## Time Estimation
3 hours

## Actual Completion
6.5 hours

## TimeBreak Down
0.5 hr  - Set up int repo

1.0 hr  - Recalling how to fetch data, transforming data from reddit

1.0 hr  - Preview data does not work, decided to just use main thubmnail, and fix transformation of data

0.5 hr  - Thinking and setting up keystroke capture

1.5 hr  - Figuring out, implementing, and cleaning up the keypress timer

0.5 hr  - Fetching data when Komai code is implemented.

1.0 hr  - Transformation of messages data, refactor components, and deployment

0.5 hr  - Add top tier waifu Komi

## What should happen when Konami code is entered.
https://user-images.githubusercontent.com/66423127/199323339-4ff84b86-69a4-4a86-ac4d-51a990163e77.mp4

## Things I learned
1. Looking at the api json data, that think about what data you want before even coding
2. Time estimation 2x to 3x rule is real.
3. Can sort dates from newest to oldest with new Date(b) - new Date(a)