# Greenify

![Greenify Logo](public/logo.png)

A modern, user-friendly grocery delivery platform connecting local farmers with consumers. Built with React, TypeScript, and Vite for optimal performance and developer experience.

## 🌟 Features

### For Customers
- **Fresh Produce Delivery**: Order fresh, locally-sourced fruits, vegetables, and other farm products
- **Real-time Order Tracking**: Track your order status from farm to doorstep
- **Secure Payment Processing**: Multiple payment options with secure transactions
- **Responsive Design**: Seamless experience across all devices (mobile, tablet, desktop)
- **User-friendly Interface**: Intuitive navigation and product discovery

### For Farmers
- **Direct-to-Consumer Sales**: Connect directly with customers without intermediaries
- **Inventory Management**: Easy-to-use dashboard for managing product listings
- **Order Management**: Streamlined process for handling and fulfilling orders
- **Analytics**: Insights into sales, customer preferences, and market trends

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/dr-winner/greeenify.git
   cd greeenify
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:8080`

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Create a production build
- `npm run build:dev` - Create a development build
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview the production build locally

### Project Structure

```
greeenify/
├── public/             # Static assets
├── src/                # Source code
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Utility functions
│   ├── styles/         # Global styles
│   ├── types/          # TypeScript type definitions
│   ├── App.tsx         # Main application component
│   └── main.tsx        # Application entry point
├── index.html          # HTML template
├── package.json        # Project dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── vite.config.ts      # Vite configuration
└── tailwind.config.js  # Tailwind CSS configuration
```

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run tests in watch mode
npm test -- --watch
```

## 📦 Deployment

### Production Build

```bash
npm run build
```

The build output will be in the `dist` directory, ready for deployment to your preferred hosting service.

### Deployment Options

- **Vercel**: Connect your GitHub repository for automatic deployments
- **Netlify**: Deploy with a simple drag-and-drop of the `dist` folder
- **AWS Amplify**: Set up continuous deployment from your repository
- **Custom Server**: Deploy the `dist` folder to your own server

## 🤝 Contributing

We welcome contributions to Greenify Grocer Gate! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your PR follows our coding standards and includes appropriate tests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Project Lead**: [Your Name]
- **Frontend Developer**: [Your Name]
- **Backend Developer**: [Your Name]
- **UI/UX Designer**: [Your Name]

## 📞 Contact

For questions or support, please contact us at:
- Email: support@greenify.com
- Website: https://greenify.com
- Twitter: [@greenify](https://twitter.com/greenify)

---

Made with ❤️ by the Greenify Team
