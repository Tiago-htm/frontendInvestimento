"use client";

import React, { useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement, //responsavel pelo desenho do grafico
  Tooltip, // responsavel por mostrar as informações ao passar o mouse no grafico
  Legend, //legenda
  type ChartOptions, //define as formas das opções
  type ChartData, // define a formas do label e datasets
  type TooltipItem,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);


interface InvestimentoDTO{
  id: number,
  nome: string,
  tipo: 'Ação' | 'CDB' | 'Tesouro Direto' | 'Outros' | 'Fundo de Renda Fixa' | 'Fundo Imobiliário',
  valor_investido: string,
  data_investimento: string,
}

interface GraficoPizzaInvestimentoProps {
  investimentos: InvestimentoDTO[];
 
}

const GraficoPizzaInvestimento: React.FC<GraficoPizzaInvestimentoProps> = ({ investimentos = [] }) => {

  const chartData: ChartData<'doughnut'> = useMemo(() => {
    
  
    // conta quantas vezes um determinado tipo de investimento aparece 
    const contagemPorTipo: { [key: string]: number } = investimentos.reduce((acc, current) => {
      const tipo = current.tipo || 'Não categorizado';
      // Incrementa caso o tipo exista mais de uma vez
      acc[tipo] = (acc[tipo] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    const labels = Object.keys(contagemPorTipo);
    const data = Object.values(contagemPorTipo);

    return {
      labels: labels,
      datasets: [
        {

          label: 'Quantidade',
          data: data,
          backgroundColor: [ 
            'rgba(0, 224, 255, 0.7)',  // Ciano
            'rgba(138, 43, 226, 0.7)', // Roxo
            'rgba(34, 197, 94, 0.7)',   // Verde
            'rgba(255, 107, 1, 0.7)',   // Laranja
            'rgba(236, 72, 153, 0.7)',  // Rosa
          ],
          borderColor: '#161B29', 
          borderWidth: 4,
          hoverOffset: 8,
        },
      ],
    };
  }, [investimentos]);

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#94A3B8',
          padding: 20,
          font: {
            size: 14,
          }
        },
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<'doughnut'>) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = (context.chart.data.datasets[0].data as number[]).reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            
            // Exibe "2 ativos" em vez de "2,00 ativos"
            const quantidadeLabel = value === 1 ? '1 ativo' : `${value} ativos`;

            return `${label}: ${quantidadeLabel} (${percentage}%)`;
          },
        },
      },
    },
  };



  return (
    <div>
      <h3 className="text-base font-medium text-gray-400 mb-4">
        Distribuição por Ativos
      </h3>
      <div style={{ height: '300px' }}>
        {investimentos.length > 0 ? (
          <Doughnut data={chartData} options={options} />
        ) : (
          <div className="flex justify-center items-center h-full text-gray-500">
            Sem dados para exibir
          </div>
        )}
      </div>
    </div>
  );
};

export default GraficoPizzaInvestimento;
