// Stoping from from refreshing page on submit
const mainForm = document.querySelector("#mainForm");
function handleForm(event) { event.preventDefault(); } 
mainForm.addEventListener('submit', handleForm);

