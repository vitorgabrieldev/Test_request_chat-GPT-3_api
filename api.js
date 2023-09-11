let inputGpt = document.getElementById("inputGpt");

document.querySelector('#sendData').addEventListener('click', () => {
    SendQuestion();
});

inputGpt.addEventListener("keypress", (e) => {
  if (inputGpt.value && e.key === "Enter") SendQuestion();
});

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

function SendQuestion() {
  var sQuestion = inputGpt.value;

  fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + OPENAI_API_KEY,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: sQuestion,
      max_tokens: 2048, // tamanho da resposta
      temperature: 1 // criatividade na resposta
    }),
  })
    .then((response) => response.json())
    .then((json) => {


      if (json.error?.message) {
        printResult(`Error: ${json.error.message}`, 3);
      } else if (json.choices?.[0].text) {
        var text = json.choices[0].text || "Sem resposta";

        printResult(text, 2);
      }

    })
    .catch((error) => console.error("Error:", error))
    .finally(() => {
      inputGpt.value = "";
      inputGpt.disabled = false;
      inputGpt.focus();
    });

    $(".messagesChat").html('');

  printResult(sQuestion, 1);
  inputGpt.value = "Loading...";
  inputGpt.disabled = true;

}

function printResult(msg, type) {
  let datas = $(".messagesChat").html();
  switch(type) {
    case 1:
      $(".messagesChat").html(`
        ${datas}
        <h1 class="myMessage"><span class="AutorI">Eu:</span>${msg}</h1>
      `);
      break;
    case 2:
      $(".messagesChat").html(`
        ${datas}
        <h1 class="yourMessage"><span class="AutorII">GPT:</span>${msg}</h1>
      `);
      break;
    case 3:
      $(".messagesChat").html(`
        ${datas}
        <h1 class="error">${msg}</h1>
      `);
      break;
  };
};