import { LitElement, html, css, unsafeCSS } from 'lit';
// Importa o arquivo CSS do Bootstrap instalado via npm
import bootstrapGlobal from 'bootstrap/dist/css/bootstrap.min.css?inline'; 

export class Navebar extends LitElement {
    static properties = {
        url_config: {type: String}
    };

  static styles = [
    // Transformamos o CSS importado em um objeto que o Lit entende
    unsafeCSS(bootstrapGlobal), 
    css`
      /* Seus estilos personalizados aqui */
      // :host { display: block; margin: 20px; }
    
    `
  ];

  constructor() {
        super();
        this.nome = "Usuário";
        this.url_config = ''
    }

  render() {
    return html`
      <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="/${this.url_config}">
            <img alt="Scripts Liderança" style="height: 60px; width: auto;" src="/logo.svg" alt="New York">
          </a>
        </div>
      </nav>
    `;
  }
}
customElements.define('navebar-custom', Navebar);