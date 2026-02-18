import { LitElement, html, css, unsafeCSS} from 'lit';
import bootstrapGlobal from 'bootstrap/dist/css/bootstrap.min.css?inline'; 

export class Documento extends LitElement {
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
    _dispararDocumento(e) {
        const input = e.target; // Captura o input que disparou o evento
        
        this.dispatchEvent(new CustomEvent('documento-alterada', {
            detail: { valor: input.value }, // Pegamos o valor diretamente
            bubbles: true,
            composed: true
        }));
    }

    render() {
        return html`
            <div class="bg-dark text-light">
                <div class="mb-3 mt-3" @change="${this._dispararDocumento}">
                    <label class="form-label">Documentação (CRLV):</label>
                    <div class="form-check">
                        <input type="radio" class="form-check-input" id="radio4" name="opt-doc" value="OK" checked>
                        <label class="form-check-label" for="radio4">OK</label>
                    </div>
                    <div class="form-check">
                        <input type="radio" class="form-check-input" id="radio5" name="opt-doc" value="Irregular">
                        <label class="form-check-label" for="radio5">Irregular</label>
                    </div>
                </div>

            </div>
        `;
    }
}

// 2. Em vez de @customElement, use o registro manual
customElements.define('documento-conformidade', Documento);