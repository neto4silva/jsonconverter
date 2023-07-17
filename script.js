let generatedJSONData = null;

function generateJSON() {
  const jsonDataText = document.getElementById('jsonData').value;
  const jsonDataLines = jsonDataText.trim().split('\n');

  const jsonData = {
    "Session data": jsonDataLines[0].substring("Session data: ".length),
    "Session": jsonDataLines[1].substring("Session: ".length),
    "Loot Type": jsonDataLines[2].substring("Loot Type: ".length),
    "Loot": jsonDataLines[3].substring("Loot: ".length),
    "Supplies": jsonDataLines[4].substring("Supplies: ".length),
    "Balance": jsonDataLines[5].substring("Balance: ".length),
    "Players": []
  };

  let currentPlayer;
  for (let i = 6; i < jsonDataLines.length; i++) {
    const line = jsonDataLines[i].trim();
    if (line !== "") {
      if (line.includes(":")) {
        // É uma informação de jogador (ex: "Loot: 25,183")
        const [key, value] = line.split(": ");
        currentPlayer[key] = value;
      } else {
        // É o nome do jogador
        if (currentPlayer) {
          jsonData.Players.push(currentPlayer);
        }
        currentPlayer = { "Name": line };
      }
    }
  }

  // Adicionar o último jogador (caso haja informações para ele) à lista de jogadores
  if (currentPlayer) {
    jsonData.Players.push(currentPlayer);
  }

  const jsonResult = JSON.stringify(jsonData, null, 2);
  document.getElementById('jsonResult').innerText = jsonResult;

  // Ativar o botão de exportação quando o JSON for gerado
  document.getElementById('exportButton').disabled = false;

  // Armazenar o JSON gerado para exportação posterior
  generatedJSONData = jsonData;
}

function exportJSON() {
  if (!generatedJSONData) {
    return;
  }

  const jsonDataText = JSON.stringify(generatedJSONData, null, 2);
  const jsonDataBlob = new Blob([jsonDataText], { type: 'application/json' });

  // Criação de um elemento <a> para fazer o download do JSON gerado
  const downloadLink = document.createElement('a');
  downloadLink.href = URL.createObjectURL(jsonDataBlob);

  // Definir o nome do arquivo com a data atual
  const currentDate = new Date().toISOString().slice(0, 10);
  downloadLink.download = `session-data${currentDate}.json`;

  downloadLink.click();
}
