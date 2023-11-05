import './global.css'
import { Header } from './componentes/Header'
import styles from './App.module.css'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
import { ClipboardText, PlusCircle } from 'phosphor-react'
import { v4 as uuidv4 } from 'uuid';
import { ITarefa, Tarefa} from './componentes/Tarefa'

export function App() {  

  const [ tarefas, setTarefas ] = useState<ITarefa[]>([])
  const [ novaTarefaText, setNovaTarefaText ] = useState('')
  const [ ListaDeTarefasRealizadas, setListaDeTarefasRealizadas ] = useState(tarefas.filter(tarefa => (tarefa.isRealizada == true)))

  function handleCriarNovaTarefa(event: FormEvent) {
    event.preventDefault();
    
    const newListaDeTarefa = [
      {
        id: uuidv4(),
        descricao: novaTarefaText,
        isRealizada: false,
      }, ...tarefas
    ]

    setTarefas(newListaDeTarefa)

    setNovaTarefaText('');
  }

  function atualizarTarefa(tarefaParaAtualizar: ITarefa){
    const novasTarefas = tarefas.map(tarefa => 
      tarefa.id === tarefaParaAtualizar.id
      ? { ...tarefa, isRealizada: tarefaParaAtualizar.isRealizada } 
      : tarefa
    )

    setListaDeTarefasRealizadas(novasTarefas.filter(tarefa => (tarefa.isRealizada == true)))
    setTarefas(novasTarefas)
  }

  function deletarTarefa(tarefaToDelete: ITarefa) {
    const novasTarefas = tarefas.filter(tarefa => tarefa.id != tarefaToDelete.id)

    setListaDeTarefasRealizadas(novasTarefas.filter(tarefa => (tarefa.isRealizada == true)))
    setTarefas(novasTarefas)   
  }

  function handleNovaTarefaText(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('')
    setNovaTarefaText(event.target.value)
  }

  function handleTextNovaTarefaInvalido(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório')
  }

  function renderizarListaDeTarefas(tarefas: ITarefa[]){
    if (tarefas.length == 0) 
    {
      return (
        <div className={styles.tarefaListEmpty}>
          <ClipboardText size={56} />
          <strong>Você ainda não tem tarefas cadastradas</strong>
          <span>Crie tarefas e organize seus itens a fazer</span>
        </div>
      )
    } 
    else 
    {
        return(
          <div className={styles.tarefaListFilled}>
            {
              tarefas.map(tarefa => 
              {
                return (
                  <Tarefa 
                    key={tarefa.id} 
                    id={tarefa.id} 
                    descricao={tarefa.descricao} 
                    isRealizada={tarefa.isRealizada} 
                    onAtualizarTarefa={atualizarTarefa}
                    onDeletarTarefa={deletarTarefa}
                  />
                )
              })
            }
         </div>
        )        
    }  
  }

  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
      <form className={styles.newTodo} onSubmit={handleCriarNovaTarefa}>
          <textarea 
            name='comment'
            placeholder='Adicione uma nova tarefa'
            value={novaTarefaText}
            onChange={handleNovaTarefaText}
            onInvalid={handleTextNovaTarefaInvalido}
            required
          />
          <button>
            <span> Criar </span>
            <PlusCircle size={16}/>
          </button>
      </form>
        <div className={styles.tarefaListWrapper}>
          <div className={styles.tarefaHeader}>
            <div className={styles.createdTask}>
              <strong >Tarefas Criadas</strong> 
              <div className={styles.counter}>
                {tarefas.length}
              </div>
            </div>
            <div className={styles.completedTask}>
              <strong >Concluídas</strong>
              <div className={styles.counter}>
                {ListaDeTarefasRealizadas.length} de {tarefas.length}
              </div>
            </div>
          </div>
          {renderizarListaDeTarefas(tarefas)}
        </div>
      </div>
    </div>
  )
}

export default App