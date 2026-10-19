import type { Locale } from "./i18n";

type Status = "active" | "soon" | "sale" | "local" | "archived";

export type Project = {
  name: string;
  status: Status;
  description: Record<Locale, string>;
  site?: string;
  code?: string;
};

export const projects: Project[] = [
  {
    name: "Browski",
    status: "active",
    description: {
      pt: "o teu bro com IA para objetivos, hábitos e gestão financeira, com feedback direto no Telegram",
      en: "your AI bro for goals, habits and money management, with straight feedback on Telegram",
    },
    site: "https://browski-lp.b0itff.easypanel.host/",
  },
  {
    name: "Comunidade FPV Portugal",
    status: "soon",
    description: {
      pt: "comunidade de pilotos de drones FPV em Portugal",
      en: "community for FPV drone pilots in Portugal",
    },
    site: "https://comunidadefpv.pt",
  },
  {
    name: "spotstofly.com",
    status: "sale",
    description: {
      pt: "domínio .com à venda, aceita ofertas",
      en: ".com domain for sale, takes offers",
    },
    site: "https://spotstofly.com",
  },
];

export type Event = { name: string; year: number; location: string; url?: string };

export const events: Event[] = [
  {
    name: "Festival Nacional de Robótica",
    year: 2025,
    location: "Madeira, Portugal",
    url: "https://isep.ipp.pt/New/ViewNew/7305",
  },
  {
    name: "RoboCup",
    year: 2023,
    location: "Bordeaux, France",
    url: "https://www.correiodafeira.pt/equipa-da-secundaria-da-feira-participou-na-robocup23-em-bordeus/",
  },
  { name: "Roboparty", year: 2023, location: "Guimarães, Portugal" },
  { name: "European RoboCup", year: 2022, location: "Guimarães, Portugal" },
  { name: "Festival Nacional de Robótica", year: 2022, location: "Aveiro, Portugal" },
  { name: "Roboparty", year: 2022, location: "Guimarães, Portugal" },
];
