# Cogniprep AI ✨

A **premium, modern frontend** application for practicing interviews with AI and getting instant feedback. Built with React.js, Tailwind CSS, and Framer Motion.

## 🎨 Premium Features

### Design Highlights
- **🌙 Dark Mode** - Toggle between light and dark themes
- **💎 Glassmorphism UI** - Beautiful backdrop blur effects throughout
- **✨ Framer Motion Animations** - Smooth, professional animations
- **📱 Fully Responsive** - Perfect on mobile, tablet, and desktop
- **🎯 Modern Gradients** - Eye-catching blue/purple/indigo color schemes
- **🎭 Interactive Elements** - Hover effects, transitions, and micro-interactions

### Core Features
- **Landing Page**: Animated hero section with floating icons
- **Interview Setup**: Interactive card selection with progress tracking
- **Live Interview**: Chat interface with real-time timer
- **Detailed Feedback**: Animated score cards with circular progress indicators

## 🛠️ Tech Stack

- **React.js 18** - Modern hooks & functional components
- **Tailwind CSS 3** - Utility-first styling
- **Framer Motion** - Advanced animations
- **Vite** - Lightning-fast build tool
- **React Router** - Seamless navigation
- **Lucide React** - Beautiful icon library

## 📦 Installation & Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Run development server:**
```bash
npm run dev
```

3. **Open browser:**
Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Button.jsx          # Premium animated button
│   ├── GlassCard.jsx       # Glassmorphism card
│   ├── ChatBubble.jsx      # Animated chat messages
│   ├── ProgressBar.jsx     # Animated progress bars
│   ├── Navbar.jsx          # Glass navbar with logo
│   └── ThemeToggle.jsx     # Dark mode toggle
├── pages/
│   ├── LandingPage.jsx     # Hero with floating elements
│   ├── InterviewSetup.jsx  # Interactive form
│   ├── InterviewPage.jsx   # Chat with timer
│   └── FeedbackPage.jsx    # Animated results
├── hooks/
│   └── useTheme.jsx        # Dark mode context
├── App.jsx                 # Main app with routing
├── main.jsx               # Entry point
└── index.css              # Global styles + utilities
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#0ea5e9) → Purple (#8b5cf6)
- **Secondary**: Cyan (#06b6d4) → Pink (#ec4899)
- **Accent**: Green (#10b981) → Emerald (#059669)

### Glassmorphism
- Backdrop blur: 10px - 20px
- Background opacity: 10% - 20%
- Border: 1px solid white/20%

### Animations
- Page entrances: Fade & slide
- Hover effects: Scale & lift
- Progress bars: Smooth fill
- Score reveal: Spring animations

## ✨ Key Components

### ThemeToggle
```jsx
<ThemeToggle />
```
Animated sun/moon toggle with smooth transitions

### GlassCard
```jsx
<GlassCard hoverable selected={true} delay={0.2}>
  Content here
</GlassCard>
```
Glassmorphism card with hover & selection states

### Button
```jsx
<Button variant="primary" size="lg" icon={Zap}>
  Start Interview
</Button>
```
Multiple variants: primary, secondary, outline, ghost

### ProgressBar
```jsx
<ProgressBar value={75} color="from-blue-500 to-purple-600" delay={0.5} />
```
Animated progress bar with gradient support

## 🎯 Features Breakdown

### 1. Landing Page
- ✅ Full-screen gradient background
- ✅ Animated floating icons
- ✅ Glassmorphism hero card
- ✅ Interactive statistics
- ✅ Feature showcase grid
- ✅ Sticky glass navbar

### 2. Interview Setup
- ✅ Step-by-step progress indicator
- ✅ Interactive card selection
- ✅ 6 job roles with icons
- ✅ 3 experience levels
- ✅ 3 interview types
- ✅ Form validation

### 3. Interview Page
- ✅ Real-time timer display
- ✅ Animated chat bubbles
- ✅ Voice recording UI (placeholder)
- ✅ Progress bar
- ✅ Sticky glass input bar
- ✅ Enter key support

### 4. Feedback Page
- ✅ Circular score indicator with SVG animation
- ✅ 3 detailed metrics with progress bars
- ✅ Strengths & improvements lists
- ✅ AI feedback summary
- ✅ Trophy celebration animation
- ✅ Retry & home buttons

## 🌙 Dark Mode

Toggle between light and dark themes with persistent storage. The theme preference is saved to localStorage and applied automatically on page load.

## 📱 Responsive Design

- **Mobile**: < 768px - Single column layouts
- **Tablet**: 768px - 1024px - Two column grids
- **Desktop**: > 1024px - Full multi-column layouts

## 🎓 Perfect For

- ✅ College minor/major projects
- ✅ Portfolio showcase
- ✅ Learning React & Tailwind
- ✅ Understanding Framer Motion
- ✅ Interview practice tool MVP

## 🚀 Build for Production

```bash
npm run build
npm run preview
```

## 📝 Notes

- **Frontend Only** - No backend logic implemented
- **Sample Data** - Interview questions & feedback are hardcoded
- **UI Placeholder** - Voice recording button has no functionality
- **Modern Browsers** - Best experience on Chrome, Firefox, Safari, Edge

## 🎨 Customization

### Change Color Theme
Edit `tailwind.config.js`:
```js
colors: {
  primary: { /* your colors */ }
}
```

### Adjust Animations
Edit `tailwind.config.js` keyframes section

### Modify Glassmorphism
Adjust opacity in component files:
```jsx
bg-white/10  // 10% opacity
backdrop-blur-xl  // Extra large blur
```

## 📄 License

MIT - Free to use for personal and commercial projects

## 🤝 Contributing

Feel free to fork, modify, and use this project for your needs!

---

**Built with ❤️ using React + Tailwind + Framer Motion**

Perfect for college projects and portfolios! 🎓✨
