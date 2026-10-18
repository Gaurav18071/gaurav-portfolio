/* ==========================================
   PORTFOLIO CHATBOT - AI Assistant
========================================== */

class PortfolioChatbot {
    constructor() {
        this.isOpen = false;
        this.isTyping = false;
        
        // Knowledge base about Gaurav's portfolio
        this.knowledge = {
            personal: {
                name: "Gaurav Mishra",
                role: "Computer Science Engineer & Software Developer",
                education: "Final year Computer Science Engineering student",
                location: "Delhi, India",
                email: "gauravmishra.dev.27@gmail.com",
                phone: "+91-9717067268",
                availability: "Open to opportunities",
                github: "https://github.com/Gaurav18071",
                linkedin: "https://in.linkedin.com/in/gaurav18071"
            },
            
            skills: {
                languages: ["Java", "JavaScript", "TypeScript", "Python", "C"],
                frontend: ["React.js", "Next.js", "Tailwind CSS", "Framer Motion", "HTML5", "CSS3"],
                backend: ["Spring Boot", "Spring Security", "Spring Data JPA", "Hibernate", "Node.js", "Express.js", "REST APIs"],
                database: ["PostgreSQL", "MongoDB", "SQL", "Supabase"],
                tools: ["Git", "GitHub", "Docker", "Postman", "VS Code", "Maven", "Vercel", "Render"],
                core: ["Data Structures & Algorithms", "Object-Oriented Programming", "Database Management", "Operating Systems", "Computer Networks"]
            },
            
            projects: [
                {
                    name: "Flapboard — AI-Powered Adaptive Typing Platform",
                    description: "Adaptive typing platform with real-time WPM, Spring Boot REST API, JWT auth, PostgreSQL, Docker containerization, and LLM-backed personalized coaching",
                    tech: ["Next.js", "TypeScript", "Spring Boot", "Spring Security", "PostgreSQL", "JPA/Hibernate", "JWT", "Docker", "LLM API"],
                    type: "Featured Full-Stack",
                    live: "https://typing-master-pied.vercel.app"
                },
                {
                    name: "Golf Charity Platform",
                    description: "Full-stack fundraising platform connecting donors, organizers, and admins with role-based auth, Razorpay payments, and AI-assisted campaigns",
                    tech: ["Next.js", "TypeScript", "Supabase", "PostgreSQL (Neon)", "Prisma", "Razorpay", "Zod"],
                    type: "Full-Stack",
                    live: "https://golf-platform-gn.vercel.app"
                },
                {
                    name: "HireTrack — Recruitment Management Platform (ATS)",
                    description: "Recruiter-scoped applicant tracking system with credential auth, bcrypt hashing, per-application hiring pipelines, and unique candidate constraints",
                    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL (Neon)", "Auth.js", "bcrypt", "Zod", "shadcn/ui"],
                    type: "Full-Stack",
                    github: "https://github.com/Gaurav18071/Hiretrack-ai"
                },
                {
                    name: "Estrip - AI Travel Platform",
                    description: "A modern travel and tourism platform with AI-powered recommendations, weather integration, and currency conversion",
                    tech: ["HTML5", "CSS3", "JavaScript", "Weather API", "Currency API"],
                    type: "Featured",
                    github: "https://github.com/Gaurav18071/Estrip"
                }
            ],
            
            experience: [
                {
                    role: "Data & AI Intern",
                    company: "Ministry of Panchayati Raj, Government of India",
                    period: "Sep 2026 – Present",
                    location: "On-site, New Delhi",
                    highlights: "Working on MoPR's website chatbot, complaint portal for panchayats across India, and managing panchayat-level datasets."
                },
                {
                    role: "Frontend Developer Intern",
                    company: "Alfido Tech",
                    period: "Jul 2026 – Aug 2026",
                    location: "Online",
                    highlights: "Shipped 6+ production React components, converted design specs to responsive interfaces, and merged 15+ PRs across 4 sprint cycles."
                },
                {
                    role: "Web Developer Intern",
                    company: "Brainwave Matrix Solutions",
                    period: "Sep 2024 – Nov 2024",
                    location: "Hybrid",
                    highlights: "Built 8+ pages and 5+ reusable UI components from raw requirements; debugged layouts across Chrome, Firefox, and Safari."
                }
            ],
            
            interests: [
                "Software Engineering",
                "Web Development",
                "Problem Solving",
                "Building useful products",
                "Clean code practices",
                "Continuous learning"
            ]
        };
        
        this.init();
    }
    
    init() {
        // Chatbot is now integrated in hero terminal - no separate floating button needed
        return;
    }
    
    createChatbotHTML() {
        const chatbotHTML = `
            <div class="chatbot-container">
                <button class="chatbot-floating-btn" id="chatbot-toggle" aria-label="Open chatbot">
                    <i class="fas fa-comment-dots"></i>
                    <span class="chatbot-badge">!</span>
                </button>
                
                <div class="chatbot-window">
                    <div class="chatbot-header">
                        <div class="chatbot-header-left">
                            <div class="chatbot-avatar">G</div>
                            <div class="chatbot-info">
                                <h4>Gaurav's Assistant</h4>
                                <p class="chatbot-status">
                                    <span class="status-dot"></span>
                                    Online - Ask me anything
                                </p>
                            </div>
                        </div>
                        <button class="chatbot-close" aria-label="Close chatbot">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <div class="chatbot-messages" id="chatbot-messages"></div>
                    
                    <div class="chatbot-suggestions" id="chatbot-suggestions">
                        <div class="suggestion-chip" data-message="What's your tech stack?">
                            💻 Tech Stack
                        </div>
                        <div class="suggestion-chip" data-message="Tell me about your projects">
                            🚀 Projects
                        </div>
                        <div class="suggestion-chip" data-message="What's your experience?">
                            💼 Experience
                        </div>
                        <div class="suggestion-chip" data-message="How can I contact you?">
                            📧 Contact
                        </div>
                    </div>
                    
                    <div class="chatbot-input-area">
                        <input 
                            type="text" 
                            class="chatbot-input" 
                            placeholder="Ask about Gaurav's skills, projects..." 
                            id="chatbot-input"
                            autocomplete="off"
                        />
                        <button class="chatbot-send" id="chatbot-send" aria-label="Send message">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }
    
    attachEventListeners() {
        const toggle = document.getElementById('chatbot-toggle');
        const close = document.querySelector('.chatbot-close');
        const input = document.getElementById('chatbot-input');
        const send = document.getElementById('chatbot-send');
        const suggestions = document.querySelectorAll('.suggestion-chip');
        
        toggle.addEventListener('click', () => this.toggleChat());
        close.addEventListener('click', () => this.toggleChat());
        
        send.addEventListener('click', () => this.handleSend());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSend();
        });
        
        suggestions.forEach(chip => {
            chip.addEventListener('click', () => {
                const message = chip.dataset.message;
                this.handleUserMessage(message);
            });
        });
    }
    
    toggleChat() {
        this.isOpen = !this.isOpen;
        const window = document.querySelector('.chatbot-window');
        const badge = document.querySelector('.chatbot-badge');
        
        window.classList.toggle('active', this.isOpen);
        
        if (this.isOpen) {
            if (badge) badge.style.display = 'none';
            document.getElementById('chatbot-input').focus();
        }
    }
    
    showWelcomeMessage() {
        const messagesContainer = document.getElementById('chatbot-messages');
        messagesContainer.innerHTML = `
            <div class="welcome-message">
                <i class="fas fa-robot"></i>
                <h3>Hi! I'm Gaurav's AI Assistant 👋</h3>
                <p>Ask me anything about Gaurav's skills, projects, experience, or how to get in touch!</p>
            </div>
        `;
    }
    
    handleSend() {
        const input = document.getElementById('chatbot-input');
        const message = input.value.trim();
        
        if (message && !this.isTyping) {
            this.handleUserMessage(message);
            input.value = '';
        }
    }
    
    handleUserMessage(message) {
        this.addMessage(message, 'user');
        this.isTyping = true;
        this.showTypingIndicator();
        
        // Simulate AI thinking delay
        setTimeout(() => {
            const response = this.generateResponse(message);
            this.hideTypingIndicator();
            this.addMessage(response, 'bot');
            this.isTyping = false;
        }, 1000 + Math.random() * 500);
    }
    
    addMessage(text, sender) {
        const messagesContainer = document.getElementById('chatbot-messages');
        
        // Remove welcome message if exists
        const welcome = messagesContainer.querySelector('.welcome-message');
        if (welcome) welcome.remove();
        
        const avatar = sender === 'user' ? 'U' : 'G';
        const messageHTML = `
            <div class="message ${sender}">
                <div class="message-avatar">${avatar}</div>
                <div class="message-content">${text}</div>
            </div>
        `;
        
        messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatbot-messages');
        const typingHTML = `
            <div class="message bot typing-message">
                <div class="message-avatar">G</div>
                <div class="message-content">
                    <div class="typing-indicator">
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                    </div>
                </div>
            </div>
        `;
        messagesContainer.insertAdjacentHTML('beforeend', typingHTML);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    hideTypingIndicator() {
        const typing = document.querySelector('.typing-message');
        if (typing) typing.remove();
    }
    
    generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Greeting patterns
        if (this.matchPattern(lowerMessage, ['hi', 'hello', 'hey', 'hola', 'namaste'])) {
            return `Hello! 👋 I'm here to help you learn about Gaurav. You can ask me about his skills, projects, experience, or how to contact him. What would you like to know?`;
        }
        
        // Name queries
        if (this.matchPattern(lowerMessage, ['name', 'who are you', 'who is'])) {
            return `I'm an AI assistant for <strong>${this.knowledge.personal.name}</strong>, a ${this.knowledge.personal.role}. He's currently in his final year of Computer Science Engineering and is ${this.knowledge.personal.availability.toLowerCase()}!`;
        }
        
        // Skills queries
        if (this.matchPattern(lowerMessage, ['skill', 'tech stack', 'technology', 'technologies', 'know', 'language', 'framework'])) {
            return this.getSkillsResponse(lowerMessage);
        }
        
        // Projects queries
        if (this.matchPattern(lowerMessage, ['project', 'built', 'made', 'work', 'portfolio'])) {
            return this.getProjectsResponse(lowerMessage);
        }
        
        // Experience queries
        if (this.matchPattern(lowerMessage, ['experience', 'internship', 'work', 'job', 'career'])) {
            return `Gaurav's experience includes:<br><br>
                🏛️ <strong>Data & AI Intern</strong> - <em>Ministry of Panchayati Raj, Govt of India</em> (Sep 2026 – Present)<br>
                Working on MoPR's website chatbot, panchayat complaint portal, and dataset management using AI tools.<br><br>
                ⚡ <strong>Frontend Developer Intern</strong> - <em>Alfido Tech</em> (Jul 2026 – Aug 2026)<br>
                Shipped 6+ production React components and merged 15+ PRs in a Git-based sprint cycle.<br><br>
                🌐 <strong>Web Developer Intern</strong> - <em>Brainwave Matrix Solutions</em> (Sep 2024 – Nov 2024)<br>
                Built 8+ pages and 5+ reusable components across Chrome, Firefox, and Safari.`;
        }
        
        // Education queries
        if (this.matchPattern(lowerMessage, ['education', 'study', 'degree', 'college', 'university', 'student'])) {
            return `Gaurav is pursuing his <strong>B.Tech in Computer Science & Engineering</strong> at <em>Dronacharya Group of Institutions, Greater Noida</em> (Expected Graduation: 2027) with a 7.0/10 CGPA. He also scored in the <strong>96.7 percentile</strong> in JEE Main 2023 (AIR 41,652).`;
        }
        
        // Contact queries
        if (this.matchPattern(lowerMessage, ['contact', 'email', 'phone', 'reach', 'hire', 'recruit'])) {
            return `You can reach Gaurav through:<br>
                📧 Email: <a href="mailto:${this.knowledge.personal.email}" target="_blank">${this.knowledge.personal.email}</a><br>
                📱 Phone: ${this.knowledge.personal.phone}<br>
                💼 LinkedIn: <a href="${this.knowledge.personal.linkedin}" target="_blank">Connect on LinkedIn</a><br>
                💻 GitHub: <a href="${this.knowledge.personal.github}" target="_blank">View GitHub Profile</a><br><br>
                He's currently <strong>open to opportunities</strong> and would love to hear from you!`;
        }
        
        // Location queries
        if (this.matchPattern(lowerMessage, ['location', 'where', 'based', 'from', 'live'])) {
            return `Gaurav is based in <strong>${this.knowledge.personal.location}</strong>. He's open to both remote and on-site opportunities!`;
        }
        
        // Availability queries
        if (this.matchPattern(lowerMessage, ['available', 'hiring', 'looking', 'opportunity', 'position'])) {
            return `Yes! Gaurav is currently <strong>open to opportunities</strong>. He's looking for roles in software engineering, full-stack development, and web development where he can contribute meaningfully and continue growing as an engineer. Feel free to reach out via email or LinkedIn!`;
        }
        
        // GitHub queries
        if (this.matchPattern(lowerMessage, ['github', 'git', 'code', 'repository', 'repo'])) {
            return `You can check out Gaurav's code on GitHub: <a href="${this.knowledge.personal.github}" target="_blank">github.com/Gaurav18071</a><br><br>
                His repositories showcase various projects including full-stack applications, frontend projects, and algorithms implementations. Feel free to explore and star the ones you find interesting!`;
        }
        
        // Resume queries
        if (this.matchPattern(lowerMessage, ['resume', 'cv', 'download'])) {
            return `You can view or download Gaurav's resume directly from the hero section of this portfolio. Look for the <strong>"View Resume"</strong> or <strong>"Download Resume"</strong> buttons. It contains detailed information about his skills, experience, projects, and education!`;
        }
        
        // Specific tech queries
        if (this.matchPattern(lowerMessage, ['react', 'next', 'node', 'java', 'spring', 'javascript', 'typescript'])) {
            return this.getSpecificTechResponse(lowerMessage);
        }
        
        // Interests queries
        if (this.matchPattern(lowerMessage, ['interest', 'passion', 'like', 'enjoy', 'hobby'])) {
            return `Gaurav is passionate about:<br>
                • <strong>Software Engineering</strong> - Building reliable, well-engineered systems<br>
                • <strong>Web Development</strong> - Creating modern, responsive user experiences<br>
                • <strong>Problem Solving</strong> - Tackling complex technical challenges<br>
                • <strong>Product Development</strong> - Building useful, impactful products<br>
                • <strong>Continuous Learning</strong> - Always exploring new technologies and best practices`;
        }
        
        // Thanks pattern
        if (this.matchPattern(lowerMessage, ['thank', 'thanks', 'appreciate'])) {
            return `You're welcome! 😊 Feel free to ask if you have any other questions about Gaurav's background, skills, or projects. I'm here to help!`;
        }
        
        // Default response with suggestions
        return this.getDefaultResponse();
    }
    
    getSkillsResponse(message) {
        if (message.includes('frontend') || message.includes('front-end')) {
            return `<strong>Frontend Skills:</strong><br>
                ${this.knowledge.skills.frontend.join(', ')}<br><br>
                Gaurav specializes in building modern, responsive user interfaces with React and Next.js, using Tailwind CSS for styling and Framer Motion for animations.`;
        }
        
        if (message.includes('backend') || message.includes('back-end')) {
            return `<strong>Backend Skills:</strong><br>
                ${this.knowledge.skills.backend.join(', ')}<br><br>
                He has solid experience with Spring Boot ecosystem for building robust Java applications, as well as Node.js/Express for JavaScript-based backends.`;
        }
        
        if (message.includes('database') || message.includes('db')) {
            return `<strong>Database Skills:</strong><br>
                ${this.knowledge.skills.database.join(', ')}<br><br>
                Experienced with both SQL (PostgreSQL) and NoSQL (MongoDB) databases, along with modern tools like Supabase.`;
        }
        
        // General skills response
        return `<strong>Gaurav's Tech Stack:</strong><br><br>
            💻 <strong>Languages:</strong> ${this.knowledge.skills.languages.join(', ')}<br>
            🎨 <strong>Frontend:</strong> ${this.knowledge.skills.frontend.slice(0, 4).join(', ')}<br>
            ⚙️ <strong>Backend:</strong> ${this.knowledge.skills.backend.slice(0, 4).join(', ')}<br>
            🗄️ <strong>Database:</strong> ${this.knowledge.skills.database.join(', ')}<br>
            🛠️ <strong>Tools:</strong> ${this.knowledge.skills.tools.slice(0, 6).join(', ')}<br><br>
            He's a full-stack developer with experience across the entire development spectrum!`;
    }
    
    getProjectsResponse(message) {
        if (message.includes('estrip') || message.includes('travel')) {
            const project = this.knowledge.projects[0];
            return `<strong>🌟 ${project.name}</strong><br>
                ${project.description}<br><br>
                <strong>Tech Stack:</strong> ${project.tech.join(', ')}<br>
                <a href="${project.github}" target="_blank">View on GitHub →</a>`;
        }
        
        if (message.includes('golf') || message.includes('charity')) {
            const project = this.knowledge.projects[1];
            return `<strong>⛳ ${project.name}</strong><br>
                ${project.description}<br><br>
                <strong>Tech Stack:</strong> ${project.tech.join(', ')}<br>
                This showcases his full-stack capabilities with modern technologies!`;
        }
        
        // General projects response
        return `<strong>Featured Projects:</strong><br><br>
            ⌨️ <strong>Flapboard</strong> - AI-powered adaptive typing platform (Spring Boot, Next.js, Docker, LLM)<br>
            ⛳ <strong>Golf Charity Platform</strong> - Full-stack fundraising platform (Next.js, Prisma, Razorpay)<br>
            📋 <strong>HireTrack</strong> - Recruitment management platform & ATS (Next.js, Auth.js, PostgreSQL)<br>
            🌟 <strong>Estrip</strong> - AI-powered travel platform with weather & currency APIs<br><br>
            Check out the Projects section or his GitHub (<a href="${this.knowledge.personal.github}" target="_blank">Gaurav18071</a>) for full source code!`;
    }
    
    getSpecificTechResponse(message) {
        const techMap = {
            'react': 'Gaurav is proficient in React.js and has used it to build multiple interactive user interfaces. He understands component lifecycle, hooks, state management, and modern React patterns.',
            'next': 'He has experience with Next.js for building server-rendered React applications, utilizing features like API routes, server-side rendering, and static generation.',
            'node': 'Gaurav uses Node.js with Express for building scalable backend services and REST APIs, handling authentication, database operations, and business logic.',
            'java': 'Java is one of his core languages. He has strong OOP fundamentals and has built enterprise applications using Java.',
            'spring': 'He is experienced with the Spring ecosystem, particularly Spring Boot, Spring Security, and Spring Data JPA for building robust backend applications.',
            'javascript': "JavaScript is his primary language for web development. He's comfortable with modern ES6+ features, async programming, and both frontend and backend JavaScript.",
            'typescript': "He uses TypeScript for type-safe development, especially in larger React/Next.js projects to catch errors early and improve code quality."
        };
        
        for (const [tech, response] of Object.entries(techMap)) {
            if (message.includes(tech)) {
                return `<strong>${tech.charAt(0).toUpperCase() + tech.slice(1)} Skills:</strong><br><br>${response}`;
            }
        }
        
        return this.getSkillsResponse(message);
    }
    
    getDefaultResponse() {
        const suggestions = [
            "What technologies does Gaurav work with?",
            "Tell me about his featured projects",
            "What's his work experience?",
            "How can I contact him?",
            "Is he available for opportunities?"
        ];
        
        return `I'm not quite sure how to answer that, but I'd love to help! Here are some things you can ask me:<br><br>
            • ${suggestions.join('<br>• ')}<br><br>
            Feel free to ask anything about Gaurav's background, skills, or experience! 😊`;
    }
    
    matchPattern(message, patterns) {
        return patterns.some(pattern => message.includes(pattern));
    }
}

// Initialize chatbot - handles both deferred and inline loading
function initChatbot() {
    new PortfolioChatbot();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbot);
} else {
    // DOM already ready (common with defer scripts)
    initChatbot();
}
