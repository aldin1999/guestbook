// guestbook.js
document.getElementById('guestbook-form').addEventListener('submit', async function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const message = document.getElementById('message').value;

  if (!name || !message) {
    alert('Please fill out both your name and message');
    return;
  }

  const response = await fetch('/guestbook', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, message })
  });

  const data = await response.json();

  if (data.success) {
    alert('Your message has been added!');
    // Optionally, update the UI with the new guestbook entry
    const guestbookList = document.getElementById('guestbook-list');
    const listItem = document.createElement('li');
    listItem.textContent = `${data.entry.name} (${data.entry.date}): ${data.entry.message}`;
    guestbookList.appendChild(listItem);
  } else {
    alert('Error adding message: ' + data.error);
  }
});

// Fetch and display all guestbook entries on page load
async function loadGuestbookEntries() {
  const response = await fetch('/guestbook');
  const entries = await response.json();

  const guestbookList = document.getElementById('guestbook-list');
  guestbookList.innerHTML = ''; // Clear the list before adding entries

  entries.forEach(entry => {
    const listItem = document.createElement('li');
    listItem.textContent = `${entry.name} (${entry.date}): ${entry.message}`;
    guestbookList.appendChild(listItem);
  });
}

loadGuestbookEntries();