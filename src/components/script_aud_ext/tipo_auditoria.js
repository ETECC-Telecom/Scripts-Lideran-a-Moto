import { LitElement, html, css, unsafeCSS} from 'lit';
import bootstrapGlobal from 'bootstrap/dist/css/bootstrap.min.css?inline'; 

export class Tipo_Auditoria extends LitElement {
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
        
        this.dispatchEvent(new CustomEvent('auditoria-alterada', {
            detail: { valor: input.value }, // Pegamos o valor diretamente
            bubbles: true,
            composed: true
        }));
    }

    render() {
        return html`
            <div class="bg-dark text-light">
                <div class="mb-3 mt-3" @change="${this._disparar}">
                    <label class="form-label">Tipo de Auditoria:</label>
                    <div class="form-check">
                        <input type="radio" class="form-check-input" id="tipo_auditoria_radio1" name="optradio" value="Surpresa" ?checked="${this.valor === 'Surpresa'}">
                        <label class="form-check-label" for="tipo_auditoria_radio1">Surpresa</label>
                    </div>
                    <div class="form-check">
                        <input type="radio" class="form-check-input" id="tipo_auditoria_radio2" name="optradio" value="Acompanhada" ?checked="${this.valor === 'Acompanhada'}">
                        <label class="form-check-label" for="tipo_auditoria_radio2">Acompanhada</label>
                    </div>
                </div>

            </div>
        `;
    }
}

// 2. Em vez de @customElement, use o registro manual
customElements.define('tipo-auditoria', Tipo_Auditoria);