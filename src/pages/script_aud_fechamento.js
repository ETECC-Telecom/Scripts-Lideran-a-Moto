import { LitElement, html, css, unsafeCSS} from 'lit';
import bootstrapGlobal from 'bootstrap/dist/css/bootstrap.min.css?inline'; 

import { Selecao_Tecnico } from '../components/selecao_tecnicos';
import { Selecao_Data } from '../components/selecao_data';
import { Comentario_Extra } from '../components/comentario_extra';
import { Status_Geral_Ferramental } from '../components/script_ferramental/status_geral_ferramental';
import { CheckBox_Element } from '../components/checkbox';
import { CheckBox_Element_Pontos } from '../components/checkbox_pts';
import { Tipo_Auditoria } from '../components/script_aud_ext/tipo_auditoria';

import { Campo_Texto } from '../components/campo_texto';

import { Alerta_Toast } from '../components/Alerta_Toast';

import Copiar_Area_Transferencia from '../controller/copiar_area_transferencia';

import { Salvar_Local_Storage } from '../model/salvar_local_storage';
import { Captutar_Local_Storage } from '../model/salvar_local_storage';
import { Limpar_Local_Storage } from '../model/salvar_local_storage';

export class Script_Aud_Fechamento extends LitElement {
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
        :host{
            $success: #5a2d9c;
        }
        `
      ];

    constructor() {
        super();

        this.Banco_Local_Storage = "Auditoria_Fechamento";
        
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
                tipo_auditoria:"Surpresa", // Surpresa/Acompanhada
                checagem_interacao: "OK",
                checagem_procedimento: "OK",
                checagem_logica: "OK",
                observacao_interacao: "",
                observacao_procedimento: "",
                observacao_logica: "",
                conclusao: "",
                ultima_auditoria_tecnica: "",
                pts_prope: 0,
                pts_interacao: 0,
                pts_educacao_cliente: 0,
                pts_procedimento_fisico: 0,
                pts_procedimento_logico: 0,
                pts_falta_prope: 0,
                pts_falha_tecnica: 0,
                pts_inconformidade: 0,
                pts_totais: 0
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

        //Construção do Script de Abertura:
        const SCRIPT_ABERTURA = `Realização de **Auditoria Técnica de Campo** referente ao atendimento do técnico **${this.dadosVistoria.tecnico}** em **${this.dadosVistoria.data}**.

Esta visita visa assegurar a excelência operacional e a conformidade dos processos realizados em relação às normas técnicas da empresa.
`
        const mensagem = Copiar_Area_Transferencia(SCRIPT_ABERTURA)
        const toast = this.shadowRoot.getElementById('meuAlerta');
        toast.show('Copiado para área de Transferência!', "success");
    }

    gerar_script_fechamento(){

        let pts_prope = this.dadosVistoria.pts_prope > 0 ? "✓":" ";
        let pts_interacao = this.dadosVistoria.pts_interacao > 0 ? "✓":" ";
        let pts_educacao_cliente = this.dadosVistoria.pts_educacao_cliente > 0 ? "✓":" ";
        let pts_procedimento_fisico = this.dadosVistoria.pts_procedimento_fisico > 0 ? "✓":" ";
        let pts_procedimento_logico = this.dadosVistoria.pts_procedimento_logico > 0 ? "✓":" ";
        let pts_falta_prope = this.dadosVistoria.pts_falta_prope > 0 ? "✓":" ";
        let pts_falha_tecnica = this.dadosVistoria.pts_falha_tecnica > 0 ? "✓":" ";
        let pts_inconformidade = this.dadosVistoria.pts_inconformidade > 0 ? "✓":" ";
        let pts_totais = this.dadosVistoria.pts_totais > 0 ? this.dadosVistoria.pts_totais:"0";
        
        //Construção do Script de Abertura:
        const SCRIPT_ABERTURA = `**Ordem de Serviço** criada para vistoriar o atendimento realizado pelo técnico **${this.dadosVistoria.tecnico}** no dia **${this.dadosVistoria.data}** ao Cliente **${this.dadosVistoria.campo_texto_cliente}**

**TIPO DE AUDITORIA**: ${this.dadosVistoria.tipo_auditoria}
### Checklist de Vistoria Técnica

**INTERAÇÃO COM CLIENTE:**

[${this.dadosVistoria.checagem_procedimento}] - Feito o Procedimento Completo;

**Observações:**
${this.dadosVistoria.observacao_interacao}

**CHECAGEM FÍSICA COMPLETA:** 

Verificar sinal de fibra, integridade de fontes e cabos de rede, posicionamento correto dos equipamentos, fixações e demais aspectos estruturais.  
[${this.dadosVistoria.checagem_procedimento}] - Feito o Procedimento Completo;

**Observações:**
${this.dadosVistoria.observacao_procedimento}

**CHECAGEM LÓGICA (TESTE DE REDE):** 

Executar testes de velocidade, ping, tracert e mapa de calor para validar o desempenho e estabilidade da conexão.  
[${this.dadosVistoria.checagem_logica}] - Feito o Procedimento Completo;

**Observações:**
${this.dadosVistoria.observacao_logica}

**CONCLUSÃO DA VISTORIA:**  

${this.dadosVistoria.conclusao}
### Resumo das Ultimas Vistoria do técnica

${this.dadosVistoria.ultima_auditoria_tecnica}
## Checklist de Pontos para Planilha:

- [${pts_prope}] Uso de Pró-pé: +10 Utilização obrigatória ao entrar na residência, demonstrando cuidado com a higiene do ambiente.
- [${pts_interacao}] Interação Positiva:  +10 Escuta ativa, cordialidade no tom de voz e foco na resolução do problema do cliente.
- [${pts_educacao_cliente}] Educação do Cliente: +10 Explicar de forma simples o funcionamento da rede (Wi-Fi 2.4/5G, barreiras físicas) e como evitar problemas futuros (bem como outros temas de rede).
- [${pts_procedimento_fisico}] Procedimento Físico: +10 Verificação de conectores, disposição, fixação de equipamentos e integridade dos cabos.
- [${pts_procedimento_logico}] Procedimento Lógico: +10 Validação de banda contratada, níveis de sinal (dBm) e atualização de firmware se necessário.
---
- [${pts_falta_prope}] Falta do uso do Pró-pé: -10 Não realizou a utilização obrigatória do Propé, sem justificativa que valide a ação.
- [${pts_falha_tecnica}] Falta de Técnica: -10 Deixar de realizar testes básicos que resultem em reincidência de chamado (ex: falta de mapa de calor, ping e tracert).
- [${pts_inconformidade}] Inconformidade Inicial: -20 Falha grave - não se identificar, ser rude, não explicar o que será feito ou entrar sem autorização.

**PONTOS TOTAIS**: ${pts_totais}

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

    _atualizar_pontuacao(e){
        const valores = [
            this.dadosVistoria.pts_prope,
            this.dadosVistoria.pts_interacao,
            this.dadosVistoria.pts_educacao_cliente,
            this.dadosVistoria.pts_procedimento_fisico,
            this.dadosVistoria.pts_procedimento_logico,
            this.dadosVistoria.pts_falta_prope,
            this.dadosVistoria.pts_falha_tecnica,
            this.dadosVistoria.pts_inconformidade
        ]
        
        this.dadosVistoria.pts_totais = valores.reduce((acumulador, valor) => acumulador + valor, 0);
        Salvar_Local_Storage(this.Banco_Local_Storage, this.dadosVistoria);
        
    }

    render() {
        return html`
            <div class="bg-dark text-light">
                <h1 class="text-center">Fechamento de Auditoria</h1>
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

                    <tipo-auditoria
                        .valor="${this.dadosVistoria.tipo_auditoria}"
                        @auditoria-alterada="${(e) => this.atualizarCampo('tipo_auditoria', e.detail.valor)}">
                    ></tipo-auditoria>

                    <h2>Checklist de Vistoria Técnica:</h2>
                    <hr>

                    <h3>
                        Interação Com Cliente:
                    </h3>
                    <p>
                        Verificar nível de comunicação com o cliente no primeiro contato, e se está seguindo os protocolos requeridos pela empresa (inserção do pró-pé). 
                    </p>

                    <checkbox-element
                        .valor_atributo="${this.dadosVistoria.checagem_interacao}"
                        @checkbox-alterado="${(e) => this.atualizarCampo('checagem_interacao', e.detail.valor)}"
                        titulo="Feito o Procedimento Completo;"
                        identificacao="checagem_interacao"
                        valor="OK"
                        >
                    </checkbox-element>

                    <comentario-extra
                        .valor="${this.dadosVistoria.observacao_interacao}"
                        identificacao="observacao_interacao"
                        @comentario-alterado="${(e) => this.atualizarCampo('observacao_interacao', e.detail.valor)}">
                    ></comentario-extra>

                    <h3>
                        Checagem Física Completa:
                    </h3>
                    <p>
                        Verificar sinal de fibra, integridade de fontes e cabos de rede, posicionamento correto dos equipamentos, fixações e demais aspectos estruturais. 
                    </p>

                    <checkbox-element
                        .valor_atributo="${this.dadosVistoria.checagem_procedimento}"
                        @checkbox-alterado="${(e) => this.atualizarCampo('checagem_procedimento', e.detail.valor)}"
                        titulo="Feito o Procedimento Completo;"
                        identificacao="checagem_procedimento"
                        valor="OK"
                        >
                    </checkbox-element>

                    <comentario-extra
                        .valor="${this.dadosVistoria.observacao_procedimento}"
                        identificacao="observacao_procedimento"
                        @comentario-alterado="${(e) => this.atualizarCampo('observacao_procedimento', e.detail.valor)}">
                    ></comentario-extra>

                    <h3>
                        Checagem Lógica (Teste De Rede):
                    </h3>
                    <p>
                        Executar testes de velocidade, ping, tracert e mapa de calor para validar o desempenho e estabilidade da conexão. 
                    </p>

                    <checkbox-element
                        .valor_atributo="${this.dadosVistoria.checagem_logica}"
                        @checkbox-alterado="${(e) => this.atualizarCampo('checagem_logica', e.detail.valor)}"
                        titulo="Feito o Procedimento Completo;"
                        identificacao="checagem_logica"
                        valor="OK"
                        >
                    </checkbox-element>

                    <comentario-extra
                        .valor="${this.dadosVistoria.observacao_logica}"
                        identificacao="observacao_logica"
                        @comentario-alterado="${(e) => this.atualizarCampo('observacao_logica', e.detail.valor)}">
                    ></comentario-extra>

                    <h3>
                        Conclusão da Vistoria:
                    </h3>
                    <p>
                        Rgistrar breve resumo do que foi verificado, ajustes realizados ou pontos de atenção identificados.
                    </p>

                    <comentario-extra
                        .valor="${this.dadosVistoria.conclusao}"
                        identificacao="conclusao"
                        @comentario-alterado="${(e) => this.atualizarCampo('conclusao', e.detail.valor)}">
                    ></comentario-extra>

                    <h3>
                        Resumo das Ultimas Vistoria do técnica:
                    </h3>

                    <comentario-extra
                        .valor="${this.dadosVistoria.ultima_auditoria_tecnica}"
                        identificacao="ultima_auditoria_tecnica"
                        @comentario-alterado="${(e) => this.atualizarCampo('ultima_auditoria_tecnica', e.detail.valor)}">
                    ></comentario-extra>

                    <div class="alert alert-warning">
                        <strong>Atenção!</strong> Após finalizar a vistoria, não se esqueça de revisar a baixa da OS do técnico para checagem de funcionário do mês. Ao todo devem ser analisados duas OS do técnico por mês após vistoria externa.
                    </div>

                    <h2>Checklist de Pontos para Planilha:</h2>
                    <hr>

                    <div @checkbox-alterado="${this._atualizar_pontuacao}">
                        <checkbox-element-pts
                            .valor_atributo="${this.dadosVistoria.pts_prope}"
                            @checkbox-alterado="${(e) => this.atualizarCampo('pts_prope', e.detail.valor)}"
                            titulo="Uso de Pró-pé: +10 Utilização obrigatória ao entrar na residência, demonstrando cuidado com a higiene do ambiente."
                            identificacao="pts_prope"
                            valor_maximo ="10"
                            valor_minimo ="0"
                            >
                        </checkbox-element-pts>

                        <checkbox-element-pts
                            .valor_atributo="${this.dadosVistoria.pts_interacao}"
                            @checkbox-alterado="${(e) => this.atualizarCampo('pts_interacao', e.detail.valor)}"
                            titulo="Interação Positiva:  +10 Escuta ativa, cordialidade no tom de voz e foco na resolução do problema do cliente."
                            identificacao="pts_interacao"
                            valor_maximo ="10"
                            valor_minimo ="0"
                            >
                        </checkbox-element-pts>

                        <checkbox-element-pts
                            .valor_atributo="${this.dadosVistoria.pts_educacao_cliente}"
                            @checkbox-alterado="${(e) => this.atualizarCampo('pts_educacao_cliente', e.detail.valor)}"
                            titulo="Educação do Cliente: +10 Explicar de forma simples o funcionamento da rede (Wi-Fi 2.4/5G, barreiras físicas) e como evitar problemas futuros (bem como outros temas de rede)."
                            identificacao="pts_educacao_cliente"
                            valor_maximo ="10"
                            valor_minimo ="0"
                            >
                        </checkbox-element-pts>

                        <checkbox-element-pts
                            .valor_atributo="${this.dadosVistoria.pts_procedimento_fisico}"
                            @checkbox-alterado="${(e) => this.atualizarCampo('pts_procedimento_fisico', e.detail.valor)}"
                            titulo="Procedimento Físico: +10 Verificação de conectores, disposição, fixação de equipamentos e integridade dos cabos."
                            identificacao="pts_procedimento_fisico"
                            valor_maximo ="10"
                            valor_minimo ="0"
                            >
                        </checkbox-element-pts>

                        <checkbox-element-pts
                            .valor_atributo="${this.dadosVistoria.pts_procedimento_logico}"
                            @checkbox-alterado="${(e) => this.atualizarCampo('pts_procedimento_logico', e.detail.valor)}"
                            titulo="Procedimento Lógico: +10 Validação de banda contratada, níveis de sinal (dBm) e atualização de firmware se necessário."
                            identificacao="pts_procedimento_logico"
                            valor_maximo ="10"
                            valor_minimo ="0"
                            >
                        </checkbox-element-pts>
                        
                        <hr>

                        <checkbox-element-pts
                            .valor_atributo="${this.dadosVistoria.pts_falta_prope}"
                            @checkbox-alterado="${(e) => this.atualizarCampo('pts_falta_prope', e.detail.valor)}"
                            titulo="Falta do uso do Pró-pé: -10 Não realizou a utilização obrigatória do Propé, sem justificativa que valide a ação."
                            identificacao="pts_falta_prope"
                            valor_maximo ="-10"
                            valor_minimo ="0"
                            >
                        </checkbox-element-pts>

                        <checkbox-element-pts
                            .valor_atributo="${this.dadosVistoria.pts_falha_tecnica}"
                            @checkbox-alterado="${(e) => this.atualizarCampo('pts_falha_tecnica', e.detail.valor)}"
                            titulo="Falta de Técnica: -10 Deixar de realizar testes básicos que resultem em reincidência de chamado (ex: falta de mapa de calor, ping e tracert)."
                            identificacao="pts_falha_tecnica"
                            valor_maximo ="-10"
                            valor_minimo ="0"
                            >
                        </checkbox-element-pts>

                        <checkbox-element-pts
                            .valor_atributo="${this.dadosVistoria.pts_inconformidade}"
                            @checkbox-alterado="${(e) => this.atualizarCampo('pts_inconformidade', e.detail.valor)}"
                            titulo="Inconformidade Inicial: -20 Falha grave - não se identificar, ser rude, não explicar o que será feito ou entrar sem autorização."
                            identificacao="pts_inconformidade"
                            valor_maximo ="-20"
                            valor_minimo ="0"
                            >
                        </checkbox-element-pts>

                        
                    </div>

                    <div class="mt-4 p-2 bg-primary text-white rounded">
                    <h2 class="text-center">Pontos Acumulados!</h2>
                    <h4 class="text-center">${this.dadosVistoria.pts_totais}</h4>
                    </div>

                </form>
                <hr>
                <div class="d-grid gap-3">
                    <button 
                        type="button" 
                        class="btn btn-outline-success btn-block"
                        @click="${this.gerar_script_fechamento}"
                        >Gerar Fechamento da OS</button>
                    <button 
                        type="button" 
                        class="btn btn-outline-light btn-block"
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
customElements.define('aud-fechamento', Script_Aud_Fechamento);