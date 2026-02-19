

//Função usada para salvar os dados dentro do local storage!
export const Salvar_Local_Storage = (nome, objeto) =>{
    // Salva no navegador imediatamente
    localStorage.setItem(nome, JSON.stringify(objeto));
}

// Função usada para capturar os dados do local storage:
export const Captutar_Local_Storage = (nome) => {
    const dadosSalvos = localStorage.getItem(nome);
    return dadosSalvos
}

// Limpar LocalStorage para nova vistorias:
export const Limpar_Local_Storage = (nome) => {
    localStorage.removeItem(nome);
}