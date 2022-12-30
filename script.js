// Nome da função "enviar script"
async function enviarScript(scriptText){
  
  // Mapear as linhas do texto inserido pelo usuário
	const lines = scriptText.split(/[\n\t]+/).map(line => line.trim()).filter(line => line);
  
  // Variável que seleciona o chat do whatsapp web
	main = document.querySelector("#main"),
    
  // Variável que seleciona a área onde escreve as mensagens
	textarea = main.querySelector(`div[contenteditable="true"]`)
	
  // Validação para saber se existe a área onde escreve as mensagens
	if(!textarea) throw new Error("Não há uma conversa aberta")
	
  // Faz um loop para cada linha que o usuário inserir para enviar uma linha por vez
	for(const line of lines){
    // Mostra no console qual a linha atual do loop
		console.log(line)
	
    // Seleciona a área onde escreve as mensagens
		textarea.focus();
    
    // Insere a mensagem na área
		document.execCommand('insertText', false, line);
    
    // Muda o estado da área para poder habilitar o botão de enviar
		textarea.dispatchEvent(new Event('change', {bubbles: true}));
	
    // Uma pequena espera antes de clicar no botão de enviar mensagem
		setTimeout(() => {
			(main.querySelector(`[data-testid="send"]`) || main.querySelector(`[data-icon="send"]`)).click();
		}, 100);
		
    // Se não estiver no fim da mensagem, faz o loop novamente
		if(lines.indexOf(line) !== lines.length - 1) await new Promise(resolve => setTimeout(resolve, 250));
	}
	
	return lines.length;
}

enviarScript(`


seu texto aqui


`).then(e => console.log(`Código finalizado, ${e} mensagens enviadas`)).catch(console.error)
