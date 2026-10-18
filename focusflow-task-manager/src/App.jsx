
import { useState } from "react";
import "./index.css";

const tarefasIniciais = [
  { id: 1, titulo: "Estudar JavaScript", concluida: false },
  { id: 2, titulo: "Aprender React", concluida: false },
  { id: 3, titulo: "Criar meu primeiro projeto", concluida: true },
];

function App() {
  
  const [tarefas, setTarefas] = useState(tarefasIniciais);
  const [novaTarefa, setNovaTarefa] = useState("");
  const [filtro, setFiltro] = useState("todas");

  const [editandoId, setEditandoId] = useState(null);
const [tituloEditado, setTituloEditado] = useState("");

  const concluidas = tarefas.filter((t) => t.concluida).length;
  const pendentes = tarefas.length - concluidas;
  const progresso = tarefas.length
    ? Math.round((concluidas / tarefas.length) * 100)
    : 0;

  const tarefasFiltradas = tarefas.filter((tarefa) => {
    if (filtro === "pendentes") return !tarefa.concluida;
    if (filtro === "concluidas") return tarefa.concluida;
    return true;
    
    
  });

  function adicionarTarefa(event) {
    event.preventDefault();

    const titulo = novaTarefa.trim();
    if (!titulo) return;

    setTarefas((lista) => [
      ...lista,
      {
        id: crypto.randomUUID(),
        titulo,
        concluida: false,
      },
    ]);

    setNovaTarefa("");
    setFiltro("todas");
  }

  function alternarTarefa(id) {
    setTarefas((lista) =>
      lista.map((tarefa) =>
        tarefa.id === id
          ? { ...tarefa, concluida: !tarefa.concluida }
          : tarefa
      )
    );
  }

  function iniciarEdicao(tarefa) {
  setEditandoId(tarefa.id);
  setTituloEditado(tarefa.titulo);
}

function salvarEdicao(event) {
  event.preventDefault();

  const titulo = tituloEditado.trim();

  if (!titulo) return;

  setTarefas((lista) =>
    lista.map((tarefa) =>
      tarefa.id === editandoId
        ? { ...tarefa, titulo }
        : tarefa
    )
  );

  setEditandoId(null);
  setTituloEditado("");
}

function cancelarEdicao() {
  setEditandoId(null);
  setTituloEditado("");
}

function excluirTarefa(id) {
  const confirmar = window.confirm(
    "Tem certeza de que deseja excluir esta tarefa?"
  );

  if (!confirmar) return;

  setTarefas((lista) =>
    lista.filter((tarefa) => tarefa.id !== id)
  );

  if (editandoId === id) {
    cancelarEdicao();
  }
}

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <a className="brand" href="#inicio">
          <span className="brand-icon">F</span>
          <span>Focus<span className="brand-light">Flow</span></span>
        </a>

        <p className="menu-label">MENU PRINCIPAL</p>

        <nav className="navigation" aria-label="Filtros de tarefas">
          <button
            className={filtro === "todas" ? "nav-item active" : "nav-item"}
            onClick={() => setFiltro("todas")}
          >
            <span>▦</span> Todas as tarefas
            <span className="nav-count">{tarefas.length}</span>
          </button>

          <button
            className={filtro === "pendentes" ? "nav-item active" : "nav-item"}
            onClick={() => setFiltro("pendentes")}
          >
            <span>◷</span> Pendentes
          </button>

          <button
            className={filtro === "concluidas" ? "nav-item active" : "nav-item"}
            onClick={() => setFiltro("concluidas")}
          >
            <span>✓</span> Concluídas
          </button>
        </nav>

        <div className="sidebar-bottom">
          <div className="mini-progress">
            <div className="mini-progress-icon">✦</div>
            <strong>Continue avançando!</strong>
            <p>Pequenos passos geram grandes resultados.</p>
            <div className="progress-track">
              <div style={{ width: `${progresso}%` }} />
            </div>
            <span>{progresso}% concluído</span>
          </div>

          <p className="sidebar-footer">FOCUSFLOW · VERSÃO 1.0</p>
        </div>
      </aside>

      <main className="main-content" id="inicio">
        <header className="topbar">
          <span className="breadcrumb">Meu espaço / Tarefas</span>
          <span className="status-label">
            <span className="status-dot" />
            Seu espaço de produtividade
          </span>
        </header>

        <section className="welcome">
          <div>
            <p className="eyebrow">UM PASSO DE CADA VEZ</p>
            <h1>Organize seu dia<span>.</span></h1>
            <p className="welcome-description">
              Transforme seus planos em pequenas conquistas.
            </p>
          </div>
          <div className="welcome-decoration" aria-hidden="true">✳</div>
        </section>

        <section className="stats-grid" aria-label="Resumo das tarefas">
          <article className="stat-card">
            <div className="stat-top">
              <span>Total de tarefas</span>
              <span className="stat-icon purple">▦</span>
            </div>
            <strong className="stat-number">{tarefas.length}</strong>
            <span className="stat-caption">Tarefas no seu espaço</span>
          </article>

          <article className="stat-card">
            <div className="stat-top">
              <span>Pendentes</span>
              <span className="stat-icon orange">◷</span>
            </div>
            <strong className="stat-number">{pendentes}</strong>
            <span className="stat-caption">Prontas para começar</span>
          </article>

          <article className="stat-card">
            <div className="stat-top">
              <span>Concluídas</span>
              <span className="stat-icon green">✓</span>
            </div>
            <strong className="stat-number">{concluidas}</strong>
            <span className="stat-caption">{progresso}% do total realizado</span>
          </article>
        </section>

        <section className="task-panel">
          <div className="panel-heading">
            <div>
              <h2>Minhas tarefas</h2>
              <p>Priorize o que importa hoje.</p>
            </div>
            <span className="task-counter">{tarefasFiltradas.length} itens</span>
          </div>

          <form className="task-form" onSubmit={adicionarTarefa}>
            <span className="input-icon" aria-hidden="true">＋</span>
            <input
              type="text"
              placeholder="O que você precisa fazer?"
              value={novaTarefa}
              onChange={(event) => setNovaTarefa(event.target.value)}
              aria-label="Nome da nova tarefa"
              maxLength={120}
            />
            <button type="submit">Adicionar tarefa <span>＋</span></button>
          </form>

          <div className="list-heading">
            <span>LISTA DE ATIVIDADES</span>
            <span>{concluidas} de {tarefas.length} concluídas</span>
          </div>

          <div className="task-list">
            {tarefasFiltradas.map((tarefa) => {
              const editando = editandoId === tarefa.id;

              return (
                <div className="task-row" key={tarefa.id}>
                  <label className="task-row-main">
                    <input
                      className="task-checkbox"
                      type="checkbox"
                      checked={tarefa.concluida}
                      onChange={() => alternarTarefa(tarefa.id)}
                    />

                    <span className="custom-check" aria-hidden="true">
                      {tarefa.concluida ? "✓" : ""}
                    </span>

                    <span
                      className={
                        tarefa.concluida
                          ? "task-title completed"
                          : "task-title"
                      }
                    >
                      {tarefa.titulo}
                    </span>

                    <span
                      className={
                        tarefa.concluida
                          ? "task-status done"
                          : "task-status pending"
                      }
                    >
                      {tarefa.concluida ? "Concluída" : "Pendente"}
                    </span>
                  </label>

                  {editando ? (
                    <form className="task-edit-form" onSubmit={salvarEdicao}>
                      <input
                        type="text"
                        value={tituloEditado}
                        onChange={(event) => setTituloEditado(event.target.value)}
                        aria-label="Editar nome da tarefa"
                        maxLength={120}
                      />
                      <button type="submit">Salvar</button>
                      <button type="button" onClick={cancelarEdicao}>
                        Cancelar
                      </button>
                    </form>
                  ) : (
                    <div className="task-actions">
                      <button
                        type="button"
                        className="task-action edit"
                        onClick={() => iniciarEdicao(tarefa)}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        className="task-action delete"
                        onClick={() => excluirTarefa(tarefa.id)}
                      >
                        Excluir
                      </button>
                    </div>
                  )}
                </div>
              );
            })}

            {tarefasFiltradas.length === 0 && (
              <div className="empty-state">
                <span>✧</span>
                <strong>Nenhuma tarefa por aqui</strong>
                <p>
                  {filtro === "concluidas"
                    ? "Suas tarefas concluídas aparecerão aqui."
                    : "Adicione uma nova tarefa para começar."}
                </p>
              </div>
            )}
          </div>

          <div className="panel-footer">
            <span>Seu progresso é feito de cada pequena conquista.</span>
            <span className="footer-sparkle">✦</span>
          </div>
        </section>

        <footer className="page-footer">
          Feito para manter o foco. <span>FocusFlow ©</span>
        </footer>
      </main>
    </div>
  );
}

export default App;
