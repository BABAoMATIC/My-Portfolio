# Nishit Bhardwaj - Portfolio Website

A modern, responsive portfolio website showcasing my skills as a Full Stack Developer and Data Analyst. Built with React, TypeScript, and Tailwind CSS.

## 🚀 Live Demo

Visit the live portfolio at: [[Portfolio Website](https://nishitbhardwaj.netlify.app/))

## 📋 Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Components Overview](#components-overview)
- [Installation](#installation)
- [Usage](#usage)
- [Contact Information](#contact-information)
- [Credits](#credits)

## ✨ Features

### 🎬 Hero Section
- **Video Background**: 11 anime fight videos with smooth transitions
- **Typewriter Effect**: Animated text for "Full Stack Developer | Data Analyst"
- **Responsive Design**: Optimized for all device sizes

### 🏆 Achievements Section
- **Karate Medals**: Gold, Silver, and Bronze medals display
- **Music Instruments**: Flute, Trumpet, Clarinet, Saxophone with proficiency levels
- **Certifications**: Including Columbia University ML Certificate (August 2025)
- **Interactive Cards**: Hover effects and flip animations

### 💻 Skills & Expertise
- **Dynamic Profile Grid**: 6 skill profiles (Frontend, Backend, Data Science, Data Analytics, ML/AI, API Development)
- **Auto-Switching**: Profiles change every 10 seconds automatically
- **Interactive Selection**: Manual profile switching with click
- **Skill Progress Bars**: Animated progress indicators
- **Responsive Grid**: Mobile-friendly layout

### 💼 Experience Section
- **Current Role**: Full Stack Developer | Data Analyst at Optimum Research Solutions
- **Location**: Jaipur, Rajasthan, India
- **Duration**: October 2024 – Present (1+ year)
- **Responsibilities**: Full-stack development, data analysis, visualization
- **Technologies**: React, Node.js, Python, Tableau, Power BI, MongoDB, PostgreSQL

### 🎯 Projects Section
- **Project Categories**: Full Stack, Data Analysis, Machine Learning, Mobile
- **Preview Modals**: Interactive project previews with image galleries
- **AI Explanations**: AI-powered project descriptions
- **Live Links**: Direct links to GitHub repositories and live demos

### 📜 Resume & Certifications
- **Resume Download**: PDF download functionality
- **Preview Modal**: Interactive resume preview
- **Certification Display**: All certifications with dates and issuers
- **Continuous Learning**: 4.7★ client satisfaction rating, "Still Going" learning period

### 📞 Contact Section
- **Contact Form**: Functional contact form with validation
- **Social Media Links**: LinkedIn, GitHub, Instagram, Kaggle, HackerRank, Twitter/X, LeetCode
- **QR Code Generator**: Generate QR codes for easy sharing
- **WhatsApp Integration**: Direct WhatsApp messaging
- **Contact Information**: Email, phone, location

### 🦶 Footer
- **Personal Touch**: "Made by Nishit Bhardwaj 💖"
- **Animated Elements**: Running horse emoji animation
- **Social Links**: All social media profiles
- **Copyright**: Current year copyright notice

## 🛠 Technologies Used

### Frontend
- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Type-safe JavaScript development
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations and transitions
- **Lucide React**: Beautiful icon library

### Development Tools
- **Vite**: Fast build tool and development server
- **ESLint**: Code linting and quality assurance
- **PostCSS**: CSS processing
- **Hot Module Replacement**: Fast development experience

### Additional Libraries
- **QR Code Generation**: For contact sharing
- **Form Handling**: Contact form functionality
- **Responsive Design**: Mobile-first approach

## 📁 Project Structure

```
portfolio-app/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── AboutMe.tsx
│   │   ├── Achievements.tsx
│   │   ├── Chatbot.tsx
│   │   ├── Contact.tsx
│   │   ├── Experience.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── InteractiveQuiz.tsx
│   │   ├── Navbar.tsx
│   │   ├── PreviewModal.tsx
│   │   ├── Projects.tsx
│   │   ├── QRCodeGenerator.tsx
│   │   ├── ResumeCertifications.tsx
│   │   └── Skills.tsx
│   ├── assets/
│   │   ├── images/
│   │   └── videos/
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 🧩 Components Overview

### Core Components

#### `App.tsx`
- Main application component
- Dark/Light mode toggle
- Component routing and layout

#### `Navbar.tsx`
- Navigation bar with smooth scrolling
- Dark mode toggle
- Mobile-responsive menu

#### `HeroSection.tsx`
- Video background with 11 anime videos
- Typewriter text animation
- Call-to-action buttons

#### `AboutMe.tsx`
- Personal introduction
- Professional summary
- Key highlights

### Feature Components

#### `Skills.tsx`
- Dynamic profile grid system
- Auto-switching every 10 seconds
- Interactive skill selection
- Progress bars and animations

#### `Projects.tsx`
- Project showcase with categories
- Preview modals with image galleries
- AI explanation feature
- Filter and search functionality

#### `Experience.tsx`
- Work experience timeline
- Current role at Optimum Research Solutions
- Technology stack display
- Achievement highlights

#### `Achievements.tsx`
- Karate medals (Gold, Silver, Bronze)
- Music instruments with proficiency
- Certifications including Columbia ML
- Interactive card animations

#### `ResumeCertifications.tsx`
- Resume download functionality
- Preview modal system
- Certification display
- Continuous learning metrics

#### `Contact.tsx`
- Contact form with validation
- Social media links
- WhatsApp integration
- Contact information display

#### `QRCodeGenerator.tsx`
- QR code generation for sharing
- Multiple link options
- Download functionality
- Copy to clipboard feature

#### `Footer.tsx`
- Personal branding
- Animated elements
- Social media links
- Copyright information

### Utility Components

#### `PreviewModal.tsx`
- Reusable modal component
- Image gallery navigation
- Download and external link options
- Keyboard controls

#### `Chatbot.tsx`
- Interactive AI chatbot
- Portfolio information queries
- Natural language processing

#### `InteractiveQuiz.tsx`
- Technical skills quiz
- Progress tracking
- Score calculation
- Interactive questions

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/BABAoMATIC/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📱 Usage

### Development
```bash
# Start development server
npm start

# Build for production
npm run build

# Preview production build
npm run preview
```

### Customization
- Update personal information in component files
- Modify contact details in `Contact.tsx`
- Add new projects in `Projects.tsx`
- Update skills in `Skills.tsx`
- Customize colors in `tailwind.config.js`

## 📞 Contact Information

### Personal Details
- **Name**: Nishit Bhardwaj
- **Email**: nishitbhardwaj11@gmail.com
- **Phone**: +91 9351399555
- **Location**: Jaipur, Rajasthan, India

### Professional Information
- **Current Role**: Full Stack Developer | Data Analyst
- **Company**: Optimum Research Solutions
- **Duration**: October 2024 – Present (1+ year)

### Social Media
- **LinkedIn**: [nishitbhardwaj4](https://www.linkedin.com/in/nishitbhardwaj4)
- **GitHub**: [BABAoMATIC](https://github.com/BABAoMATIC)
- **Instagram**: [@babaomatic](https://www.instagram.com/babaomatic?igsh=Yjc1cnhpdWt6OHdw)
- **Kaggle**: [nishitbhardrwaj](https://www.kaggle.com/nishitbhardrwaj)
- **HackerRank**: [nishitbhardwaj11](https://www.hackerrank.com/profile/nishitbhardwaj11)
- **Twitter/X**: [@Nishitbhardwa11](https://x.com/Nishitbhardwa11)
- **LeetCode**: [Nishit_11](https://leetcode.com/u/Nishit_11/)

### Certifications
- **Machine Learning**: Columbia University (August 2025)
- **Power BI**: Microsoft Certified
- **Tableau**: Desktop Specialist
- **Python**: Data Science and ML

### Achievements
- **Karate**: Gold (20), Silver (15), Bronze (17) medals
- **Music**: Flute (Advanced), Trumpet (Intermediate), Clarinet (Intermediate), Saxophone (Beginner)
- **Client Satisfaction**: 4.7★ average rating
- **Learning Period**: 2020 - Still Going

## 🎨 Design Features

### Color Scheme
- **Primary**: Neon Purple (#8B5CF6)
- **Secondary**: Neon Cyan (#06B6D4)
- **Accent**: Yellow (#F59E0B)
- **Dark Mode**: Custom dark theme
- **Light Mode**: Clean white theme

### Animations
- **Framer Motion**: Smooth page transitions
- **Hover Effects**: Interactive element feedback
- **Loading States**: User experience optimization
- **Scroll Animations**: Reveal on scroll effects

### Responsive Design
- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Medium screen compatibility
- **Desktop**: Full desktop experience
- **Cross-Browser**: Chrome, Firefox, Safari, Edge

## 🔧 Technical Details

### Performance
- **Lazy Loading**: Component-based code splitting
- **Image Optimization**: Compressed and optimized assets
- **Bundle Size**: Optimized for fast loading
- **Caching**: Efficient resource caching

### Accessibility
- **ARIA Labels**: Screen reader compatibility
- **Keyboard Navigation**: Full keyboard support
- **Color Contrast**: WCAG compliant colors
- **Focus Management**: Proper focus indicators

### SEO
- **Meta Tags**: Optimized meta information
- **Structured Data**: Rich snippets support
- **Sitemap**: Search engine indexing
- **Performance**: Core Web Vitals optimization

## 📈 Future Enhancements

### Planned Features
- [ ] Blog section integration
- [ ] Multi-language support
- [ ] Advanced animations
- [ ] PWA capabilities
- [ ] Analytics integration
- [ ] Contact form backend
- [ ] Admin dashboard

### Technical Improvements
- [ ] Performance optimization
- [ ] Accessibility enhancements
- [ ] SEO improvements
- [ ] Testing coverage
- [ ] Documentation updates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Credits

- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Video Assets**: Custom anime fight scenes
- **Design Inspiration**: Modern portfolio trends

## 📞 Support

For any questions or support, please contact:
- **Email**: nishitbhardwaj11@gmail.com
- **LinkedIn**: [Nishit Bhardwaj](https://www.linkedin.com/in/nishitbhardwaj4)
- **GitHub**: [BABAoMATIC](https://github.com/BABAoMATIC)

---

**Made with 💖 by Nishit Bhardwaj**

*Last updated: September 2024*
