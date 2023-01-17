// OpenAI API endpoint
const openai_endpoint = "https://api.openai.com/v1/engines/davinci-codex/completions";

// Your OpenAI API key
const openai_api_key = "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";

// Form and input elements
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get the user's message
  const message = chatInput.value;

  // Clear the input field
  chatInput.value = "";

  // Display the user's message
  displayMessage("You", message);

  // Send the user's message to the OpenAI API
  const response = await sendToOpenAI(message);

  // Display the OpenAI's response
  displayMessage("OpenAI", response);
});

async function sendToOpenAI(message) {
  try {
    const response = await fetch(openai_endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openai_api_key}`
      },
      body: JSON.stringify({
        prompt: message,
        temperature: 0.5
      })
    });

    const data = await response.json();
    return data.choices[0].text;
  } catch (err) {
    console.error(err);
  }
}

function displayMessage(sender, message) {
  const chatMessage = document.createElement("div");
  chatMessage.
