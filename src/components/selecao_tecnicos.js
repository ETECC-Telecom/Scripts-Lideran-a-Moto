import { LitElement, html, css, unsafeCSS} from 'lit';
import bootstrapGlobal from 'bootstrap/dist/css/bootstrap.min.css?inline'; 

export class Selecao_Tecnico extends LitElement {
    // 1. Em vez de @property, use o objeto static properties
    static properties = {
        nome: { type: String },
        valor:{type:String}
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
                    <label for="Técnico" class="form-label">Selecione o Técnico</label>
                    <select 
                        class="form-select"
                        @change="${this._dispararTecnico}"
                        >
                        <option value="Técnico Não Selecionado">Selecione um Técnico</option>
                        <option ?selected="${this.valor === 'Alexsandro Henrique da Silva Lira'}" value="Alexsandro Henrique da Silva Lira">Alexsandro Henrique da Silva Lira</option>
                        <option ?selected="${this.valor === 'Augusto Cesar Sofiati'}" value="Augusto Cesar Sofiati">Augusto Cesar Sofiati</option>
                        <option ?selected="${this.valor === 'Bruno Dos Santos Alencar'}" value="Bruno Dos Santos Alencar">Bruno Dos Santos Alencar</option>
                        <option ?selected="${this.valor === 'Clayton Cerqueira de Souza'}" value="Clayton Cerqueira de Souza">Clayton Cerqueira de Souza</option>
                        <option ?selected="${this.valor === 'Fernando Gustavo Alves Dos Santos'}" value="Fernando Gustavo Alves Dos Santos">Fernando Gustavo Alves Dos Santos</option>
                        <option ?selected="${this.valor === 'Gustavo de Souza Lima'}" value="Gustavo de Souza Lima">Gustavo de Souza Lima</option>
                        <option ?selected="${this.valor === 'Lucas Rodrigues de Camargo'}" value="Lucas Rodrigues de Camargo">Lucas Rodrigues de Camargo</option>
                        <option ?selected="${this.valor === 'Renan Gomes da Silva'}" value="Renan Gomes da Silva">Renan Gomes da Silva</option>
                        <option ?selected="${this.valor === 'Raphael dos Anjos'}" value="Raphael dos Anjos">Raphael dos Anjos</option>
                        <option ?selected="${this.valor === 'Ricardo Braz dos Santos'}" value="Ricardo Braz dos Santos">Ricardo Braz dos Santos</option>
                        <option ?selected="${this.valor === 'João Pedro Costa Correia'}" value="João Pedro Costa Correia">João Pedro Costa Correia</option>
                        <option ?selected="${this.valor === 'Jhonata dos Santos Murbak'}" value="Jhonata dos Santos Murbak">Jhonata dos Santos Murbak</option>
                        <option ?selected="${this.valor === 'Luiz Gustavo do Nascimento Ferregato'}" value="Luiz Gustavo do Nascimento Ferregato">Luiz Gustavo do Nascimento Ferregato</option>
                    </select>
                </div>
            </div>
        `;
    }
}

// 2. Em vez de @customElement, use o registro manual
customElements.define('selecao-tecnico', Selecao_Tecnico);