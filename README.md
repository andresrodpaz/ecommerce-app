# 🚀 E-Commerce QA Automation Suite

A comprehensive QA automation project demonstrating enterprise-grade testing practices for e-commerce applications.

## 📋 Overview

This project provides a complete testing solution including:
- **UI Automation** with Playwright + TypeScript
- **API Testing** with Jest + Supertest  
- **CI/CD Pipeline** with GitHub Actions
- **Professional Documentation** and reporting
- **Cross-browser & Mobile Testing**
- **Performance & Accessibility Testing**

## 🛠️ Tech Stack

- **UI Testing**: Playwright, TypeScript, Page Object Model
- **API Testing**: Jest, Supertest, JSON Schema Validation
- **Reporting**: Allure Reports, HTML Reports, JUnit XML
- **CI/CD**: GitHub Actions, Docker
- **Code Quality**: ESLint, Prettier, TypeScript

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
\`\`\`bash
# Clone the repository
git clone <repository-url>
cd ecommerce-qa-automation

# Install dependencies and browsers
npm run setup
\`\`\`

### Environment Setup
\`\`\`bash
# Copy environment template
cp .env.example .env

# Update with your test environment URLs and credentials
\`\`\`

### Running Tests

\`\`\`bash
# Run all tests
npm run test:all

# Run UI tests only
npm run test:ui

# Run API tests only  
npm run test:api

# Run tests in headed mode (see browser)
npm run test:ui:headed

# Debug mode
npm run test:ui:debug
\`\`\`

### View Reports
\`\`\`bash
# Open Playwright HTML report
npm run report:open

# Generate and open Allure report
npm run report:allure
\`\`\`

## 📁 Project Structure

\`\`\`
ecommerce-qa-automation/
├── tests/
│   ├── ui/                 # Playwright UI tests
│   │   ├── pages/          # Page Object Model
│   │   ├── auth.spec.ts    # Authentication tests
│   │   ├── products.spec.ts # Product catalog tests
│   │   └── cart.spec.ts    # Shopping cart tests
│   └── api/                # API tests
│       ├── auth.spec.ts    # Auth API tests
│       ├── products.spec.ts # Products API tests
│       └── orders.spec.ts  # Orders API tests
├── utils/                  # Test utilities
│   ├── test-data.ts        # Test data generators
│   └── api-client.ts       # API client wrapper
├── config/                 # Test configurations
├── reports/                # Test reports
├── .github/workflows/      # CI/CD pipelines
└── docs/                   # Documentation
\`\`\`

## 🧪 Test Coverage

### UI Tests
- ✅ Authentication (login, register, logout)
- ✅ Product catalog (search, filter, pagination)
- ✅ Shopping cart (add, remove, update)
- ✅ Checkout process (end-to-end)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Cross-browser compatibility

### API Tests
- ✅ Authentication endpoints
- ✅ Product CRUD operations
- ✅ Cart management
- ✅ Order processing
- ✅ Error handling
- ✅ Performance validation

## 📊 Quality Metrics

- **Functional Coverage**: 95%+ critical paths
- **Test Execution Time**: < 15 minutes
- **Pass Rate Target**: > 95%
- **API Response Time**: < 2 seconds
- **Cross-browser Support**: Chrome, Firefox, Safari

## 🔧 Configuration

### Environment Variables
\`\`\`env
BASE_URL=http://localhost:3000
API_BASE_URL=http://localhost:3001/api
ADMIN_EMAIL=admin@ecommerce-demo.com
ADMIN_PASSWORD=Admin123!
\`\`\`

### Browser Configuration
Tests run on multiple browsers by default:
- Chromium (Desktop & Mobile)
- Firefox
- WebKit (Safari)

## 📈 CI/CD Pipeline

The GitHub Actions pipeline includes:
1. **Code Quality**: ESLint, Prettier, TypeScript checks
2. **API Tests**: Complete API test suite
3. **UI Tests**: Cross-browser testing matrix
4. **Reporting**: Allure reports with GitHub Pages deployment
5. **Notifications**: Slack/Teams integration on failures

## 📚 Documentation

- [Test Strategy](docs/test-strategy.md)
- [Test Plan](docs/test-plan.md)
- [Manual Test Cases](docs/manual-tests.md)
- [Bug Report Template](docs/bug-report-template.md)
- [Contributing Guide](docs/contributing.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Follow coding standards (ESLint + Prettier)
4. Add tests for new features
5. Submit a pull request

## 📞 Support

For questions or issues:
- Create an issue in the repository
- Check the documentation in `/docs`
- Review existing test examples

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ for QA Excellence**
