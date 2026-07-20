WORLD-CLASS AI PROMPT
ROLE

You are a Senior Software Architect, Senior Full Stack Engineer, AI Engineer, Genetic Algorithm Expert, UI/UX Designer, DevOps Engineer, Database Architect, Cybersecurity Engineer, and Product Designer with over 20 years of experience building enterprise academic management systems.

Your task is to design and build a world-class intelligent web application called:

SmartTimetable AI
Web-Based Lecture Timetable Generator Using Genetic Algorithms

Case Study: Department of Computer Science, Faculty of Science, Adeseun Ogundoyin Polytechnic, Eruwa

The system must be production-ready, scalable, responsive, secure, AI-powered, visually stunning, and suitable for deployment across all departments in the future.

DESIGN GOAL

Do NOT build an ordinary school project.

Build something comparable to

Google Workspace
Notion
Microsoft 365
Canvas LMS
Blackboard
Coursera
Figma
Monday.com

using modern UI/UX principles.

Every screen should feel premium.

Animations must be smooth.

Everything must be intuitive.

TECHNOLOGY STACK

Frontend

Next.js 15
React 19
TypeScript
Tailwind CSS
Shadcn UI
Framer Motion
React Query
Zustand
React Hook Form
Zod
TanStack Table
Recharts

Backend

NestJS
TypeScript
REST API
Prisma ORM

Database

PostgreSQL

Authentication

NextAuth
JWT
RBAC

Storage

Supabase Storage

Deployment

Vercel
Railway
Docker
AI ENGINE

The system must implement an advanced Improved Genetic Algorithm (IGA).

The scheduling engine should automatically generate conflict-free lecture timetables using:

Selection
Tournament Selection
Elitism
Single Point Crossover
Mutation
Repair Function
Fitness Function
Constraint Validation
Multi-generation Optimization
HARD CONSTRAINTS

Never violate these rules.

A lecturer cannot teach two classes simultaneously.

A classroom cannot contain two lectures simultaneously.

Students cannot attend two lectures simultaneously.

A lecturer can only teach assigned courses.

A room capacity must not be exceeded.

Laboratories only host laboratory courses.

No lecture outside official school hours.

No duplicate timetable entries.

No overlapping timetable.

SOFT CONSTRAINTS

Optimize for

Even lecture distribution.

Minimal lecturer idle periods.

Minimal student idle periods.

Preferred lecturer availability.

Balanced classroom utilization.

Balanced daily workload.

FITNESS FUNCTION

Implement

Fitness =

1 /

(1 +

(Hard Violations ×1000)+

(Soft Violations ×10))

The best timetable is the chromosome with the highest fitness.

GENETIC ALGORITHM

Implement

Generate Population

↓

Evaluate Fitness

↓

Tournament Selection

↓

Crossover

↓

Mutation

↓

Repair Invalid Chromosomes

↓

Recalculate Fitness

↓

Repeat

↓

Best Timetable

SYSTEM MODULES
Authentication

Admin

HOD

Timetable Officer

Lecturer

Student

Dashboard

Beautiful analytics dashboard

Cards

Charts

Graphs

Statistics

Quick actions

Recent activities

Notifications

Dark Mode

Light Mode

Department Module

Faculty

Department

Programme

ND

HND

Software Development

Networking & Cloud Computing

Artificial Intelligence

Cyber Security

Lecturer Module

Use the lecturers contained in the uploaded departmental course allocation and timetable documents as the initial seed data for the system. This includes lecturers such as:

Mrs Moradeyo
Mrs Olaniyan
Mrs Idowu
Mr Dada
Mr Ojoawo
Mr Olorunnisola
Mr Kehinde
Mr Adeopa
Mr Okunlola
Mr Akinola
Mr Oladiti

Store

Name

Qualification

Email

Phone

Department

Assigned Courses

Preferred Teaching Time

Availability

Maximum Weekly Load

Photo

Office

The initial lecturer-course assignments must reflect the uploaded course allocation documents.

Course Module

Populate the system with the Department of Computer Science courses from the uploaded first-semester and second-semester allocation documents, including ND and HND programmes. Examples include:

COM 111 – Introduction to Computers
COM 121 – C Programming Language
COM 122 – Introduction to the Internet
COM 123 – Java Programming I
COM 124 – Data Structures and Algorithms
COM 125 – Introduction to System Analysis and Design
COM 126 – PC Upgrade & Maintenance
COM 211 – Java Programming II
COM 212 – Introduction to System Programming
COM 213 – UML
COM 214 – Computer System Troubleshooting
COM 215 – Computer Application Packages
COM 217 – Research Methodology
COM 218 – E-Commerce
COM 221 – Basic Computing & Networking
COM 222 – File Organisation and Management
COM 223 – Basic Hardware Maintenance
COM 224 – Management Information Systems
COM 225 – Web Design Technology
COM 226 – Computer Storage and Retrieval
SWD 321–425 series
NCC 321–428 series
AIT 321
CYS 322

Retain the course code, title, programme, level, semester, and lecturer mapping from the uploaded documents.

Classroom Module

Lecture Hall

Capacity

Building

Projector

Smart Board

Laboratory

Availability

Timetable Generator

Generate Automatically

Generate Manually

Conflict Detection

Conflict Report

Regenerate

Approve

Publish

Archive

Compare Timetables

AI Suggestions

Timetable Views

Department View

Student View

Lecturer View

Classroom View

Faculty View

Daily View

Weekly View

Monthly View

Calendar View

Drag and Drop View

Reports

PDF

Excel

CSV

Print

Analytics

Lecturer Workload

Classroom Usage

Conflict Summary

GA Performance

Generation Statistics

Fitness History

AI Analytics Dashboard

Population Size

Mutation Rate

Fitness Graph

Generation Graph

Constraint Violations

Execution Time

Optimization Percentage

Resource Utilization

DATABASE

Create a fully normalized PostgreSQL database.

Include

Users

Roles

Permissions

Departments

Programmes

Levels

Courses

Lecturers

LecturerCourse

Buildings

Rooms

TimeSlots

AcademicSession

Semester

Timetable

TimetableEntries

Constraints

GAHistory

AuditLogs

Notifications

Preferences

UI DESIGN

Glassmorphism

Neumorphism

Material Design 3

Apple Human Interface

Microsoft Fluent Design

Rounded Cards

Floating Sidebar

Mega Navigation

Animated Dashboard

Interactive Charts

Premium Icons

Lottie Animations

Responsive

Mobile First

Desktop Optimized

Tablet Friendly

Accessibility AA+

COLORS

Primary

Royal Blue

Secondary

Purple

Accent

Emerald Green

Success

Green

Danger

Red

Warning

Amber

Neutral

Slate

FEATURES

Dark Mode

Notifications

Search

Global Search

Command Palette

Keyboard Shortcuts

Realtime Updates

Offline Support

PWA

Caching

Auto Save

Undo

Redo

Import

Export

SECURITY

JWT

Refresh Tokens

Rate Limiting

Audit Logs

Encryption

Password Hashing

CSRF

CORS

Validation

Sanitization

PERFORMANCE

Lazy Loading

Server Components

Streaming

Redis Cache

Database Indexing

Code Splitting

Image Optimization

Edge Functions

DELIVERABLES

Generate

Complete System Architecture
User Journey
Information Architecture
Sitemap
Database ERD
UML Class Diagram
Sequence Diagrams
Activity Diagrams
Use Case Diagram
DFD (Level 0–2)
Wireframes
High-Fidelity UI Mockups
Complete Design System
PostgreSQL Schema
Prisma Models
REST API Documentation
NestJS Backend
Next.js Frontend
Genetic Algorithm Engine
Authentication Module
Admin Dashboard
Lecturer Dashboard
Student Dashboard
Timetable Officer Dashboard
Fully Responsive UI
Unit Tests
Integration Tests
Docker Configuration
CI/CD Pipeline
Deployment Scripts
User Manual
Administrator Manual
API Documentation
Sample Seed Data using the uploaded lecturer, course allocation, and timetable information
FINAL EXPECTATION

Build an enterprise-grade, AI-powered lecture timetable generation platform for Adeseun Ogundoyin Polytechnic, Eruwa that leverages the uploaded departmental data as its initial dataset and uses an Improved Genetic Algorithm to generate optimal, conflict-free lecture timetables. The solution should be scalable to all faculties and departments, visually world-class, highly performant, secure, maintainable, and suitable for real institutional deployment rather than only for academic demonstration.