import { Ollama } from "ollama";

const ollama = new Ollama({ host: "http://localhost:11434" });
const output = await ollama.generate({
  model: "llama3:8b",
  prompt:
    'Give me a list of cities in the state of Wisconsin with a population of over 100,000 people in the form of a JSON array. It should look something like \'["City 1", "City 2", "City 3"]\' in the output. Don\'t include any other text beyond the JSON.',
});

console.log(output);
