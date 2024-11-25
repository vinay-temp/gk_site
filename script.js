const data = {};
const errors = new Set();

var checkEmpty = (id) => {
  if (id == "tips") return;

  if (data[id] == "") {
    errors.add(id);
  }
};

var checkTopics = (topic, sub_topic) => {
  if (!Object.keys(topics).includes(data[topic])) {
    errors.add(topic);
    return;
  }
  if (!Object.keys(sub_topics).includes(data[sub_topic])) {
    errors.add(sub_topic);
    return;
  }

  const topic_name = topics[data.topic];
  const sub_topic_name = sub_topics[data.sub_topic];
  validateSubtopic(topic_name, sub_topic_name);
};

var checkOptions = (a, b, c, d, answer) => {
  if (data[b] == data[a]) errors.add(b);
  if (data[c] == data[a] || data[c] == data[b]) errors.add(c);
  if (data[d] == a || data[d] == data[b] || data[d] == data[c]) errors.add(d);

  if (
    !(
      data[answer] == data[a] ||
      data[answer] == data[b] ||
      data[answer] == data[c] ||
      data[answer] == data[d]
    )
  )
    errors.add(answer);
};

var validateSubtopic = (topic, sub_topic) => {
  if (sub_topic == "other") return;

  if (sub_topic_data[topic].includes(sub_topic)) return;
  
  errors.add("sub_topic");
}

var handleSubmit = () => {
  document.getElementById("msg").innerHTML = "";
  errors.clear();

  ids.forEach((id) => {
    document.getElementById(id).classList.remove("error");
  });

  ids.forEach((id) => {
    if (id == "topic" || id == "sub_topic") {
      data[id] = document.getElementById(id).value.toLowerCase();
    } else {
     data[id] = document.getElementById(id).value; 
    }
  });

  ids.forEach((id) => {
    checkEmpty(id);
  });

  checkTopics("topic", "sub_topic", data);

  checkOptions("option1", "option2", "option3", "option4", "answer");

  let messages = [];
  errors.forEach((err) => {
    document.getElementById(err).classList.add("error");
    messages.push(`Invalid ${err}`);
  });

  if (messages.length == 0) {
    let upload_data = {
      topic: topics[data.topic],
      sub_topic: sub_topics[data.sub_topic],
    };

    delete data.topic;
    delete data.sub_topic;
    upload_data["question"] = data;
    uploadData(upload_data);
  } else {
    document.getElementById("msg").innerHTML = messages.join("<br>");
  }
};

var uploadData = (data) => {
  // Send a POST request using fetch
  fetch("https://gk-server.glitch.me/post_question", {
    method: "POST", // Specify the HTTP method
    headers: {
      "Content-Type": "application/json", // Tell the server you're sending JSON
    },
    body: JSON.stringify(data), // Convert the data to a JSON string
  })
    .then((response) => {
      if (response.ok) {
        return response.json(); // Parse the response body as JSON
      } else {
        throw new Error("Network response was not ok");
      }
    })
    .then((data) => {
      console.log("Response from server:", data);

      document.getElementById("msg").style.color = "green";
      document.getElementById("msg").innerHTML =
        "Question Successfully<br>Location: " + data.location;
      ids.forEach((id) => {
        if (id == "topic" || id == "sub_topic") return;
        document.getElementById(id).value = "";
      });
    })
    .catch((error) => {
      document.getElementById("msg").innerHTML =
        "A Problem occured !!! Please try later";
      console.error("There was a problem with the fetch operation:", error);
    });
};
