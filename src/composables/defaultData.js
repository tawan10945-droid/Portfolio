import awsImg from '../assets/certificates/aws.png'
import dockerImg from '../assets/certificates/docker.png'
import jsImg from '../assets/certificates/javascript.png'
import tsImg from '../assets/certificates/typescript.png'
import vueImg from '../assets/certificates/vuejs.png'
import nodeImg from '../assets/certificates/nodejs.png'
import pythonImg from '../assets/certificates/python.png'

export const defaultCerts = [
    { id: 1, title: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', date: '2024', image: awsImg, url: 'https://aws.amazon.com/certification/' },
    { id: 2, title: 'Docker Certified Associate', issuer: 'Docker, Inc.', date: '2024', image: dockerImg, url: 'https://www.docker.com/certification/' },
    { id: 3, title: 'JavaScript Algorithms and Data Structures', issuer: 'freeCodeCamp', date: '2023', image: jsImg, url: 'https://www.freecodecamp.org/' },
    { id: 4, title: 'TypeScript Fundamentals', issuer: 'Microsoft Learn', date: '2023', image: tsImg, url: 'https://learn.microsoft.com' },
    { id: 5, title: 'Vue.js — The Complete Guide', issuer: 'Udemy', date: '2023', image: vueImg, url: 'https://www.udemy.com/' },
    { id: 6, title: 'Node.js Developer', issuer: 'Coursera', date: '2022', image: nodeImg, url: 'https://www.coursera.org/' },
    { id: 7, title: 'Programming Concepts for Python', issuer: 'LinkedIn Learning', date: '2026', image: pythonImg, url: 'https://www.linkedin.com/learning/' },
]

export const defaultProjects = [
    { id: 1, title: 'Payroll Management System', desc: 'Full-stack payroll application with employee management, payslip generation, leave tracking, and MySQL backend deployed on AWS.', tags: ['Node.js', 'MySQL', 'Docker', 'AWS'], github: 'https://github.com', demo: null, gradient: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', emoji: '💼' },
    { id: 2, title: 'Portfolio Website', desc: 'Personal portfolio built with Vue 3, Vite, and pure CSS featuring smooth scroll animations, glassmorphism cards, and a dark-mode design system.', tags: ['Vue 3', 'Vite', 'CSS'], github: 'https://github.com', demo: '#', gradient: 'linear-gradient(135deg, #0c1445 0%, #1a0533 100%)', emoji: '🚀' },
    { id: 3, title: 'Calendar & Event Manager', desc: 'Home-page calendar integration using FullCalendar and Firebase Firestore, displaying job events, leave schedules, and public holidays in real time.', tags: ['Firebase', 'FullCalendar', 'JavaScript'], github: 'https://github.com', demo: null, gradient: 'linear-gradient(135deg, #022c22 0%, #064e3b 100%)', emoji: '📅' },
    { id: 4, title: 'REST API Service', desc: 'TypeScript-based Express RESTful API with JWT authentication, MySQL/PostgreSQL support, Dockerized and deployable to AWS App Runner.', tags: ['TypeScript', 'Express', 'Docker'], github: 'https://github.com', demo: null, gradient: 'linear-gradient(135deg, #1c1917 0%, #292524 100%)', emoji: '⚙️' },
    { id: 5, title: 'Angular Payroll Frontend', desc: 'Angular Single-Page Application for payroll management with component-driven architecture, reactive forms, and Material Design UI.', tags: ['Angular', 'TypeScript', 'CSS'], github: 'https://github.com', demo: null, gradient: 'linear-gradient(135deg, #3f0012 0%, #7f1d1d 100%)', emoji: '🔺' },
    { id: 6, title: 'Database Migration Tool', desc: 'Automated PostgreSQL-to-MySQL migration utility with schema conversion, query rewriting, and rollback support.', tags: ['Node.js', 'MySQL', 'PostgreSQL'], github: 'https://github.com', demo: null, gradient: 'linear-gradient(135deg, #0c2340 0%, #1e3a5f 100%)', emoji: '🗄️' },
]
