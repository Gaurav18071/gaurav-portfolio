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
            ai: ["Claude AI", "GitHub Copilot", "ChatGPT", "Cursor AI", "LLM Integration", "AI-Assisted Development"],
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
        if (q.match(/^(hi|hello|hey|hola|namaste|sup|yo)$/)) {
            return "Hello! 👋 I'm here to help you learn about Gaurav. You can ask me about his skills, projects, experience, or how to contact him. What would you like to know?";
        }

        // Help
        if (q.match(/^(help|\?)$/)) {
            return "I can answer questions about Gaurav's skills, projects, experience, and contact info. Try asking:\n• What technologies do you work with?\n• Tell me about your projects\n• What's your experience?\n• How can I contact you?\n• Are you available for opportunities?";
        }

        // Clear
        if (q.match(/^(clear|cls|reset)$/)) {
            terminalConversation.innerHTML = '';
            return 'terminal buffer cleared.';
        }

        // Thanks
        if (q.match(/^(thank|thanks|thank you|thx)$/)) {
            return "You're welcome! 😊 Feel free to ask if you have any other questions!";
        }

        // Name queries
        if (q.match(/name|who are you|who is/)) {
            return `I'm an AI assistant for ${KNOWLEDGE.personal.name}, a ${KNOWLEDGE.personal.role}. He's currently in his final year of Computer Science Engineering and is ${KNOWLEDGE.personal.availability.toLowerCase()}!`;
        }

        // Projects - Specific (must come BEFORE general project query)
        if (q.match(/flapboard|typing/)) {
            const p = KNOWLEDGE.projects[0];
            return `${p.name}:\n${p.description}\n\nTech Stack: ${p.tech.join(', ')}\n\nThis showcases full-stack capabilities with AI integration!`;
        }

        if (q.match(/golf|charity/)) {
            const p = KNOWLEDGE.projects[1];
            return `${p.name}:\n${p.description}\n\nTech Stack: ${p.tech.join(', ')}\n\nFeatures authentication, payment processing, and real-time updates!`;
        }

        if (q.match(/estrip|travel/)) {
            const p = KNOWLEDGE.projects[2];
            return `${p.name}:\n${p.description}\n\nTech Stack: ${p.tech.join(', ')}\n\nIntegrates weather and currency APIs for travel planning!`;
        }

        if (q.match(/neuroquiz|quiz/)) {
            const p = KNOWLEDGE.projects[3];
            return `${p.name}:\n${p.description}\n\nTech Stack: ${p.tech.join(', ')}\n\nInteractive quiz with performance tracking!`;
        }

        // Projects - General
        if (q.match(/project|built|portfolio/)) {
            let projectsText = "Featured Projects:\n\n";
            KNOWLEDGE.projects.forEach((p, i) => {
                projectsText += `${i + 1}. ${p.name} - ${p.description}\n   Tech: ${p.tech.join(', ')}\n\n`;
            });
            return projectsText + "All projects demonstrate clean code, modern design, and practical problem-solving!";
        }

        // Skills - Specific (must come BEFORE general skills query)
        if (q.match(/frontend|front-end|front end|react|next\.?js/)) {
            return `Frontend Skills:\n${KNOWLEDGE.skills.frontend.join(', ')}\n\nGaurav specializes in building modern, responsive user interfaces with React and Next.js, using Tailwind CSS for styling.`;
        }

        if (q.match(/backend|back-end|back end|spring|node\.?js|api/)) {
            return `Backend Skills:\n${KNOWLEDGE.skills.backend.join(', ')}\n\nHe has solid experience with Spring Boot ecosystem for building robust Java applications, as well as Node.js/Express for JavaScript-based backends.`;
        }

        if (q.match(/database|db\b|sql|mongo|postgres/)) {
            return `Database Skills:\n${KNOWLEDGE.skills.database.join(', ')}\n\nExperienced with both SQL (PostgreSQL) and NoSQL (MongoDB) databases, along with modern tools like Supabase.`;
        }

        if (q.match(/\bai\b|claude|copilot|chatgpt|cursor|llm/)) {
            return `AI & Development Tools:\n${KNOWLEDGE.skills.ai.join(', ')}\n\nGaurav leverages modern AI tools for enhanced productivity and integrates LLM capabilities into applications for intelligent features.`;
        }

        if (q.match(/\bjava\b/) && !q.match(/javascript/)) {
            return "Java is one of Gaurav's core languages. He has strong OOP fundamentals and experience with Spring Boot ecosystem for building enterprise applications.";
        }

        if (q.match(/javascript|typescript|\bjs\b|\bts\b/)) {
            return "JavaScript/TypeScript are Gaurav's primary languages for web development. He's comfortable with modern ES6+ features, async programming, and uses TypeScript for type-safe development in larger projects.";
        }

        if (q.match(/python/)) {
            return "Python is part of Gaurav's technical toolkit, used for scripting, data processing, and backend development.";
        }

        // Skills - General (must come AFTER specific skills)
        if (q.match(/skill|tech stack|technologies|stack/)) {
            return `💻 Tech Stack:\n\nLanguages: ${KNOWLEDGE.skills.languages.join(', ')}\n\nFrontend: ${KNOWLEDGE.skills.frontend.slice(0, 4).join(', ')}\n\nBackend: ${KNOWLEDGE.skills.backend.slice(0, 5).join(', ')}\n\nDatabase: ${KNOWLEDGE.skills.database.join(', ')}\n\nAI & Dev Tools: ${KNOWLEDGE.skills.ai.slice(0, 4).join(', ')}\n\nTools: ${KNOWLEDGE.skills.tools.slice(0, 6).join(', ')}\n\nHe's a full-stack developer with AI integration experience!`;
        }

        // Experience
        if (q.match(/experience|intern|job|work history/)) {
            return `Work Experience:\n\n${KNOWLEDGE.experience.map((e, i) => `${i + 1}. ${e}`).join('\n')}\n\nGaurav has completed 4 internships focusing on full-stack development with hands-on experience in production codebases.`;
        }

        // Education
        if (q.match(/education|study|degree|college|btech|university|dronacharya/)) {
            return `${KNOWLEDGE.personal.education} at Dronacharya Group of Institutions with a strong foundation in ${KNOWLEDGE.skills.core.join(', ')}. Passionate about applying theoretical knowledge to build practical, real-world solutions.`;
        }

        // Contact
        if (q.match(/contact|email|phone|reach|github|linkedin/)) {
            return `📧 Contact Information:\n\nEmail: ${KNOWLEDGE.personal.email}\nPhone: ${KNOWLEDGE.personal.phone}\n💼 LinkedIn: ${KNOWLEDGE.personal.linkedin}\n💻 GitHub: ${KNOWLEDGE.personal.github}\n\nHe's currently open to opportunities!`;
        }

        // Availability
        if (q.match(/available|hiring|hire|looking|opportunity|opportunities/)) {
            return `Yes! Gaurav is currently ${KNOWLEDGE.personal.availability}. He's looking for roles in software engineering and full-stack development where he can contribute and grow. Feel free to reach out via email or LinkedIn!`;
        }

        // Location
        if (q.match(/location|where|based|live|city/)) {
            return `Gaurav is based in ${KNOWLEDGE.personal.location}. He's open to both remote and on-site opportunities!`;
        }

        // Resume
        if (q.match(/resume|cv|download/)) {
            return `You can view or download Gaurav's resume from the hero section buttons - look for "View Resume" or "Download Resume". It contains detailed information about his skills, experience, and projects!`;
        }

        // Interests
        if (q.match(/interest|passion|like|enjoy|hobby/)) {
            return `Gaurav is passionate about:\n${KNOWLEDGE.interests.map(i => `• ${i}`).join('\n')}\n\nAlways exploring new technologies and best practices!`;
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
