Here’s your updated and polished `README.md` with emojis and Docker setup included, styled for clarity and engagement:

---

# 🚀 Makix Landing Page

[![Facebook badge][]][Facebook link]  
[![Twitter badge][]][Twitter link] [![Discord badge][]][Discord link] [![YouTube badge][]][YouTube link]

<img align="right" src="https://chat.makix.fr/media/images/logo-green.png" height="100px" alt="Makix Logo">

Welcome to the **[Makix](https://chat.makix.fr)** Landing Page project!  
This project delivers a fast, responsive, and modern landing page to showcase **Makix** and its features.

---

## 🌐 Project Overview

The Makix Landing Page includes:

- ✨ Introduction  
- 🧩 Features  
- 🗣️ Testimonials  
- 💰 Pricing  
- 📬 Contact  

---

## 🛠️ Technologies Used

- ⚡ **HTML5**  
- 🧠 **JavaScript**  
- 🎨 **Tailwind CSS**

---

## 🧪 Local Development

Follow these steps to run the project locally:

1. **📥 Clone the repository:**
    ```bash
    git clone https://github.com/rzafiamy/landing.git
    ```

2. **📂 Navigate to the app directory:**
    ```bash
    cd landing
    ```

3. **📦 Install dependencies:**
    ```bash
    npm install
    ```

4. **⚙️ Run the development server:**
    ```bash
    npm run dev
    ```

---

## 🐳 Docker Support

You can run this app in Docker for local dev or production builds.

### 🔧 Build the container:

```bash
docker build -t makix-landing .
```

### ▶️ Run dev mode (with hot reload):

```bash
docker run -p 3000:3000 -v $(pwd)/app:/app -v /app/node_modules makix-landing
```

### 🏗️ Build production assets:

```bash
docker run --rm -v $(pwd)/app:/app makix-landing npm run build
```

### 📦 Or use Docker Compose:

```bash
docker-compose up --build
```

---

## 🤝 Contributing

We welcome contributions to improve the Makix Landing Page!

1. 🍴 Fork the repository  
2. 🧪 Create a branch:  
   `git checkout -b feature/your-feature-name`  
3. 💾 Commit your changes:  
   `git commit -m "Add some feature"`  
4. 🚀 Push your branch:  
   `git push origin feature/your-feature-name`  
5. 🔁 Open a pull request

---

## 📜 License

Licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 📫 Contact

For any questions or feedback, feel free to reach out:

📧 [support@makix.com](mailto:support@makix.com)

Thanks for using Makix! 💚

---

[Facebook badge]: https://img.shields.io/badge/Facebook-%25231877F2.svg?style=social&logo=facebook&label=1%2C7K  
[Facebook link]: https://www.facebook.com/infodev.ovh  
[Twitter badge]: https://img.shields.io/twitter/follow/deno_land.svg?style=social&label=Follow  
[Twitter link]: #  
[YouTube badge]: https://img.shields.io/youtube/channel/subscribers/UCqC2G2M-rg4fzg1esKFLFIw?style=social  
[YouTube link]: #  
[Discord badge]: https://img.shields.io/discord/684898665143206084?logo=discord&style=social  
[Discord link]: #