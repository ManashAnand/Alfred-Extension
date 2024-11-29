# Alfred Chrome Extension

**Alfred Chrome Extension** is a lightweight, personalized chatbot extension for Chrome, built using the [Plasmo Framework](https://www.plasmo.com/) and powered by **Cloudflare Workers**. This project aims to provide an efficient and scalable solution for integrating user-specific chatbot functionalities directly into the browser.

---

## ✨ Features

- **Personalized Chatbot**: Offers tailored responses based on user-defined data.
- **Cloudflare Workers Integration**: Ensures secure and scalable backend operations.
- **Lightweight and Fast**: Built with performance optimization in mind.
- **User-Friendly**: Easy-to-use interface with seamless Chrome integration.

---

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or Yarn
- Google Chrome browser

### Steps to Install

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/ManashAnand/Alfred-Extension.git
   cd Alfred-Extension
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```

4. **Build the Extension**:
   ```bash
   npm run build
   ```

5. **Load the Extension in Chrome**:
   - Open `chrome://extensions/` in your browser.
   - Enable **Developer mode**.
   - Click **Load unpacked** and select the `build` folder.

---

## 🛠️ Development

### Running in Development Mode
To test changes locally, use the following command:
```bash
npm run dev
```

This starts a local development server and watches for file changes.

### Deploying to Cloudflare Workers
1. Install the Cloudflare CLI (`wrangler`):
   ```bash
   npm install -g wrangler
   ```

2. Log in to your Cloudflare account:
   ```bash
   wrangler login
   ```

3. Deploy the worker:
   ```bash
   npm run deploy
   ```

---

## 📁 Project Structure

```plaintext
Alfred-Extension/
├── src/
│   ├── background/         # Background scripts
│   ├── content/            # Content scripts
│   ├── popup/              # Popup UI for the chatbot
│   └── workers/            # Cloudflare Worker integrations
├── public/                 # Static assets
├── package.json            # Project dependencies
├── plasmo.config.ts        # Plasmo framework configuration
└── wrangler.toml           # Cloudflare Workers configuration
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Create a Pull Request.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 📞 Support

If you encounter any issues or have questions, feel free to open an [issue](https://github.com/ManashAnand/Alfred-Extension/issues) or reach out.

---

## 🌟 Acknowledgments

- [Plasmo Framework](https://www.plasmo.com/)
- [Cloudflare Workers](https://workers.cloudflare.com/)
