"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FolderOpen, File, Plus, Download, Trash } from "lucide-react";

export default function MateriaisPage() {
  const [files, setFiles] = useState([
    { id: "1", name: "Formulário_Física_Termodinâmica.pdf", size: "1.2 MB", date: "24/05/2026", type: "pdf" },
    { id: "2", name: "Resumo_Biologia_Genética.docx", size: "450 KB", date: "20/05/2026", type: "document" },
    { id: "3", name: "Exercícios_Cálculo_Matemática.xlsx", size: "850 KB", date: "15/05/2026", type: "sheet" },
  ]);

  const handleDelete = (id: string) => {
    setFiles(files.filter((f) => f.id !== id));
  };

  const handleUpload = () => {
    const newFile = {
      id: Math.random().toString(),
      name: "Novo_Documento_Estudos.pdf",
      size: "650 KB",
      date: new Date().toLocaleDateString("pt-BR"),
      type: "pdf",
    };
    setFiles([newFile, ...files]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-gray-900">Meus Materiais</h1>
          <p className="text-sm text-gray-500">
            Gerencie e armazene seus arquivos acadêmicos na nuvem de forma privada.
          </p>
        </div>

        <button
          onClick={handleUpload}
          className="btn btn-primary text-sm flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Adicionar Arquivo
        </button>
      </div>

      <div className="card p-6 space-y-4">
        <h2 className="text-base font-bold text-gray-900 font-serif border-b border-gray-100 pb-3 flex items-center gap-2">
          <FolderOpen className="w-5 h-5 text-navy" />
          Arquivos Enviados
        </h2>

        {files.length === 0 ? (
          <div className="text-center py-12 text-sm text-gray-400">
            Você ainda não enviou nenhum arquivo.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-150 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  <th className="pb-3 font-semibold">Nome</th>
                  <th className="pb-3 font-semibold">Tamanho</th>
                  <th className="pb-3 font-semibold">Data de Envio</th>
                  <th className="pb-3 font-semibold text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {files.map((file) => (
                  <tr key={file.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3.5 flex items-center gap-3">
                      <div className="p-2 bg-navy/5 text-navy rounded-lg">
                        <File className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-gray-800">{file.name}</span>
                    </td>
                    <td className="py-3.5 text-gray-500 font-medium">{file.size}</td>
                    <td className="py-3.5 text-gray-500 font-medium">{file.date}</td>
                    <td className="py-3.5 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          title="Fazer download"
                          className="p-1.5 text-gray-400 hover:text-navy hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                        >
                          <Download className="w-4.5 h-4.5" />
                        </button>
                        <button
                          title="Excluir arquivo"
                          onClick={() => handleDelete(file.id)}
                          className="p-1.5 text-gray-400 hover:text-error hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash className="w-4.5 h-4.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </motion.div>
  );
}
