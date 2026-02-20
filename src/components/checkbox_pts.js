import { LitElement, html, css, unsafeCSS} from 'lit';
import bootstrapGlobal from 'bootstrap/dist/css/bootstrap.min.css?inline'; 

export class CheckBox_Element_Pontos extends LitElement {
    // 1. Em vez de @property, use o objeto static properties
    static properties = {
        titulo: { type: String },
        identificacao: {type: String},
        valor_atributo: {type: String},
        valor_minimo: {type: Number},
        valor_maximo: {type: Number}
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
        this.valor_maximo = 100
        this.valor_minimo = 0
    }

    // Crie este método fora do render
    _dispararCheck(e) {
        const input = e.target;
        const estaMarcado = input.checked; // Retorna true ou false
        
        // Se você quer o "oposto" do que ele era antes do clique:
        // O próprio .checked já é o valor novo (pós-clique).
                
        // Se precisar enviar um valor específico baseado nisso:
        const valorParaEnviar = estaMarcado ? Number(this.valor_maximo) : Number(this.valor_minimo);
            
        this.dispatchEvent(new CustomEvent('checkbox-alterado', {
            detail: { valor: valorParaEnviar }, // Pegamos o valor diretamente
            bubbles: true,
            composed: true
        }));
    }

    render() {
        return html`
            <div class="bg-dark text-light">
                    
                <div class="form-check" @change="${this._dispararCheck}">
                    <input ?checked="${this.valor_atributo != this.valor_minimo}" class="form-check-input" type="checkbox" id="${this.identificacao}" name="${this.titulo}" value="${this.valor_maximo}">
                    <label class="form-check-label" for="${this.identificacao}">${this.titulo}</label>
                </div>
                
            </div>
        `;
    }
}

// 2. Em vez de @customElement, use o registro manual
customElements.define('checkbox-element-pts', CheckBox_Element_Pontos);