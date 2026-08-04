export const cvData = {
    name: "Alex Chen",
    title: "Creative Web Developer & 3D Artist",
    summary: "Passionate developer with 5+ years of experience creating immersive web experiences using Three.js, WebGL, and modern frontend technologies. Specialized in interactive 3D applications and creative coding.",
    
    experience: [
        {
            position: "Senior Frontend Developer",
            company: "Tech Innovations Inc.",
            period: "2020 - Present",
            description: "Led development of interactive web applications using Three.js and modern JavaScript frameworks. Created immersive 3D experiences for clients in entertainment and education sectors."
        },
        {
            position: "Web Developer",
            company: "Digital Solutions Ltd.",
            period: "2018 - 2020",
            description: "Developed responsive websites and implemented interactive features for various clients. Specialized in creating engaging user experiences with WebGL and Canvas APIs."
        },
        {
            position: "Junior Developer",
            company: "Web Craft Studio",
            period: "2017 - 2018",
            description: "Built and maintained client websites, focusing on performance optimization and cross-browser compatibility."
        }
    ],
    
    skills: [
        "JavaScript (ES6+)",
        "Three.js & WebGL",
        "HTML5 & CSS3",
        "React & Vue.js",
        "Node.js",
        "UI/UX Design",
        "Web Animation",
        "Performance Optimization",
        "Git & Agile Methodologies"
    ],
    
    education: [
        {
            degree: "Bachelor of Computer Science",
            institution: "University of Technology",
            year: "2017"
        },
        {
            degree: "Web Development Bootcamp",
            institution: "Code Academy",
            year: "2016"
        }
    ],
    
    projects: [
        {
            name: "Interactive Portfolio Gallery",
            description: "3D gallery showcasing digital artwork with immersive navigation"
        },
        {
            name: "Virtual Museum Experience",
            description: "Web-based virtual museum with interactive exhibits"
        },
        {
            name: "Data Visualization Dashboard",
            description: "Real-time 3D data visualization for analytics platform"
        }
    ],
    
    contact: {
        email: "alex.chen@example.com",
        phone: "+81 80-1234-5678",
        location: "Tokyo, Japan",
        github: "github.com/alexchen",
        linkedin: "linkedin.com/in/alexchen"
    }
};

export function displayCV() {
    const cvContent = document.getElementById('cv-content');
    
    cvContent.innerHTML = `
        <div class="cv-section">
            <h3>About Me</h3>
            <p>${cvData.summary}</p>
        </div>
        
        <div class="cv-section">
            <h3>Experience</h3>
            ${cvData.experience.map(exp => `
                <div class="experience-item">
                    <h4>${exp.position} - ${exp.company}</h4>
                    <p class="period">${exp.period}</p>
                    <p>${exp.description}</p>
                </div>
            `).join('')}
        </div>
        
        <div class="cv-section">
            <h3>Skills</h3>
            <div class="skills-grid">
                ${cvData.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
        </div>
        
        <div class="cv-section">
            <h3>Education</h3>
            ${cvData.education.map(edu => `
                <div class="education-item">
                    <h4>${edu.degree}</h4>
                    <p>${edu.institution} • ${edu.year}</p>
                </div>
            `).join('')}
        </div>
        
        <div class="cv-section">
            <h3>Notable Projects</h3>
            <ul>
                ${cvData.projects.map(project => `
                    <li><strong>${project.name}:</strong> ${project.description}</li>
                `).join('')}
            </ul>
        </div>
        
        <div class="cv-section">
            <h3>Contact</h3>
            <div class="contact-info">
                <p><strong>Email:</strong> ${cvData.contact.email}</p>
                <p><strong>Phone:</strong> ${cvData.contact.phone}</p>
                <p><strong>Location:</strong> ${cvData.contact.location}</p>
                <p><strong>GitHub:</strong> ${cvData.contact.github}</p>
                <p><strong>LinkedIn:</strong> ${cvData.contact.linkedin}</p>
            </div>
        </div>
    `;
    
    document.getElementById('cv-display').style.display = 'block';
}