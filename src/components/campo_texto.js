import { LitElement, html, css, unsafeCSS} from 'lit';
import bootstrapGlobal from 'bootstrap/dist/css/bootstrap.min.css?inline'; 

export class Campo_Texto extends LitElement {
    // 1. Em vez de @property, use o objeto static properties
    static properties = {
        titulo: { type: String },
        identificacao: {type: String},
        valor: {type: String},
        placeholder: {type: String}
    };

    static styles = [
        // Transformamos o CSS importado em um objeto que o Lit entende
        unsafeCSS(bootstrapGlobal), 
        css`
        
        `
      ];

    constructor() {
        super();
        this.titulo = "Geral"
        this.identificacao = "Padrao"
        this.valor = "OK"
        this.placeholder = "Descrição..."
        
    }

    // Crie este método fora do render
    _disparar(e) {
        this.dispatchEvent(new CustomEvent('campo-texto-alterado', {
            // 'this.identificacao' ajuda o pai a saber QUAL comentário mudou
            detail: { 
                origem: this.identificacao, 
                valor: e.target.value 
            },
            bubbles: true,
            composed: true
        }));
        
    }

    render() {
        return html`
            <div class="bg-dark text-light">
                    
                <div class="mb-3 mt-3">
                    <label for="${this.identificacao}" class="form-label">${this.titulo}</label>
                    <input 
                        type="text" 
                        class="form-control" 
                        id="${this.identificacao}" 
                        placeholder="${this.placeholder}" 
                        name="texto"
                        @input="${this._disparar}"
                        value="${this.valor}"
                        >
                </div>
                
            </div>
        `;
    }
}

// 2. Em vez de @customElement, use o registro manual
customElements.define('campo-texto', Campo_Texto);