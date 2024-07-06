import '../dist/main.js';

window.addEventListener('load', async () => {
    await App.newInstance().main();
});
