import { LitElement, html, css, unsafeCSS} from 'lit';
import bootstrapGlobal from 'bootstrap/dist/css/bootstrap.min.css?inline'; 

export class Selecao_Tecnico extends LitElement {
    // 1. Em vez de @property, use o objeto static properties
    static properties = {
        nome: { type: String }
    };

    static styles = [
        // Transformamos o CSS importado em um objeto que o Lit entende
        unsafeCSS(bootstrapGlobal), 
        css`
        
        `
      ];

    constructor() {
        super();
    }

    // Crie este método fora do render
    _dispararTecnico(e) {
        const input = e.target; // Captura o input que disparou o evento
        
        this.dispatchEvent(new CustomEvent('tecnico-alterada', {
            detail: { valor: input.value }, // Pegamos o valor diretamente
            bubbles: true,
            composed: true
        }));
    }

    render() {
        return html`
            <div class="bg-dark text-light">
                <div class="mb-3 mt-3">
                    <label for="Técnico" class="form-label">Técnico:</label>
                    <select 
                        class="form-select"
                        @change="${this._dispararTecnico}"
                        >
                        <option value="Técnico Não Selecionado">Selecione um Técnico</option>
                        <option value="Alexsandro Henrique da Silva Lira">Alexsandro Henrique da Silva Lira</option>
                        <option value="Allan Soares da Silva">Allan Soares da Silva</option>
                        <option value="Augusto Cesar Sofiati">Augusto Cesar Sofiati</option>
                        <option value="Bruno Dos Santos Alencar">Bruno Dos Santos Alencar</option>
                        <option value="Clayton Cerqueira de Souza">Clayton Cerqueira de Souza</option>
                        <option value="Gabriel Batista Silva">Gabriel Batista Silva</option>
                        <option value="Lucas Rodrigues de Camargo">Lucas Rodrigues de Camargo</option>
                        <option value="Renan Gomes da Silva">Renan Gomes da Silva</option>
                        <option value="Ricardo Braz dos Santos">Ricardo Braz dos Santos</option>
                    </select>
                </div>
            </div>
        `;
    }
}

// 2. Em vez de @customElement, use o registro manual
customElements.define('selecao-tecnico', Selecao_Tecnico);