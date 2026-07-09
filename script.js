
// Simple chat system (local only)
const sendBtn = document.getElementById('sendBtn');
const userMessage = document.getElementById('userMessage');
const chatLog = document.getElementById('chatLog');

if (sendBtn && userMessage && chatLog) {
  sendBtn.addEventListener('click', sendMessage);
  userMessage.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
}

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
// 🐥 Gallery Lightbox & Filter System
const galleryImages = document.querySelectorAll('.gallery-item img');
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

// Gallery Filtering Logic
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    filterButtons.forEach(button => button.classList.remove('active'));
    // Add active class to clicked button
    btn.classList.add('active');

    const filterValue = btn.getAttribute('data-filter');

    galleryItems.forEach(item => {
      if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

// FAQ Accordion Toggle System
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(btn => {
  btn.addEventListener('click', () => {
    const parentItem = btn.parentElement;
    const isActive = parentItem.classList.contains('active');
    
    // Close other open FAQ items (standard accordion behavior)
    document.querySelectorAll('.faq-item').forEach(item => {
      item.classList.remove('active');
      const ans = item.querySelector('.faq-answer');
      if (ans) ans.style.maxHeight = null;
    });

    if (!isActive) {
      parentItem.classList.add('active');
      const answerPanel = parentItem.querySelector('.faq-answer');
      if (answerPanel) {
        answerPanel.style.maxHeight = answerPanel.scrollHeight + 'px';
      }
    }
  });
});

// Contact Form Handler & Success Toast System
const contactForm = document.getElementById('contactForm');
const toastContainer = document.getElementById('toastContainer');

if (contactForm && toastContainer) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get input values
    const name = document.getElementById('formName').value.trim();
    const contact = document.getElementById('formEmailPhone').value.trim();
    const subject = document.getElementById('formSubject').value;
    const message = document.getElementById('formMessage').value.trim();

    if (!name || !contact || !message) {
      showToast('Error', 'Please fill in all required fields.', 'error');
      return;
    }

    // Success simulation
    showToast('Success!', `Thank you ${name}. Your message regarding "${subject}" has been sent successfully. We will get back to you shortly!`, 'success');

    // Reset Form
    contactForm.reset();
  });
}

function showToast(title, text, type) {
  if (!toastContainer) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const iconMarkup = type === 'success' 
    ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
       </svg>`
    : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
       </svg>`;

  toast.innerHTML = `
    <div class="toast-icon" style="color: ${type === 'success' ? '#25D366' : '#d32f2f'}">${iconMarkup}</div>
    <div class="toast-content">
      <h4>${title}</h4>
      <p>${text}</p>
    </div>
  `;

  if (type === 'error') {
    toast.style.borderLeftColor = '#d32f2f';
  }

  toastContainer.appendChild(toast);

  // Trigger CSS transition
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);

  // Fade out and remove toast after 4.5 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    // Remove element from DOM after transition completes
    setTimeout(() => {
      toast.remove();
    }, 400);
  }, 4500);
}



