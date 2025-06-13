"use client"
import api from "@/lib/axios";
import { useEffect, useState } from "react";

interface InvestimentoDTO{
  id: number,
  nome: string,
  tipo: string,
  valor_investido: string,
  data_investimento: string,
}

interface modoFormularioDTO {
    editarInvestimento ?: InvestimentoDTO

}
export default function FormularioInvestimento({editarInvestimento}: modoFormularioDTO) {

    const [investimento, setInvestimento] = useState({nome: '', tipo: 'Ação', valor_investido:'', data_investimento:''})


    useEffect(() => {
    
    if (editarInvestimento) {
          const dataFormatada = new Date(editarInvestimento.data_investimento).toISOString().split('T')[0];
      setInvestimento({nome: editarInvestimento.nome, tipo:editarInvestimento.tipo, valor_investido: editarInvestimento.valor_investido ,data_investimento: dataFormatada });
      console.log(investimento)
    }
  }, [editarInvestimento]);

        const alterarInvestimento =  (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
                    setInvestimento({ 
                        ...investimento, 
                        [e.target.name]: e.target.value 
                       
    });
        }

        const cadastrar = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            try {
            const response = await api.post('/investimentos', investimento);

            alert('Investimento cadastrado!');
        
            } catch (error) {

            alert('Falha ao cadastrar investimento.');
            }
        };

        const editar = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            try {
            const response = await api.put(`/investimentos/${editarInvestimento?.id}`, investimento);

            alert('Investimento editado!');
        
            } catch (error) {

            alert('Falha ao editar investimento.');
            }
        };




        return(

                   
                <form className="space-y-4" onSubmit={editarInvestimento ? editar : cadastrar}>
                <div>
                    <label htmlFor="nome" className="block text-sm font-medium text-gray-400 mb-1">Nome do Investimento</label>
                    <input
                    id="nome"
                    name="nome"
                    placeholder="Ex: Ações da Apple"
                    value={investimento.nome}
                    onChange={alterarInvestimento}
                    className="w-full bg-[#0A0E1A] border border-white/20 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                </div>
                <div>
                    <label htmlFor="tipo" className="block text-sm font-medium text-gray-400 mb-1">Tipo</label>
                    <select
                    id="tipo"
                    name="tipo"
                    value={investimento.tipo}
                    onChange={alterarInvestimento}
                    className="w-full bg-[#0A0E1A] border border-white/20 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    >
                    <option value="Ação">Ação</option>
                    <option value="Fundo Imobiliário">Fundo Imobiliário</option>
                    <option value="Fundo de Renda Fixa">Fundo de Renda Fixa</option>
                    <option value="Tesouro Direto">Tesouro Direto</option>
                    <option value="CDB">CDB</option>
                    <option value="Outro">Outro</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="valor_investido" className="block text-sm font-medium text-gray-400 mb-1">Valor Investido (R$)</label>
                    <input
                    id="valor_investido"
                    type="number"
                    min={0}
                    step="0.01"
                    name="valor_investido"
                    placeholder="Ex: 1500.50"
                    value={investimento.valor_investido}
                    onChange={alterarInvestimento}
                    className="w-full bg-[#0A0E1A] border border-white/20 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                </div>
                <div>
                    <label htmlFor="data_investimento" className="block text-sm font-medium text-gray-400 mb-1">Data do Investimento</label>
                    <input
                    id="data_investimento"
                    type="date"
                    name="data_investimento"
                    value={investimento.data_investimento}
                    onChange={alterarInvestimento}
                    max={new Date().toISOString().split('T')[0]}
                    className="w-full bg-[#0A0E1A] border border-white/20 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2.5 rounded-lg transition duration-200 mt-4"
                >
                   {editarInvestimento ? 'Editar' : 'Adicionar' }  Investimento
                </button>
                </form>

        )


}