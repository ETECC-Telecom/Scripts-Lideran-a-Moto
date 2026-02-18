

const Copiar_Area_Transferencia = (SCRIPT_ABERTURA) => {
    // 2. Tenta usar a Clipboard API (Moderna)
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(SCRIPT_ABERTURA)
            .then(() => {return "Copiado com sucesso! (API)"})
    } else {
        // 3. Se não houver suporte ou for ambiente inseguro (HTTP), usa o Fallback
        const textArea = document.createElement("textarea");
        textArea.value = SCRIPT_ABERTURA;
        
        // Garante que o elemento não apareça na tela nem cause scroll
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        document.body.appendChild(textArea);
        
        textArea.focus();
        textArea.select();
        
        try {
            const sucesso = document.execCommand('copy');
            if (sucesso) {
                return "Copiado com sucesso! (Fallback)";
            } else {
                return "Não foi possível copiar automaticamente.";
            }
        } catch (err) {
            return "Erro crítico ao copiar."
        }
        document.body.removeChild(textArea);
    }
}

export default Copiar_Area_Transferencia;