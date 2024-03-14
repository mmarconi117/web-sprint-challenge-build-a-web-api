const express = require('express');
const router = express.Router();
const Projects = require('../projects/projects-model');
const projectMiddleware = require('../projects/projects-middleware');
const Actions = require('../actions/actions-model');
const actionMiddleware = require('../actions/actions-middlware');
const db = require('../../data/dbConfig');









// GET /api/projects
router.get('/', async (req, res) => {
    try {
        const projects = await Projects.get();
        res.status(200).json(projects);
    } catch(err){
        res.status(404).json({message: 'Error retrieving projects.'});
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const project = await Projects.get(id);
      if (!project) {
        res.status(404).json({ message: 'Project not found' });
      } else {
        res.status(200).json(project);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving project' });
    }
  });

  router.post("/", async (req, res) => {
    const projectData = req.body;
    if (!projectData.name || !projectData.description) {
      res.status(400).json({ message: "Please provide a name and description for the project" });
      return;
    }
    try {
      const project = await Projects.insert(projectData);
      res.status(201).json(project);
    } catch (error) {
        res.status(400).json({ message: "Error adding project" });
    }

  })

  router.put('/:id',  projectMiddleware.validateProjectUpdate, (req, res, next) => {
   Projects.update(req.params.id, req.body)
   .then(updated => {
    res.status(200).json(updated)
   })
   .catch(error => {
    next({
        message: "You ran into an error updating the project"
    })
   });
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const project = await Projects.remove(id);
      if (!project) {
        res.status(404).json({ message: 'Project not found' });
      } else {
        res.status(200).json(project);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting project' });
    }
  })


  router.get('/:id/actions', async (req, res) => {
    const { id } = req.params;

    try {
        // Check if the project with the given ID exists
        const projectExists = await Projects.get(id);

        if (!projectExists) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Fetch actions associated with the specified project ID
        const actions = await db('actions').where({ project_id: id });

        // Convert completed values to booleans
        const actionsWithBooleans = actions.map(action => ({
            ...action,
            completed: !!action.completed // Convert to boolean
        }));

        res.status(200).json(actionsWithBooleans);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving actions for the project' });
    }
});












module.exports = router;
