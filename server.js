const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Configuración de multer para subir archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Determinar carpeta según el tipo de archivo
    if (file.fieldname.includes('video')) {
      cb(null, 'video/');
    } else {
      cb(null, 'imagenes/');
    }
  },
  filename: function (req, file, cb) {
    // Generar nombre único para el archivo
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB límite
  fileFilter: function (req, file, cb) {
    // Validar tipos de archivo
    const imageTypes = /jpeg|jpg|png|gif|webp|avif/;
    const videoTypes = /mp4|webm|ogg|avi|mov/;
    const extname = path.extname(file.originalname).toLowerCase();
    
    if (file.fieldname.includes('video')) {
      if (videoTypes.test(extname.slice(1))) {
        cb(null, true);
      } else {
        cb(new Error('Solo se permiten archivos de video'));
      }
    } else {
      if (imageTypes.test(extname.slice(1))) {
        cb(null, true);
      } else {
        cb(new Error('Solo se permiten archivos de imagen'));
      }
    }
  }
});

const uploadCategoria = multer({ dest: 'imagenes/' });

// Middleware
app.use(express.json());
app.use(express.static('.'));

// Supabase Client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Routes

// GET /api/productos - Obtener todos los productos
app.get('/api/productos', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('productos')
      .select('*');

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/productos/:id - Obtener un producto por ID
app.get('/api/productos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (!data) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/productos - Agregar un producto
app.post('/api/productos', upload.fields([
  { name: 'portada', maxCount: 1 },
  { name: 'video', maxCount: 1 },
  { name: 'imagen1', maxCount: 1 },
  { name: 'imagen2', maxCount: 1 },
  { name: 'imagen3', maxCount: 1 },
  { name: 'imagen4', maxCount: 1 }
]), async (req, res) => {
  const { 
    titulo, categoria, precio, fecha_lanzamiento, descuento,
    descripcion_corta, descripcion
  } = req.body;

  if (!titulo || !categoria || !precio || !fecha_lanzamiento) {
    return res.status(400).json({ error: 'Título, categoría, precio y fecha de lanzamiento son requeridos' });
  }

  // Obtener fondo de la categoría
  const { data: catData, error: catError } = await supabase
    .from('categorias')
    .select('fondo')
    .eq('nombre', categoria)
    .single();

  const fondo = catData ? catData.fondo : null;

  // Obtener nombres de archivos subidos
  const files = req.files;
  const portada = files.portada ? files.portada[0].filename : null;
  const video = files.video ? files.video[0].filename : null;
  const imagen1 = files.imagen1 ? files.imagen1[0].filename : null;
  const imagen2 = files.imagen2 ? files.imagen2[0].filename : null;
  const imagen3 = files.imagen3 ? files.imagen3[0].filename : null;
  const imagen4 = files.imagen4 ? files.imagen4[0].filename : null;

  try {
    const { data, error } = await supabase
      .from('productos')
      .insert([{ 
        titulo, categoria, precio: parseFloat(precio), 
        fecha_lanzamiento, descuento: parseFloat(descuento) || 0,
        portada, video, fondo, imagen1, imagen2, imagen3, imagen4,
        descripcion_corta, descripcion
      }])
      .select();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/productos/:id - Actualizar un producto
app.put('/api/productos/:id', upload.fields([
  { name: 'portada', maxCount: 1 },
  { name: 'video', maxCount: 1 },
  { name: 'imagen1', maxCount: 1 },
  { name: 'imagen2', maxCount: 1 },
  { name: 'imagen3', maxCount: 1 },
  { name: 'imagen4', maxCount: 1 }
]), async (req, res) => {
  const { id } = req.params;
  const { titulo, categoria, precio, fecha_lanzamiento, descuento, descripcion_corta, descripcion } = req.body;

  // Obtener fondo de la nueva categoría
  const { data: catData } = await supabase
    .from('categorias')
    .select('fondo')
    .eq('nombre', categoria)
    .single();

  const fondo = catData ? catData.fondo : null;

  // Obtener nombres de archivos subidos
  const files = req.files;
  const portada = files.portada ? files.portada[0].filename : null;
  const video = files.video ? files.video[0].filename : null;
  const imagen1 = files.imagen1 ? files.imagen1[0].filename : null;
  const imagen2 = files.imagen2 ? files.imagen2[0].filename : null;
  const imagen3 = files.imagen3 ? files.imagen3[0].filename : null;
  const imagen4 = files.imagen4 ? files.imagen4[0].filename : null;

  const updateData = { titulo, categoria, precio: parseFloat(precio), fecha_lanzamiento, descuento: parseFloat(descuento) || 0, descripcion_corta, descripcion, fondo };

  if (portada) updateData.portada = portada;
  if (video) updateData.video = video;
  if (imagen1) updateData.imagen1 = imagen1;
  if (imagen2) updateData.imagen2 = imagen2;
  if (imagen3) updateData.imagen3 = imagen3;
  if (imagen4) updateData.imagen4 = imagen4;

  try {
    const { data, error } = await supabase
      .from('productos')
      .update(updateData)
      .eq('id', id)
      .select();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/productos/:id - Eliminar un producto
app.delete('/api/productos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('productos')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/login - Autenticar usuario
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({ error: error.message });
    }

    // Consultar rol del usuario
    const { data: userData, error: userError } = await supabase
      .from('usuarios')
      .select('rol')
      .eq('correo', data.user.email)
      .single();

    if (userError) {
      return res.status(500).json({ error: 'Error al obtener rol del usuario' });
    }

    res.json({
      user: data.user,
      session: data.session,
      rol: userData.rol,
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/registro - Registrar nuevo usuario
app.post('/api/registro', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({
      user: data.user,
      session: data.session,
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/usuarios - Obtener todos los usuarios o filtrar por correo
app.get('/api/usuarios', async (req, res) => {
  try {
    let query = supabase.from('usuarios').select('*');

    if (req.query.correo) {
      // Convertir a minúsculas para búsqueda insensible a mayúsculas
      const emailLower = req.query.correo.toLowerCase();
      
      // Usar ilike para búsqueda case-insensitive
      query = query.ilike('correo', emailLower).limit(1).maybeSingle();
    }

    const { data, error } = await query;

    if (error) {
      console.error('❌ Error en GET /api/usuarios:', error);
      return res.status(500).json({ error: error.message });
    }

    if (req.query.correo && !data) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(data);
  } catch (err) {
    console.error('❌ Error interno:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/usuarios - Agregar un usuario
app.post('/api/usuarios', async (req, res) => {
  const { nombre, correo, rol } = req.body;

  if (!nombre || !correo || !rol) {
    return res.status(400).json({ error: 'Nombre, correo y rol son requeridos' });
  }

  try {
    // Convertir el correo a minúsculas antes de guardar
    const correoLower = correo.toLowerCase();
    
    // Verificar si ya existe
    const { data: existing } = await supabase
      .from('usuarios')
      .select('correo')
      .ilike('correo', correoLower)
      .maybeSingle();
    
    if (existing) {
      return res.status(409).json({ error: 'El usuario ya existe' });
    }

    const { data, error } = await supabase
      .from('usuarios')
      .insert([{ nombre, correo: correoLower, rol }])
      .select();

    if (error) {
      console.error('❌ Error al insertar usuario:', error);
      return res.status(500).json({ error: error.message });
    }

    res.json(data[0]);
  } catch (err) {
    console.error('❌ Error interno:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/usuarios/:id - Actualizar un usuario
app.put('/api/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, correo, rol } = req.body;

  try {
    const { data, error } = await supabase
      .from('usuarios')
      .update({ nombre, correo, rol })
      .eq('id', id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/usuarios/:id - Eliminar un usuario
app.delete('/api/usuarios/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('usuarios')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/proveedores - Obtener todos los proveedores
app.get('/api/proveedores', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('proveedores')
      .select('*');

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/proveedores - Agregar un proveedor
app.post('/api/proveedores', async (req, res) => {
  const { nombre, correo, articulos } = req.body;

  if (!nombre || !correo || !articulos) {
    return res.status(400).json({ error: 'Nombre, correo y articulos son requeridos' });
  }

  try {
    const { data, error } = await supabase
      .from('proveedores')
      .insert([{ nombre, correo, articulos }]);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/proveedores/:id - Actualizar un proveedor
app.put('/api/proveedores/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, correo, articulos } = req.body;

  try {
    const { data, error } = await supabase
      .from('proveedores')
      .update({ nombre, correo, articulos })
      .eq('id', id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/proveedores/:id - Eliminar un proveedor
app.delete('/api/proveedores/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('proveedores')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ===== CATEGORÍAS =====

// GET /api/categorias - Obtener todas las categorías
app.get('/api/categorias', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('categorias')
      .select('*')
      .order('nombre', { ascending: true });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/categorias/:id - Obtener una categoría por ID
app.get('/api/categorias/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabase
      .from('categorias')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (!data) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/categorias - Agregar una categoría
app.post('/api/categorias', uploadCategoria.single('fondo'), async (req, res) => {
  const { nombre, descripcion } = req.body;

  if (!nombre) {
    return res.status(400).json({ error: 'El nombre es requerido' });
  }

  const fondo = req.file ? req.file.filename : null;

  try {
    const { data, error } = await supabase
      .from('categorias')
      .insert([{ nombre, descripcion, fondo }])
      .select();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/categorias/:id - Actualizar una categoría
app.put('/api/categorias/:id', uploadCategoria.single('fondo'), async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;

  const fondo = req.file ? req.file.filename : null;

  const updateData = { nombre, descripcion };
  if (fondo) updateData.fondo = fondo;

  try {
    const { data, error } = await supabase
      .from('categorias')
      .update(updateData)
      .eq('id', id)
      .select();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/categorias/:id - Eliminar una categoría
app.delete('/api/categorias/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('categorias')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ===== MENSAJES =====

// GET /api/mensajes - Obtener todos los mensajes
app.get('/api/mensajes', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('mensajes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/mensajes - Agregar un mensaje
app.post('/api/mensajes', async (req, res) => {
  const { nombre, correo, asunto, mensaje } = req.body;

  if (!nombre || !correo || !asunto || !mensaje) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  try {
    const { data, error } = await supabase
      .from('mensajes')
      .insert([{ nombre, correo, asunto, mensaje }])
      .select();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/mensajes/:id - Eliminar un mensaje
app.delete('/api/mensajes/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('mensajes')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ===== COMPRAS =====

// GET /api/compras - Obtener todas las compras
app.get('/api/compras', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('compras')
      .select('*')
      .order('fecha', { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/compras - Agregar una compra
app.post('/api/compras', async (req, res) => {
  const { usuario, producto, total } = req.body;

  if (!usuario || !producto || !total) {
    return res.status(400).json({ error: 'Usuario, producto y total son requeridos' });
  }

  try {
    const { data, error } = await supabase
      .from('compras')
      .insert([{ usuario, producto, total }])
      .select();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/compras/:id - Eliminar una compra
app.delete('/api/compras/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('compras')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ===== UPLOAD DE ARCHIVOS =====

// POST /api/upload - Subir archivos (imágenes o videos)
app.post('/api/upload', upload.fields([
  { name: 'portada', maxCount: 1 },
  { name: 'video', maxCount: 1 },
  { name: 'fondo', maxCount: 1 },
  { name: 'imagen1', maxCount: 1 },
  { name: 'imagen2', maxCount: 1 },
  { name: 'imagen3', maxCount: 1 },
  { name: 'imagen4', maxCount: 1 }
]), (req, res) => {
  try {
    const files = req.files;
    const fileNames = {};

    // Obtener nombres de archivos subidos
    for (const fieldname in files) {
      if (files[fieldname] && files[fieldname][0]) {
        fileNames[fieldname] = files[fieldname][0].filename;
      }
    }

    res.json({ 
      success: true, 
      files: fileNames,
      message: 'Archivos subidos correctamente'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});