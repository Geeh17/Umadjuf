import Image from "next/image";
import aviva from "/public/aviva.webp";
import acamp from "/public/acamp.webp";
import Link from "next/link";

export default function EventosPage() {
  return (
    <main className="min-h-screen bg-[#fff4e5] text-center pt-28 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-[#d1683a] mb-10">
        Eventos da UMADJUF
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {/* AVIVA */}
        <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center max-w-sm mx-auto">
          <Image
            src={aviva}
            alt="AVIVA 2025"
            width={400}
            height={500}
            className="rounded mb-4 w-full max-w-[280px] h-auto object-cover"
            priority
          />
          <h2 className="text-xl font-semibold text-[#e67f42] mb-2">
            AVIVA UMADJUF 2025
          </h2>
          <p className="text-gray-700 mb-4 text-sm sm:text-base">
            Dia 29 de novembro. Culto especial de avivamento. Venha participar!
          </p>
          <Link
            href="/inscricao/aviva-2025"
            className="inline-block bg-[#e67f42] text-white px-4 py-2 rounded hover:bg-[#d1683a] transition"
          >
            Inscrever-se
          </Link>
        </div>

        {/* ACAMP */}
        <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center max-w-sm mx-auto">
          <Image
            src={acamp}
            alt="ACAMP 2026"
            width={400}
            height={500}
            className="rounded mb-4 w-full max-w-[280px] h-auto object-cover"
            priority
          />
          <h2 className="text-xl font-semibold text-[#e67f42] mb-2">
            ACAMP UMADJUF 2026
          </h2>
          <p className="text-gray-700 mb-4 text-sm sm:text-base">
            De 14 a 17 de fevereiro na Fazenda Manain (Goianá). Garanta sua
            vaga!
          </p>
          <Link
            href="/inscricao/acamp-2026"
            className="inline-block bg-[#e67f42] text-white px-4 py-2 rounded hover:bg-[#d1683a] transition"
          >
            Inscrever-se
          </Link>
        </div>
      </div>
    </main>
  );
}
