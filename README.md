# Bhagavad Gita Lessons

A Progressive Web App (PWA) designed to deliver daily, bite-sized spiritual lessons from the Bhagavad Gita in Telugu, covering all 18 chapters in a format that blends visual storytelling and guided reflection. Features videos from Pranavananda Das channel.

## 🌟 Features

- **18-Day Journey**: Structured daily lessons through all 18 chapters of the Bhagavad Gita
- **Video Lessons**: YouTube integration for visual learning
- **Reflection Prompts**: ChatGPT integration for guided contemplation
- **Progress Tracking**: Local storage for lesson completion tracking
- **Mobile-First Design**: Responsive PWA optimized for mobile devices
- **Offline Support**: PWA features for offline access
- **Installable**: Can be installed on home screen as a native app

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Routing**: React Router DOM
- **State Management**: React Hooks + LocalStorage
- **PWA**: Vite PWA Plugin
- **Deployment**: Vercel

## 📱 PWA Features

- Installable on mobile devices
- Offline functionality
- Push notifications (optional)
- Responsive design
- Fast loading times

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bhagavad-gita-lessons
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📚 Lesson Structure

Each lesson includes:
- **Title**: Descriptive lesson name
- **Objective**: Learning goal for the day
- **Type**: Video or reflection-based
- **Content**: YouTube video or ChatGPT prompt
- **Reflection**: Guided contemplation question

### Lesson Types

1. **Video Lessons** (Days 1-18): All 18 chapters of Bhagavad Gita in Telugu from Pranavananda Das channel
2. **Reflection Prompts**: Each lesson includes guided contemplation questions

## 🎯 Target Audience

- Modern spiritual seekers of all ages
- Those unfamiliar with Sanskrit or the Gita
- Visual and interactive learners
- People seeking daily spiritual practice

## 📁 Project Structure

```
bhagavad-gita-lessons/
├── public/
│   ├── manifest.json          # PWA manifest
│   └── icons/                # PWA icons
├── src/
│   ├── components/           # Reusable components
│   │   ├── YouTubeEmbed.tsx
│   │   └── ChatGPTEmbed.tsx
│   ├── data/
│   │   └── gita-lessons.json # 18 lessons data (all chapters)
│   ├── hooks/               # Custom React hooks
│   │   └── useLessonProgress.ts
│   ├── pages/               # Page components
│   │   ├── Home.tsx
│   │   ├── Lesson.tsx
│   │   └── Completed.tsx
│   ├── utils/               # Utility functions
│   │   └── dateHelpers.ts
│   ├── App.tsx             # Main app component
│   └── main.tsx            # App entry point
├── package.json
├── vite.config.ts
└── tailwind.config.js
```

## 🔧 Configuration

### PWA Settings

The app is configured as a PWA with:
- Service worker for offline functionality
- Manifest for app installation
- Icons for various device sizes
- Theme colors and display settings

### LocalStorage Keys

- `gita-lessons-progress`: Stores completed lesson days

## 🎨 Design System

### Colors
- Primary: Orange (#ea580c)
- Secondary: Yellow (#fef3c7)
- Success: Green (#16a34a)
- Background: Gradient from orange-50 to yellow-50

### Typography
- Headings: Bold, gray-800
- Body: Regular, gray-600
- Mobile-first responsive design

## 📱 Mobile Optimization

- Large tap targets (44px minimum)
- Touch-friendly navigation
- Responsive video embeds
- Optimized for portrait orientation
- Fast loading on slow connections

## 🔮 Future Enhancements

- [ ] Push notifications for daily reminders
- [ ] Audio versions of lessons
- [ ] Social sharing features
- [ ] User accounts and cloud sync
- [ ] Multiple language support
- [ ] Advanced progress analytics
- [ ] Community features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Bhagavad Gita teachings and wisdom
- React and Vite communities
- PWA best practices
- Spiritual teachers and guides

---

**Om Namo Bhagavate Vasudevaya** 🙏 