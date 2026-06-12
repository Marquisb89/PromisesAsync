// PART 1 — Number Facts

let favNumber = 5;
let baseURL = "https://numbersapi.com";


// 1. Single fact
$.getJSON(`${baseURL}/${favNumber}?json`)
  .then(data => {
    $("#facts").append(`<p>${data.text}</p>`);
  });


// 2. Multiple numbers in ONE request
$.getJSON(`${baseURL}/7,11,22?json`)
  .then(data => {
    for (let num in data) {
      $("#facts").append(`<p>${data[num]}</p>`);
    }
  });


// 3. Four facts (Promise.all)
let requests = Array.from({ length: 4 }, () =>
  $.getJSON(`${baseURL}/${favNumber}?json`)
);

Promise.all(requests).then(facts => {
  facts.forEach(f => {
    $("#facts").append(`<p>${f.text}</p>`);
  });
});
