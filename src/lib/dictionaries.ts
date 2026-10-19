import type { Locale } from "./i18n";

const pt = {
  meta: {
    title: "Roberto Valente - Programador",
    description:
      "Roberto Valente, programador em Portugal. Sonhador com ação: sempre a aprender, sempre a construir.",
  },
  nav: { home: "início", blog: "blog", contact: "contacto", theme: "tema" },
  theme: { toDark: "Mudar para tema escuro", toLight: "Mudar para tema claro" },
  langSwitch: { label: "en", title: "Ver em inglês" },
  frontmatter: { role: "programador", based: "Portugal", working: "💻 A trabalhar", chilling: "😎 A relaxar" },
  hero: {
    title: "Boas, sou o Roberto.",
    statement: "Sonhador com ação: sempre a aprender, sempre a construir.",
  },
  projects: {
    title: "projetos",
    status: { active: "ativo", soon: "em breve", sale: "à venda", local: "uso local", archived: "arquivado" },
  },
  path: { title: "robótica", count: (n: number) => `(${n} competições)` },
  posts: {
    title: "blog",
    latest: "escrita",
    all: "ver todos →",
    description: "Notas sobre o que ando a construir e a aprender.",
    empty: "Ainda não há posts.",
    back: "← blog",
    count: (n: number) => String(n),
    minutes: (n: number) => `${n} min`,
  },
  contact: {
    title: "contacto",
    description: "Tens uma ideia, uma proposta ou só queres dizer olá? Deixa-me uma mensagem.",
    home: { before: "Tens uma ideia ou um projeto?", link: "Fala comigo", after: ". Também estou no", and: "e no" },
    name: "nome",
    email: "email",
    message: "mensagem",
    send: "enviar",
    sending: "a enviar…",
    sent: "Mensagem enviada. Obrigado! Respondo assim que puder.",
    sendAnother: "enviar outra",
    errors: {
      name: "Diz-me o teu nome.",
      email: "Falta o teu email.",
      emailInvalid: "Este email não parece válido.",
      message: "Escreve uma mensagem (pelo menos 10 caracteres).",
      rateLimit: "Enviaste várias mensagens seguidas. Tenta outra vez daqui a pouco.",
      failed: "Não foi possível enviar a mensagem. Tenta outra vez.",
    },
    tool: "Envia uma mensagem ao Roberto Valente através do formulário de contacto do site.",
  },
  notFound: { title: "Página não encontrada", back: "← início" },
};

export type Dictionary = typeof pt;

const en: Dictionary = {
  meta: {
    title: "Roberto Valente - Developer",
    description:
      "Roberto Valente, developer in Portugal. A dreamer with action: always learning, always building.",
  },
  nav: { home: "home", blog: "blog", contact: "contact", theme: "theme" },
  theme: { toDark: "Switch to dark theme", toLight: "Switch to light theme" },
  langSwitch: { label: "pt", title: "Ver em português" },
  frontmatter: { role: "developer", based: "Portugal", working: "💻 Working", chilling: "😎 Chilling" },
  hero: {
    title: "Sup, I'm Roberto.",
    statement: "A dreamer with action: always learning, always building.",
  },
  projects: {
    title: "projects",
    status: { active: "active", soon: "coming soon", sale: "for sale", local: "local use", archived: "archived" },
  },
  path: { title: "robotics", count: (n: number) => `(${n} competitions)` },
  posts: {
    title: "blog",
    latest: "writing",
    all: "see all →",
    description: "Notes on what I'm building and learning.",
    empty: "No posts yet.",
    back: "← blog",
    count: (n: number) => String(n),
    minutes: (n: number) => `${n} min`,
  },
  contact: {
    title: "contact",
    description: "Got an idea, a proposal or just want to say hi? Leave me a message.",
    home: { before: "Got an idea or a project?", link: "Let's talk", after: ". I'm also on", and: "and" },
    name: "name",
    email: "email",
    message: "message",
    send: "send",
    sending: "sending…",
    sent: "Message sent. Thank you! I'll reply as soon as I can.",
    sendAnother: "send another",
    errors: {
      name: "Tell me your name.",
      email: "Your email is missing.",
      emailInvalid: "This email doesn't look valid.",
      message: "Write a message (at least 10 characters).",
      rateLimit: "You've sent several messages in a row. Please try again in a while.",
      failed: "Your message couldn't be sent. Please try again.",
    },
    tool: "Send a message to Roberto Valente through the website contact form.",
  },
  notFound: { title: "Page not found", back: "← home" },
};

const dictionaries: Record<Locale, Dictionary> = { pt, en };

export const getDictionary = (lang: Locale) => dictionaries[lang];
