import { useState } from 'react';
import styles from './Tarefa.module.css';
import { Trash } from "phosphor-react";

export interface ITarefa {
  id: string;
  descricao: string;
  isRealizada: boolean;
}

interface ITarefaProps extends ITarefa {
  onAtualizarTarefa: (task: ITarefa) => void;
  onDeletarTarefa: (task:ITarefa) => void;
}

export function Tarefa({ id, descricao, isRealizada, onAtualizarTarefa, onDeletarTarefa }: ITarefaProps) 
{
  const [isMarcada, setIsMarcada] = useState(isRealizada)
  
  function handleChecarTarefa() 
  {
    setIsMarcada((isMarcada) => !isMarcada); 
   
    onAtualizarTarefa(
      {
        id,
        descricao,
        isRealizada: !isMarcada
      });
  }

  function handleDeletarTask() 
  {    
    onDeletarTarefa(
      {
        id,
        descricao,
        isRealizada
      });
  }

  return (
    <div className={styles.tarefa}>
      <input type="checkbox" checked={isMarcada} onChange={handleChecarTarefa}/>
      <p className={isMarcada ? styles.isChecked : styles.notChecked }>{descricao}</p>
      <button title='Deletar Tarefa' onClick={handleDeletarTask}><Trash size={14}/></button>
    </div>
  )
}