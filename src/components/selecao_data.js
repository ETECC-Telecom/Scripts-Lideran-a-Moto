import { LitElement, html, css, unsafeCSS} from 'lit';
import bootstrapGlobal from 'bootstrap/dist/css/bootstrap.min.css?inline'; 

export class Selecao_Data extends LitElement {
    // 1. Em vez de @property, use o objeto static properties
    static properties = {
        titulo: { type: String }
    };

    static styles = [
        // Transformamos o CSS importado em um objeto que o Lit entende
        unsafeCSS(bootstrapGlobal), 
        css`
        
        `
      ];

    constructor() {
        super();
        this.titulo = "Vistoria";
        this.dataAtual = new Date().toISOString().split('T')[0];
    }

    // Crie este método fora do render
    _dispararData(e) {
        const input = e.target; // Captura o input que disparou o evento
        
        const dataObj = new Date(input.value + 'T00:00:00'); // Adicionamos o tempo para evitar erro de fuso
        const dataFormatada = new Intl.DateTimeFormat('pt-BR').format(dataObj);

        this.dispatchEvent(new CustomEvent('data-alterada', {
            detail: { valor: dataFormatada }, // Pegamos o valor diretamente
            bubbles: true,
            composed: true
        }));
    }

    render() {
        return html`
            <div class="bg-dark text-light">
                <div class="mb-3 mt-3">
                    <label class="form-label" for="birthday">Data da ${this.titulo}:</label>
                    <input 
                        class="form-control" 
                        type="date" 
                        id="data" 
                        name="Data"
                        value="${this.dataAtual}"
                        @change="${this._dispararData}"
                        >
                </div>
            </div>
        `;
    }
}

// 2. Em vez de @customElement, use o registro manual
customElements.define('selecao-data', Selecao_Data);