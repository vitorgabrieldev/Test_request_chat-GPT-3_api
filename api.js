let inputGpt = document.getElementById("inputGpt");
let result = document.getElementById("result");

document.querySelector('#sendData').addEventListener('click', () => {
    SendQuestion();
});

const OPENAI_API_KEY = "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";

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
      temperature: 1, // criatividade na resposta
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      if (result.value) result.value += "\n";

      if (json.error?.message) {
        result.value += `Error: ${json.error.message}`;
      } else if (json.choices?.[0].text) {
        var text = json.choices[0].text || "Sem resposta";

        result.value += "Chat GPT: " + text;
      }

      result.scrollTop = result.scrollHeight;
    })
    .catch((error) => console.error("Error:", error))
    .finally(() => {
      inputGpt.value = "";
      inputGpt.disabled = false;
      inputGpt.focus();
    });

  if (result.value) result.value += "\n\n\n";

  result.value += `I: ${sQuestion}`;
  inputGpt.value = "Loading...";
  inputGpt.disabled = true;

  result.scrollTop = result.scrollHeight;
}