 tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        poppins: ['Poppins', 'sans-serif'],
                    },
                    colors: {
                        space: {
                            900: '#0a0a1a',
                            800: '#0f0f2d',
                            700: '#1a1a3e',
                        }
                    }
                }
            }
        }

// Generate Stars
const starsContainer = document.getElementById('stars')
for (let i = 0; i < 150 ;i++) {
    const star = document.createElement('div')
    star.className = 'star'
    star.style.left = Math.random() * 100 + '%'
    star.style.top = Math.random() * 100 + '%'
    star.style.width = Math.random() * 3 + 1 + 'px'
    star.style.height = star.style.width
    star.style.setProperty('--duration', Math.random() * 3 + 2 + 's')
    star.style.animationDelay = Math.random() * 5 + 's'
    starsContainer.appendChild(star)
}

// Typewriter Effect
const words = ['React JS', 'Web Developer', 'FrontEnd Developer']
let wordIndex = 0
let charIndex = 0
let isDeleting = false
const typeText = document.getElementById('type-text')

function type() {
    const current = words[wordIndex]

    if (isDeleting) {
        typeText.textContent = current.substring(0, charIndex - 1)
        charIndex--
    } else {
        typeText.textContent = current.substring(0, charIndex + 1)
        charIndex++
    }

    let speed = isDeleting ? 60 : 120

    if (!isDeleting && charIndex === current.length) {
        speed = 2000
        isDeleting = true
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false
        wordIndex = (wordIndex + 1) % words.length
        speed = 500
    }

    setTimeout(type, speed)
}
type()

// Mobile Menu
document.getElementById('mobile-btn').addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.toggle('hidden')
})

// Skills Data with Animated Rings
const skillsData = [
    { name: 'JavaScript (ES6+)', percent: 85 },
    { name: 'React JS', percent: 80 },
    { name: 'Bootstrap', percent: 90 },
    { name: 'Responsive Design', percent: 85 },
    { name: 'HTML5', percent: 95 },
    { name: 'CSS3', percent: 90 },
    { name: 'FrontEnd Development', percent: 90 }
]

let currentSkillIndex = 0

function renderSkills() {
    const container = document.getElementById('skills-container')
    const visible = skillsData.slice(currentSkillIndex, currentSkillIndex + 3)

    container.innerHTML = visible.map((skill, idx) => {
        const radius = 55
        const circumference = 2 * Math.PI * radius
        const offset = circumference - (skill.percent / 100) * circumference
        const uniqueId = `skill-ring-${currentSkillIndex}-${idx}`

        return `
            <div class="flex flex-col items-center group">
                <div class="relative w-48 h-48 mb-5">
                    <svg class="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="${radius}" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="10"/>
                        <circle id="${uniqueId}" cx="60" cy="60" r="${radius}" fill="none" 
                            stroke="url(#skillGradient)" stroke-width="10" 
                            stroke-linecap="round" 
                            stroke-dasharray="${circumference}" 
                            stroke-dashoffset="${circumference}"
                            style="transition: stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)"/>
                        <defs>
                            <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stop-color="#7c3aed" />
                                <stop offset="100%" stop-color="#a855f7" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div class="absolute inset-0 flex items-center justify-center">
                        <span class="text-3xl font-bold text-white">${skill.percent}%</span>
                    </div>
                </div>
                <h3 class="text-white font-semibold text-lg tracking-wide">${skill.name}</h3>
            </div>
        `
    }).join('')

    setTimeout(() => {
        visible.forEach((skill, idx) => {
            const ring = document.getElementById(`skill-ring-${currentSkillIndex}-${idx}`)
            if (ring) {
                const radius = 55
                const circumference = 2 * Math.PI * radius
                const offset = circumference - (skill.percent / 100) * circumference
                ring.style.strokeDashoffset = offset
            }
        })
    }, 100)
}

renderSkills()

// Skill Carousel Navigation
function nextSkills() {
    if (currentSkillIndex < skillsData.length - 3) {
        currentSkillIndex++
    } else {
        currentSkillIndex = 0
    }
    renderSkills()
}

function prevSkills() {
    if (currentSkillIndex > 0) {
        currentSkillIndex--
    } else {
        currentSkillIndex = skillsData.length - 3
    }
    renderSkills()
}

// Projects Data
const projectsData = [
    { title: 'Project 1', desc: 'Simple Design With HTML & CSS', category: 'all', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=350&fit=crop' },
    { title: 'Techno Market', desc: 'Online Store HTML & CSS3 Design', category: 'html', img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=350&fit=crop' },
    { title: 'EduPlatform', desc: 'Design With Bootstrap 5', category: 'js', img: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500&h=350&fit=crop' },
    { title: 'Online Shopping', desc: 'JavaScript E-commerce', category: 'html', img: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=500&h=350&fit=crop' },
    { title: 'My Portfolio', desc: 'React JS Personal Website', category: 'js', img: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=500&h=350&fit=crop' },
    { title: 'Password Generator', desc: 'Secure Password Tool', category: 'js', img: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=500&h=350&fit=crop' }
]

function renderProjects(filter = 'all') {
    const container = document.getElementById('projects-container')
    const filtered = filter === 'all' ? projectsData : projectsData.filter(p => p.category === filter)

    container.innerHTML = filtered.map(project => `
        <div class="group relative rounded-3xl overflow-hidden bg-slate-900 border border-white/10 hover:border-purple-500/50 transition-all">
            <div class="aspect-video overflow-hidden">
                <img src="${project.img}" alt="${project.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div class="text-center p-6">
                    <h3 class="text-2xl font-bold text-white mb-2">${project.title}</h3>
                    <p class="text-white/80">${project.desc}</p>
                </div>
            </div>
        </div>
    `).join('')
}

renderProjects()

function filterProjects(category) {
    document.querySelectorAll('.project-tab').forEach(tab => {
        if (tab.dataset.filter === category) {
            tab.classList.add('bg-gradient-to-r', 'from-purple-600', 'to-pink-600', 'text-white')
            tab.classList.remove('text-slate-400')
        } else {
            tab.classList.remove('bg-gradient-to-r', 'from-purple-600', 'to-pink-600', 'text-white')
            tab.classList.add('text-slate-400')
        }
    })
    renderProjects(category)
}

// Init Lucide
lucide.createIcons()

// Active nav on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]')
    const scrollY = window.scrollY

    sections.forEach(section => {
        const height = section.offsetHeight
        const top = section.offsetTop - 100
        const id = section.getAttribute('id')

        if (scrollY > top && scrollY <= top + height) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active')
                if (link.getAttribute('href') === '#' + id) {
                    link.classList.add('active')
                }
            })
        }
    })
})
const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const formData = new FormData(contactForm);
            
            try {
                const response = await fetch('https://formspree.io/f/xlgaqqjl', {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });
                
                if (response.ok) {
                    alert('✅ Message sent successfully!');
                    contactForm.reset();
                } else {
                    alert('❌ Something went wrong. Please try again.');
                }
            } catch (error) {
                alert('❌ Network error. Please check your connection.');
            }
        });
    }
   
// فورم النيوزليتر
const subscribeForm = document.getElementById('subscribeForm');
if (subscribeForm) {
    subscribeForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const formData = new FormData(subscribeForm);
        
        try {
            const response = await fetch('https://formspree.io/f/xjgjnneg', {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });
            
            if (response.ok) {
                alert('✅ Thanks for subscribing!');
                subscribeForm.reset();
            } else {
                alert('❌ Something went wrong. Please try again.');
            }
        } catch (error) {
            alert('❌ Network error. Please check your connection.');
        }
    });
}