import { LitElement, html, css, unsafeCSS} from 'lit';
import bootstrapGlobal from 'bootstrap/dist/css/bootstrap.min.css?inline'; 

export class Status_Geral_Ferramental extends LitElement {
    // 1. Em vez de @property, use o objeto static properties
    static properties = {
        titulo: { type: String },
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
    _disparar(e) {
        const input = e.target; // Captura o input que disparou o evento
        
        this.dispatchEvent(new CustomEvent('status-geral-ferramental-alterada', {
            detail: { valor: input.value }, // Pegamos o valor diretamente
            bubbles: true,
            composed: true
        }));
    }

    render() {
        return html`
            <div class="bg-dark text-light">
                <div class="mb-3 mt-3" @change="${this._disparar}">
                    <label class="form-label">Status Geral:</label>
                    <div class="form-check">
                        <input type="radio" class="form-check-input" id="status-geral-ferramental-radio1" name="opt-epi" value="Aprovado" ?checked="${this.valor === 'Aprovado'}">
                        <label class="form-check-label" for="status-geral-ferramental-radio1">Aprovado</label>
                    </div>
                    <div class="form-check">
                        <input type="radio" class="form-check-input" id="status-geral-ferramental-radio2" name="opt-epi" value="Aprovado com Ressalvas" ?checked="${this.valor === 'Aprovado com Ressalvas'}">
                        <label class="form-check-label" for="status-geral-ferramental-radio2">Aprovado com Ressalvas</label>
                    </div>
                    <div class="form-check">
                        <input type="radio" class="form-check-input" id="status-geral-ferramental-radio3" name="opt-epi" value="Reprovado" ?checked="${this.valor === 'Reprovado'}">
                        <label class="form-check-label" for="status-geral-ferramental-radio3">Reprovado</label>
                    </div>
                </div>

            </div>
        `;
    }
}

// 2. Em vez de @customElement, use o registro manual
customElements.define('status-geral-ferramental', Status_Geral_Ferramental);