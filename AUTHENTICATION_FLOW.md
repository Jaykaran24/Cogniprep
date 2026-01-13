# Cogniprep AI - Authentication Flow

## Overview
Modern and attractive authentication system for the AI Interviewer web application with glassmorphism design, built using React.js and Tailwind CSS.

## Features

### 🎨 Design
- **Glassmorphism UI**: Beautiful frosted glass effect with backdrop blur
- **Gradient Backgrounds**: Eye-catching purple-blue gradients
- **Framer Motion Animations**: Smooth entrance and hover animations
- **Dark Mode Support**: Seamless light/dark theme switching
- **Fully Responsive**: Mobile-first design for all screen sizes

### 🔐 Authentication Pages

#### 1. **Signup Page** (`/signup`)
- Clean, card-style signup form with the following fields:
  - Full Name (with User icon)
  - Email Address (with Mail icon)
  - Password (with Lock icon and show/hide toggle)
  - Confirm Password (with Lock icon and show/hide toggle)
- Real-time client-side validation:
  - Full Name: Required, minimum 2 characters
  - Email: Valid email format validation
  - Password: Minimum 8 characters, must contain uppercase, lowercase, and number
  - Confirm Password: Must match password field
- Visual feedback with success/error indicators
- "Already have an account? Sign In" link
- Marketing content on the left side with feature highlights

#### 2. **Sign In Page** (`/signin`)
- Simplified sign-in form with:
  - Email Address
  - Password (with show/hide toggle)
  - "Forgot password?" link
- Form validation for email format and required fields
- "Don't have an account? Sign Up" link
- Stats display on the left side (10K+ users, 50K+ interviews, etc.)

## Component Structure

```
src/
├── components/
│   ├── SignupForm.jsx      # Reusable signup form with validation
│   ├── SignInForm.jsx      # Reusable signin form with validation
│   ├── Navbar.jsx          # Navigation with auth buttons
│   └── Button.jsx          # Reusable button component
├── pages/
│   ├── SignupPage.jsx      # Signup page with marketing content
│   ├── SignInPage.jsx      # Sign in page with stats
│   └── LandingPage.jsx     # Home page
└── App.jsx                 # Main router with all routes
```

## Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | LandingPage | Home page with features, how it works, FAQs |
| `/signup` | SignupPage | User registration page |
| `/signin` | SignInPage | User login page |
| `/setup` | InterviewSetup | Interview configuration |
| `/interview` | InterviewPage | Live interview session |
| `/feedback` | FeedbackPage | Interview results and analysis |

## Validation Rules

### Full Name
- ✅ Required field
- ✅ Minimum 2 characters

### Email
- ✅ Required field
- ✅ Valid email format (user@domain.com)

### Password
- ✅ Required field
- ✅ Minimum 8 characters
- ✅ At least one lowercase letter
- ✅ At least one uppercase letter
- ✅ At least one number

### Confirm Password
- ✅ Required field
- ✅ Must match password

## User Flow

1. **Landing Page** → Click "Sign Up" in Navbar
2. **Signup Page** → Fill form → Submit → Navigate to Interview Setup
3. **Sign In Page** → Enter credentials → Submit → Navigate to Interview Setup

## Technical Implementation

### Form Validation
- Real-time validation on field blur
- Live validation on change (after field is touched)
- Visual feedback with success (green) and error (red) indicators
- Error messages displayed below fields with icons

### State Management
- Local component state for form data
- Touched state to track field interaction
- Error state for validation messages

### Navigation
- React Router for client-side routing
- Programmatic navigation after successful submission
- Link navigation between signup and signin pages

### Styling
- Tailwind CSS utility classes
- Custom glassmorphism utilities (backdrop-blur, bg-white/10)
- Responsive breakpoints (sm, md, lg)
- Hover effects and transitions

## Best Practices

✅ **Modular Components**: Separate form logic from page layout
✅ **Clean Code**: Descriptive variable names and comments
✅ **Accessibility**: Proper labels and ARIA attributes
✅ **User Experience**: Visual feedback and smooth animations
✅ **Responsive Design**: Mobile-first approach
✅ **No Backend**: Pure frontend implementation

## Future Enhancements

- [ ] Email verification
- [ ] Social login (Google, GitHub, LinkedIn)
- [ ] Password strength indicator
- [ ] Remember me checkbox
- [ ] Password reset functionality
- [ ] Two-factor authentication
- [ ] Backend API integration

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

3. Open browser:
   ```
   http://localhost:3001
   ```

4. Click "Sign Up" in the navbar to see the authentication flow

## Technologies Used

- **React 18.2.0**: UI library
- **React Router DOM 6.20.0**: Client-side routing
- **Tailwind CSS 3.3.6**: Utility-first CSS
- **Framer Motion 10.16.16**: Animation library
- **Lucide React 0.294.0**: Icon library
- **Vite 5.0.8**: Build tool and dev server

---

Built with ❤️ by a senior frontend developer
