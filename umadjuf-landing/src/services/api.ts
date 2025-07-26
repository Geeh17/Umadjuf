export const enviarContato = async (dados: any) => {
  const response = await fetch('/api/contato', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });

  if (!response.ok) {
    throw new Error('Erro ao enviar formulário');
  }

  return response.json();
}
