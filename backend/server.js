const express  = require('express');
const cors     = require('cors');
const mongoose = require('mongoose');
const path     = require('path');
require('dotenv').config();

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// ── MongoDB Connection ────────────────────────────────────
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('DB error:', err));

// ── Schemas ───────────────────────────────────────────────
const projectSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  techStack:   [String],
  githubUrl:   String,
  tag:         String,
  createdAt:   { type: Date, default: Date.now }
});

const contactSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  email:     { type: String, required: true },
  message:   { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Project = mongoose.model('Project', projectSchema);
const Contact = mongoose.model('Contact', contactSchema);

// ── Seed sample projects on first run ─────────────────────
async function seedProjects() {
  const count = await Project.countDocuments();
  if (count > 0) return;
  await Project.insertMany([
    {
      title: 'Prescripto',
      description: 'A responsive doctor appointment booking web app with user auth, doctor browsing, booking/cancellation, and payment status handling.',
      techStack: ['React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB'],
      githubUrl: 'https://github.com',
      tag: 'Featured Project'
    },
    {
      title: 'Employee Management System',
      description: 'Manage employee records with add, view, update, delete functionality through a user-friendly interface.',
      techStack: ['HTML', 'CSS', 'JavaScript'],
      githubUrl: 'https://github.com',
      tag: 'Personal Project'
    },
    {
      title: 'Task Management System',
      description: 'Internship project at CAD DESK — task manager with add, update, delete features.',
      techStack: ['HTML', 'CSS', 'JavaScript'],
      githubUrl: 'https://github.com',
      tag: 'Internship Project'
    }
  ]);
  console.log('Sample projects seeded');
}
seedProjects();

// ── Routes ────────────────────────────────────────────────

// GET all projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET single project
app.get('/api/projects/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST new project
app.post('/api/projects', async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST contact message
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message)
      return res.status(400).json({ error: 'All fields required' });
    const contact = new Contact({ name, email, message });
    await contact.save();
    res.status(201).json({ success: true, message: 'Message saved!' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET all contact messages (admin)
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ── Start Server ──────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
