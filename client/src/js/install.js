const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    //Store the triggered events
    window.deferredPrompt = event;
    //Removed the hidden class from the button
    butInstall.classList.toggle("hidden", false)
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    console.log('button is clicked');
    const promptEvent = window.deferredPrompt;
    console.log(promptEvent);
    if(!promptEvent){
        return;
    }
    // Show prompt
    promptEvent.prompt();
//Reset the deffered prompt variable, it can only be used once.
    window.deferredPrompt = null;
    butInstall.classList.toggle("hidden", true)
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    //Clear prompt
    window.deferredPrompt = null;
});
