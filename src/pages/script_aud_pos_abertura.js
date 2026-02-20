import { LitElement, html, css, unsafeCSS} from 'lit';
import bootstrapGlobal from 'bootstrap/dist/css/bootstrap.min.css?inline'; 

import { Selecao_Tecnico } from '../components/selecao_tecnicos';
import { Selecao_Data } from '../components/selecao_data';
import { Comentario_Extra } from '../components/comentario_extra';
import { Status_Geral_Ferramental } from '../components/script_ferramental/status_geral_ferramental';
import { CheckBox_Element } from '../components/checkbox';
import { Higiene_Bolsa } from '../components/script_ferramental/higiene_bolsa';

import { Campo_Texto } from '../components/campo_texto';

import { Alerta_Toast } from '../components/Alerta_Toast';

import Copiar_Area_Transferencia from '../controller/copiar_area_transferencia';

import { Salvar_Local_Storage } from '../model/salvar_local_storage';
import { Captutar_Local_Storage } from '../model/salvar_local_storage';
import { Limpar_Local_Storage } from '../model/salvar_local_storage';

export class Script_Aud_Pos_Abertura extends LitElement {
    // 1. Em vez de @property, use o objeto static properties
    
    static properties = {
        nome: { type: String },
        dadosVistoria: {type: Object},
        Banco_Local_Storage:{type: String}
    };

    static styles = [
        // Transformamos o CSS importado em um objeto que o Lit entende
        unsafeCSS(bootstrapGlobal), 
        css`
        
        `
      ];

    constructor() {
        super();

        this.Banco_Local_Storage = "Auditoria_Pos_Abertura";
        
        // Formatando a Data: 
        const dataObj = new Date(new Date().toISOString().split('T')[0] + 'T00:00:00'); // Adicionamos o tempo para evitar erro de fuso
        const dataFormatada = new Intl.DateTimeFormat('pt-BR').format(dataObj);
        
        const data = Captutar_Local_Storage(this.Banco_Local_Storage);
        
        // Verifica se os dados retornados existem para adicionar a estrutura do componente.
        if (data) {
            this.dadosVistoria = JSON.parse(data);
        } else {
            this.dadosVistoria = {
                data: dataFormatada, //Adicionando a Data atual ao cadastro
                tecnico: "Não Informado",
                campo_texto_cliente:"",
                fontes:"OK",
                posicionamento:"OK",
                cabo_rede: "OK",
                configuracao_geral: "OK",
                sinal_fibra: "OK",
                valocidade: "OK",
                ping_tracert: "OK",
                mapa_calor: "OK",
                educa_cliente: "OK",
                resumo_os: ""
            };
        }    

    }

    // Função única para atualizar o estado
    atualizarCampo(campo, valor) {
        this.dadosVistoria = { ...this.dadosVistoria, [campo]: valor };
        //Qualquer alteração feita nos camppos, serão adicionadas diretamente ao local storage.
        Salvar_Local_Storage(this.Banco_Local_Storage, this.dadosVistoria)
        console.log(this.dadosVistoria)
    }

    gerar_script_abertura(){
        
        //Construção do Script de Abertura:
        const SCRIPT_ABERTURA = `Realizar a **vistoria de pós-visita** referente ao atendimento do técnico **${this.dadosVistoria.tecnico}** ao cliente ${this.dadosVistoria.campo_texto_cliente} no dia **${this.dadosVistoria.data}**, com o objetivo de confirmar se todas as manutenções informadas na **baixa da OS** foram devidamente executadas.

**ORDEM DE SERVIÇO DE FECHAMENTO DO TÉCNICO:**  
Check-list do que foi realizado pelo técnico no local.

- Sinal de Fibra: ${this.dadosVistoria.sinal_fibra}
- Cabos de Rede: ${this.dadosVistoria.cabo_rede}
- Fontes dos Ativos: ${this.dadosVistoria.fontes}
- Posicionamento dos ativos: ${this.dadosVistoria.posicionamento}
- Mapa de Calor: ${this.dadosVistoria.mapa_calor}
- Configuração dos Ativos: ${this.dadosVistoria.configuracao_geral}
- Teste de Velocidade: ${this.dadosVistoria.valocidade}
- Teste de Ping e Tracert: ${this.dadosVistoria.ping_tracert}
- Informações passadas ao Cliente: ${this.dadosVistoria.educa_cliente}

---

**OS PARA CONSULTA:**

${this.dadosVistoria.resumo_os}

> Não se esqueça de colher do cliente um feedback sobre a visita recebida pelo técnico, para que possamos além de todos os dados coletados, levantar o Status do Feedback Cliente.    
`
        const mensagem = Copiar_Area_Transferencia(SCRIPT_ABERTURA)
        const toast = this.shadowRoot.getElementById('meuAlerta');
        toast.show('Copiado para área de Transferência!', "success");
    }

    limpar_script(){
        Limpar_Local_Storage(this.Banco_Local_Storage);
        const toast = this.shadowRoot.getElementById('meuAlerta');
        toast.show('Script Limpo com sucesso!', "success");
    }

    render() {
        return html`
            <div class="bg-dark text-light">
                <h1 class="text-center">Abertura de Auditoria Pós Atendimento</h1>
                <form action="#">

                    <hr>
                    
                    <selecao-data
                        .valor="${this.dadosVistoria.data}"
                        titulo="Vistoria"
                        @data-alterada="${(e) => this.atualizarCampo('data',e.detail.valor)}">     
                    ></selecao-data>
                    
                    <selecao-tecnico
                        .valor="${this.dadosVistoria.tecnico}"
                        @tecnico-alterada="${(e) => this.atualizarCampo('tecnico',e.detail.valor)}">
                    ></selecao-tecnico>

                    <campo-texto
                        .valor="${this.dadosVistoria.campo_texto_cliente}"
                        identificacao="campo-texto-cliente"
                        titulo="Nome do Cliente"
                        placeholder="Insira o Nome do Cliente"
                        @campo-texto-alterado="${(e) => this.atualizarCampo('campo_texto_cliente',e.detail.valor)}">
                    ></campo-texto>

                    <h2>Atributos Checados pelo Técnico:</h2>
                    <hr>

                    <h3>Parte Física</h3>

                    <checkbox-element
                        .valor_atributo="${this.dadosVistoria.fontes}"
                        @checkbox-alterado="${(e) => this.atualizarCampo('fontes', e.detail.valor)}"
                        titulo="Fontes dos Ativos:"
                        identificacao="fontes"
                        valor="OK"
                        >
                    </checkbox-element>

                    <checkbox-element
                        .valor_atributo="${this.dadosVistoria.posicionamento}"
                        @checkbox-alterado="${(e) => this.atualizarCampo('posicionamento', e.detail.valor)}"
                        titulo="Posicionamento e Disposição:"
                        identificacao="posicionamento"
                        valor="OK"
                        >
                    </checkbox-element>

                    <checkbox-element
                        .valor_atributo="${this.dadosVistoria.cabo_rede}"
                        @checkbox-alterado="${(e) => this.atualizarCampo('cabo_rede', e.detail.valor)}"
                        titulo="Cabos de rede:"
                        identificacao="cabo_rede"
                        valor="OK"
                        >
                    </checkbox-element>
                    <br>
                    <h3>Parte Lógica</h3>

                    <checkbox-element
                        .valor_atributo="${this.dadosVistoria.configuracao_geral}"
                        @checkbox-alterado="${(e) => this.atualizarCampo('configuracao_geral', e.detail.valor)}"
                        titulo="Configurações Gerais do Router:"
                        identificacao="configuracao_geral"
                        valor="OK"
                        >
                    </checkbox-element>

                    <checkbox-element
                        .valor_atributo="${this.dadosVistoria.sinal_fibra}"
                        @checkbox-alterado="${(e) => this.atualizarCampo('sinal_fibra', e.detail.valor)}"
                        titulo="Sinal de Fibra:"
                        identificacao="sinal_fibra"
                        valor="OK"
                        >
                    </checkbox-element>

                    <checkbox-element
                        .valor_atributo="${this.dadosVistoria.valocidade}"
                        @checkbox-alterado="${(e) => this.atualizarCampo('valocidade', e.detail.valor)}"
                        titulo="Velocidade:"
                        identificacao="valocidade"
                        valor="OK"
                        >
                    </checkbox-element>

                    <checkbox-element
                        .valor_atributo="${this.dadosVistoria.ping_tracert}"
                        @checkbox-alterado="${(e) => this.atualizarCampo('ping_tracert', e.detail.valor)}"
                        titulo="Ping e Tracert:"
                        identificacao="ping_tracert"
                        valor="OK"
                        >
                    </checkbox-element>

                    <checkbox-element
                        .valor_atributo="${this.dadosVistoria.mapa_calor}"
                        @checkbox-alterado="${(e) => this.atualizarCampo('mapa_calor', e.detail.valor)}"
                        titulo="Mapa de Calor:"
                        identificacao="mapa_calor"
                        valor="OK"
                        >
                    </checkbox-element>
                    <br>
                    <h3>Educação do Cliente</h3>

                    <checkbox-element
                        .valor_atributo="${this.dadosVistoria.educa_cliente}"
                        @checkbox-alterado="${(e) => this.atualizarCampo('educa_cliente', e.detail.valor)}"
                        titulo="Passada Informações ao Cliente:"
                        identificacao="educa_cliente"
                        valor="OK"
                        >
                    </checkbox-element>

                    <comentario-extra
                        .valor="${this.dadosVistoria.resumo_os}"
                        identificacao="resumo_os"
                        @comentario-alterado="${(e) => this.atualizarCampo('resumo_os', e.detail.valor)}">
                    ></comentario-extra>

                </form>
                <hr>
                <div class="d-grid gap-3">
                    <button 
                        type="button" 
                        class="btn btn-outline-success btn-block"
                        @click="${this.gerar_script_abertura}"
                        >Gerar Abertura da OS</button>
                    <button 
                        type="button" 
                        class="btn btn btn-outline-danger btn-block"
                        @click="${this.limpar_script}"
                        >Limpar Script</button>
                </div>
                    
                <div class="bg-dark text-light">
                    <alerta-toast id="meuAlerta"></alerta-toast>
                </div>
                <br><br>
            </div>
        `;
    }
}

// 2. Em vez de @customElement, use o registro manual
customElements.define('aud-pos-abertura', Script_Aud_Pos_Abertura);