const express = require('express')

const server = express();

server.use(express.json()) 

const projects = [];

//Listar todos os projetos
server.get('/projects', (req, res) => {
  return res.json(projects)
})

// Criar um novo projeto
server.post('/projects', (req, res) => {
  const {id,title,tasks} = req.body
  projects.push({id,title,tasks})

  return res.json(projects)
})

//Atualizar um título de um projeto
server.put('/projects/:id',  (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projects.map(project => {
    if(project.id == id)
      project.title = title
  })

  return res.json(projects);
});

// Criar uma task em um determinado projeto
server.post('/projects/:id/tasks', (req, res) => {
  const { id } = req.params;
  const { tasks } = req.body;

  projects.map(project => {
    if(project.id == id)
      project.tasks.push(tasks)
  })

  return res.json(projects)
})

//Deletar determinado projeto
server.delete('/projects/:id', (req, res) => {
  const { id } = req.params;
  const index = projects.findIndex(project => project.id === id)
  if(index != -1)
  projects.splice(index, 1)
  return res.send(projects);
});

server.listen(3000);