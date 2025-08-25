type CriarPagamentoInput = {
  valorCentavos: number;
  descricao: string;
  email: string;
  cpf: string;
};

export async function criarPagamento({ valorCentavos, descricao, email, cpf }: CriarPagamentoInput) {
  const baseUrl = process.env.INFINITYPAY_BASE_URL || "https://api.sandbox.infinitypay.com.br";
  const token = process.env.INFINITYPAY_TOKEN;
  if (!token) throw new Error("Defina INFINITYPAY_TOKEN no .env");

  // OBS: Ajuste o payload e campos conforme a documentação oficial da InfinityPay.
  const res = await fetch(`${baseUrl}/v1/payments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({
      amount: valorCentavos,
      currency: "BRL",
      description: descricao,
      customer: { email, document: cpf },
      // callback_url: process.env.NEXT_PUBLIC_SITE_URL + "/api/pagamentos/webhook"
    })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`InfinityPay erro: ${res.status} - ${text}`);
  }
  const json = await res.json();
  return {
    raw: json,
    id: json.id || json.transactionId || json.paymentId || null,
    link: json.link || json.checkout_url || json.redirect_url || null,
    status: json.status || "created"
  };
}

export async function obterPagamento(transactionId: string) {
  const baseUrl = process.env.INFINITYPAY_BASE_URL || "https://api.sandbox.infinitypay.com.br";
  const token = process.env.INFINITYPAY_TOKEN;
  if (!token) throw new Error("Defina INFINITYPAY_TOKEN no .env");

  const res = await fetch(`${baseUrl}/v1/payments/${transactionId}`, {
    method: "GET",
    headers: { "Authorization": `Bearer ${token}` }
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`InfinityPay status erro: ${res.status} - ${text}`);
  }
  const json = await res.json();
  return { raw: json, status: json.status || "unknown" };
}
