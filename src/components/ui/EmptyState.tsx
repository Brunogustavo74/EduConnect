import { type ReactNode } from "react";
import { FileText, Calendar, Users, FolderOpen, Search, type LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
  compact?: boolean;
}

export default function EmptyState({
  icon: Icon = FileText,
  title,
  description,
  action,
  compact = false,
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center text-center ${compact ? "py-8" : "py-16"}`}>
      <div className={`${compact ? "w-12 h-12" : "w-16 h-16"} bg-gray-100 rounded-2xl flex items-center justify-center mb-4`}>
        <Icon className={`${compact ? "w-5 h-5" : "w-7 h-7"} text-gray-400`} />
      </div>
      <h3 className={`font-semibold text-gray-700 font-serif ${compact ? "text-sm" : "text-base"}`}>
        {title}
      </h3>
      {description && (
        <p className={`text-gray-400 mt-1 max-w-xs ${compact ? "text-xs" : "text-sm"}`}>
          {description}
        </p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function EmptyAgenda() {
  return (
    <EmptyState
      icon={Calendar}
      title="Nenhum compromisso"
      description="Sem atividades agendadas para este dia. Aproveite para revisar!"
    />
  );
}

export function EmptyMateriais() {
  return (
    <EmptyState
      icon={FolderOpen}
      title="Nenhum material encontrado"
      description="Não encontramos materiais com esses filtros. Tente outra busca."
    />
  );
}

export function EmptyMonitores() {
  return (
    <EmptyState
      icon={Users}
      title="Nenhum monitor disponível"
      description="No momento não há monitores disponíveis para esta disciplina."
    />
  );
}

export function EmptyBusca() {
  return (
    <EmptyState
      icon={Search}
      title="Nenhum resultado"
      description="Sua busca não retornou resultados. Tente termos diferentes."
    />
  );
}
