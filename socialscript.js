// Get references to the elements
const getInTouchButtons = document.querySelectorAll('.touch-button');
const communityContentAreas = document.querySelectorAll('.community-content-area');
const communityHero = document.querySelector('.community-hero');
const getInTouchFormContainer = document.querySelector('.get-in-touch-form-container');
const thankYouScreen = document.querySelector('.thank-you-screen');
const sendMessageButton = document.getElementById('send-message-button');

// Group the original content elements (Hero + content sections)
const originalContentElements = [communityHero, ...communityContentAreas];

// Group all the distinct "screens" that will be shown one at a time
// Each element here is a top-level container that will be hidden/shown
const allScreens = [
    document.querySelector('.community-hero').parentElement, // Target the main tag or a wrapper around hero+content
    getInTouchFormContainer,
    thankYouScreen
];

// **Correction:** A better approach for grouping the original content
// is to select the parent of the hero and content areas, which is the <main> tag in this case.
// Or, wrap the hero and content areas in a new div if you want to isolate them further.
// Let's assume for simplicity that hiding communityHero and communityContentAreas together is sufficient,
// but be aware this might not hide everything in the original view depending on your full HTML structure.
// A more robust way is to wrap the original content in a container div.

// Let's refine the screen selection to be more explicit based on your HTML structure:
// Screen 1: Original Community View (Hero + all community-content-area sections)
// Screen 2: Get in Touch Form (.get-in-touch-form-container)
// Screen 3: Thank You Screen (.thank-you-screen)

// We will need to hide/show the hero AND the content areas together.
// Let's modify the hide/show functions to handle multiple elements for the original content.

// Define the CSS transition duration (must match the CSS)
const fadeDuration = 500; // in milliseconds (0.5 seconds)

// Function to hide a specific element or array of elements with fade-out and display: none
function hideElement(elementOrArray) {
    const elements = Array.isArray(elementOrArray) ? elementOrArray : [elementOrArray];

    const hidePromises = elements.map(el => {
        // If element doesn't exist or is already hidden, resolve immediately
        if (!el || el.classList.contains('display-none')) {
            return Promise.resolve();
        }

        // Add the hidden class to start fade-out and prevent pointer events
        el.classList.add('hidden');
        el.classList.remove('display-none'); // Ensure display is not 'none' yet for transition

        return new Promise(resolve => {
            const transitionEndHandler = () => {
                el.classList.add('display-none'); // Add display: none after fade-out
                el.removeEventListener('transitionend', transitionEndHandler);
                resolve(); // Resolve the promise
            };

            // Add the event listener
            el.addEventListener('transitionend', transitionEndHandler);

            // Fallback: if transitionend doesn't fire (e.g., transition duration is 0 or element not in layout)
             setTimeout(() => {
                 if (!el.classList.contains('display-none')) {
                     el.classList.add('display-none');
                     resolve();
                 }
             }, fadeDuration + 50); // Slightly longer than CSS duration
        });
    });

    return Promise.all(hidePromises); // Wait for all elements to be hidden
}

// Function to show a specific element or array of elements with display: block and fade-in
function showElement(elementOrArray) {
    const elements = Array.isArray(elementOrArray) ? elementOrArray : [elementOrArray];

    elements.forEach(el => {
         if (!el) return;

        // First, set display to allow the element to be in the layout flow
        el.classList.remove('display-none');
         // Ensure the correct display type is used if necessary (e.g., 'flex' for containers)
         // You can set this in CSS based on the class name, or explicitly here:
         // if (el.classList.contains('get-in-touch-form-container') || el.classList.contains('thank-you-screen')) {
         //      el.style.display = 'flex';
         // } else {
         //      el.style.display = ''; // Use default or CSS-defined display
         // }


        // Use requestAnimationFrame to wait for the display change to be rendered
        requestAnimationFrame(() => {
            // Use another requestAnimationFrame or a tiny timeout to ensure the browser
            // recognizes the element is now visible before starting the transition
            requestAnimationFrame(() => {
                // Remove the hidden class to start fade-in
                el.classList.remove('hidden');
            });
        });
    });
}


// --- Event Handlers ---

// Handle "Get in Touch!" button click
async function handleGetInTouchClick(event) {
    event.preventDefault();

    // Hide the original content (Hero + Content Areas)
    await hideElement(originalContentElements);

    // Show the get in touch form
    showElement(getInTouchFormContainer);
}

// Handle "Send Message" button click
async function handleSendMessageClick() {
    // In a real application, you would send the message here
    const message = document.getElementById('community-message').value;
    console.log("Message sent:", message); // For demonstration

    // Hide the form
    await hideElement(getInTouchFormContainer);

    // Show the thank you screen
    showElement(thankYouScreen);

    // Wait for the thank you duration, then hide it and show original content
    setTimeout(async () => {
        // Start fading out the thank you screen
        await hideElement(thankYouScreen);

        // Show original content (Hero + Content Areas)
        showElement(originalContentElements);

        // Optionally clear the message field after returning to the original page
        document.getElementById('community-message').value = '';

    }, fadeDuration); // Wait for 1 second display + fade-out duration
}

// Add event listeners to all "Get in Touch!" buttons
getInTouchButtons.forEach(button => {
    button.addEventListener('click', handleGetInTouchClick);
});

// Add event listener to the "Send Message" button
sendMessageButton.addEventListener('click', handleSendMessageClick);

// Initial state: ensure only the original content is visible and others are hidden with display: none
document.addEventListener('DOMContentLoaded', () => {
    // Hide the form and thank you screens initially using the display-none class
    // Also add 'hidden' so they are ready to fade in if shown later
    getInTouchFormContainer.classList.add('display-none', 'hidden');
    thankYouScreen.classList.add('display-none', 'hidden');

     // Ensure original content is visible (remove display-none and hidden)
    originalContentElements.forEach(el => {
        el.classList.remove('display-none', 'hidden');
    });
});