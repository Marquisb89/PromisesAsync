// ===============================
// PART 2 — Deck of Cards
// ===============================


// 1. Draw a single card from a NEW deck (ONE LINER)
$.getJSON("https://deckofcardsapi.com/api/deck/new/draw/?count=1")
  .then(c => {
    console.log(`${c.cards[0].value} of ${c.cards[0].suit}`);
  });


// 2. Draw two cards from the SAME deck (CHAINED PROMISES)
$.getJSON("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
  .then(d => {
    return $.getJSON(`https://deckofcardsapi.com/api/deck/${d.deck_id}/draw/?count=1`)
      .then(c1 => {
        return $.getJSON(`https://deckofcardsapi.com/api/deck/${d.deck_id}/draw/?count=1`)
          .then(c2 => {
            console.log(`${c1.cards[0].value} of ${c1.cards[0].suit}`);
            console.log(`${c2.cards[0].value} of ${c2.cards[0].suit}`);
          });
      });
  });


// 3. Interactive draw‑cards button
let deckId = null;

// Disable button until deck loads
$("#draw-btn").prop("disabled", true);

// Create a new deck when page loads
$.getJSON("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
  .then(d => {
    deckId = d.deck_id;
    $("#draw-btn").prop("disabled", false);  // enable button
  });


// Draw a card when button is clicked
$("#draw-btn").on("click", () => {
  $.getJSON(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    .then(c => {
      // Add card image to page
      $("#cards").append(`<img src="${c.cards[0].image}" class="card-img">`);

      // Disable button when deck is empty
      if (c.remaining === 0) {
        $("#draw-btn").prop("disabled", true);
      }
    })
    .catch(err => {
      console.error("DRAW ERROR:", err);
    });
});
