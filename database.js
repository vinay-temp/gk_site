const topic_container = document.querySelector(".topic_container");
const sub_topic_container = document.querySelector(".sub_topic_container");
const question_container = document.querySelector(".question_container");
const question_item = document.querySelector(".question_item");
const selected = { topic: "", sub_topic: "", question: "" };
var topic_btns, sub_topic_btns, question_btns;

var createTopic = (topic) => {
  let button = document.createElement("button");
  button.className = "topic";
  button.id = topic;
  button.textContent = topic;
  topic_container.appendChild(button);
};

var createSubTopic = (topic, sub_topic) => {
  let button = document.createElement("button");
  button.classList.add("sub_topic");
  button.classList.add(topic);
  button.classList.add("hidden");
  button.id = sub_topic;
  button.textContent = sub_topic;
  sub_topic_container.appendChild(button);
};

var createQuestion = (topic, sub_topic, question) => {
  if (question == "size") return;
  let button = document.createElement("button");
  button.classList.add("question");
  button.classList.add(topic);
  button.classList.add(sub_topic);
  button.classList.add("hidden");
  button.id = "Q" + question;
  button.textContent = question;
  question_container.appendChild(button);
};

var createPage = (data) => {
  let topics = Object.keys(data);

  topics.forEach((topic) => {
    createTopic(topic);

    let sub_topics = Object.keys(data[topic]);
    sub_topics.forEach((sub_topic) => {
      createSubTopic(topic, sub_topic);

      let questions = Object.keys(data[topic][sub_topic]);
      questions.forEach((question) => {
        createQuestion(topic, sub_topic, question);
      });
    });
  });
};

var hideButtons = (btns) => {
  btns.forEach((btn) => {
    btn.classList.add("hidden");
  });
};

var deactivateButtons = (btns) => {
  btns.forEach((btn) => {
    btn.classList.remove("active");
  });
};

var updateButtons = () => {
  if (selected.topic != "") {
    document.getElementById(selected.topic).classList.add("active");
    let tag = `.${selected.topic}.sub_topic`;
    document
      .querySelectorAll(tag)
      .forEach((ele) => ele.classList.remove("hidden"));
  }
  if (selected.sub_topic != "") {
    document
      .querySelector(`#${selected.sub_topic}.${selected.topic}`)
      .classList.add("active");
    let tag = `.${selected.topic}.${selected.sub_topic}.question`;
    document
      .querySelectorAll(tag)
      .forEach((ele) => ele.classList.remove("hidden"));
  }

  if (selected.question != "") {
    document
      .querySelector(
        `#${selected.question}.${selected.sub_topic}.${selected.topic}`
      )
      .classList.add("active");
  }
};

/* 
        <button id="answer">Show answer</button>
*/
var createQuestionItem = (q, num) => {
  let div = document.createElement("div");
  div.id = "q_text";
  div.innerHTML = `${num}) ${q.question}`;
  question_item.appendChild(div);

  let options = document.createElement("ol");
  options.id = "options";

  for (let i = 1; i <= 4; i++) {
    let opt = document.createElement("li");
    opt.innerHTML = q["option" + i];
    options.appendChild(opt);
  }

  question_item.appendChild(options);

  let ans = document.createElement("div");
  ans.id = "answer_text";
  ans.className = "hidden";
  ans.innerHTML = "Answer: " + q.answer;

  question_item.appendChild(ans);

  let btn = document.createElement("button");
  btn.id = "answer"
  btn.addEventListener("click", () => {
    document.getElementById("answer_text").classList.remove("hidden");
  })
  btn.innerHTML = "Show Answer";

  question_item.appendChild(btn);

};

var getData = () => {
  fetch("https://gk-server.glitch.me/get_database")
    .then((res) => res.json()) // Parse the JSON response
    .then((res) => {
      topic_container.innerHTML = "";
      sub_topic_container.innerHTML = "";
      question_container.innerHTML = "";
      // question_item.innerHTML = "";

      let data = JSON.parse(JSON.stringify(res)).database;
      createPage(data);

      topic_btns = document.querySelectorAll(".topic");
      sub_topic_btns = document.querySelectorAll(".sub_topic");
      question_btns = document.querySelectorAll(".question");

      topic_btns.forEach((btn) => {
        btn.addEventListener("click", () => {
          if (btn.id == selected.topic) return;

          question_item.innerHTML = "";
          deactivateButtons(topic_btns);
          hideButtons(sub_topic_btns);
          hideButtons(question_btns);

          selected.topic = btn.id;
          selected.sub_topic = "";
          selected.question = "";
        });
      });

      sub_topic_btns.forEach((btn) => {
        btn.addEventListener("click", () => {
          if (btn.id == selected.sub_topic) return;

          question_item.innerHTML = "";
          deactivateButtons(sub_topic_btns);
          hideButtons(question_btns);

          selected.sub_topic = btn.id;
          selected.question = "";
        });
      });

      question_btns.forEach((btn) => {
        btn.addEventListener("click", () => {
          if (btn.id == selected.question) return;
          question_item.innerHTML = "";
          deactivateButtons(question_btns);

          selected.question = btn.id;
          createQuestionItem(
            data[selected.topic][selected.sub_topic][
              selected.question.slice(1)
            ],
            selected.question
          );
        });
      });

      setInterval(updateButtons, 100);
      console.log("Data fetched");
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

getData();
setInterval(getData, 5000);
