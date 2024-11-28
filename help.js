const ids = [
  "topic",
  "sub_topic",
  "question",
  "option1",
  "option2",
  "option3",
  "option4",
  "answer",
  "tips",
];

const topics = {
  history: "history",
  h: "history",
  geo: "geo",
  g: "geo",
  polity: "polity",
  p: "polity",
  static: "static",
  s: "static",
  eco: "eco",
  e: "eco",
  misc: "misc",
  m: "misc",
  science: "science",
  sci: "science",
  current_affairs: "current_affairs",
  ca: "current_affairs"
};

const sub_topics = {
  ancient: "ancient",
  an: "ancient",
  medieval: "medieval",
  med: "medieval",
  modern: "modern",
  mod: "modern",
  world: "world",
  wo: "world",
  indian: "indian",
  ind: "indian",
  article: "article",
  ar: "article",
  theory: "theory",
  th: "theory",
  physics: "physics",
  phy: "physics",
  chem: "chemistry",
  chemistry: "chemistry",
  biology: "biology",
  bio: "biology",
  aw: "awards",
  awards: "awards",
  auth: "authors",
  authors: "authors",
  sports: "sports",
  sp:  "sports",
  govt_schemes: "govt_schemes",
  gvtsch: "govt_schemes",
  dance: "dance",
  cen: "census",
  census: "census",
  taxes: "taxes",
  "five_year_plans": "five_year_plans",
  fiveyear: "five_year_plans",
  year_2024: "year_2024",
  24: "year_2024",
  year_2023: "year_2023",
  23: "year_2023",
  festival: "festival",
  fs: "festival"
};

const sub_topic_data = {
  history: ["ancient", "medieval", "modern"],
  geo: ["world", "indian"],
  polity: ["article", "theory"],
  science: ["physics", "chemistry", "biology"],
  eco: ["taxes", "five_year_plans"],
  misc: ["awards", "authors", "govt_schemes", "census"],
  static: ["sports", "dance", "festival"],
  current_affairs: ["year_2024", "year_2023"]
};

let version = document.createElement("p");
version.innerHTML = "Version: 7";
document.querySelector("body").appendChild(version);
