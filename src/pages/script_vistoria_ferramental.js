import { LitElement, html, css, unsafeCSS} from 'lit';
import bootstrapGlobal from 'bootstrap/dist/css/bootstrap.min.css?inline'; 

import { Selecao_Tecnico } from '../components/selecao_tecnicos';
import { Selecao_Data } from '../components/selecao_data';
import { Comentario_Extra } from '../components/comentario_extra';
import { Status_Geral_Ferramental } from '../components/script_ferramental/status_geral_ferramental';
import { CheckBox_Element } from '../components/checkbox';
import { Higiene_Bolsa } from '../components/script_ferramental/higiene_bolsa';


import { Alerta_Toast } from '../components/Alerta_Toast';

import Copiar_Area_Transferencia from '../controller/copiar_area_transferencia';

import { Salvar_Local_Storage } from '../model/salvar_local_storage';
import { Captutar_Local_Storage } from '../model/salvar_local_storage';
import { Limpar_Local_Storage } from '../model/salvar_local_storage';

export class Script_Ferramental extends LitElement {
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

        this.Banco_Local_Storage = "Vistoria_Ferramental";
        
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
                status_geral: "Aprovado", // Aprovado/Aprovado com Ressalvas/Reprovado
                alicate_decapagem:"OK", //OK ou Inconformidade
                alicate_corte:"OK", //OK ou Inconformidade
                alicate_geral:"OK", //OK ou Inconformidade
                decapador_jacare: "OK", //OK ou Inconformidade
                clivador: "OK", //OK ou Inconformidade
                power_mitter: "OK", //OK ou Inconformidade
                alicate_crimpagem:"OK", //OK ou Inconformidade
                martelo:"OK", //OK ou Inconformidade
                comentario_tecnico_conformidade: "",
                ativos_ti: "OK", //OK ou Inconformidade
                higiene: "Sim", //Sim ou Não
                comentario_tecnico_higiene: "",
                comentario_tecnico_geral: ""
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
        
        console.log(this.dadosVistoria);
        //Construção do Script de Abertura:
        const SCRIPT_ABERTURA = `Realizar a Inspeção Técnica de Qualidade (ITQ) e Manutenção Preventiva no ferramental e ativos de TI do técnico **${this.dadosVistoria.tecnico}**. O procedimento deve seguir rigorosamente o Protocolo de Inspeção Técnica, incluindo testes de funcionalidade, calibração de equipamentos de medição e aplicação da metodologia 5S. 

Atividade agendada para o ciclo operacional do dia ${this.dadosVistoria.data}
        `
        const mensagem = Copiar_Area_Transferencia(SCRIPT_ABERTURA)
        const toast = this.shadowRoot.getElementById('meuAlerta');
        toast.show('Copiado para área de Transferência!', "success");
    }

    gerar_script_fechamento(){
    
        //Construção do Script de Abertura:
        let comentario_tecnico_conformidade = ''
        let comentario_tecnico_higiene = ''
        let comentario_tecnico_geral = ''
   

        if(!this.dadosVistoria.comentario_tecnico_conformidade == ""){
            comentario_tecnico_conformidade = `\nObservação de Conformidade:\n${this.dadosVistoria.comentario_tecnico_conformidade}\n`
        }
        if(!this.dadosVistoria.comentario_tecnico_higiene == ""){
            comentario_tecnico_higiene = `\nObservação Técnica de Higiene:\n${this.dadosVistoria.comentario_tecnico_higiene}\n`
        }
        if(!this.dadosVistoria.comentario_tecnico_geral == ""){
            comentario_tecnico_geral = `\n${this.dadosVistoria.comentario_tecnico_geral}\n`
        }
        


        //Gerando Script Final
        const SCRIPT_FINAL = `## RELATÓRIO DE VISTORIA DE FERRAMENTAL

- Técnico Avaliado: ${this.dadosVistoria.tecnico}
- Data da Inspeção: ${this.dadosVistoria.data}
- Status Geral: ${this.dadosVistoria.status_geral}
    
CHECKLIST DE CONFORMIDADE (ESTADO E FUNCIONALIDADE):

- Alicate de Decapagem (Amarelo): ${this.dadosVistoria.alicate_decapagem}
- Decapador (Jacaré): ${this.dadosVistoria.decapador_jacare}
- Alicate de Corte: ${this.dadosVistoria.alicate_corte}
- Clivador (Teste de Grimpagem): ${this.dadosVistoria.clivador}
- Alicates Gerais (Lubrificados): ${this.dadosVistoria.alicate_geral}
- Power Metter (Calibração 1490nm / 5.7dBm): ${this.dadosVistoria.power_mitter}
- Alicate de Crimpagem (RJ45): ${this.dadosVistoria.alicate_crimpagem}
- Martelo: ${this.dadosVistoria.martelo}
${comentario_tecnico_conformidade}
ATIVOS E ORGANIZAÇÃO (5S):

- Ativos de TI (Smartphone/Notebook): ${this.dadosVistoria.ativos_ti}
- Higiene e Organização (Bornal/Mochila): ${this.dadosVistoria.higiene}
${comentario_tecnico_higiene}
OBSERVAÇÕES TÉCNICAS:
${comentario_tecnico_geral}
`  
        const mensagem = Copiar_Area_Transferencia(SCRIPT_FINAL)
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
                <h1 class="text-center">Abertura de Vistoria de Ferramental</h1>
                <form action="#">

                    <h2>Relatório de Vistoria de Ferramental:</h2>
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

                    <status-geral-ferramental
                        .valor="${this.dadosVistoria.status_geral}"
                        @status-geral-ferramental-alterada="${(e) => this.atualizarCampo('status_geral', e.detail.valor)}">
                        ></status-geral-ferramental>

                    <h2>Checklist de Conformidade (Estado e Funcionalidade):</h2>
                    <hr>
                    <checkbox-element
                        .valor_atributo="${this.dadosVistoria.alicate_decapagem}"
                        @checkbox-alterado="${(e) => this.atualizarCampo('alicate_decapagem', e.detail.valor)}"
                        titulo="Alicate de Decapagem (Amarelo):"
                        identificacao="alicate_decapagem"
                        valor="OK"
                        >
                    </checkbox-element>

                    <checkbox-element
                        .valor_atributo="${this.dadosVistoria.decapador_jacare}"
                        @checkbox-alterado="${(e) => this.atualizarCampo('decapador_jacare', e.detail.valor)}"
                        titulo="Decapador (Jacaré):"
                        identificacao="decapador_jacare"
                        valor="OK"
                        >
                    </checkbox-element>

                    <checkbox-element
                        .valor_atributo="${this.dadosVistoria.alicate_corte}"
                        @checkbox-alterado="${(e) => this.atualizarCampo('alicate_corte', e.detail.valor)}"
                        titulo="Alicate de Corte:"
                        identificacao="alicate_corte"
                        valor="OK"
                        >
                    </checkbox-element>

                    <checkbox-element
                        .valor_atributo="${this.dadosVistoria.clivador}"
                        @checkbox-alterado="${(e) => this.atualizarCampo('clivador', e.detail.valor)}"
                        titulo="Clivador (Teste de Grimpagem):"
                        identificacao="clivador"
                        valor="OK"
                        >
                    </checkbox-element>

                    <checkbox-element
                        .valor_atributo="${this.dadosVistoria.alicate_geral}"
                        @checkbox-alterado="${(e) => this.atualizarCampo('alicate_geral', e.detail.valor)}"
                        titulo="Alicates Gerais (Lubrificados):"
                        identificacao="alicate_geral"
                        valor="OK"
                        >
                    </checkbox-element>

                    <checkbox-element
                        .valor_atributo="${this.dadosVistoria.power_mitter}"
                        @checkbox-alterado="${(e) => this.atualizarCampo('power_mitter', e.detail.valor)}"
                        titulo="Power Metter (Calibração 1490nm / 5.7dBm):"
                        identificacao="power_mitter"
                        valor="OK"
                        >
                    </checkbox-element>

                    <checkbox-element
                        .valor_atributo="${this.dadosVistoria.alicate_crimpagem}"
                        @checkbox-alterado="${(e) => this.atualizarCampo('alicate_crimpagem', e.detail.valor)}"
                        titulo="Alicate de Crimpagem (RJ45):"
                        identificacao="alicate_crimpagem"
                        valor="OK"
                        >
                    </checkbox-element>

                    <checkbox-element
                        .valor_atributo="${this.dadosVistoria.martelo}"
                        @checkbox-alterado="${(e) => this.atualizarCampo('martelo', e.detail.valor)}"
                        titulo="Martelo:"
                        identificacao="martelo"
                        valor="OK"
                        >
                    </checkbox-element>

                    <comentario-extra
                        .valor="${this.dadosVistoria.comentario_tecnico_conformidade}"
                        identificacao="comentario_tecnico_conformidade"
                        @comentario-alterado="${(e) => this.atualizarCampo('comentario_tecnico_conformidade', e.detail.valor)}">
                    ></comentario-extra>

                    <h2>Ativos e Organização (5S):</h2>
                    <hr>
                    <checkbox-element
                        .valor_atributo="${this.dadosVistoria.ativos_ti}"
                        @checkbox-alterado="${(e) => this.atualizarCampo('ativos_ti', e.detail.valor)}"
                        titulo="Ativos de TI (Smartphone/Notebook):"
                        identificacao="ativos_ti"
                        valor="OK"
                        >
                    </checkbox-element>

                    <higiene-bolsa
                        .valor="${this.dadosVistoria.higiene}"
                        @higiene-bolsa-alterada="${(e) => this.atualizarCampo('higiene', e.detail.valor)}">
                        ></higiene-bolsa>

                    <comentario-extra
                        .valor="${this.dadosVistoria.comentario_tecnico_higiene}"
                        identificacao="comentario_tecnico_higiene"
                        @comentario-alterado="${(e) => this.atualizarCampo('comentario_tecnico_higiene', e.detail.valor)}">
                    ></comentario-extra>

                    <h2>Observações Técnicas:</h2>
                    <hr>
                    <comentario-extra
                        .valor="${this.dadosVistoria.comentario_tecnico_geral}"
                        identificacao="comentario_tecnico_geral"
                        @comentario-alterado="${(e) => this.atualizarCampo('comentario_tecnico_geral', e.detail.valor)}">
                    ></comentario-extra>

                </form>
                <hr>
                <div class="d-grid gap-3">
                    <button 
                        type="button" 
                        class="btn btn-outline-secondary btn-block"
                        @click="${this.gerar_script_abertura}"
                        >Gerar Abertura da OS</button>
                    <button 
                        type="button" 
                        class="btn btn btn-outline-light btn-block"
                        @click="${this.gerar_script_fechamento}"
                        >Gerar Fechamento da OS</button>
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
customElements.define('ferramental-script', Script_Ferramental);