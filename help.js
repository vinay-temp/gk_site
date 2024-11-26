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
  census: "census"
};

const sub_topic_data = {
  history: ["ancient", "medieval", "modern"],
  geo: ["world", "indian"],
  polity: ["article", "theory"],
  science: ["physics", "chemistry", "biology"],
  eco: [],
  misc: ["awards", "authors", "govt_schemes", "census"],
  static: ["sports", "dance"],
};

console.log("Version: 2");
