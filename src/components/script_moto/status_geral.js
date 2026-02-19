import { LitElement, html, css, unsafeCSS} from 'lit';
import bootstrapGlobal from 'bootstrap/dist/css/bootstrap.min.css?inline'; 

export class Status extends LitElement {
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
        
        this.dispatchEvent(new CustomEvent('status-alterada', {
            detail: { valor: input.value }, // Pegamos o valor diretamente
            bubbles: true,
            composed: true
        }));
    }

    render() {
        return html`
            <div class="bg-dark text-light">
                <div class="mb-3 mt-3" @change="${this._disparar}">
                    <label class="form-label">Status:</label>
                    <div class="form-check">
                        <input type="radio" class="form-check-input" id="radio13" name="opt-parecer" value="Aprovado para Rota" ?checked="${this.valor === 'Aprovado para Rota'}">
                        <label class="form-check-label" for="radio13">Aprovado para Rota</label>
                    </div>
                    <div class="form-check">
                        <input type="radio" class="form-check-input" id="radio14" name="opt-parecer" value="Ajustado no Local" ?checked="${this.valor === 'Ajustado no Local'}">
                        <label class="form-check-label" for="radio14">Ajustado no Local</label>
                    </div>
                    <div class="form-check">
                        <input type="radio" class="form-check-input" id="radio15" name="opt-parecer" value="Retirado para Manutenção" ?checked="${this.valor === 'Retirado para Manutenção'}">
                        <label class="form-check-label" for="radio15">Retirado para Manutenção</label>
                    </div>
                </div>

            </div>
        `;
    }
}

// 2. Em vez de @customElement, use o registro manual
customElements.define('status-geral', Status);