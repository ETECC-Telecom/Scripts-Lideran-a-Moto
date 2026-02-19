import { LitElement, html, css, unsafeCSS} from 'lit';
import bootstrapGlobal from 'bootstrap/dist/css/bootstrap.min.css?inline'; 

export class Higiene_Bolsa extends LitElement {
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
        
        this.dispatchEvent(new CustomEvent('higiene-bolsa-alterada', {
            detail: { valor: input.value }, // Pegamos o valor diretamente
            bubbles: true,
            composed: true
        }));
    }

    render() {
        return html`
            <div class="bg-dark text-light">
                <div class="mb-3 mt-3" @change="${this._disparar}">
                    <label class="form-label">Higiene e Organização (Bornal/Mochila):</label>
                    <div class="form-check">
                        <input type="radio" class="form-check-input" id="higiene-bolsa-radio1" name="opt-epi" value="Sim" ?checked="${this.valor === 'Sim'}">
                        <label class="form-check-label" for="higiene-bolsa-radio1">Sim</label>
                    </div>
                    <div class="form-check">
                        <input type="radio" class="form-check-input" id="higiene-bolsa-radio2" name="opt-epi" value="Não" ?checked="${this.valor === 'Não'}">
                        <label class="form-check-label" for="higiene-bolsa-radio2">Não</label>
                    </div>
                </div>

            </div>
        `;
    }
}

// 2. Em vez de @customElement, use o registro manual
customElements.define('higiene-bolsa', Higiene_Bolsa);