import { LitElement, html, css, unsafeCSS} from 'lit';
import { Router } from '@lit-labs/router';
import bootstrapGlobal from 'bootstrap/dist/css/bootstrap.min.css?inline'; 

import { Navebar } from './components/navebar';
import {Home_Page} from './pages/home'
import { Erro_404 } from './pages/erro_404';
import { Script_Moto } from './pages/script_vistoria_moto';

export class AppRoot extends LitElement {
  static properties = {
    // Não precisamos mais de _routeView aqui, o Router cuida disso
  };

  constructor() {
    super();
    
    // No JS puro, declaramos o router diretamente no 'this'
    // O primeiro argumento 'this' conecta o router ao ciclo de vida do Lit
    this._router = new Router(this, [
      {
        path: '/',
        render: () => html`<home-page></home-page>`,
      },
      {
        path: '/script-vistoria-moto',
        render: () => html`<moto-script></moto-script>`,
      },
      {
        path: '/perfil/:name',
        // Os parâmetros da URL chegam como um objeto no primeiro argumento
        render: (params) => html`<h2>👤 Usuário: ${params.name}</h2>`,
      },
      {
        // Rota de "Catch-all" para erro 404
        path: '/*',
        render: () => html`<erro-404></erro-404>`,
      }
    ]);
  }
  static styles = [
      // Transformamos o CSS importado em um objeto que o Lit entende
      unsafeCSS(bootstrapGlobal), 
      css`
        
      `
    ];


  render() {
    return html`
      <main class="bg-dark">
        <navebar-custom></navebar-custom>
        <br>
        <article class="container ">
          ${this._router.outlet()}
        </article>
      </main>
    `;
  }
}

customElements.define('app-root', AppRoot);