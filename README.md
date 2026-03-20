# Sai Aakarsh Padma — Portfolio

> Backend · Fullstack · ML/AI Engineer
> Live at [https://Aakarsh2000.github.io/portfolio](https://Aakarsh2000.github.io/portfolio)

## Tech Stack

| Layer | Technology |
|---|---|
| UI | React 18, Framer Motion, Tailwind CSS |
| Routing | React Router v6 (HashRouter for GH Pages) |
| AI Chatbot | Google Gemini Pro (`@google/generative-ai`) |
| Build | Create React App (react-scripts 5) |
| Deploy | GitHub Actions → `gh-pages` |

## Features

- **Hero section** — animated typewriter role display, constellation canvas, floating particles
- **About** — bio, education, code-block easter egg
- **Skills** — 4 categories (Backend / Frontend / ML-AI / DevOps), animated skill bars with proficiency levels
- **Experience** — expandable timeline cards for 3 roles (Exo Imaging, TAMU, ZEE)
- **Projects** — filterable card grid with tech tags and GitHub links (7 projects)
- **Contact** — mailto-based form + social links
- **AI Chatbot** — floating Gemini Pro chat widget with typing indicator, session history, and quick-prompt chips

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Set up environment
cp .env.example .env
# Edit .env and add your Gemini API key

# 3. Start dev server
npm start
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment

### GitHub Actions (automatic)

Every push to `main` triggers the workflow in `.github/workflows/deploy.yml`.

**Required secret in GitHub repo settings:**

| Secret | Value |
|---|---|
| `REACT_APP_GEMINI_API_KEY` | Your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey) |

### Manual deploy

```bash
npm run deploy
```

This runs `npm run build` then pushes the `build/` folder to the `gh-pages` branch.

## Environment Variables

```bash
# .env (never commit this file)
REACT_APP_GEMINI_API_KEY=your_key_here
```

The chatbot gracefully falls back to a helpful message when the key is not set.

## Project Structure

```
portfolio/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Navbar.js       # Sticky nav with Intersection Observer
│   │   ├── Hero.js         # Canvas constellation + typewriter
│   │   ├── About.js        # Bio, education, code snippet
│   │   ├── Skills.js       # Tabbed skill bars
│   │   ├── Experience.js   # Expandable timeline
│   │   ├── Projects.js     # Filterable card grid
│   │   ├── Contact.js      # Mailto form + socials
│   │   └── Chatbot.js      # Gemini Pro chat widget
│   ├── data/
│   │   └── resumeData.js   # All content + PERSONA_CONTEXT
│   ├── App.js
│   ├── index.js
│   └── index.css           # Tailwind + custom styles
├── .github/workflows/deploy.yml
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## Links

- GitHub: [github.com/Aakarsh2000](https://github.com/Aakarsh2000)
- LinkedIn: [linkedin.com/in/saip2k](https://www.linkedin.com/in/saip2k/)
- Email: saiaakarshp@gmail.com
