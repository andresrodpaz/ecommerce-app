# 🔍 Junior QA Engineer Portfolio - E-commerce Testing Project

## 👨‍💻 About Me

I'm a **Junior QA Engineer** passionate about ensuring software quality and learning new testing technologies. This portfolio showcases my hands-on experience with modern testing tools and methodologies through a comprehensive e-commerce testing project.

### 🎯 What I Bring to the Table
- **Manual Testing Skills**: Experience identifying bugs and edge cases
- **Test Automation**: Building automated tests with Playwright and TypeScript
- **API Testing**: Validating backend functionality with Jest
- **Collaboration**: Working with developers to improve product quality
- **Growth Mindset**: Always learning and adapting to new testing approaches

---

## 🛠️ Technical Skills

**Testing Frameworks:**
- Playwright (UI automation)
- Jest (API and unit testing)
- Cypress (alternative UI testing)

**Programming:**
- TypeScript/JavaScript
- Basic Python for test scripts

**Tools & Technologies:**
- Git version control
- GitHub Actions (CI/CD basics)
- Postman for API testing
- Browser DevTools for debugging

**Testing Types:**
- Manual exploratory testing
- Automated UI testing
- API endpoint validation
- Cross-browser compatibility
- Basic performance testing

---

## 🚀 Featured Project: E-commerce Testing Suite

### Project Overview
A complete testing framework for an e-commerce application covering user registration, product browsing, cart functionality, and checkout process.

### What I Tested
- **User Authentication**: Registration, login, password recovery
- **Product Catalog**: Search, filters, product details
- **Shopping Cart**: Add/remove items, quantity updates
- **Checkout Process**: Payment flow and order confirmation
- **Admin Panel**: Basic management functionalities

### Testing Approach
```typescript
// Example: Simple product search test
test('User can search for products', async ({ page }) => {
  await page.goto('/');
  await page.fill('[data-testid="search-input"]', 'laptop');
  await page.click('[data-testid="search-button"]');
  
  // Verify results are displayed
  await expect(page.locator('[data-testid="product-card"]')).toBeVisible();
  await expect(page.locator('h1')).toContainText('Search Results');
});
```

---

## 📋 Key Achievements

### 🎯 Test Coverage
- **UI Tests**: 25+ automated test scenarios covering main user flows
- **API Tests**: 15+ endpoint validations with proper assertions
- **Bug Detection**: Found and documented 12+ issues during testing
- **Cross-browser**: Tested on Chrome, Firefox, and Safari

### 🔧 Automation Results
- Test execution time reduced from 2 hours (manual) to 15 minutes (automated)
- Consistent test results across different environments
- Early bug detection in development phase
- Clear test reports for development team

---

## 🧪 Testing Examples

### Manual Testing Process
1. **Test Planning**: Created test cases based on user stories
2. **Exploratory Testing**: Found edge cases not covered in requirements
3. **Bug Reporting**: Documented issues with clear reproduction steps
4. **Regression Testing**: Verified fixes don't break existing functionality

### Automated Testing Sample
```typescript
// API testing example
describe('Product API', () => {
  test('should create product with valid data', async () => {
    const productData = {
      name: 'Test Product',
      price: 29.99,
      category: 'Electronics'
    };
    
    const response = await request.post('/api/products')
      .send(productData)
      .expect(201);
    
    expect(response.body.name).toBe(productData.name);
    expect(response.body.price).toBe(productData.price);
  });
});
```

---

## 📈 What I Learned

### Technical Growth
- **Playwright Proficiency**: From basic scripts to Page Object Model implementation
- **API Testing**: Understanding REST principles and validation techniques
- **Git Workflow**: Branching, pull requests, and collaboration
- **CI/CD Basics**: Setting up automated test runs in GitHub Actions

### QA Mindset Development
- **User Perspective**: Always thinking from the end-user's point of view
- **Edge Case Thinking**: Finding scenarios developers might miss
- **Communication**: Writing clear bug reports and test documentation
- **Quality Advocacy**: Balancing speed with thorough testing

---

## 🎯 How to Run This Project

### Prerequisites
```bash
node -v  # Should be 16+ 
npm -v   # Should be 8+
```

### Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/ecommerce-qa-suite

# Install dependencies
npm install

# Set up environment
cp .env.example .env
```

### Running Tests
```bash
# Run all tests
npm test

# Run UI tests only
npm run test:ui

# Run API tests only  
npm run test:api

# Generate test report
npm run test:report
```

### View Results
```bash
# Open test report in browser
npm run report:open
```

---

## 🔮 Next Steps

### Currently Learning
- Mobile testing strategies
- Accessibility testing techniques
- Performance testing with k6
- Database testing fundamentals

### Goals for Growth
- Contribute to open-source testing projects
- Learn advanced automation patterns
- Develop skills in security testing
- Improve test data management

ills gained through hands-on projects and continuous learning. I'm excited to bring my attention to detail and passion for quality to your development team.*
