const butInstall = document.getElementById("buttonInstall");

window.addEventListener('beforeinstallprompt', (event) => {
  console.log('line number 4',event);
    // Store the triggered events
    window.deferredPrompt = event;
    console.log('line number 7',event);

    // Remove the hidden class from the button.
    butInstall.classList.toggle('hidden', false);
  });

butInstall.addEventListener('click', async () => {
  
  const promptEvent = window.deferredPrompt;
  console.log(promptEvent);

  if (!promptEvent) {
   return;
  }
  promptEvent.prompt();
  window.deferredPrompt = null;
  butInstall.classList.toggle('hidden', true);
});

window.addEventListener('appinstalled', (event) => {
  // Clear prompt
  window.deferredPrompt = null;
}); 
