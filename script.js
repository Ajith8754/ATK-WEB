
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

// ==========================================================================
// Write a Review Modal Toggle, Star Selection, and LocalStorage Reviews Persistence
// ==========================================================================
const openReviewModalBtn = document.getElementById('openReviewModalBtn');
const reviewModal = document.getElementById('reviewModal');
const closeReviewModalBtn = document.getElementById('closeReviewModalBtn');
const cancelReviewBtn = document.getElementById('cancelReviewBtn');
const reviewForm = document.getElementById('reviewForm');
const reviewsGrid = document.getElementById('reviewsGrid');
const starRatingSelect = document.getElementById('starRatingSelect');
const reviewRatingInput = document.getElementById('reviewRatingInput');
const toggleReviewsBtn = document.getElementById('toggleReviewsBtn');
const reviewsMoreContainer = document.getElementById('reviewsMoreContainer');

// Initialize reviews list from local storage or empty array
let customReviews = JSON.parse(localStorage.getItem('atk_farm_reviews') || '[]');

// Static default reviews
const defaultReviews = [
  {
    name: "Karthikeyan R.",
    location: "Salem, TN (Restaurant Owner)",
    rating: 5,
    feedback: "The quality of the country chicken and fresh eggs is top-notch. I regularly purchase in wholesale for my restaurant, and the delivery is always on time!"
  },
  {
    name: "Muthu Kumar",
    location: "Dharmapuri, TN (Farmer)",
    rating: 5,
    feedback: "Healthy day-old chicks and excellent consultation. Mr. Thangarasu guided me personally on building my small poultry setup. Highly recommended!"
  },
  {
    name: "Priya Dharshini",
    location: "Erode, TN (Retail Customer)",
    rating: 5,
    feedback: "Clean packaging and prompt home delivery. The broiler chicken meat is very tender and fresh. Excellent service in Erode."
  }
];

// Initialize on page load
initReviews();

function initReviews() {
  renderAllReviews();

  // Setup toggle button event listener
  if (toggleReviewsBtn) {
    toggleReviewsBtn.addEventListener('click', () => {
      if (!reviewsGrid) return;
      
      const isExpanded = reviewsGrid.classList.toggle('expanded');
      if (isExpanded) {
        toggleReviewsBtn.textContent = 'Show Less Reviews';
      } else {
        toggleReviewsBtn.textContent = 'Show More Reviews';
        // Scroll back to the reviews section when collapsing
        const reviewsSection = document.getElementById('reviews');
        if (reviewsSection) {
          reviewsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }
}

// Render all reviews (custom + defaults) dynamically
function renderAllReviews() {
  if (!reviewsGrid) return;

  const allReviews = [...customReviews, ...defaultReviews];
  reviewsGrid.innerHTML = '';

  allReviews.forEach((review, index) => {
    const card = document.createElement('div');
    card.className = 'review-card';
    
    // Hide reviews after the first 3
    if (index >= 3) {
      card.classList.add('hidden-review');
    }

    let stars = '';
    for (let i = 0; i < 5; i++) {
      if (i < review.rating) {
        stars += '⭐';
      }
    }

    const firstLetter = review.name ? review.name.charAt(0).toUpperCase() : 'C';

    card.innerHTML = `
      <div class="rating">${stars}</div>
      <p class="feedback">"${review.feedback}"</p>
      <div class="customer-info">
        <div class="avatar">${firstLetter}</div>
        <div>
          <h4>${review.name}</h4>
          <span>${review.location}</span>
        </div>
      </div>
    `;
    reviewsGrid.appendChild(card);
  });

  // Display "Show More" container if total reviews > 3
  if (reviewsMoreContainer) {
    if (allReviews.length > 3) {
      reviewsMoreContainer.style.display = 'block';
    } else {
      reviewsMoreContainer.style.display = 'none';
    }
  }
}

if (openReviewModalBtn && reviewModal) {
  // Open modal
  openReviewModalBtn.addEventListener('click', () => {
    reviewModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    resetReviewForm();
  });

  // Close modal functions
  const closeModal = () => {
    reviewModal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
  };

  if (closeReviewModalBtn) closeReviewModalBtn.addEventListener('click', closeModal);
  if (cancelReviewBtn) cancelReviewBtn.addEventListener('click', closeModal);

  // Close when clicking outside content
  reviewModal.addEventListener('click', (e) => {
    if (e.target === reviewModal) {
      closeModal();
    }
  });

  // Star Rating Interaction
  if (starRatingSelect) {
    const stars = starRatingSelect.querySelectorAll('.modal-star');
    
    // Set initial active state (5 stars by default)
    updateStars(5);

    stars.forEach(star => {
      // Click event
      star.addEventListener('click', () => {
        const rating = parseInt(star.getAttribute('data-rating'));
        reviewRatingInput.value = rating;
        updateStars(rating);
      });

      // Mouse enter (hover preview)
      star.addEventListener('mouseenter', () => {
        const rating = parseInt(star.getAttribute('data-rating'));
        highlightStarsOnHover(rating);
      });
    });

    // Mouse leave (clear hover preview)
    starRatingSelect.addEventListener('mouseleave', () => {
      stars.forEach(s => s.classList.remove('hovered'));
    });

    function updateStars(rating) {
      stars.forEach(s => {
        const val = parseInt(s.getAttribute('data-rating'));
        if (val <= rating) {
          s.classList.add('active');
        } else {
          s.classList.remove('active');
        }
      });
    }

    function highlightStarsOnHover(rating) {
      stars.forEach(s => {
        const val = parseInt(s.getAttribute('data-rating'));
        if (val <= rating) {
          s.classList.add('hovered');
        } else {
          s.classList.remove('hovered');
        }
      });
    }
  }

  // Reset review form to default
  function resetReviewForm() {
    if (reviewForm) reviewForm.reset();
    reviewRatingInput.value = '5';
    if (starRatingSelect) {
      const stars = starRatingSelect.querySelectorAll('.modal-star');
      stars.forEach(s => {
        s.classList.add('active');
        s.classList.remove('hovered');
      });
    }
  }

  // Handle Review Form Submission
  if (reviewForm) {
    reviewForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('reviewName').value.trim();
      const location = document.getElementById('reviewLocation').value.trim();
      const ratingVal = parseInt(reviewRatingInput.value);
      const feedback = document.getElementById('reviewFeedback').value.trim();

      if (!name || !location || !feedback) {
        showToast('Error', 'Please fill in all fields.', 'error');
        return;
      }

      // Add to custom reviews list
      const newReview = {
        name: name,
        location: location,
        rating: ratingVal,
        feedback: feedback
      };

      customReviews.unshift(newReview); // Put at the beginning
      localStorage.setItem('atk_farm_reviews', JSON.stringify(customReviews));

      // Re-render all reviews
      renderAllReviews();

      // Expand the grid if it was collapsed to show the new review immediately
      if (reviewsGrid && !reviewsGrid.classList.contains('expanded')) {
        reviewsGrid.classList.add('expanded');
        if (toggleReviewsBtn) toggleReviewsBtn.textContent = 'Show Less Reviews';
      }

      // Close modal
      closeModal();

      // Show Success Toast
      showToast('Thank you!', `Hi ${name}, your review has been successfully posted.`, 'success');
    });
  }
}




