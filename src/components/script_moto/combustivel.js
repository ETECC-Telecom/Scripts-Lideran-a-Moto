import { LitElement, html, css, unsafeCSS} from 'lit';
import bootstrapGlobal from 'bootstrap/dist/css/bootstrap.min.css?inline'; 

export class Combustivel extends LitElement {
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
    _dispararCombustivel(e) {
        const input = e.target; // Captura o input que disparou o evento
        
        this.dispatchEvent(new CustomEvent('combustivel-alterada', {
            detail: { valor: input.value }, // Pegamos o valor diretamente
            bubbles: true,
            composed: true
        }));
    }

    render() {
        return html`
            <div class="bg-dark text-light">
                <div class="mb-3 mt-3" @change="${this._dispararCombustivel}">
                    <label class="form-label">Nível Combustível:</label>
                    <div class="form-check">
                        <input type="radio" class="form-check-input" id="radio1" name="optradio" value="Reserva" ?checked="${this.valor === 'Reserva'}">
                        <label class="form-check-label" for="radio1">Reserva</label>
                    </div>
                    <div class="form-check">
                        <input type="radio" class="form-check-input" id="radio2" name="optradio" value="Meio Tanque" ?checked="${this.valor === 'Meio Tanque'}">
                        <label class="form-check-label" for="radio2">Meio Tanque</label>
                    </div>
                    <div class="form-check">
                        <input type="radio" class="form-check-input" id="radio3" name="optradio" value="Cheio" ?checked="${this.valor === 'Cheio'}">
                        <label class="form-check-label" for="radio3">Cheio</label>
                    </div>
                </div>

            </div>
        `;
    }
}

// 2. Em vez de @customElement, use o registro manual
customElements.define('combustivel-nivel', Combustivel);