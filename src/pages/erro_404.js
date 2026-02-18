import { LitElement, html, css, unsafeCSS} from 'lit';
import bootstrapGlobal from 'bootstrap/dist/css/bootstrap.min.css?inline'; 

export class Erro_404 extends LitElement {
    // 1. Em vez de @property, use o objeto static properties
    static properties = {
        nome: { type: String }
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

    render() {
        return html`
            <div class="bg-dark text-light">
                <div class="alert alert-danger">
                    <strong>404!</strong> Página Inexistente ou ainda não foi Criada!
                </div>
            </div>
        `;
    }
}

// 2. Em vez de @customElement, use o registro manual
customElements.define('erro-404', Erro_404);