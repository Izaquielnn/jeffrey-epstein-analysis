// Sample names array (replace with actual names from your file)

var names = null
var context = null

fetch("./extracted_names.txt") // Replace 'your-file.txt' with the actual path to your file
.then(response => {
    if (!response.ok) {
        throw new Error(`Failed to fetch the file: ${response.status}`);
    }
    return response.text();
})
.then(content => {
    names = content.split('\n')
    filterAndRenderNames('');
})
.catch(error => console.error(`Error: ${error.message}`));



function renderNamesList(filteredNames) {
    const namesContainer = document.getElementById('names-container');
    namesContainer.innerHTML = '';

    for (const name of filteredNames) {
        const p = document.createElement('p');
        p.className = 'name-link';
        p.textContent = name;
        p.addEventListener('click', async () => await openSidebar(name));
        namesContainer.appendChild(p);
    }
}

function filterAndRenderNames(searchTerm) {
    const filteredNames = names
        .filter(name => name.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter(name => name.trim() && !name.startsWith("cid:"));

    renderNamesList(filteredNames);
}

async function customFindBox(nameToFind) {
    document.getElementById('side-bar-insto').innerHTML =  `
    Use a opção Ctrl+F ou Cmd+F para saber os contextos em que o nome  <strong>${nameToFind}</strong> aparece!
    
` 
}

async function openSidebar(name) {
    document.getElementById('sidebar').style.width = '50vw';
    await customFindBox(name);
}

function closeSidebar() {
    document.getElementById('sidebar').style.width = '0';
}

document.getElementById('searchInput').addEventListener('input', function(event) {
    const searchTerm = event.target.value;
    filterAndRenderNames(searchTerm);
});
