const topic_container = document.querySelector(".topic_container");
const sub_topic_container = document.querySelector(".sub_topic_container");
const question_container = document.querySelector(".question_container");
const question_item = document.querySelector(".question_item");
const selected = { topic: "", sub_topic: "", question: "" };
var topic_btns, sub_topic_btns, question_btns;

const urlParams = new URLSearchParams(window.location.search);
const admin = urlParams.get("admin");

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

var createQuestion = (topic, sub_topic, question, i) => {
  if (question == "size") return;
  let button = document.createElement("button");
  button.classList.add("question");
  button.classList.add(topic);
  button.classList.add(sub_topic);
  button.classList.add("hidden");
  button.id = "Q" + i;
  button.textContent = i;
  question_container.appendChild(button);
};

var createPage = (data) => {
  let topics = Object.keys(data);

  topics.forEach((topic) => {
    createTopic(topic);

    let sub_topics = Object.keys(data[topic]);
    sub_topics.forEach((sub_topic) => {
      createSubTopic(topic, sub_topic);

      let questions = data[topic][sub_topic];
      questions.forEach((question, i) => {
        createQuestion(topic, sub_topic, question, i + 1);
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

  let tips = document.createElement("div");
  tips.id = "tips_text";
  tips.className = "hidden";
  tips.innerHTML = "Tips: " + q.tips;

  question_item.appendChild(ans);
  question_item.appendChild(tips);

  let btn = document.createElement("button");
  btn.id = "answer";
  btn.addEventListener("click", () => {
    document.getElementById("answer_text").classList.remove("hidden");
    document.getElementById("tips_text").classList.remove("hidden");
  });
  btn.innerHTML = "Show Answer";

  question_item.appendChild(btn);

  let del_btn = document.createElement("button");
  del_btn.id = "delete_button";
  del_btn.addEventListener("click", () => {
    send_delete_request(num - 1);
  });
  del_btn.innerHTML = "Delete question";

  question_item.appendChild(document.createElement("br"));
  question_item.appendChild(del_btn);
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
              selected.question.slice(1) - 1
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

var send_delete_request = (index) => {
  // Send a POST request using fetch
  fetch("https://gk-server.glitch.me/delete_question", {
    method: "POST", // Specify the HTTP method
    headers: {
      "Content-Type": "application/json", // Tell the server you're sending JSON
    },
    body: JSON.stringify({
      question: index,
      topic: selected.topic,
      sub_topic: selected.sub_topic,
      admin: admin,
    }), // Convert the data to a JSON string
  })
    .then((response) => {
      if (response.ok) {
        return response.json(); // Parse the response body as JSON
      } else if (response.status == 403) {
        alert("Sorry, You do not have admin access!");
      } else {
        throw new Error("Network response was not ok");
      }
    })
    .then((data) => {
      if (data == undefined) return;
      console.log("Response from server:", data);
      selected.question = "";
      question_item.innerHTML = "";
      getData();
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
};

getData();
// setInterval(getData, 5000);
