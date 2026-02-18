import { LitElement, html, css, unsafeCSS} from 'lit';
import bootstrapGlobal from 'bootstrap/dist/css/bootstrap.min.css?inline'; 

// Detecta se estamos no GitHub Pages ou Localhost
const BASE_PATH = window.location.hostname.includes('github.io') 
  ? '/Scripts-Lideran-a-Moto' 
  : '';

export class Home_Page extends LitElement {
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
        this.nome = "Usuário";
    }

    render() {
        return html`
            <div class="bg-dark text-light">
            
                <ul class="nav flex-column text-center">
                    <li class="nav-item">
                        <div class="d-grid">
                            <a class="btn btn-outline-light m-3" href="#">Abertura de Auditoria Externa Pós Atendimento</a>
                        </div>
                    </li>
                    <li class="nav-item">
                        <div class="d-grid">
                            <a class="btn btn-outline-light m-3" href="#">Fechamento de Auditoria Externa Pós Atendimento</a>
                        </div>
                    </li>
                    <li class="nav-item">
                        <div class="d-grid">
                            <a class="btn btn-outline-light m-3" href="#">Fechamento de Auditoria Externa</a>
                        </div>
                    </li>
                    <li class="nav-item">
                        <div class="d-grid">
                            <a class="btn btn-outline-light m-3" href="#">Fechamento de Vistoria de Ferramental</a>
                        </div>
                    </li>
                    <li class="nav-item">
                        <div class="d-grid">
                            <a class="btn btn-outline-light m-3" href="${BASE_PATH}/script-vistoria-moto">Fechamento de Vistoria da Moto</a>
                        </div>
                    </li>
                </ul>
                
                <br>
                <p class="text-center">Versão 0.0.1</p>
        
            </div>
        `;
    }
}

// 2. Em vez de @customElement, use o registro manual
customElements.define('home-page', Home_Page);