export function formatDataBR(data: string | Date) {
  return new Date(data).toLocaleDateString('pt-BR');
}
