import { LitElement, html, css, unsafeCSS } from 'lit';
import bootstrapGlobal from 'bootstrap/dist/css/bootstrap.min.css?inline'; 
// IMPORTANTE: Importe o JS do Bootstrap para poder instanciar o Collapse
import { Collapse } from 'bootstrap'; 

export class Comentario_Extra extends LitElement {
    static properties = {
        identificacao: { type: String },
        placeholder: {type: String},
        legenda: {type: String},
        valor: {type: String}
    };

    static styles = [
        unsafeCSS(bootstrapGlobal), 
        css`
            /* Seu CSS extra aqui */
        `
    ];

    constructor() {
        super();
        this.identificacao = "Comentario";
        this._collapse = null; // Variável para guardar a instância do collapse
        this.placeholder = `Para cada observação, use a formatação markdown de listas, ou seja:
- Loren ipsum...`
        this.legenda = "Observação do Atributo"
    }

    // O segredo está aqui: após o Lit renderizar o HTML, nós ativamos o Bootstrap
    firstUpdated() {
        const el = this.shadowRoot.getElementById(this.identificacao);
        if (el) {
            // Inicializa o componente do Bootstrap manualmente no elemento do Shadow DOM
            this._collapse = new Collapse(el, {
                toggle: false // Para não abrir automaticamente ao carregar
            });
        }
    }

    // Função para alternar o estado (abrir/fechar)
    _toggleCollapse() {
        if (this._collapse) {
            this._collapse.toggle();
        }
    }

    // Crie este método fora do render
    _dispararComentario(e) {
        this.dispatchEvent(new CustomEvent('comentario-alterado', {
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
            <div class="bg-dark text-light p-1">
                <div class="d-flex justify-content-end bg-dark p-1">
                    <button class="btn btn-outline-light btn-sm" @click="${this._toggleCollapse}">
                        ▽
                    </button>
                </div>

                <div id="${this.identificacao}" class="collapse mt-1">
                    <label for="comment">${this.legenda}</label>
                    <textarea 
                        class="form-control" 
                        rows="7" 
                        id="comment-${this.identificacao}" 
                        name="text"
                        @input="${this._dispararComentario}"
                        placeholder="${this.placeholder}"
                        >${this.valor}</textarea>
                </div>
            </div>
        `;
    }
}

customElements.define('comentario-extra', Comentario_Extra);