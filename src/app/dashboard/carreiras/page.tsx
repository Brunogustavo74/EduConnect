"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Compass, ArrowRight, CheckCircle2, RefreshCw } from "lucide-react";
import { carreiras } from "@/lib/mock-data";

export default function CarreirasPage() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);

  const questions = [
    {
      id: 1,
      question: "Qual atividade você mais gostaria de fazer em um projeto de ciências?",
      options: [
        { text: "Montar circuitos elétricos ou programar o robô", area: "Exatas" },
        { text: "Explicar o funcionamento das células ou fazer experimentos químicos", area: "Saúde" },
        { text: "Escrever o relatório descritivo ou desenhar os cartazes históricos", area: "Humanas" },
      ],
    },
    {
      id: 2,
      question: "Quando surge um problema difícil, o que você faz?",
      options: [
        { text: "Uso lógica, dados e fórmulas para encontrar a solução", area: "Exatas" },
        { text: "Tento entender como isso afeta o corpo humano ou a natureza", area: "Saúde" },
        { text: "Converso com pessoas e analiso o contexto social e histórico", area: "Humanas" },
      ],
    },
    {
      id: 3,
      question: "Que tipo de livro ou matéria você prefere ler no tempo livre?",
      options: [
        { text: "Novidades tecnológicas, quebra-cabeças lógicos ou astronomia", area: "Exatas" },
        { text: "Como funciona o cérebro, descobertas sobre cura de doenças ou meio ambiente", area: "Saúde" },
        { text: "Grandes guerras, teorias filosóficas, romances ou política", area: "Humanas" },
      ],
    },
  ];

  const handleAnswer = (area: string) => {
    const newAnswers = [...answers, area];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setAnswers([]);
    setCurrentQuestion(0);
    setQuizFinished(false);
    setQuizStarted(false);
  };

  const getDominantArea = () => {
    const counts = answers.reduce((acc, curr) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    let maxArea = "Humanas";
    let maxCount = 0;

    Object.entries(counts).forEach(([area, count]) => {
      if (count > maxCount) {
        maxCount = count;
        maxArea = area;
      }
    });

    return maxArea;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold font-serif text-gray-900">Orientação Profissional</h1>
        <p className="text-sm text-gray-500">
          Descubra áreas de carreira que combinam com seu perfil escolar e aptidões pessoais.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card p-6 lg:col-span-1 flex flex-col justify-between min-h-[350px] bg-gradient-to-br from-white via-white to-navy/5">
          {!quizStarted ? (
            <div className="space-y-4 my-auto">
              <div className="bg-navy/5 p-4 rounded-full text-navy w-fit">
                <Compass className="w-8 h-8" />
              </div>
              <h2 className="text-lg font-bold text-gray-900 font-serif">Teste Vocacional Rápido</h2>
              <p className="text-xs text-gray-500 leading-relaxed">
                Descubra qual a área de conhecimento é predominante em suas escolhas diárias e veja sugestões de trilhas de carreira.
              </p>
              <button onClick={() => setQuizStarted(true)} className="btn btn-primary w-full text-xs">
                Começar Teste
              </button>
            </div>
          ) : quizFinished ? (
            <div className="space-y-4 text-center my-auto flex flex-col items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-success" />
              <h2 className="text-base font-bold text-gray-900 font-serif">Seu Perfil Concluído!</h2>
              <p className="text-xs text-gray-500 leading-normal">
                Você tem maior afinidade com a área de:
              </p>
              <span className="text-sm font-bold bg-navy text-gold px-4 py-1.5 rounded-full uppercase tracking-wider">
                {getDominantArea()}
              </span>
              <button
                onClick={resetQuiz}
                className="btn btn-secondary text-xs flex items-center gap-1.5 mt-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Refazer Teste
              </button>
            </div>
          ) : (
            <div className="space-y-4 my-auto">
              <div className="flex justify-between items-center text-xs text-gray-400">
                <span>QUESTÃO {currentQuestion + 1} DE {questions.length}</span>
                <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
              </div>
              <h3 className="text-sm font-bold text-gray-900 font-serif">
                {questions[currentQuestion].question}
              </h3>
              <div className="space-y-2 pt-2">
                {questions[currentQuestion].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(option.area)}
                    className="w-full p-3 text-left text-xs bg-white hover:bg-navy/5 border border-gray-200 hover:border-navy rounded-lg transition-all text-gray-700 font-medium"
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-base font-bold text-gray-900 font-serif">Trilhas de Carreira Sugeridas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {carreiras.map((c) => (
              <div
                key={c.id}
                className="card p-5 flex flex-col justify-between h-44 hover:shadow-md transition-shadow"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{c.icone}</span>
                    <span className="text-[10px] uppercase font-bold text-navy-institutional bg-blue-50 px-2 py-0.5 rounded">
                      {c.area}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 font-serif">{c.nome}</h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                      {c.descricao}
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    {c.disciplinas.map((d) => (
                      <span
                        key={d}
                        className="text-[9px] font-bold bg-gray-100 rounded text-gray-600 px-1.5 py-0.5"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                  <button className="text-xs font-bold text-navy hover:text-navy-institutional flex items-center gap-1">
                    Ver Trilha
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
