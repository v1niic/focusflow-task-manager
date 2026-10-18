
import { useState } from "react";
import "./index.css";

function App() {
  const [tarefas, setTarefas] = useState([
    { id: 1, titulo: "Estudar JavaScript", concluida: false },
    { id: 2, titulo: "Aprender React", concluida: false },
    { id: 3, titulo: "Criar meu primeiro projeto", concluida: true },
  ]);

  function alternarTarefa(id) {
    setTarefas((lista) =>
      lista.map((tarefa) =>
        tarefa.id === id
          ? { ...tarefa, concluida: !tarefa.concluida }
          : tarefa
      )
    );
  }

  return (
    <main className="container">
      <header>
        <p className="subtitulo">ORGANIZAÇÃO PESSOAL</p>
        <h1>FocusFlow</h1>
        <p>Organize suas tarefas. Acompanhe seu progresso.</p>
      </header>

      <section className="painel">
        <h2>Minhas tarefas</h2>

        {tarefas.map((tarefa) => (
          <label className="tarefa" key={tarefa.id}>
            <input
              type="checkbox"
              checked={tarefa.concluida}
              onChange={() => alternarTarefa(tarefa.id)}
            />
            <span className={tarefa.concluida ? "concluida" : ""}>
              {tarefa.titulo}
            </span>
          </label>
        ))}

        <p className="progresso">
          {tarefas.filter((t) => t.concluida).length} de{" "}
          {tarefas.length} tarefas concluídas
        </p>
      </section>
    </main>
  );
}

export default App;
