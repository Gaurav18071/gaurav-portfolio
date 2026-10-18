/* ==========================================================
   HERO TERMINAL (Interactive Shell ~/ask-me.sh)
   ========================================================== */

(function () {
    'use strict';

    const terminalForm = document.getElementById('terminalForm');
    const terminalInput = document.getElementById('terminalInput');
    const terminalConversation = document.getElementById('terminalConversation');
    const terminalScrollArea = document.getElementById('terminalScrollArea');
    const quickChips = document.querySelectorAll('.term-chip');

    if (!terminalForm || !terminalInput || !terminalConversation || !terminalScrollArea) {
        return;
    }

    const KNOWLEDGE = {
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
            database: ["PostgreSQL", "MongoDB", "SQL", "Supabase", "Neon"],
            tools: ["Git", "GitHub", "Docker", "Postman", "VS Code", "Maven", "Vercel", "Render"],
            core: ["Data Structures & Algorithms", "Object-Oriented Programming", "Database Management", "Operating Systems", "Computer Networks"]
        },
        
        projects: [
            {
                name: "Flapboard",
                description: "Full-stack AI-assisted typing speed & diagnostic platform with adaptive training and LLM-powered coaching",
                tech: ["Next.js", "TypeScript", "Spring Boot", "PostgreSQL", "Docker", "AI/LLM"],
                type: "Featured"
            },
            {
                name: "Golf Charity Platform",
                description: "Philanthropic tournament & campaign platform connecting golfers with charitable causes",
                tech: ["Next.js", "Supabase", "PostgreSQL", "Prisma", "Razorpay"],
                type: "Full-Stack"
            },
            {
                name: "Estrip",
                description: "AI-powered travel platform with destination discovery, weather, and currency APIs",
                tech: ["HTML5", "CSS3", "JavaScript", "Weather API", "Currency API"],
                type: "Frontend"
            },
            {
                name: "NeuroQuiz",
                description: "Interactive quiz platform with timed challenges and performance analytics",
                tech: ["JavaScript", "HTML5", "CSS3", "GSAP", "Vite"],
                type: "Frontend"
            }
        ],
        
        experience: [
            "Data & AI Intern at Ministry of Panchayati Raj (MoPR chatbot & dataset management)",
            "Frontend Developer Intern at Alfido Tech (React features, 15+ PRs merged)",
            "Web Developer Intern at Brainwave Matrix Solutions (Full web UI builds)",
            "Full-stack development across multiple internships"
        ],
        
        interests: [
            "Software Engineering",
            "Web Development",
            "Problem Solving",
            "Building useful products",
            "Clean code practices",
            "AI & LLM integration"
        ]
    };

    function getAnswer(query) {
        const q = query.toLowerCase().trim();

        // Greeting
        if (q.match(/^(hi|hello|hey|hola|namaste)$/)) {
            return "Hello! 👋 I'm here to help you learn about Gaurav. You can ask me about his skills, projects, experience, or how to contact him. What would you like to know?";
        }

        // Name queries
        if (q.includes('name') || q.includes('who are you') || q.includes('who is')) {
            return `I'm an AI assistant for ${KNOWLEDGE.personal.name}, a ${KNOWLEDGE.personal.role}. He's currently in his final year of Computer Science Engineering and is ${KNOWLEDGE.personal.availability.toLowerCase()}!`;
        }

        // Skills - General
        if (q.includes('skill') || q.includes('tech stack') || q.includes('what') && q.includes('stack')) {
            return `💻 Tech Stack:\n\nLanguages: ${KNOWLEDGE.skills.languages.join(', ')}\n\nFrontend: ${KNOWLEDGE.skills.frontend.slice(0, 4).join(', ')}\n\nBackend: ${KNOWLEDGE.skills.backend.slice(0, 5).join(', ')}\n\nDatabase: ${KNOWLEDGE.skills.database.join(', ')}\n\nTools: ${KNOWLEDGE.skills.tools.slice(0, 6).join(', ')}\n\nHe's a full-stack developer with experience across the entire development spectrum!`;
        }

        // Skills - Frontend
        if (q.includes('frontend') || q.includes('front-end') || q.includes('react') || q.includes('next')) {
            return `Frontend Skills:\n${KNOWLEDGE.skills.frontend.join(', ')}\n\nGaurav specializes in building modern, responsive user interfaces with React and Next.js, using Tailwind CSS for styling.`;
        }

        // Skills - Backend
        if (q.includes('backend') || q.includes('back-end') || q.includes('spring') || q.includes('node')) {
            return `Backend Skills:\n${KNOWLEDGE.skills.backend.join(', ')}\n\nHe has solid experience with Spring Boot ecosystem for building robust Java applications, as well as Node.js/Express for JavaScript-based backends.`;
        }

        // Skills - Database
        if (q.includes('database') || q.includes('db') || q.includes('sql')) {
            return `Database Skills:\n${KNOWLEDGE.skills.database.join(', ')}\n\nExperienced with both SQL (PostgreSQL) and NoSQL (MongoDB) databases, along with modern tools like Supabase.`;
        }

        // Projects - General
        if (q.includes('project') || q.includes('built') || q.includes('portfolio') || q.includes('work')) {
            let projectsText = "Featured Projects:\n\n";
            KNOWLEDGE.projects.forEach((p, i) => {
                projectsText += `${i + 1}. ${p.name} - ${p.description}\n   Tech: ${p.tech.join(', ')}\n\n`;
            });
            return projectsText + "All projects demonstrate clean code, modern design, and practical problem-solving!";
        }

        // Projects - Specific
        if (q.includes('flapboard') || q.includes('typing')) {
            const p = KNOWLEDGE.projects[0];
            return `${p.name}:\n${p.description}\n\nTech Stack: ${p.tech.join(', ')}\n\nThis showcases full-stack capabilities with AI integration!`;
        }

        if (q.includes('golf') || q.includes('charity')) {
            const p = KNOWLEDGE.projects[1];
            return `${p.name}:\n${p.description}\n\nTech Stack: ${p.tech.join(', ')}\n\nFeatures authentication, payment processing, and real-time updates!`;
        }

        if (q.includes('estrip') || q.includes('travel')) {
            const p = KNOWLEDGE.projects[2];
            return `${p.name}:\n${p.description}\n\nTech Stack: ${p.tech.join(', ')}\n\nIntegrates weather and currency APIs for travel planning!`;
        }

        // Experience
        if (q.includes('experience') || q.includes('intern') || q.includes('work') || q.includes('job')) {
            return `Work Experience:\n\n${KNOWLEDGE.experience.map((e, i) => `${i + 1}. ${e}`).join('\n')}\n\nGaurav has completed 4 internships focusing on full-stack development with hands-on experience in production codebases.`;
        }

        // Education
        if (q.includes('education') || q.includes('study') || q.includes('degree') || q.includes('college') || q.includes('btech')) {
            return `${KNOWLEDGE.personal.education} with a strong foundation in ${KNOWLEDGE.skills.core.join(', ')}. Passionate about applying theoretical knowledge to build practical, real-world solutions.`;
        }

        // Contact
        if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('reach') || q.includes('hire')) {
            return `📧 Contact Information:\n\nEmail: ${KNOWLEDGE.personal.email}\nPhone: ${KNOWLEDGE.personal.phone}\n💼 LinkedIn: ${KNOWLEDGE.personal.linkedin}\n💻 GitHub: ${KNOWLEDGE.personal.github}\n\nHe's currently open to opportunities!`;
        }

        // Availability
        if (q.includes('available') || q.includes('hiring') || q.includes('looking') || q.includes('opportunity')) {
            return `Yes! Gaurav is currently ${KNOWLEDGE.personal.availability}. He's looking for roles in software engineering, full-stack development where he can contribute and grow. Feel free to reach out via email or LinkedIn!`;
        }

        // Location
        if (q.includes('location') || q.includes('where') || q.includes('based') || q.includes('live')) {
            return `Gaurav is based in ${KNOWLEDGE.personal.location}. He's open to both remote and on-site opportunities!`;
        }

        // Resume
        if (q.includes('resume') || q.includes('cv') || q.includes('download')) {
            return `You can view or download Gaurav's resume from the hero section buttons - look for "View Resume" or "Download Resume". It contains detailed information about his skills, experience, and projects!`;
        }

        // Interests
        if (q.includes('interest') || q.includes('passion') || q.includes('like') || q.includes('enjoy')) {
            return `Gaurav is passionate about:\n${KNOWLEDGE.interests.map(i => `• ${i}`).join('\n')}\n\nAlways exploring new technologies and best practices!`;
        }

        // Java
        if (q.includes('java') && !q.includes('javascript')) {
            return "Java is one of Gaurav's core languages. He has strong OOP fundamentals and experience with Spring Boot ecosystem for building enterprise applications.";
        }

        // JavaScript/TypeScript
        if (q.includes('javascript') || q.includes('typescript') || q.includes('js') || q.includes('ts')) {
            return "JavaScript/TypeScript are Gaurav's primary languages for web development. He's comfortable with modern ES6+ features, async programming, and uses TypeScript for type-safe development in larger projects.";
        }

        // Thanks
        if (q.includes('thank') || q.includes('thanks')) {
            return "You're welcome! 😊 Feel free to ask if you have any other questions!";
        }

        // Clear
        if (q.includes('clear') || q.includes('cls') || q.includes('reset')) {
            terminalConversation.innerHTML = '';
            return 'terminal buffer cleared.';
        }

        // Help
        if (q.includes('help')) {
            return "Available commands:\n• 'what is your stack?'\n• 'tell me about your projects'\n• 'what's your experience?'\n• 'how do I contact you?'\n• 'are you available for hire?'\n• 'clear' - clear terminal";
        }

        // Default response
        return "I can answer questions about Gaurav's skills, projects, experience, and contact info. Try asking:\n• What technologies do you work with?\n• Tell me about your projects\n• What's your experience?\n• How can I contact you?\n• Are you available for opportunities?";
    }

    function appendMessage(text, isUser = false) {
        const row = document.createElement('div');
        row.className = isUser ? 'term-msg-row term-user' : 'term-msg-row term-bot';

        const prefix = document.createElement('span');
        prefix.className = isUser ? 'term-prompt-green' : 'term-bot-prefix';
        prefix.textContent = isUser ? '> ' : '// ';

        const content = document.createElement('span');
        content.className = isUser ? 'term-user-text' : 'term-bot-text';

        // Format newlines
        content.innerHTML = text.replace(/\n/g, '<br>');

        row.appendChild(prefix);
        row.appendChild(content);
        terminalConversation.appendChild(row);

        // Auto scroll
        terminalScrollArea.scrollTo({
            top: terminalScrollArea.scrollHeight,
            behavior: 'smooth'
        });
    }

    function handleQuery(query) {
        if (!query.trim()) return;
        appendMessage(query, true);

        // Small realistic response delay
        setTimeout(() => {
            const answer = getAnswer(query);
            appendMessage(answer, false);
        }, 180);
    }

    terminalForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const query = terminalInput.value;
        if (query.trim()) {
            handleQuery(query);
            terminalInput.value = '';
        }
    });

    quickChips.forEach(chip => {
        chip.addEventListener('click', function () {
            const query = this.dataset.ask || this.textContent.trim();
            handleQuery(query);
        });
    });
})();
