const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

// Create a new campaign template
exports.createTemplate = async (req, res) => {
  const { name, description, platform, post_type, tone, content_requirements, budget_range, industry, template_type, typical_timeline } = req.body;

  try {
    const newTemplate = await createTemplate({
      name,
      description,
      platform,
      post_type,
      tone,
      content_requirements,
      budget_range,
      industry,
      template_type,
      typical_timeline
    });

    res.status(201).json({
      message: 'Template created successfully',
      template: newTemplate
    });
  } catch (err) {
    console.error('Error creating template:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Helper function to create a new template
const createTemplate = async (templateData) => {
  const { 
    name, description, platform, post_type, tone, 
    content_requirements, budget_range, industry, 
    template_type, typical_timeline 
  } = templateData;

  const template_id = uuidv4();
//   const created_at = new Date();
//   const updated_at = new Date();

  const query = `
    INSERT INTO Campaign_Templates 
    (template_id, name, description, platform, post_type, tone, 
    content_requirements, budget_range, industry, template_type, 
    typical_timeline, is_active)
    VALUES (?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?)
  `;

  const [result] = await db.query(query, [
    template_id, name, description, platform, post_type, tone, 
    content_requirements, budget_range, industry, template_type, 
    typical_timeline, true // is_active defaults to true
  ]);

  return { template_id, ...templateData };
};

// Get all templates
exports.getAllTemplates = async (req, res) => {
  try {
    const templates = await getAllTemplates();
    res.status(200).json(templates);
  } catch (err) {
    console.error('Error fetching templates:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Helper function to fetch all templates
const getAllTemplates = async () => {
  const query = 'SELECT * FROM Campaign_Templates WHERE is_active = true';
  const [rows] = await db.query(query);
  return rows;
};

// Get a specific template by ID
exports.getTemplateById = async (req, res) => {
  const { template_id } = req.params;

  try {
    const template = await getTemplateById(template_id);
    
    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }

    res.status(200).json(template);
  } catch (err) {
    console.error('Error fetching template by ID:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Helper function to fetch a template by ID
const getTemplateById = async (template_id) => {
  const query = 'SELECT * FROM Campaign_Templates WHERE template_id = ? AND is_active = true';
  const [rows] = await db.query(query, [template_id]);
  return rows[0] || null;
};

// Update an existing template (only admins can update)
exports.updateTemplate = async (req, res) => {
  const { template_id } = req.params;
  const { name, description, platform, post_type, tone, content_requirements, budget_range, industry, template_type, typical_timeline, is_active } = req.body;

  try {
    const updatedTemplate = await updateTemplateById(template_id, {
      name,
      description,
      platform,
      post_type,
      tone,
      content_requirements,
      budget_range,
      industry,
      template_type,
      typical_timeline,
      is_active
    });

    if (!updatedTemplate) {
      return res.status(404).json({ error: 'Template not found or could not be updated' });
    }

    res.status(200).json({
      message: 'Template updated successfully',
      template: updatedTemplate
    });
  } catch (err) {
    console.error('Error updating template:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Helper function to update a template by ID
const updateTemplateById = async (template_id, templateData) => {
  const { 
    name, description, platform, post_type, tone, 
    content_requirements, budget_range, industry, 
    template_type, typical_timeline, is_active 
  } = templateData;

  const updated_at = new Date();

  const query = `
    UPDATE Campaign_Templates 
    SET name = ?, description = ?, platform = ?, post_type = ?, tone = ?, 
        content_requirements = ?, budget_range = ?, industry = ?, 
        template_type = ?, typical_timeline = ?, updated_at = ?, is_active = ?
    WHERE template_id = ?
  `;

  const [result] = await db.query(query, [
    name, description, platform, post_type, tone, 
    content_requirements, budget_range, industry, 
    template_type, typical_timeline, updated_at, is_active, template_id
  ]);

  return result.affectedRows > 0 ? { template_id, ...templateData } : null;
};
