import { LitElement, html, css, unsafeCSS } from 'lit';
import bootstrapGlobal from 'bootstrap/dist/css/bootstrap.min.css?inline';

export class Alerta_Toast extends LitElement {
    static properties = {
        mensagem: { type: String },
        aberto: { type: Boolean },
        tipo: { type: String } // 'success', 'danger', 'warning', etc.
    };

    static styles = [
        unsafeCSS(bootstrapGlobal),
        css`
            :host {
                display: block;
            }
            .toast {
                display: block;
                opacity: 0;
                transition: opacity 0.3s ease-in-out;
                pointer-events: none;
            }
            .toast.show {
                opacity: 1;
                pointer-events: auto;
            }
        `
    ];

    constructor() {
        super();
        this.mensagem = "";
        this.aberto = false;
        this.tipo = "success";
    }

    // Método que pode ser chamado via referência (ref) ou via propriedade
    show(mensagem, tipo = "success", duracao = 3000) {
        this.mensagem = mensagem;
        this.tipo = tipo;
        this.aberto = true;

        setTimeout(() => {
            this.aberto = false;
        }, duracao);
    }

    render() {
        return html`
            <div class="toast-container position-fixed bottom-0 end-0 p-3" style="z-index: 2000">
                <div class="toast align-items-center text-white bg-${this.tipo} border-0 ${this.aberto ? 'show' : ''}" role="alert">
                    <div class="d-flex">
                        <div class="toast-body">
                            ${this.mensagem}
                        </div>
                        <button type="button" class="btn-close btn-close-white me-2 m-auto" @click="${() => this.aberto = false}"></button>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('alerta-toast', Alerta_Toast);