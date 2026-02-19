import { LitElement, html, css, unsafeCSS} from 'lit';
import bootstrapGlobal from 'bootstrap/dist/css/bootstrap.min.css?inline'; 

export class Conservacao extends LitElement {
    // 1. Em vez de @property, use o objeto static properties
    static properties = {
        titulo: { type: String},
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
    _dispararEPI(e) {
        const input = e.target; // Captura o input que disparou o evento
        
        this.dispatchEvent(new CustomEvent('conservacao-alterada', {
            detail: { valor: input.value }, // Pegamos o valor diretamente
            bubbles: true,
            composed: true
        }));
    }

    render() {
        return html`
            <div class="bg-dark text-light">
                <div class="mb-3 mt-3" @change="${this._dispararEPI}">
                    <label class="form-label">Estado Geral de Conservação:</label>
                    <div class="form-check">
                        <input type="radio" class="form-check-input" id="radio10" name="opt-estado" value="Ótimo" ?checked="${this.valor === 'Ótimo'}">
                        <label class="form-check-label" for="radio10">Ótimo</label>
                    </div>
                    <div class="form-check">
                        <input type="radio" class="form-check-input" id="radio11" name="opt-estado" value="Regular" ?checked="${this.valor === 'Regular'}">
                        <label class="form-check-label" for="radio11">Regular</label>
                    </div>
                    <div class="form-check">
                        <input type="radio" class="form-check-input" id="radio12" name="opt-estado" value="Ruim" ?checked="${this.valor === 'Ruim'}">
                        <label class="form-check-label" for="radio12">Ruim</label>
                    </div>
                </div>

            </div>
        `;
    }
}

// 2. Em vez de @customElement, use o registro manual
customElements.define('conservacao-moto', Conservacao);