import { LitElement, html, css, unsafeCSS} from 'lit';
import bootstrapGlobal from 'bootstrap/dist/css/bootstrap.min.css?inline'; 

import { Selecao_Tecnico } from '../components/selecao_tecnicos';
import { Selecao_Data } from '../components/selecao_data';
import { Comentario_Extra } from '../components/comentario_extra';
import { Status_Geral_Ferramental } from '../components/script_ferramental/status_geral_ferramental';
import { CheckBox_Element } from '../components/checkbox';
import { CheckBox_Element_Pontos } from '../components/checkbox_pts';

import { Campo_Texto } from '../components/campo_texto';

import { Alerta_Toast } from '../components/Alerta_Toast';

import Copiar_Area_Transferencia from '../controller/copiar_area_transferencia';

import { Salvar_Local_Storage } from '../model/salvar_local_storage';
import { Captutar_Local_Storage } from '../model/salvar_local_storage';
import { Limpar_Local_Storage } from '../model/salvar_local_storage';

export class Script_Aud_Pos_Fechamento extends LitElement {
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

        this.Banco_Local_Storage = "Auditoria_Pos_Fechamento";
        
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
                confirm_manutencao: "OK",
                confirm_equipamentos: "OK",
                confirm_divergencia: "Inconformidade",
                observacao_final: "",
                observacao_cliente: "",
                pts_exp_cliente: 0,
                pts_excelencia_tecnica: 0,
                pts_divergencia_relatorio: 0,
                pts_feedback_negativo: 0,
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

        let pts_exp_cliente_var = this.dadosVistoria.pts_exp_cliente > 0 ? "✓":" ";
        let pts_excelencia_tecnica_var = this.dadosVistoria.pts_excelencia_tecnica > 0 ? "✓":" ";
        let pts_divergencia_relatorio_var = this.dadosVistoria.pts_divergencia_relatorio < 0 ? "✓":" ";
        let pts_feedback_negativo_var = this.dadosVistoria.pts_feedback_negativo < 0 ? "✓":" ";
        let pts_feedback_total = this.dadosVistoria.pts_totais > 0 ? this.dadosVistoria :0;
        
        //Construção do Script de Abertura:
        const SCRIPT_ABERTURA = `**Ordem de Serviço** criada para vistoriar o **pós-visita** do técnico **${this.dadosVistoria.tecnico}** no cliente ${this.dadosVistoria.campo_texto_cliente}.

Data da Vistoria: **${this.dadosVistoria.data}** 
## Itens de Verificação

Será necessário validar todos os pontos a baixo para uma auditoria pós atendimento ser considerada completa!

[${this.dadosVistoria.confirm_manutencao}] - Confirmar se todas as manutenções declaradas pelo técnico foram efetivamente realizadas. 
[${this.dadosVistoria.confirm_equipamentos}] - Validar funcionamento geral dos equipamentos e estabilidade do serviço após o atendimento.
[${this.dadosVistoria.confirm_divergencia}] - Registrar eventuais divergências entre o relatório técnico e a situação encontrada no local.

**Observações Finais:** 

${this.dadosVistoria.observacao_final}

**Feedback do Cliente com Relação a Visita:** 

${this.dadosVistoria.observacao_cliente}

## Tabela de Pontos para Planilha:

- [${pts_exp_cliente_var}] Experiência do Cliente: +30 Cliente relata satisfação total, elogia a postura do técnico ou destaca a clareza nas explicações.
- [${pts_excelencia_tecnica_var}] Excelência Técnica: +20 Nenhum ajuste necessário.
- [${pts_divergencia_relatorio_var}] Divergência de Relatório:	-10 O que foi escrito na OS não condiz com o que foi feito.
- [${pts_feedback_negativo_var}] Feedback Negativo:	-30 Cliente reclama de má postura, sujeira deixada no local ou falta de educação. 

PONTOS TOTAIS: ${pts_feedback_total}
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
        const valores = [this.dadosVistoria.pts_exp_cliente, this.dadosVistoria.pts_excelencia_tecnica, this.dadosVistoria.pts_divergencia_relatorio, this.dadosVistoria.pts_feedback_negativo]
        
        this.dadosVistoria.pts_totais = valores.reduce((acumulador, valor) => acumulador + valor, 0);
        Salvar_Local_Storage(this.Banco_Local_Storage, this.dadosVistoria);
        
    }

    render() {
        return html`
            <div class="bg-dark text-light">
                <h1 class="text-center">Fechamento de Auditoria Pós Atendimento</h1>
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

                    <h2>Itens de Verificação:</h2>
                    <hr>

                    <div class="alert alert-warning">
                    <strong>Atenção!</strong> Será necessário validar todos os pontos a baixo para uma auditoria pós atendimento ser considerada completa!
                    </div>
                    
        
                    <checkbox-element
                        .valor_atributo="${this.dadosVistoria.confirm_manutencao}"
                        @checkbox-alterado="${(e) => this.atualizarCampo('confirm_manutencao', e.detail.valor)}"
                        titulo="Confirmar se todas as manutenções declaradas pelo técnico foram efetivamente realizadas."
                        identificacao="confirm_manutencao"
                        valor="OK"
                        >
                    </checkbox-element>

                    <checkbox-element
                        .valor_atributo="${this.dadosVistoria.confirm_equipamentos}"
                        @checkbox-alterado="${(e) => this.atualizarCampo('confirm_equipamentos', e.detail.valor)}"
                        titulo="Validar funcionamento geral dos equipamentos e estabilidade do serviço após o atendimento."
                        identificacao="confirm_equipamentos"
                        valor="OK"
                        >
                    </checkbox-element>

                    <checkbox-element
                        .valor_atributo="${this.dadosVistoria.confirm_divergencia}"
                        @checkbox-alterado="${(e) => this.atualizarCampo('confirm_divergencia', e.detail.valor)}"
                        titulo="Registrar eventuais divergências entre o relatório técnico e a situação encontrada no local."
                        identificacao="confirm_divergencia"
                        valor="OK"
                        >
                    </checkbox-element>
                    <br>
                    <h3>Observações Finais:</h3>

                    <div class="alert alert-warning">
                    <strong>Atenção!</strong> Registrar conclusões, correções realizadas e, se necessário, recomendações para melhoria do processo técnico.
                    </div>

                    <comentario-extra
                        .valor="${this.dadosVistoria.observacao_final}"
                        identificacao="observacao_final"
                        @comentario-alterado="${(e) => this.atualizarCampo('observacao_final', e.detail.valor)}">
                    ></comentario-extra>

                    <h3>Feedback do Cliente com Relação a Visita:</h3>

                    <div class="alert alert-warning">
                    <strong>Atenção!</strong> Registrar o que o Cliente achou da Visita realizada pelo técnico anterior.
                    </div>

                    <comentario-extra
                        .valor="${this.dadosVistoria.observacao_cliente}"
                        identificacao="observacao_cliente"
                        @comentario-alterado="${(e) => this.atualizarCampo('observacao_cliente', e.detail.valor)}">
                    ></comentario-extra>

                    <h2>Tabela de Pontos para Planilha:</h2>
                    <hr>

                    <div @checkbox-alterado="${this._atualizar_pontuacao}">
                        <checkbox-element-pts
                            .valor_atributo="${this.dadosVistoria.pts_exp_cliente}"
                            @checkbox-alterado="${(e) => this.atualizarCampo('pts_exp_cliente', e.detail.valor)}"
                            titulo="Experiência do Cliente: +30 Cliente relata satisfação total, elogia a postura do técnico ou destaca a clareza nas explicações."
                            identificacao="pts_exp_cliente"
                            valor_maximo ="30"
                            valor_minimo ="0"
                            >
                        </checkbox-element-pts>

                        <checkbox-element-pts
                            .valor_atributo="${this.dadosVistoria.pts_excelencia_tecnica}"
                            @checkbox-alterado="${(e) => this.atualizarCampo('pts_excelencia_tecnica', e.detail.valor)}"
                            titulo="Excelência Técnica: +20 Nenhum ajuste necessário."
                            identificacao="pts_excelencia_tecnica"
                            valor_maximo ="20"
                            valor_minimo ="0"
                            >
                        </checkbox-element-pts>

                        <checkbox-element-pts
                            .valor_atributo="${this.dadosVistoria.pts_divergencia_relatorio}"
                            @checkbox-alterado="${(e) => this.atualizarCampo('pts_divergencia_relatorio', e.detail.valor)}"
                            titulo="Divergência de Relatório:	-10 O que foi escrito na OS não condiz com o que foi feito."
                            identificacao="pts_divergencia_relatorio"
                            valor_maximo ="-10"
                            valor_minimo ="0"
                            >
                        </checkbox-element-pts>

                        <checkbox-element-pts
                            .valor_atributo="${this.dadosVistoria.pts_feedback_negativo}"
                            @checkbox-alterado="${(e) => this.atualizarCampo('pts_feedback_negativo', e.detail.valor)}"
                            titulo="Feedback Negativo:	-30 Cliente reclama de má postura, sujeira deixada no local ou falta de educação."
                            identificacao="pts_feedback_negativo"
                            valor_maximo ="-30"
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
                        @click="${this.gerar_script_abertura}"
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
customElements.define('aud-pos-fechamento', Script_Aud_Pos_Fechamento);