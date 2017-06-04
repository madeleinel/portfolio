// Set up dropdown menu for small screens
function toggleMenu(e) {
  e.preventDefault(); // Prevent the function from executing twice on touchscreens due to double calls to the eventListener function ("click" and "touch")
  e.stopPropagation();    // Stop the event from propagating through the DOM

  const navbar = document.getElementById("topNav");
  if (navbar.className === "navBar") {
    navbar.className += " responsive";   // Change the class of element to 'navBar responsive'
  } else {
    navbar.className = "navBar";   // If the class is already 'navBar responsive', change it back to 'navBar'
  }
}
// Set up event handler; when click on the dropdown menu icon > trigger the function which displays the dropdown manu
document.getElementById("navToggleIcon").addEventListener("click", toggleMenu, false);

// Set up section toggling within the Portfolio page
function togglePopup(buttonId) {
  // buttonId = The class name of the button that was clicked
  // Set the popup element ID to be "popup_" followed by the second half of the buttonId (ie the id number of the section)
  // This will be used to display the popup that's within the same section as the clicked button
  const idTags = buttonId.split("_");
  const popupId = "popup_" + idTags[1];
  const currentPopup = document.getElementById(popupId);
  const sectionId = "section_" + idTags[1];
  const currentButton = document.querySelector("#" + sectionId + " span:last-child");
  const currentButtonText = document.querySelector("#" + sectionId + " span:last-child button");

  // To toggle the popup: Hide if it's visible, and make visible if it's hidden
  // Also update the background colour of the clicked button when the popup is visible, to indicate that it is currently "active"
  if (currentPopup.style.display == "block") {
    currentPopup.style.display = "none";
    currentButton.style.borderColor = "#333";
    currentButtonText.textContent = "Find out more ⇓";
    window.location.href = ("/portfolio\#" + sectionId);  // Makes the window jump back to the top of the section the user was just looking at > to avoid the screen seemingly jumping to a later section, and skipping work examples, when closing a popup section
  } else {
    currentPopup.style.display = "block";
    currentButton.style.borderColor = "#4c58ed";
    // currentButton.style.borderColor = "#92626F";
    currentButtonText.textContent = "Find out more ⇑";

    // Send event info to Google Analytics when user clicks on a button to display more information about a work example
    ga('send', {
      hitType: 'event',
      eventCategory: 'Show additional content',
      eventAction: 'clicks',
      eventLabel: 'Content for: ' + idTags[1]
    });
  }

  event.preventDefault();   // Prevent default action from being executed
  event.stopPropagation();    // Stop the event from propagating through the DOM
}

// Set up Google Analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-100419989-1', 'auto');
ga('send', 'pageview');

// Track outbound link clicks
// Send event info to Google Analytics when user clicks on a link which takes them to an external website
function handleOutboundLinkClicks(event) {
  ga('send', 'event', {
    eventCategory: 'Outbound Link',
    eventAction: 'click',
    eventLabel: event.target.href,
    transport: 'beacon'
  });
}
