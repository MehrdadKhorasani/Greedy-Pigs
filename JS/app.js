/*
Module Name: app.js

Purpose: The entry point of the application. It initializes the game, sets up necessary event listeners, and manages the overall flow.

Functions:
initApp()

Dependencies: Will import all other modules to bring together the complete functionality.
*/


////////////////////////////////////////////////


/*
// views.js
export const menuView = document.querySelector(".main-menu");
// ... other UI elements

export function showMenuView() {
    menuView.classList.remove('hiddenView');
    // ... other logic
}

// ... other view-related functions

// menu.js
import { showMenuView, showGameView } from './views.js';

export function initMenuNavigation() {
    // setup menu navigation
}

export function handleMenuSelection(e) {
    // logic for handling menu selection
}

// game.js
import { showGameView } from './views.js';
import { checkRollOutcome } from './rules.js';

export function initGame(singleMode) {
    // game initialization logic
}

// ... other game-related functions

// rules.js
export function checkRollOutcome(firstDice, secondDice, currentScore) {
    // rule checking logic
    return "OK"; // or other outcomes
}

// events.js
import { initMenuNavigation } from './menu.js';

export function setupMenuEvents() {
    document.addEventListener('keydown', initMenuNavigation);
}

// utils.js
export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// app.js
import { initApp } from './app.js';
import { setupMenuEvents } from './events.js';

window.addEventListener('load', () => {
    initApp();
    setupMenuEvents();
});

*/


// app.js

import { setupMenuEvents } from './events.js';
import { showMenuView } from './views.js';

// Initialize the application
function initApp() {
    showMenuView();  // Show the menu view initially
    setupMenuEvents();  // Set up event listeners for menu navigation
}

// Start the application when the window loads
window.addEventListener('load', initApp);
