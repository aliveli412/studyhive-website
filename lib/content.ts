/**
 * All site copy lives here as typed objects.
 * Edit this file (or docs/CONTENT.md) when Bee asks for wording changes,
 * not the components themselves.
 */

export type NavItem = { label: string; href: string };
export type Testimony = { quote: string; author: string; date: string };
export type Subject = { name: string; subtitle?: string; levels: string[] };
export type Fee = { subject: string; oneToOne: string; group: string };
export type HowItWorksStep = { title: string; description: string };
export type Tutor = { name: string; tagline: string; bio?: string };
export type SpecialProgramme = { name: string; items: string[] };
export type BioSection = { title: string; body: string };

// ──────────────────────────────────────────────────────────────────────────
// Navigation
// ──────────────────────────────────────────────────────────────────────────

export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Subjects", href: "/subjects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "For Tutors", href: "/for-tutors" },
];

// ──────────────────────────────────────────────────────────────────────────
// Home
// ──────────────────────────────────────────────────────────────────────────

export const hero = {
  title: "The Study Hive",
  taglines: [
    "Founded by Bee | Tutoring by post-graduate professionals & doctors",
    "All lessons are delivered online.",
  ],
  intro:
    "The Study Hive is a network of experienced, friendly tutors. All of our tutors have a prior degree, teaching experience and an enhanced DBS - but most importantly, a passion for tutoring. We believe in making learning engaging, effective, and focused on building confidence. The Study Hive was founded by Bee, a current Graduate Entry Medical Student with 14+ years of tutoring experience.",
  primaryCTA: { label: "View Subjects", href: "/subjects" },
  secondaryCTA: { label: "Book Now", href: "/contact" },
};

export const howItWorks = {
  heading: "How It Works",
  subhead:
    "A simple, supportive process, from first message to exam confidence.",
  steps: [
    {
      title: "Tell Us What You Need",
      description: "Share the subject, level and goals.",
    },
    {
      title: "We Match You With The Right Tutor",
      description:
        "We'll recommend a tutor based on experience, teaching style and availability.",
    },
    {
      title: "Build Your Confidence And Results",
      description:
        "Clear explanations, structured lessons and exam preparation where needed.",
    },
  ] as HowItWorksStep[],
};

export const subjectsTeaser = {
  heading: "Subjects & Fees",
  body: "GCSE tutoring in Science (Biology, Chemistry, Physics), Maths, English, German and Spanish, with 1:1 and group options. We also offer French, History, Separate Sciences and more, just ask.",
  cta: { label: "See Full Fees", href: "/subjects" },
};

export const testimonies: Testimony[] = [
  {
    quote:
      "Bee was such an amazing tutor for combined science higher. Not only did she get me from a 6-6 in Year 10 to a 9-9 for my final GCSE results, her lessons are so fun and interactive.",
    author: "Taisia",
    date: "25 Aug 2025",
  },
  {
    quote:
      "Since working with Bee, I've gained a much better understanding of the material and feel far more confident in my ability to perform well in my final exams.",
    author: "Naisha",
    date: "25 Aug 2025",
  },
  {
    quote:
      "My daughter was on the verge of detesting Physics, when Bee stepped in. After 7-8 months she is achieving grade 7 & 8 in all science subjects.",
    author: "Bhawana",
    date: "16 Jun 2025",
  },
  {
    quote: "Bee is very kind, understanding and loving tutor. Highly recommend.",
    author: "Jaymie",
    date: "05 Jan 2024",
  },
  {
    quote:
      "Bee has helped both of my girls with German and Science at Secondary School level. Bee is very efficient and committed, very helpful and very friendly. The girls feel very at ease with her as a person and her way of tutoring. She expects the same level of commitment from my girls, which I find very encouraging. I can definitely recommend Bee as a tutor.",
    author: "Ines",
    date: "February 2023",
  },
  {
    quote:
      "Bee is such a lovely science tutor. She is reliable, committed, transparent, kind and a great tutor to my teenage daughters.",
    author: "Cathrine",
    date: "June 2025",
  },
];

export const testimonyFeedback = {
  prompt:
    "Would you like to give feedback from a tutor that you've recently had lessons with?",
  cta: "Write a review",
};

// ──────────────────────────────────────────────────────────────────────────
// Subjects page
// ──────────────────────────────────────────────────────────────────────────

export const subjects: Subject[] = [
  {
    name: "German",
    levels: [
      "KS1–KS3",
      "GCSE/iGCSE",
      "A level",
      "General language learning (all levels)",
    ],
  },
  {
    name: "Science",
    subtitle: "Biology, Chemistry, Physics",
    levels: ["KS1–KS3", "GCSE/iGCSE", "A level", "IB"],
  },
  { name: "Maths", levels: ["KS1–KS3", "GCSE/iGCSE", "A level", "IB"] },
  { name: "English", levels: ["KS1–KS3", "GCSE/iGCSE", "A level", "IB"] },
  {
    name: "Spanish",
    levels: [
      "KS1–KS3",
      "GCSE/iGCSE",
      "A level",
      "General language learning (all levels)",
    ],
  },
  {
    name: "French",
    levels: [
      "KS1–KS3",
      "GCSE/iGCSE",
      "A level",
      "General language learning (all levels)",
    ],
  },
  { name: "History", levels: ["KS1–KS3", "GCSE/iGCSE", "A level", "IB"] },
  { name: "Economics", levels: ["GCSE/iGCSE", "A level", "IB"] },
];

export const specialProgrammes: SpecialProgramme[] = [
  { name: "Medical Entry", items: ["GAMSAT", "UCAT", "Medical Interviews"] },
  {
    name: "11+",
    items: ["Maths", "Verbal Reasoning / Non-Verbal Reasoning", "English"],
  },
];

export const fees: Fee[] = [
  { subject: "German (GCSE)", oneToOne: "£50", group: "£25" },
  {
    subject: "Science (GCSE) - Biology, Chemistry, Physics",
    oneToOne: "£40",
    group: "£20",
  },
  { subject: "Maths (GCSE)", oneToOne: "£40", group: "£20" },
  { subject: "English (GCSE)", oneToOne: "£40", group: "£20" },
  { subject: "Spanish (GCSE)", oneToOne: "£40", group: "£20" },
];

// ──────────────────────────────────────────────────────────────────────────
// About page
// ──────────────────────────────────────────────────────────────────────────

export const meetBee = {
  heading: "Meet The Bee",
  greeting: "Hi, I'm Bee, and welcome to the Study Hive!",
  lead: "With 14 years of tutoring experience, a First-Class Honours BSc in Biomedical Science and current studies in Graduate Entry Medicine, my goal is to help students not only improve their grades but genuinely enjoy the learning process.",
  sections: [
    {
      title: "My Journey",
      body: "I was born and raised in Germany, but I wasn't always a top student. In middle school, I was much more interested in spending my days on the basketball court than at my desk and I lacked the confidence to participate in class. That all changed when I received help from a dedicated tutor. They didn't just help me with my homework; they completely shifted my perspective on learning. As my grades improved, so did my self-esteem and my mood. For the first time, I felt confident and empowered in the classroom. I began tutoring younger children shortly after, eager to pass that feeling of empowerment on to others. The reward of passing on knowledge was immediate, and I haven't stopped since.",
    },
    {
      title: "10 Years In The UK",
      body: "When I moved to the UK a decade ago, I lived with a host family and cared for their children. Word quickly spread, and I found myself tutoring their friends throughout my own academic journey. Going from College in London to achieving a First-Class degree in Biomedical Science, I have never stopped teaching.",
    },
    {
      title: "My Teaching Philosophy",
      body: "Having coached youth basketball for many years, I have seen firsthand that every child has distinct needs, strengths and ways of communicating. I actively listen to my students and adapt my teaching style to match how they learn best.",
    },
  ] as BioSection[],
  closing:
    "I started this company because sharing knowledge is my greatest passion. I know what it feels like to struggle and I know exactly how rewarding it is to finally understand.",
  welcome:
    "Welcome to the Hive - I look forward to helping your child discover their own confidence and love for learning!",
};

export const aboutTutors = {
  heading: "Some of The Tutors In The Hive",
  note: "Tutors are assigned to students on the basis of availability.",
};

/**
 * Bee is featured in the Meet The Bee section above, so she is not
 * repeated here. The tutors below are the others in the Hive.
 */
export const tutors: Tutor[] = [
  { name: "Sam", tagline: "Medical Student · GCSE & A-Level Science" },
  {
    name: "Kena",
    tagline: "Biomedical Science Graduate · GCSE Maths & English",
  },
  { name: "Sabrin", tagline: "Medical Student · GCSE English & History" },
];

// ──────────────────────────────────────────────────────────────────────────
// Shared
// ──────────────────────────────────────────────────────────────────────────

export const contactCTA = {
  heading: "Ready To Start?",
  body: "Tell us what you're looking for, we'll match you with the right tutor.",
  cta: { label: "Contact Us", href: "/contact" },
};

export const footer = {
  tagline:
    "Founded by Bee · Tutoring by post-graduate professionals & doctors",
  email: "ask@thestudy-hive.org",
  copyright: "© 2026 The Study Hive. All rights reserved.",
};
