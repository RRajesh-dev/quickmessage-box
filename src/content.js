
// Create container for our app
const createContainer = () => {
  const container = document.createElement('div');
  container.id = 'linkedin-template-root';
  return container;
};

// Wait for the messaging text area to load
const waitForElement = async (selector) => {
  while (document.querySelector(selector) === null) {
    await new Promise(resolve => requestAnimationFrame(resolve));
  }
  return document.querySelector(selector);
};

// Initialize the app
const init = async () => {
  // Only inject on messaging pages
  if (!window.location.href.includes('messaging/thread')) {
    return;
  }

  // Wait for LinkedIn's message input to load
  const linkedInMessageInput = await waitForElement('.msg-form__contenteditable');
  if (!linkedInMessageInput) return;

  // Create and insert our container
  const container = createContainer();
  linkedInMessageInput.parentElement.insertBefore(container, linkedInMessageInput);

  // Hide LinkedIn's default input
  linkedInMessageInput.style.display = 'none';

  // Render our React component
  const root = document.createElement('div');
  root.id = 'root';
  document.body.appendChild(root);
};

// Start the initialization
init();

// Re-run init when URL changes (LinkedIn is a SPA)
let lastUrl = window.location.href;
new MutationObserver(() => {
  if (lastUrl !== window.location.href) {
    lastUrl = window.location.href;
    init();
  }
}).observe(document.querySelector('body'), { subtree: true, childList: true });
