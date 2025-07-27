"use client";

import { useState } from "react";

type FormularioProps = {
  evento: string;
};

export default function FormInscricao({ evento }: FormularioProps) {
  const [formData, setFormData] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type } = e.target;
    setFormData({
      ...formData,
      [id]: type === "radio" ? e.target.value : value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    // aqui você irá chamar a API com fetch ou axios
  };

  return (
    <section className="py-10 px-4">
      <h1 className="text-2xl md:text-3xl font-bold text-[#d1683a] mb-8 text-center">
        Inscrição para <span className="text-[#c74d1f]">{evento}</span>
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div>
          <label htmlFor="nome" className="block mb-1 font-medium">
            Nome
          </label>
          <input
            id="nome"
            type="text"
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#e67f42]"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Gênero</label>
          <div className="flex gap-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="genero"
                value="M"
                defaultChecked
                onChange={handleChange}
                className="mr-2"
              />{" "}
              Masculino
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="genero"
                value="F"
                onChange={handleChange}
                className="mr-2"
              />{" "}
              Feminino
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label htmlFor="telefone" className="block mb-1 font-medium">
            Telefone
          </label>
          <input
            id="telefone"
            type="tel"
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label htmlFor="dataNascimento" className="block mb-1 font-medium">
            Data de nascimento
          </label>
          <input
            id="dataNascimento"
            type="text"
            placeholder="DD/MM/AAAA"
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label
            htmlFor="telefoneResponsavel"
            className="block mb-1 font-medium"
          >
            Telefone do responsável
          </label>
          <input
            id="telefoneResponsavel"
            type="tel"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label htmlFor="nomeResponsavel" className="block mb-1 font-medium">
            Nome do responsável
          </label>
          <input
            id="nomeResponsavel"
            type="text"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label htmlFor="rua" className="block mb-1 font-medium">
            Rua
          </label>
          <input
            id="rua"
            type="text"
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label htmlFor="numero" className="block mb-1 font-medium">
            Número
          </label>
          <input
            id="numero"
            type="number"
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label htmlFor="complemento" className="block mb-1 font-medium">
            Complemento
          </label>
          <input
            id="complemento"
            type="text"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label htmlFor="bairro" className="block mb-1 font-medium">
            Bairro
          </label>
          <input
            id="bairro"
            type="text"
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label htmlFor="cidade" className="block mb-1 font-medium">
            Cidade
          </label>
          <input
            id="cidade"
            type="text"
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label htmlFor="estado" className="block mb-1 font-medium">
            UF (Ex. MG)
          </label>
          <input
            id="estado"
            type="text"
            maxLength={2}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label
            htmlFor="telefoneEmergencia"
            className="block mb-1 font-medium"
          >
            Telefone de emergência
          </label>
          <input
            id="telefoneEmergencia"
            type="tel"
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label htmlFor="lider" className="block mb-1 font-medium">
            Nome do líder
          </label>
          <input
            id="lider"
            type="text"
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label htmlFor="bairroCongregacao" className="block mb-1 font-medium">
            Bairro da congregação
          </label>
          <input
            id="bairroCongregacao"
            type="text"
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        {evento === "ACAMP UMADJUF 2026" && (
          <div className="md:col-span-2">
            <label htmlFor="cupom" className="block mb-1 font-medium">
              Cupom (opcional)
            </label>
            <input
              id="cupom"
              type="text"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        )}

        <button
          type="submit"
          className="col-span-1 md:col-span-2 bg-[#e67f42] hover:bg-[#d1683a] text-white py-3 px-6 rounded-md shadow-md font-semibold transition duration-200"
        >
          Finalizar Inscrição
        </button>
      </form>
    </section>
  );
}
