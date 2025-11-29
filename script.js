
// Simple chat system (local only)
const sendBtn = document.getElementById('sendBtn');
const userMessage = document.getElementById('userMessage');
const chatLog = document.getElementById('chatLog');

sendBtn.addEventListener('click', sendMessage);
userMessage.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
  const text = userMessage.value.trim();
  if (text === '') return;

  appendMessage('You', text);
  userMessage.value = '';

  // Simulated bot reply
  setTimeout(() => {
    const reply = getBotReply(text);
    appendMessage('ATK Farm Bot', reply);
  }, 600);
}

function appendMessage(sender, message) {
  const msgDiv = document.createElement('div');
  msgDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatLog.appendChild(msgDiv);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function getBotReply(input) {
  input = input.toLowerCase();
  if (input.includes('price')) return "You can contact us for the latest price list of eggs and broilers.";
  if (input.includes('hello') || input.includes('hi')) return "Hello! Welcome to ATK Poultry Farm. How can I help you?";
  if (input.includes('location')) return "We are located in Trichy, Tamil Nadu.";
  if (input.includes('contact')) return "You can reach us at atkfarm@gmail.com or +91 98765 43210.";
  return "Thank you for your message. We'll get back to you soon!";
}
// 🐥 Gallery Lightbox
const galleryImages = document.querySelectorAll('.gallery-grid img');
const lightbox = document.createElement('div');
lightbox.classList.add('lightbox');
document.body.appendChild(lightbox);

galleryImages.forEach(img => {
  img.addEventListener('click', () => {
    lightbox.classList.add('active');
    lightbox.innerHTML = `<img src="${img.src}" alt="${img.alt}">`;
  });
});

// Close lightbox on click
lightbox.addEventListener('click', () => {
  lightbox.classList.remove('active');
});



