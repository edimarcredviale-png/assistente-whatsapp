// API REST do Bot WhatsApp
// Exemplos de como chamar a API do seu bot

const BASE_URL = 'http://localhost:3000';

// ============================================
// 1. VERIFICAR STATUS DO BOT
// ============================================

fetch(`${BASE_URL}/api/status`)
  .then(res => res.json())
  .then(data => console.log(data));

// Resposta:
// {
//   "status": "online",
//   "message": "Bot está rodando"
// }

// ============================================
// 2. OBTER DESPESAS DO MÊS
// ============================================

fetch(`${BASE_URL}/api/expenses/month`)
  .then(res => res.json())
  .then(data => {
    console.log(`Total deste mês: R$ ${data.total}`);
    console.log(`Número de registros: ${data.count}`);
    console.log('Despesas:', data.expenses);
  });

// Resposta:
// {
//   "total": "1250.50",
//   "count": 8,
//   "expenses": [
//     {
//       "id": 1,
//       "description": "Gastei 85 em almoço no Café Real",
//       "amount": 85,
//       "category": "Alimentação",
//       "date": "2025-06-01",
//       "created_at": "2025-06-01T12:30:00"
//     },
//     ...
//   ]
// }

// ============================================
// 3. OBTER DESPESAS POR CATEGORIA
// ============================================

// Combustível
fetch(`${BASE_URL}/api/expenses/category/Combustível`)
  .then(res => res.json())
  .then(data => {
    console.log(`Gasto em combustível: R$ ${data.total}`);
    console.log(`${data.count} registros`);
  });

// Alimentação
fetch(`${BASE_URL}/api/expenses/category/Alimentação`)
  .then(res => res.json())
  .then(data => {
    console.log(`Gasto em alimentação: R$ ${data.total}`);
  });

// Resposta:
// {
//   "category": "Combustível",
//   "total": "350.00",
//   "count": 5,
//   "expenses": [...]
// }

// ============================================
// 4. EXEMPLO COM ASYNC/AWAIT (Mais Legível)
// ============================================

async function getFinancialSummary() {
  try {
    // Pegar despesas do mês
    const monthRes = await fetch(`${BASE_URL}/api/expenses/month`);
    const monthData = await monthRes.json();

    // Pegar combustível
    const fuelRes = await fetch(`${BASE_URL}/api/expenses/category/Combustível`);
    const fuelData = await fuelRes.json();

    // Pegar alimentação
    const foodRes = await fetch(`${BASE_URL}/api/expenses/category/Alimentação`);
    const foodData = await foodRes.json();

    // Construir relatório
    const report = `
📊 RESUMO FINANCEIRO
━━━━━━━━━━━━━━━━━━━━━━━━
💰 Total do Mês: R$ ${monthData.total}
   (${monthData.count} registros)

🚗 Combustível: R$ ${fuelData.total}
   (${fuelData.count} abastecimentos)

🍽️  Alimentação: R$ ${foodData.total}
   (${foodData.count} refeições)

📈 Outros: R$ ${(monthData.total - fuelData.total - foodData.total).toFixed(2)}
    `;

    console.log(report);
    return report;

  } catch (error) {
    console.error('❌ Erro ao buscar dados:', error);
  }
}

// Chamar função
getFinancialSummary();

// ============================================
// 5. CRIAR DASHBOARD HTML SIMPLES
// ============================================

const createDashboard = async () => {
  const monthRes = await fetch(`${BASE_URL}/api/expenses/month`);
  const monthData = await monthRes.json();

  const html = `
    <div style="padding: 20px; font-family: Arial;">
      <h1>Assistente Pessoal</h1>
      
      <div style="background: #f0f0f0; padding: 20px; border-radius: 8px;">
        <h2>Gastos Este Mês</h2>
        <p style="font-size: 32px; color: #d32f2f; margin: 0;">
          R$ ${monthData.total}
        </p>
        <p style="color: #666; margin: 0;">
          ${monthData.count} transações registradas
        </p>
      </div>

      <h3>Últimas Despesas:</h3>
      <ul>
        ${monthData.expenses.map(exp => `
          <li>
            <strong>${exp.description}</strong>
            <br/>
            R$ ${exp.amount.toFixed(2)} - ${exp.category}
            <br/>
            <small>${exp.date}</small>
          </li>
        `).join('')}
      </ul>
    </div>
  `;

  document.body.innerHTML = html;
};

// ============================================
// 6. MONITORAR BOT EM TEMPO REAL
// ============================================

const monitorBot = setInterval(async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/status`);
    const data = await res.json();
    
    if (data.status === 'online') {
      console.log('✅ Bot está online');
    } else {
      console.log('⚠️  Bot está offline');
    }
  } catch (error) {
    console.log('❌ Bot não está respondendo');
  }
}, 30000); // Verificar a cada 30 segundos

// ============================================
// 7. EXEMPLO: GERAR RELATÓRIO JSON
// ============================================

async function generateReport() {
  const monthRes = await fetch(`${BASE_URL}/api/expenses/month`);
  const monthData = await monthRes.json();

  const fuelRes = await fetch(`${BASE_URL}/api/expenses/category/Combustível`);
  const fuelData = await fuelRes.json();

  const foodRes = await fetch(`${BASE_URL}/api/expenses/category/Alimentação`);
  const foodData = await foodRes.json();

  const report = {
    generated_at: new Date().toISOString(),
    summary: {
      total_month: monthData.total,
      transaction_count: monthData.count,
    },
    categories: {
      combustivel: {
        total: fuelData.total,
        count: fuelData.count,
        percentage: ((fuelData.total / monthData.total) * 100).toFixed(1)
      },
      alimentacao: {
        total: foodData.total,
        count: foodData.count,
        percentage: ((foodData.total / monthData.total) * 100).toFixed(1)
      }
    },
    transactions: monthData.expenses
  };

  // Salvar como arquivo JSON
  const dataStr = JSON.stringify(report, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `relatorio_${new Date().getFullYear()}-${new Date().getMonth() + 1}.json`;
  link.click();

  return report;
}

// ============================================
// 8. USAR COM AXIOS (Se tiver instalado)
// ============================================

// npm install axios

// const axios = require('axios');

async function getWithAxios() {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/expenses/month`);
    console.log('Total:', data.total);
  } catch (error) {
    console.error('Erro:', error.message);
  }
}

// ============================================
// DICAS ÚTEIS
// ============================================

// ✅ Usar em Node.js:
// node exemplo.js

// ✅ Usar em HTML:
// <script>fetch(...)...</script>

// ✅ Usar com cURL (terminal):
// curl http://localhost:3000/api/expenses/month

// ✅ Usar com Python:
// import requests
// response = requests.get('http://localhost:3000/api/expenses/month')
// print(response.json())

// ============================================
// TRATAMENTO DE ERROS
// ============================================

async function fetchWithErrorHandling(url) {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error('❌ Erro na requisição:', error.message);
    
    // Retornar dados padrão se falhar
    return {
      total: 'N/A',
      count: 0,
      expenses: [],
      error: error.message
    };
  }
}
