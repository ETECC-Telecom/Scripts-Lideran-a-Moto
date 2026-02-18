import { LitElement, html, css, unsafeCSS} from 'lit';
import bootstrapGlobal from 'bootstrap/dist/css/bootstrap.min.css?inline'; 

export class Selecao_Moto extends LitElement {
    // 1. Em vez de @property, use o objeto static properties
    static properties = {
        identificacao: { type: String }
    };

    static styles = [
        // Transformamos o CSS importado em um objeto que o Lit entende
        unsafeCSS(bootstrapGlobal), 
        css`
        
        `
      ];

    constructor() {
        super();
        this.identificacao = "geral"
    }

    // Crie este método fora do render
    _dispararPlaca(e) {
        const input = e.target; // Captura o input que disparou o evento
        
        this.dispatchEvent(new CustomEvent('placa-alterada', {
            detail: { valor: input.value }, // Pegamos o valor diretamente
            bubbles: true,
            composed: true
        }));
    }

    render() {
        return html`
            <div class="bg-dark text-light">
                <div class="mb-3 mt-3">
                    <label for="Placa" class="form-label">Placa:</label>
                    <select 
                        class="form-select" 
                        id="${this.identificacao}"
                        @change="${this._dispararPlaca}"
                        >
                        <option value="Não Informado">Selecione uma Placa</option>
                        <option value="ETE 0C54">ETE 0C54</option>
                        <option value="FGY 9J67">FGY 9J67</option>
                        <option value="ETC 0I72">ETC 0I72</option>
                        <option value="ETC 0I51">ETC 0I51</option>
                        <option value="ETE 0C21">ETE 0C21</option>
                        <option value="ETE 0I43">ETE 0I43</option>
                        <option value="DWA 9B76">DWA 9B76</option>
                        <option value="EOY 0E15">EOY 0E15</option>
                        <option value="ETE 0C92">ETE 0C92</option>
                        <option value="FVL 1A93">FVL 1A93</option>
                        <option value="ETC 0I52">ETC 0I52</option>
                        <option value="ETC 0J71">ETC 0J71</option>
                        <option value="ETE 0I81">ETE 0I81</option>
                        <option value="STR 7C16">STR 7C16</option>
                        <option value="CKG 5G47">CKG 5G47</option>
                        
                    </select>
                </div>
            </div>
        `;
    }
}

// 2. Em vez de @customElement, use o registro manual
customElements.define('selecao-moto', Selecao_Moto);