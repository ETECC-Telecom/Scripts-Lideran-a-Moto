import { LitElement, html, css, unsafeCSS} from 'lit';
import bootstrapGlobal from 'bootstrap/dist/css/bootstrap.min.css?inline'; 

export class Lavagem_Semanal extends LitElement {
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
        
    }

    // Crie este método fora do render
    _dispararEPI(e) {
        const input = e.target; // Captura o input que disparou o evento
        
        this.dispatchEvent(new CustomEvent('lavagem-alterada', {
            detail: { valor: input.value }, // Pegamos o valor diretamente
            bubbles: true,
            composed: true
        }));
    }

    render() {
        return html`
            <div class="bg-dark text-light">
                <div class="mb-3 mt-3" @change="${this._dispararEPI}">
                    <label class="form-label">Veículo Lavado na Semana?</label>
                    <div class="form-check">
                        <input type="radio" class="form-check-input" id="radio8" name="opt-lavagem" value="Sim" checked>
                        <label class="form-check-label" for="radio8">Sim</label>
                    </div>
                    <div class="form-check">
                        <input type="radio" class="form-check-input" id="radio9" name="opt-lavagem" value="Não">
                        <label class="form-check-label" for="radio9">Não</label>
                    </div>
                </div>

            </div>
        `;
    }
}

// 2. Em vez de @customElement, use o registro manual
customElements.define('lavagem-semanal', Lavagem_Semanal);