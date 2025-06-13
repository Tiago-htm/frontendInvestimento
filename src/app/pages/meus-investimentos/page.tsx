'use client'

import Formulario from "@/app/components/Formulario";
import api from "@/lib/axios";
import { use, useEffect, useState } from "react";
import { FaEdit, FaPlus } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { GoPlus } from "react-icons/go";
import { MdEdit, MdOutlineDelete } from "react-icons/md";




interface InvestimentoDTO{
  id: number,
  nome: string,
  tipo: 'Ação' | 'CDB' | 'Tesouro Direto' | 'Outros' | 'Fundo de Renda Fixa' | 'Fundo Imobiliário',
  valor_investido: string,
  data_investimento: string,
  
}



export default function MeusInvestimentos() {

  
  const formatarData = (dataISO: string): string => {
    if (!dataISO) return 'N/A';
    return new Date(dataISO).toLocaleDateString('pt-BR');
  };

  const formatarValor = (valor: number): string => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
  };


const [investimentos, setInvestimentos] = useState<InvestimentoDTO[]>([]);
const [mostrarModal, setMostrarModal] = useState(false)
const[investimentoSelecionado, setInvestimentoSelecionado] = useState<InvestimentoDTO|undefined>(undefined);

useEffect(() => {
buscarInvestimentos();
  }, []);


    async function buscarInvestimentos() {
      const response:InvestimentoDTO[] = (await api.get("/investimentos")).data;

       setInvestimentos(response);
    
    }
 const deletar = async (id:number) => {

            try {

            const response = await api.delete(`/investimentos/${id}`);

            alert('Investimento deletado!');
            buscarInvestimentos()
        
            } catch (error) {

            alert('Falha ao deletar investimento.');
            }
        };

    
  return (

    <main className="flex flex-col h-full w-full " >
      <div className="flex flex-col  md:flex-row justify-between mb-9 items-center">
          <h1 className="text-white text-4xl font-bold">Meus Investimentos</h1>
                <div className="bg-[#161B29] max-md:mt-2 rounded-2xl px-6 py-4 border  cursor-pointer border-cyan-400 text-white  flex  justify-center items-center gap-2 " onClick={() =>{ setMostrarModal(true); setInvestimentoSelecionado(undefined)}}>
                    <FaCirclePlus className="text-2xl"  />
                    <p className=" font-semibold">Adicionar Investimento</p>
              </div>
      </div>
      
         <div className="flex flex-col lg:grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 w-full gap-5">
           {investimentos.map((item:InvestimentoDTO ) => {
                return(
                  <div key={item.id} className="bg-[#161B29] rounded-2xl p-6 border  cursor-pointer border-cyan-400 text-white h-40 w-full">
                    <div className="flex justify-between w-full ">
                      <div className="w-full flex flex-col gap-4 truncate">
                          <h1 className="text-3xl font-semibold truncate ">{item.nome}</h1>
                          <h3 className=" font-semibold text-cyan-400 ">{item.tipo}</h3>
                      </div>
                     
                      <h3 className=" font-semibold text-gray-300 mt-1.5  ">{formatarData(item.data_investimento)}</h3>
                    </div>
                        <div className="flex justify-between items-center mt-3 ">
                          <h3 className="  text-3xl font-bold">{formatarValor(Number(item.valor_investido))}</h3>
                          <div className="flex text-2xl gap-2 justify-center ">
                                <MdEdit   className="text-cyan-400 cursor-pointer "  onClick={() => { setMostrarModal(true); setInvestimentoSelecionado(item);}} />
                                <MdOutlineDelete className="text-red-500 cursor-pointer " onClick={() => {deletar(item.id)}}/>
                          </div>
                           
                      </div>
                      
                  </div>
                  
                )
            })}

    
         </div>
            
      {mostrarModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center">
          
          <div className="bg-[#161B29] rounded-2xl p-8 border border-white/10 w-full max-w-md">
          <div className="flex justify-between">
            <h3 className="text-2xl text-white">{investimentoSelecionado ? 'Editar ' : 'Adicionar ' } Investimento</h3>
            <button 
              className="text-2xl font-bold text-white mb-6" 
              onClick={() => {setMostrarModal(false); buscarInvestimentos()}}
            >
              &times;
            </button>
          </div>
           

            <Formulario editarInvestimento={investimentoSelecionado} />
          </div>
        </div>
      )}
         
       

    </main>
  );
}
