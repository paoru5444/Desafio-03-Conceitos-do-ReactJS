import React, { useEffect } from "react";

import "./styles.css";

import api from './services/api'
import { useState } from "react";

function App() {
  const [repositories, setRepositories] = useState([])

  async function handleGetRepositories() {
    const { data } = await api.get('repositories')

    setRepositories(data)
  }

  useEffect(() => {
    handleGetRepositories()
  }, [])

  async function handleAddRepository() {
    // TODO
    const { data } = await api.post('repositories', {
      title: `Novo repositório ${Date.now()}`,
      url: 'https://github.com/paoru5444/desafio-node-02',
      techs: ['Node.js', 'ReactJS']
    })

    setRepositories([...repositories, data])
    console.log(repositories)
  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete('repositories/' + id)
    setRepositories(repositories.filter(repository => repository.id !== id))
    console.log(id)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(({id, title}) => (
          <li key={id}>
            {title}

            <button onClick={() => handleRemoveRepository(id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
