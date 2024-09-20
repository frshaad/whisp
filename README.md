# Whisp

Whisp is a lightweight and modern social media application where users can create posts, interact with others, and stay updated with trending content. Inspired by the simplicity of Twitter, Whisp is built on the MERN (MongoDB, Express, React, Node.js) stack, designed for speed, scalability, and an excellent user experience.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **User Authentication:** Sign up, log in, and log out securely.
- **Posting & Interactions:** Create posts, like, and comment on other users' posts.
- **Live Feeds:** Get real-time updates of what's happening.
- **Responsive Design:** Fully responsive for a smooth mobile and desktop experience.
- **Notifications:** Stay informed about the latest activity and interactions.
- **Profile Management:** Manage your profile details, bio, and preferences.
- **Dark Mode:** Toggle between light and dark themes.

---

## Tech Stack

- **Frontend:**
  - React.js
  - Next.js
  - TypeScript
  - Tailwind CSS

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB with Mongoose

- **Authentication:**
  - JWT (JSON Web Token)
  - bcrypt

- **Development Tools:**
  - ESLint (JavaScript/TypeScript Linting)
  - Prettier (Code Formatting)
  - Concurrently (Running client and API simultaneously)

---

## Installation

Follow these steps to get a local copy of the project up and running:

### 1. Clone the repository

```bash
git clone https://github.com/frshaad/whisp.git
cd whisp
```

### 2. Install dependencies

Navigate to the root directory and install all dependencies for both the **client** and **backend**:

```bash
# Root
pnpm install

# Client
cd client
pnpm install

# API (Backend)
cd ../api
pnpm install
```

### 3. Set up environment variables

Create a `.env` file in both the `client` and `api` directories. Here’s an example:

#### `api/.env`:

```bash
PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
```

#### `client/.env`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Make sure you update the values accordingly for your environment.

---

## Running the Project

You can run both the client and server concurrently during development using the following steps.

### 1. Running with `concurrently`

To run both the frontend and backend at the same time:

```bash
pnpm start
```

This will start the client on `http://localhost:3000` and the server (API) on `http://localhost:5000`.

---

## Contributing

We welcome contributions to Whisp! If you want to contribute:

1. Fork the repo
2. Create a new feature branch (`git checkout -b feature-name`)
3. Make your changes
4. Test thoroughly
5. Commit and push your changes (`git commit -m 'Add new feature'`)
6. Open a Pull Request

Before pushing, please make sure to run:

```bash
pnpm run lint
```

This project uses **ESLint** and **Prettier** to ensure code quality.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

### Contact

- **Author:** Farshad Hatami
- **Project Repository:** [Whisp GitHub](https://github.com/frshaad/whisp)
