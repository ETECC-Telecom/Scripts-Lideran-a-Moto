import { LitElement, html, css, unsafeCSS} from 'lit';
import bootstrapGlobal from 'bootstrap/dist/css/bootstrap.min.css?inline'; 

import { Selecao_Tecnico } from '../components/selecao_tecnicos';
import { Selecao_Moto } from '../components/selecao_Moto';
import { Selecao_Data } from '../components/selecao_data';
import { Comentario_Extra } from '../components/comentario_extra';
import { Hodometro } from '../components/script_moto/hodometro';
import { Combustivel } from '../components/script_moto/combustivel';
import { Documento } from '../components/script_moto/documento';
import { EPI } from '../components/script_moto/epi';
import { CheckBox_Element } from '../components/checkbox';
import { Lavagem_Semanal } from '../components/script_moto/lavagem_semanal';
import { Conservacao } from '../components/script_moto/conservacao';
import { Status } from '../components/script_moto/status_geral';
import { Moto_Extra } from '../components/script_moto/moto_extra';
import { Alerta_Toast } from '../components/Alerta_Toast';

import Copiar_Area_Transferencia from '../controller/copiar_area_transferencia';

import { Salvar_Local_Storage } from '../model/salvar_local_storage';
import { Captutar_Local_Storage } from '../model/salvar_local_storage';
import { Limpar_Local_Storage } from '../model/salvar_local_storage';

export class Script_Moto extends LitElement {
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

        this.Banco_Local_Storage = "Vistoria_Moto";
        
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
                placa: "Não Informado",
                hodometro: "Não Informado",
                combustivel: "Não Informado",
                documento: "OK",
                EPI: "OK",
                comentario_conformidade: "",
                check_luz_freio: "OK",
                check_iluminacao_dianteira: "OK",
                check_setas: "OK",
                comentario_tecnico_eletrica: "",
                check_freio: "OK",
                check_twi: "OK",
                check_retrovisor_antena: "OK",
                check_transmissao: "OK",
                lavagem_semanal: "Sim",
                conservacao: "Ótimo",
                comentario_tecnico_mecanica: "",
                comentario_tecnico_higienizacao: "",
                status_geral: "Não Informado",
                moto_extra_entregue: "Não",
                moto_extra: "Não Informado",
                comentario_geral: ""
            };
        }    

    }

    // Função única para atualizar o estado
    atualizarCampo(campo, valor) {
        this.dadosVistoria = { ...this.dadosVistoria, [campo]: valor };
        //Qualquer alteração feita nos camppos, serão adicionadas diretamente ao local storage.
        Salvar_Local_Storage(this.Banco_Local_Storage, this.dadosVistoria)
    }

    gerar_script_abertura(){
        
        console.log(this.dadosVistoria);
        //Construção do Script de Abertura:
        const SCRIPT_ABERTURA = `
Realizar vistoria técnica periódica para validação de segurança operacional. 

Triagem Inicial: Verificar validade do CRLV, presença de EPIs obrigatórios do condutor e conferência de KM para plano de manutenção preventiva;

Moto: ${this.dadosVistoria.placa}
Data: ${this.dadosVistoria.data}
        `
        const mensagem = Copiar_Area_Transferencia(SCRIPT_ABERTURA)
        const toast = this.shadowRoot.getElementById('meuAlerta');
        toast.show('Copiado para área de Transferência!', "success");
    }

    gerar_script_fechamento(){
    
        //Construção do Script de Abertura:
        let comentario_conformidade = ''
        let comentario_tecnico_eletrica = ''
        let comentario_tecnico_mecanica = ''
        let comentario_tecnico_higienizacao = ''
        let comentario_geral = ''

        if(!this.dadosVistoria.comentario_conformidade == ""){
            comentario_conformidade = `\nObservação de Conformidade:\n${this.dadosVistoria.comentario_conformidade}\n`
        }
        if(!this.dadosVistoria.comentario_tecnico_eletrica == ""){
            comentario_tecnico_eletrica = `\nObservação Técnica de Elétrica:\n${this.dadosVistoria.comentario_tecnico_eletrica}\n`
        }
        if(!this.dadosVistoria.comentario_tecnico_mecanica == ""){
            comentario_tecnico_mecanica = `\nObservação Técnica Mecânica:\n${this.dadosVistoria.comentario_tecnico_mecanica}\n`
        }
        if(!this.dadosVistoria.comentario_tecnico_higienizacao == ""){
            comentario_tecnico_higienizacao = `\nObservação de Higienização:\n${this.dadosVistoria.comentario_tecnico_higienizacao}\n`
        }
        if(!this.dadosVistoria.comentario_geral == ""){
            comentario_geral = `\nObservações Gerais:\n${this.dadosVistoria.comentario_geral}\n`
        }


        //Gerando Script Final
        const SCRIPT_FINAL = `DADOS DE IDENTIFICAÇÃO:
- Placa: ${this.dadosVistoria.placa}
- Técnico: ${this.dadosVistoria.tecnico}
- KM Atual: ${this.dadosVistoria.hodometro}
- Nível Combustível: ${this.dadosVistoria.combustivel}

CONFORMIDADE LEGAL E EPI:
- Documentação (CRLV): ${this.dadosVistoria.documento}
- EPIs (Capacete/Luva/Bota): ${this.dadosVistoria.EPI}
${comentario_conformidade}
CHECKLIST TÉCNICO (SISTEMA ELÉTRICO E SINALIZAÇÃO):
- Iluminação Dianteira (Alta/Baixa): ${this.dadosVistoria.check_iluminacao_dianteira}
- Lanterna Traseira e Luz de Freio: ${this.dadosVistoria.check_luz_freio}
- Setas (D/E): ${this.dadosVistoria.check_setas}
${comentario_tecnico_eletrica}
CHECKLIST TÉCNICO (MECÂNICA E SEGURANÇA):
- Pneus (Sulco/TWI): ${this.dadosVistoria.check_twi}
- Freios (Cabo/Pastilha/Fluído): ${this.dadosVistoria.check_freio}
- Transmissão (Corrente/Coroa): ${this.dadosVistoria.check_transmissao}
- Retrovisores e Antena: ${this.dadosVistoria.check_retrovisor_antena}
${comentario_tecnico_mecanica}
HIGIENIZAÇÃO E CONSERVAÇÃO:
- Veículo Lavado na Semana? ${this.dadosVistoria.lavagem_semanal}
- Estado Geral de Conservação: ${this.dadosVistoria.conservacao}
${comentario_tecnico_higienizacao}
PARECER FINAL:
- Status: ${this.dadosVistoria.status_geral}
- Veículo Reserva Entregue? ${this.dadosVistoria.moto_extra_entregue} (Placa: ${this.dadosVistoria.moto_extra})
${comentario_geral}
`  
        const mensagem = Copiar_Area_Transferencia(SCRIPT_FINAL)
        const toast = this.shadowRoot.getElementById('meuAlerta');
        toast.show('Copiado para área de Transferência!', "success");

    }

    limpar_script_moto(){
        Limpar_Local_Storage(this.Banco_Local_Storage);
        const toast = this.shadowRoot.getElementById('meuAlerta');
        toast.show('Script Limpo com sucesso!', "success");
    }

    render() {
        return html`
            <div class="bg-dark text-light">
                <h1 class="text-center">Abertura de Vistoria de Moto</h1>
                <form action="#">

                    <h2>Dados de Identificação:</h2>
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

                    <selecao-moto
                        .valor="${this.dadosVistoria.placa}"
                        @placa-alterada="${(e) => this.atualizarCampo('placa',e.detail.valor)}">
                    ></selecao-moto>

                    <hodomotro-element
                        .valor="${this.dadosVistoria.hodometro}"
                        @hodometro-alterada="${(e) => this.atualizarCampo('hodometro',e.detail.valor)}">
                    ></hodomotro-element>

                    <combustivel-nivel
                        .valor="${this.dadosVistoria.combustivel}"
                        @combustivel-alterada="${(e) => this.atualizarCampo('combustivel', e.detail.valor)}">
                    ></combustivel-nivel>

                    <h2>Conformidade Legal e EPI:</h2>
                    <hr>

                    <documento-conformidade
                        .valor="${this.dadosVistoria.documento}"
                        @documento-alterada="${(e) => this.atualizarCampo('documento', e.detail.valor)}">
                    ></documento-conformidade>

                    <epi-conformidade
                        .valor="${this.dadosVistoria.EPI}"
                        @epi-alterada="${(e) => this.atualizarCampo('EPI', e.detail.valor)}">
                    ></epi-conformidade>

                    <comentario-extra
                        .valor="${this.dadosVistoria.comentario_conformidade}"
                        identificacao="comentario-conformidade"
                        @comentario-alterado="${(e) => this.atualizarCampo('comentario_conformidade', e.detail.valor)}">
                    ></comentario-extra>

                    <h2>Checklist Técnico (Sistema Elétrico e Sinalização):</h2>
                    <hr>

                    <checkbox-element
                        .valor_atributo="${this.dadosVistoria.check_iluminacao_dianteira}"
                        @checkbox-alterado="${(e) => this.atualizarCampo('check_iluminacao_dianteira', e.detail.valor)}"
                        titulo="Iluminação Dianteira (Alta/Baixa)"
                        identificacao="check_iluminacao"
                        valor="OK"
                        >
                    </checkbox-element>

                    <checkbox-element
                        .valor_atributo="${this.dadosVistoria.check_luz_freio}"
                        @checkbox-alterado="${(e) => this.atualizarCampo('check_luz_freio', e.detail.valor)}"
                        titulo="Lanterna Traseira e Luz de Freio"
                        identificacao="check_luz_freio"
                        valor="OK"
                        >
                    </checkbox-element>

                    <checkbox-element
                        .valor_atributo="${this.dadosVistoria.check_setas}"
                        @checkbox-alterado="${(e) => this.atualizarCampo('check_setas', e.detail.valor)}"
                        titulo="Setas (D/E)"
                        identificacao="check_luz_setas"
                        valor="OK"
                        >
                    </checkbox-element>

                    <comentario-extra
                        .valor="${this.dadosVistoria.comentario_tecnico_eletrica}"
                        identificacao="comentario-tecnico"
                        @comentario-alterado="${(e) => this.atualizarCampo('comentario_tecnico_eletrica', e.detail.valor)}">    
                    ></comentario-extra>

                    <br>
                    <h2>Checklist Técnico (Mecânica e Segurança):</h2>
                    <hr>

                    <checkbox-element
                        .valor_atributo="${this.dadosVistoria.check_twi}"
                        @checkbox-alterado="${(e) => this.atualizarCampo('check_twi', e.detail.valor)}"
                        titulo="Pneus (Sulco/TWI)"
                        identificacao="check_TWI"
                        valor="OK"
                        >
                    </checkbox-element>

                    <checkbox-element
                        .valor_atributo="${this.dadosVistoria.check_freio}"
                        @checkbox-alterado="${(e) => this.atualizarCampo('check_freio', e.detail.valor)}"
                        titulo="Freios (Cabo/Pastilha/Fluído)"
                        identificacao="check_freio"
                        valor="OK"
                        >
                    </checkbox-element>

                    <checkbox-element
                        .valor_atributo="${this.dadosVistoria.check_transmissao}"
                        @checkbox-alterado="${(e) => this.atualizarCampo('check_transmissao', e.detail.valor)}"
                        titulo="Transmissão (Corrente/Coroa)"
                        identificacao="check_transmisao"
                        valor="OK"
                        >
                    </checkbox-element>

                    <checkbox-element
                        .valor_atributo="${this.dadosVistoria.check_retrovisor_antena}"
                        @checkbox-alterado="${(e) => this.atualizarCampo('check_retrovisor_antena', e.detail.valor)}"
                        titulo="Retrovisores e Antena"
                        identificacao="check_retrovisor_antena"
                        valor="OK"
                        >
                    </checkbox-element>
                    
                    <comentario-extra
                        .valor="${this.dadosVistoria.comentario_tecnico_mecanica}"
                        identificacao="comentario-mecanica"
                        @comentario-alterado="${(e) => this.atualizarCampo('comentario_tecnico_mecanica', e.detail.valor)}">    
                    ></comentario-extra>

                    <br>

                    <h2>Higienização e Conservação:</h2>
                    <hr>

                    <lavagem-semanal
                        .valor="${this.dadosVistoria.lavagem_semanal}"
                        @lavagem-alterada="${(e) => this.atualizarCampo('lavagem_semanal', e.detail.valor)}">
                    ></lavagem-semanal>

                    <conservacao-moto
                        .valor="${this.dadosVistoria.conservacao}"
                        @conservacao-alterada="${(e) => this.atualizarCampo('conservacao', e.detail.valor)}">
                    ></conservacao-moto>

                    <comentario-extra
                        .valor="${this.dadosVistoria.comentario_tecnico_higienizacao}"
                        identificacao="comentario-higienizacao"
                        @comentario-alterado="${(e) => this.atualizarCampo('comentario_tecnico_higienizacao', e.detail.valor)}">    
                    ></comentario-extra>

                    <h2>Parecer Final:</h2>
                    <hr>
                    
                    <status-geral
                        .valor="${this.dadosVistoria.status_geral}"
                        @status-alterada="${(e) => this.atualizarCampo('status_geral', e.detail.valor)}">
                    ></status-geral>

                    <moto-extra
                        .valor="${this.dadosVistoria.moto_extra_entregue}"
                        @moto_extra-alterada="${(e) => this.atualizarCampo('moto_extra_entregue', e.detail.valor)}">
                    ></moto-extra>

                    <div class="alert alert-warning">
                        <strong>Observe!</strong> Caso seja entregue algum veículo reserva ao técnico, selecione a placa do veículo nesta lista. E não se esqueça de adicionar a informação na Planilha de Controle!
                    </div>
                
                    <selecao-moto
                        .valor="${this.dadosVistoria.moto_extra}"
                        identificacao="extra"
                        @placa-alterada="${(e) => this.atualizarCampo('moto_extra',e.detail.valor)}">
                    ></selecao-moto>

                    <h2>Observações Gerais</h2>
                    <hr>
                    <comentario-extra
                        .valor="${this.dadosVistoria.comentario_geral}"
                        identificacao="comentario-geral"
                        placeholder = "Descrever aqui qualquer detalhe como riscos na carenagem, ruídos anormais, previsão de troca de óleo e observações das checklists acima..."
                        legenda = "Observações Gerais"
                        @comentario-alterado="${(e) => this.atualizarCampo('comentario_geral', e.detail.valor)}">    
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
                        @click="${this.limpar_script_moto}"
                        >Limpar Script Moto</button>
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
customElements.define('moto-script', Script_Moto);