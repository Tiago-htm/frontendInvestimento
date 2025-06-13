'use client';



import { GiCash } from "react-icons/gi";
import { SiCashapp } from "react-icons/si";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { IoIosCash, IoMdCash, IoMdHome } from "react-icons/io";
import { HiOutlineCash } from "react-icons/hi";
import { FaEdit } from "react-icons/fa";
import { MdEdit, MdOutlineDelete } from "react-icons/md";
import GraficoPizzaInvestimento from "@/app/components/Grafico";
import Formulario from "@/app/components/Formulario";


interface InvestimentoDTO{
  id: number,
  nome: string,
  tipo: 'Ação' | 'CDB' | 'Tesouro Direto' | 'Outros' | 'Fundo de Renda Fixa' | 'Fundo Imobiliário',
  valor_investido: string,
  data_investimento: string,
  
}

export default  function Dashboard() {

  const [investimentos, setInvestimentos] = useState<InvestimentoDTO[]>([]);
  const [totalAcao, setTotalAcao] = useState(0)
  const [totalCDB, setTotalCDB] = useState(0)
  const [totalTesouroDireto, setTotalTesouroDireto] = useState(0)
  const [totalOutros, setTotalOutros] = useState(0)
  const [totalFundoRendaFixa, setTotalFundoRendaFixa] = useState(0)
  const [totalFundoImobiliario, setTotalFundoImobiliario] = useState(0)

  const [investimentoSelecionado, setInvestimentoSelecionado] = useState<InvestimentoDTO | undefined>(undefined)
  
  const [mostrarModal, setMostrarModal] = useState(false)
  const formatarData = (dataISO: string): string => {
    if (!dataISO) return 'N/A';
    return new Date(dataISO).toLocaleDateString('pt-BR');
  };

  const formatarValor = (valor: number): string => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
  };

  const deletar = async (id:number) => {

            try {

            const response = await api.delete(`/investimentos/${id}`);

            alert('Investimento deletado!');
            buscarInvestimentos()
        
            } catch (error) {

            alert('Falha ao deletar investimento.');
            }
        };
async function buscarInvestimentos() {
      const response:InvestimentoDTO[] = (await api.get("/investimentos")).data;
      response.map((item:InvestimentoDTO) =>{
 
        switch (item.tipo) {
          case 'Ação':
              setTotalAcao(totalAcao + Number(item.valor_investido)) 
            break;
          case 'CDB':
              setTotalCDB(totalCDB + Number(item.valor_investido))  
            break;

            case 'Fundo Imobiliário':
              setTotalFundoImobiliario(totalFundoImobiliario + Number(item.valor_investido)) 
            break;
          case 'Fundo de Renda Fixa':
              setTotalFundoRendaFixa(totalFundoRendaFixa + Number(item.valor_investido))  
            break;
            case 'Tesouro Direto':
              setTotalTesouroDireto(totalTesouroDireto + Number(item.valor_investido)) 
            break;
          default:
              setTotalOutros(totalOutros + Number(item.valor_investido))
            break;
        }

      })
      setInvestimentos(response);
       console.log(response)
    }
  useEffect(() => {
   

    buscarInvestimentos();
  }, []);
  
  return (
  
      <main className="flex flex-col h-full w-full " >
        <h1 className="text-white text-4xl font-bold mb-9">Dashboard</h1>

          <div className="grid md:grid-cols-3 2xl:grid-cols-6 gap-5 w-full ">
               <div className="bg-[#161B29] rounded-2xl p-6 border  cursor-pointer border-cyan-400  h-[3]">
               
                 <div className="flex items-center gap-2 ">
                  <SiCashapp className=" text-cyan-400 text-4xl " />
                  <h3 className="flex  text-2xl text-white font-semibold "> Ação</h3>
                 </div>
                  <p className="mt-2 items-center p-2 text-3xl text-white">{formatarValor(totalAcao)} </p>
                </div> 

               <div className="bg-[#161B29] rounded-2xl p-6 border  cursor-pointer border-cyan-400  h-[3]">
                  <div className="flex items-center gap-2">
                  <IoIosCash   className=" text-cyan-400 text-4xl" />
                  <h3 className="flex  text-2xl text-white font-semibold "> CDB</h3>
                 </div>
                  <p className="mt-2 items-center p-2 text-3xl text-white">{formatarValor(totalCDB)} </p>
                
                </div>    

                <div className="bg-[#161B29] rounded-2xl p-6 border  cursor-pointer border-cyan-400  h-[3]">
                  <div className="flex items-center gap-2">
                  <IoMdCash   className=" text-cyan-400 text-4xl" />
                  <h3 className="flex  text-2xl text-white font-semibold ">Renda Fixa</h3>
                 </div>
                  <p className="mt-2 items-center p-2 text-3xl text-white">{formatarValor(totalFundoRendaFixa)} </p>

                </div>          

                  <div className="bg-[#161B29] rounded-2xl p-6 border  cursor-pointer border-cyan-400  h-[3]">
                  <div className="flex items-center gap-2">
                  <IoMdHome   className=" text-cyan-400 text-4xl" />
                  <h3 className="flex  text-2xl text-white font-semibold ">Imobliario</h3>
                 </div>
                
                  <p className="mt-2 items-center p-2 text-3xl text-white">{formatarValor(totalFundoImobiliario)} </p>
               </div>

                  <div className="bg-[#161B29] rounded-2xl p-6 border  cursor-pointer border-cyan-400  h-[3]">
                  <div className="flex items-center gap-2">
                  <GiCash  className=" text-cyan-400 text-4xl" />
                  <h3 className="flex  text-2xl text-white font-semibold ">Tesouro Direto</h3>
                 </div>
                  <p className="mt-2 items-center p-2 text-3xl text-white">{formatarValor(totalTesouroDireto)} </p>
                </div>


                  <div className="bg-[#161B29] rounded-2xl p-6 border  cursor-pointer border-cyan-400  h-[3]">
                  <div className="flex items-center gap-2">
                  <HiOutlineCash   className=" text-cyan-400 text-4xl" />
                  <h3 className="flex  text-2xl text-white font-semibold ">Outros</h3>
                 </div>
                  <p className="mt-2 items-center p-2 text-3xl text-white">{formatarValor(totalOutros)} </p>
                </div>
          </div>
          <div className="xl:grid grid-cols-6 gap-5 mt-5 w-full h-full">
              <div className = "col-span-4 bg-[#161B29] border rounded-2xl  border-cyan-400 h-[40rem] p-6 overflow-y-scroll" >
                <table className="min-w-full  ">
                  <thead>
                    <tr className="grid grid-cols-5 border-b-2 text-white p-2" >
                      <th className="text-2xl">Nome</th>
                      <th className="text-2xl">Tipo</th>
                      <th className="text-2xl" >Data </th>
                      <th className="text-2xl" >Valor</th>
                      <th className="text-2xl" ></th>
                    </tr>
                  </thead>

                  <tbody className="min-w-full ">
                    {investimentos.map((item:InvestimentoDTO) =>{
                        return(
                          <tr  key={item.id} className="grid grid-cols-5 border-x-2 border-b-2 text-white p-2 text-center">
                          <td className="truncate">{item.nome}</td>
                          <td  className="truncate">{item.tipo}</td>
                          <td className="truncate">{formatarData(item.data_investimento)}</td>
                          <td className="truncate">{formatarValor(Number(item.valor_investido))}</td>
                          <td className=" flex text-2xl gap-2 justify-center truncate">
                            <MdEdit  className="text-cyan-400 cursor-pointer "  onClick={() => {setMostrarModal(true); setInvestimentoSelecionado(item)} } />
                            <MdOutlineDelete className="text-red-500 cursor-pointer "  onClick={() => deletar(item.id)}/>

                          </td>
                        </tr>
                        )
                    })}
                      

                  </tbody>
                </table>


              </div>
              <div className = "col-span-2 bg-[#161B29] border rounded-2xl  border-cyan-400 h-[40rem] p-6">
                        <GraficoPizzaInvestimento investimentos ={ investimentos} />
              </div>


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
