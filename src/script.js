// Sample names array (replace with actual names from your file)

var names = null
var context = null

fetch("../analysis/generated_docs/extracted_names.txt") // Replace 'your-file.txt' with the actual path to your file
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

function getRelatedNameContent(nameToFind) {
    return fetch("../analysis/generated_docs/extracted_text.txt")
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch the file: ${response.status}`);
            }
            return response.text();
        })
        .then(content => {
            const tokenizer = new natural.WordTokenizer();
            const palavras = tokenizer.tokenize(content);

            // Encontrar a posição do termo no texto
            const indiceTermo = palavras.indexOf(nameToFind);

            if (indiceTermo !== -1) {
            // Definir o tamanho do contexto ao redor do termo (por exemplo, 20 caracteres)
            const tamanhoContexto = 20;

            // Determinar os índices do início e do fim do contexto ao redor do termo
            const inicioContexto = Math.max(0, indiceTermo - tamanhoContexto);
            const fimContexto = Math.min(palavras.length - 1, indiceTermo + nameToFind.length + tamanhoContexto);

            // Extrair o contexto ao redor do termo
            const contexto = palavras.slice(inicioContexto, fimContexto + 1).join(' ');

            // Imprimir o contexto
            console.log("Contexto:");
            console.log(contexto);
            } else {
            console.log("Termo não encontrado no texto.");
            }
        })
        .catch(error => {
            console.error(`Error: ${error.message}`);
            throw error;
        });
}

async function customFindBox(nameToFind) {
    document.getElementById('side-bar-insto').innerHTML =  `
    Use a opção Ctrl+F ou Cmd+F para saber os contextos em que o nome  <strong>${nameToFind}</strong> aparece!
    
` 
}

async function openSidebar(name) {
    document.getElementById('sidebar').style.width = '600px';
    await customFindBox(name);
}

function closeSidebar() {
    document.getElementById('sidebar').style.width = '0';
}

document.getElementById('searchInput').addEventListener('input', function(event) {
    const searchTerm = event.target.value;
    filterAndRenderNames(searchTerm);
});
