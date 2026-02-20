import { LitElement, html, css, unsafeCSS} from 'lit';
import bootstrapGlobal from 'bootstrap/dist/css/bootstrap.min.css?inline'; 

export class Home_Page extends LitElement {
    // 1. Em vez de @property, use o objeto static properties
    static properties = {
        nome: { type: String },
        url_config: {type: String}
    };

    static styles = [
        // Transformamos o CSS importado em um objeto que o Lit entende
        unsafeCSS(bootstrapGlobal), 
        css`
        
        `
      ];

    constructor() {
        super();
        this.nome = "Usuário";
        this.url_config = ''
    }

    render() {
        return html`
            <div class="bg-dark text-light">
            
                <ul class="nav flex-column text-center">
                    <li class="nav-item">
                        <div class="d-grid">
                            <a class="btn btn-outline-light m-3" href="${this.url_config}/script-aud-pos">Abertura de Auditoria Externa Pós Atendimento</a>
                        </div>
                    </li>
                    <li class="nav-item">
                        <div class="d-grid">
                            <a class="btn btn-outline-light m-3" href="${this.url_config}/script-aud-fechamento">Fechamento de Auditoria Externa Pós Atendimento</a>
                        </div>
                    </li>
                    <li class="nav-item">
                        <div class="d-grid">
                            <a class="btn btn-outline-light m-3" href="${this.url_config}/script-fechamento">Fechamento de Auditoria Externa</a>
                        </div>
                    </li>
                    <li class="nav-item">
                        <div class="d-grid">
                            <a class="btn btn-outline-light m-3" href="${this.url_config}/script-vistoria-ferramental">Fechamento de Vistoria de Ferramental</a>
                        </div>
                    </li>
                    <li class="nav-item">
                        <div class="d-grid">
                            <a class="btn btn-outline-light m-3" href="${this.url_config}/script-vistoria-moto">Fechamento de Vistoria da Moto</a>
                        </div>
                    </li>
                </ul>
                
                <br>
                <p class="text-center">Versão 1.0.0</p>
        
            </div>
        `;
    }
}

// 2. Em vez de @customElement, use o registro manual
customElements.define('home-page', Home_Page);