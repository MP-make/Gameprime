document.addEventListener("DOMContentLoaded", async () => {
  // Check if Supabase is loaded
  if (typeof window.supabase === 'undefined') {
    alert('Error: Supabase library no se ha cargado correctamente. Verifica tu conexión a internet.');
    return;
  }

  // Initialize Supabase
  const supabaseUrl = 'https://ukzadyiieylaaekxblpk.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVremFkeWlpZXlsYWFla3hibHBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMzMzExOTgsImV4cCI6MjA3ODkwNzE5OH0.JRmxRCO8FNvw6Ix89Rd6CSK82o8jod2iCQhCk98LvN8';
  const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

  // Verificar si el usuario tiene sesión y es admin
  const userRol = localStorage.getItem('user_rol');
  const userEmail = localStorage.getItem('user_email');

  console.log('🔐 Verificando acceso a admin...');
  console.log('Email:', userEmail);
  console.log('Rol:', userRol);

  if (!userEmail || !userRol) {
    console.log('❌ No hay sesión activa, redirigiendo al login...');
    alert('Debes iniciar sesión para acceder al panel de administración.');
    window.location.href = 'login-registro.html';
    return;
  }

  if (userRol !== 'admin') {
    console.log('❌ Usuario no es admin, redirigiendo a index...');
    alert('No tienes permisos de administrador.');
    window.location.href = 'index.html';
    return;
  }

  console.log('✅ Acceso permitido - Usuario admin autenticado');

  // Logout function
  window.logout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('supabase_session');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_rol');
    localStorage.removeItem('user_nombre');
    window.location.href = 'login-registro.html';
  };

  // Menu event listeners
  document.querySelectorAll('.menu-list a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Clicked on link:', e.target);
      const section = e.target.getAttribute('data-section');
      console.log('Section to load:', section);
      loadSection(section);
    });
  });

  // Load default section
  loadSection('productos');

  // Function to load sections
  function loadSection(section) {
    const mainContent = document.getElementById('mainContent');
    switch (section) {
      case 'dashboard':
        loadDashboard(mainContent);
        break;
      case 'productos':
        loadProductos(mainContent);
        break;
      case 'categorias':
        loadCategorias(mainContent);
        break;
      case 'usuarios':
        loadUsuarios(mainContent);
        break;
      case 'proveedores':
        loadProveedores(mainContent);
        break;
      case 'reportes':
        loadReportes(mainContent);
        break;
      case 'mensajes':
        loadMensajes(mainContent);
        break;
      case 'compras':
        loadCompras(mainContent);
        break;
      default:
        mainContent.innerHTML = '<h2>Sección no encontrada</h2>';
    }
  }

  // === DASHBOARD ===
  function loadDashboard(mainContent) {
    mainContent.innerHTML = `
      <h2>Dashboard</h2>
      <p>Bienvenido al panel de administración de GamePrime.</p>
      <div class="section">
        <h3>Estadísticas Generales</h3>
        <p>Aquí puedes agregar gráficos o estadísticas de productos, usuarios, etc.</p>
      </div>
    `;
  }

  // === PRODUCTOS ===
  function loadProductos(mainContent) {
    mainContent.innerHTML = `
      <h2>Gestión de Productos</h2>
      <div class="section">
        <h3>Agregar Producto</h3>
        <form id="formProducto" enctype="multipart/form-data">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
            <div>
              <label>Título del Producto *</label>
              <input type="text" id="tituloProducto" placeholder="Ej: The Last of Us Part I" required>
            </div>
            <div>
              <label>Categoría *</label>
              <select id="categoriaProducto" required>
                <option value="">Selecciona una categoría</option>
              </select>
            </div>
          </div>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 15px;">
            <div>
              <label>Precio (S/) *</label>
              <input type="number" id="precioProducto" placeholder="59.99" step="0.01" required>
            </div>
            <div>
              <label>Descuento (%)</label>
              <input type="number" id="descuentoProducto" placeholder="0" min="0" max="100" value="0">
            </div>
            <div>
              <label>Fecha de Lanzamiento *</label>
              <input type="date" id="fechaLanzamiento" required>
            </div>
          </div>
          <div style="margin-top: 15px;">
            <label>Video (opcional)</label>
            <input type="file" id="videoProducto" accept="video/*">
          </div>
          <h3>Imágenes del Producto</h3>
          <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 15px;">
            <div style="display: flex; flex-direction: column; align-items: center;">
              <label>Portada (imagen) *</label>
              <div class="image-upload-container">
                <input type="file" id="portadaProducto" accept="image/*" style="display: none;" required>
                <label for="portadaProducto" class="image-upload-label" id="labelPortada">
                  <span class="plus-icon">+</span>
                  <button type="button" class="delete-btn" onclick="clearImage('portadaProducto', 'labelPortada')">×</button>
                </label>
              </div>
            </div>
            <div style="display: flex; flex-direction: column; align-items: center;">
              <label>Imagen 1 (galería)</label>
              <div class="image-upload-container">
                <input type="file" id="imagen1Producto" accept="image/*" style="display: none;">
                <label for="imagen1Producto" class="image-upload-label" id="labelImagen1">
                  <span class="plus-icon">+</span>
                  <button type="button" class="delete-btn" onclick="clearImage('imagen1Producto', 'labelImagen1')">×</button>
                </label>
              </div>
            </div>
            <div style="display: flex; flex-direction: column; align-items: center;">
              <label>Imagen 2 (galería)</label>
              <div class="image-upload-container">
                <input type="file" id="imagen2Producto" accept="image/*" style="display: none;">
                <label for="imagen2Producto" class="image-upload-label" id="labelImagen2">
                  <span class="plus-icon">+</span>
                  <button type="button" class="delete-btn" onclick="clearImage('imagen2Producto', 'labelImagen2')">×</button>
                </label>
              </div>
            </div>
            <div style="display: flex; flex-direction: column; align-items: center;">
              <label>Imagen 3 (galería)</label>
              <div class="image-upload-container">
                <input type="file" id="imagen3Producto" accept="image/*" style="display: none;">
                <label for="imagen3Producto" class="image-upload-label" id="labelImagen3">
                  <span class="plus-icon">+</span>
                  <button type="button" class="delete-btn" onclick="clearImage('imagen3Producto', 'labelImagen3')">×</button>
                </label>
              </div>
            </div>
            <div style="display: flex; flex-direction: column; align-items: center;">
              <label>Imagen 4 (galería)</label>
              <div class="image-upload-container">
                <input type="file" id="imagen4Producto" accept="image/*" style="display: none;">
                <label for="imagen4Producto" class="image-upload-label" id="labelImagen4">
                  <span class="plus-icon">+</span>
                  <button type="button" class="delete-btn" onclick="clearImage('imagen4Producto', 'labelImagen4')">×</button>
                </label>
              </div>
            </div>
          </div>
          <div style="margin-top: 15px;">
            <label>Descripción Corta (para vista de compra) *</label>
            <textarea id="descripcionCortaProducto" placeholder="Descripción breve del producto" rows="3" required style="width: 100%; resize: vertical;"></textarea>
          </div>
          <div style="margin-top: 15px;">
            <label>Descripción Completa (pestaña descripción)</label>
            <textarea id="descripcionProducto" placeholder="Descripción detallada del producto" rows="6" style="width: 100%; resize: vertical;"></textarea>
          </div>
          <button type="submit" style="margin-top: 15px;">Agregar Producto</button>
        </form>
      </div>
      <div class="section">
        <h3>Lista de Productos</h3>
        <table id="tablaProductos">
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Descuento</th>
              <th>Fondo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody id="cuerpoProductos"></tbody>
        </table>
      </div>
      <!-- Modal for editing product -->
      <div id="editModal" class="modal" style="display:none;">
        <div class="modal-content">
          <span class="close" onclick="closeEditModal()">&times;</span>
          <div id="edit-modal-body">
            <!-- Edit form will be loaded here -->
          </div>
        </div>
      </div>
    `;
    // Attach event listener
    document.getElementById("formProducto").addEventListener("submit", agregarProducto);
    
    // Preview de imágenes
    setupImagePreview('portadaProducto');
    setupImagePreview('imagen1Producto');
    setupImagePreview('imagen2Producto');
    setupImagePreview('imagen3Producto');
    setupImagePreview('imagen4Producto');
    
    cargarCategoriasEnSelect();
    cargarProductos();
  }

  // Función para actualizar fondos masivamente
  async function actualizarFondosMasivo() {
    if (!confirm('¿Estás seguro de actualizar los fondos de todos los productos? Esto asignará el fondo de cada categoría a sus productos correspondientes.')) {
      return;
    }

    try {
      const response = await fetch('/api/productos/actualizar-fondos', {
        method: 'POST'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error desconocido');
      }

      const result = await response.json();
      alert(`✅ ${result.message}\n\nActualizados: ${result.actualizados}\nErrores: ${result.errores}\nTotal: ${result.total}`);
      cargarProductos(); // Recargar la tabla de productos
    } catch (error) {
      alert("❌ Error al actualizar fondos: " + error.message);
    }
  }

  window.actualizarFondosMasivo = actualizarFondosMasivo;

  // Función para mostrar preview de imágenes
  function setupImagePreview(inputId) {
    const input = document.getElementById(inputId);
    if (input) {
      input.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
          const url = URL.createObjectURL(file);
          const base = inputId.replace('Producto', '');
          const labelId = 'label' + base.charAt(0).toUpperCase() + base.slice(1);
          const label = document.getElementById(labelId);
          if (label) {
            label.style.backgroundImage = `url(${url})`;
            label.classList.add('has-image');
            label.dataset.url = url; // Store for cleanup
          }
        }
      });
    }
  }

  // Función para limpiar la imagen seleccionada
  function clearImage(inputId, labelId) {
    const input = document.getElementById(inputId);
    const label = document.getElementById(labelId);
    
    if (input && label) {
      if (label.dataset.url) {
        URL.revokeObjectURL(label.dataset.url);
        delete label.dataset.url;
      }
      input.value = '';
      label.style.backgroundImage = '';
      label.classList.remove('has-image');
    }
  }

  // Función para resetear todas las vistas previas de imágenes
  function resetImagePreviews() {
    const imageFields = [
      { inputId: 'portadaProducto', labelId: 'labelPortada' },
      { inputId: 'imagen1Producto', labelId: 'labelImagen1' },
      { inputId: 'imagen2Producto', labelId: 'labelImagen2' },
      { inputId: 'imagen3Producto', labelId: 'labelImagen3' },
      { inputId: 'imagen4Producto', labelId: 'labelImagen4' }
    ];
    
    imageFields.forEach(field => {
      clearImage(field.inputId, field.labelId);
    });
  }

  // Hacer clearImage global para que funcione en onclick
  window.clearImage = clearImage;

  // Cargar categorías en el select
  async function cargarCategoriasEnSelect() {
    try {
      const response = await fetch('/api/categorias');
      if (response.ok) {
        const categorias = await response.json();
        const select = document.getElementById('categoriaProducto');
        if (select) {
          select.innerHTML = '<option value="">Selecciona una categoría</option>';
          categorias.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.nombre;
            option.textContent = cat.nombre;
            select.appendChild(option);
          });
        }
      }
    } catch (error) {
      console.error('Error cargando categorías:', error);
    }
  }

  // Function to add product
  async function agregarProducto(event) {
    event.preventDefault();
    
    const productoData = {
      titulo: document.getElementById('tituloProducto').value.trim(),
      categoria: document.getElementById('categoriaProducto').value.trim(),
      precio: parseFloat(document.getElementById('precioProducto').value.trim()),
      descuento: parseFloat(document.getElementById('descuentoProducto').value.trim()) || 0,
      fecha_lanzamiento: document.getElementById('fechaLanzamiento').value.trim(),
      portada: document.getElementById('portadaProducto').files[0],
      video: document.getElementById('videoProducto').files[0],
      imagen1: document.getElementById('imagen1Producto').files[0],
      imagen2: document.getElementById('imagen2Producto').files[0],
      imagen3: document.getElementById('imagen3Producto').files[0],
      imagen4: document.getElementById('imagen4Producto').files[0],
      descripcion_corta: document.getElementById('descripcionCortaProducto').value.trim(),
      descripcion: document.getElementById('descripcionProducto').value.trim()
    };

    try {
      const formData = new FormData();
      for (const key in productoData) {
        formData.append(key, productoData[key]);
      }

      const response = await fetch('/api/productos', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error desconocido');
      }

      alert("✅ Producto agregado correctamente.");
      document.getElementById("formProducto").reset();
      resetImagePreviews();
      cargarProductos();
    } catch (error) {
      alert("❌ Error al agregar producto: " + error.message);
    }
  }

  // Function to load products
  async function cargarProductos() {
    try {
      const response = await fetch('/api/productos');
      if (!response.ok) {
        throw new Error('Error al cargar productos');
      }
      const data = await response.json();
      const cuerpoProductos = document.getElementById("cuerpoProductos");
      if (cuerpoProductos) {
        cuerpoProductos.innerHTML = '';
        data.forEach(p => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${p.id}</td>
            <td>${p.titulo}</td>
            <td>${p.categoria}</td>
            <td>S/ ${p.precio}</td>
            <td>${p.descuento}%</td>
            <td>${p.fondo || 'N/A'}</td>
            <td>
              <button onclick="editarProducto(${p.id})" class="modificar">Editar</button>
              <button onclick="eliminarProducto(${p.id})" class="eliminar">Eliminar</button>
            </td>
          `;
          cuerpoProductos.appendChild(tr);
        });
      }
    } catch (error) {
      console.error(error);
      const cuerpoProductos = document.getElementById("cuerpoProductos");
      if (cuerpoProductos) {
        cuerpoProductos.innerHTML = '<tr><td colspan="7">Error al cargar productos.</td></tr>';
      }
    }
  }

  // Function to view product details
  async function verProducto(id) {
    try {
      const response = await fetch(`/api/productos/${id}`);
      if (!response.ok) throw new Error('Error al cargar producto');
      const p = await response.json();
      
      const detalles = `
ID: ${p.id}
Título: ${p.titulo}
Categoría: ${p.categoria}
Precio: S/ ${p.precio}
Descuento: ${p.descuento}%
Fecha: ${p.fecha_lanzamiento}
Portada: ${p.portada}
Video: ${p.video || 'N/A'}
Fondo: ${p.fondo || 'N/A'}
Imágenes: ${p.imagen1}, ${p.imagen2}, ${p.imagen3}, ${p.imagen4}
Descripción Corta: ${p.descripcion_corta}
Descripción: ${p.descripcion}
      `;
      
      alert(detalles);
    } catch (error) {
      alert("❌ Error al cargar detalles: " + error.message);
    }
  }

  // Function to delete product
  async function eliminarProducto(id) {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;
    
    try {
      const response = await fetch(`/api/productos/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error desconocido');
      }
      alert("🗑️ Producto eliminado.");
      cargarProductos();
    } catch (error) {
      alert("❌ Error al eliminar producto: " + error.message);
    }
  }

  window.verProducto = verProducto;
  window.eliminarProducto = eliminarProducto;

  // Function to edit product
  async function editarProducto(id) {
    try {
      const response = await fetch(`/api/productos/${id}`);
      if (!response.ok) throw new Error('Error al cargar producto');
      const p = await response.json();

      // Load categories for select
      const catResponse = await fetch('/api/categorias');
      const categorias = catResponse.ok ? await catResponse.json() : [];

      const modalBody = document.getElementById('edit-modal-body');
      modalBody.innerHTML = `
        <form id="editFormProducto" enctype="multipart/form-data">
          <div class="modal-producto-container">
            <div class="modal-izquierda">
              <div style="margin-bottom: 15px;">
                <label>Reemplazar Video (opcional)</label>
                ${p.video ? `<div style="margin-bottom: 5px;">Video actual: <video src="video/${p.video}" controls width="840" height="500"></video></div>` : ''}
                <input type="file" id="edit-videoProducto" accept="video/*" style="display: none;">
                <label for="edit-videoProducto" style="cursor: pointer; background: #007bff; color: white; padding: 8px 12px; border-radius: 4px; display: inline-block;">Reemplazar Video</label>
              </div>
              <h3>Imágenes del Producto</h3>
              <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px;">
                <div style="display: flex; flex-direction: column; align-items: center;">
                  <label>Imagen 1 (galería)</label>
                  <div class="image-upload-container">
                    <input type="file" id="edit-imagen1Producto" accept="image/*" style="display: none;">
                    <label for="edit-imagen1Producto" class="image-upload-label ${p.imagen1 ? 'has-image' : ''}" id="edit-labelImagen1" style="${p.imagen1 ? `background-image: url(imagenes/${p.imagen1})` : ''}">
                      <span class="plus-icon">+</span>
                      <button type="button" class="delete-btn" onclick="clearImage('edit-imagen1Producto', 'edit-labelImagen1')">×</button>
                    </label>
                  </div>
                </div>
                <div style="display: flex; flex-direction: column; align-items: center;">
                  <label>Imagen 2 (galería)</label>
                  <div class="image-upload-container">
                    <input type="file" id="edit-imagen2Producto" accept="image/*" style="display: none;">
                    <label for="edit-imagen2Producto" class="image-upload-label ${p.imagen2 ? 'has-image' : ''}" id="edit-labelImagen2" style="${p.imagen2 ? `background-image: url(imagenes/${p.imagen2})` : ''}">
                      <span class="plus-icon">+</span>
                      <button type="button" class="delete-btn" onclick="clearImage('edit-imagen2Producto', 'edit-labelImagen2')">×</button>
                    </label>
                  </div>
                </div>
                <div style="display: flex; flex-direction: column; align-items: center;">
                  <label>Imagen 3 (galería)</label>
                  <div class="image-upload-container">
                    <input type="file" id="edit-imagen3Producto" accept="image/*" style="display: none;">
                    <label for="edit-imagen3Producto" class="image-upload-label ${p.imagen3 ? 'has-image' : ''}" id="edit-labelImagen3" style="${p.imagen3 ? `background-image: url(imagenes/${p.imagen3})` : ''}">
                      <span class="plus-icon">+</span>
                      <button type="button" class="delete-btn" onclick="clearImage('edit-imagen3Producto', 'edit-labelImagen3')">×</button>
                    </label>
                  </div>
                </div>
                <div style="display: flex; flex-direction: column; align-items: center;">
                  <label>Imagen 4 (galería)</label>
                  <div class="image-upload-container">
                    <input type="file" id="edit-imagen4Producto" accept="image/*" style="display: none;">
                    <label for="edit-imagen4Producto" class="image-upload-label ${p.imagen4 ? 'has-image' : ''}" id="edit-labelImagen4" style="${p.imagen4 ? `background-image: url(imagenes/${p.imagen4})` : ''}">
                      <span class="plus-icon">+</span>
                      <button type="button" class="delete-btn" onclick="clearImage('edit-imagen4Producto', 'edit-labelImagen4')">×</button>
                    </label>
                  </div>
                </div>
              </div>
              <div style="margin-top: 15px;">
                <label>Descripción Completa (pestaña descripción)</label>
                <textarea id="edit-descripcionProducto" placeholder="Descripción detallada del producto" rows="6" style="width: 100%; resize: vertical;">${p.descripcion || ''}</textarea>
              </div>
            </div>
            <div class="modal-derecha">
              <div style="margin-bottom: 15px;">
                <label>Portada (imagen) *</label>
                <div class="image-upload-container">
                  <input type="file" id="edit-portadaProducto" accept="image/*" style="display: none;">
                  <label for="edit-portadaProducto" class="image-upload-label ${p.portada ? 'has-image' : ''}" id="edit-labelPortada" style="${p.portada ? `background-image: url(imagenes/${p.portada})` : ''}">
                    <span class="plus-icon">+</span>
                    <button type="button" class="delete-btn" onclick="clearImage('edit-portadaProducto', 'edit-labelPortada')">×</button>
                  </label>
                </div>
              </div>
              <div style="margin-bottom: 15px;">
                <label>Título del Producto *</label>
                <input type="text" id="edit-tituloProducto" value="${p.titulo}" required>
              </div>
              <div style="margin-bottom: 15px;">
                <label>Categoría *</label>
                <select id="edit-categoriaProducto" required>
                  <option value="">Selecciona una categoría</option>
                  ${categorias.map(cat => `<option value="${cat.nombre}" ${cat.nombre === p.categoria ? 'selected' : ''}>${cat.nombre}</option>`).join('')}
                </select>
              </div>
              <div style="margin-bottom: 15px;">
                <label>Descripción Corta (para vista de compra) *</label>
                <textarea id="edit-descripcionCortaProducto" placeholder="Descripción breve del producto" rows="3" required style="width: 100%; resize: vertical;">${p.descripcion_corta || ''}</textarea>
              </div>
              <div style="margin-bottom: 15px;">
                <label>Fecha de Lanzamiento *</label>
                <input type="date" id="edit-fechaLanzamiento" value="${p.fecha_lanzamiento}" required>
              </div>
              <div style="margin-bottom: 15px;">
                <label>Precio (S/) *</label>
                <input type="number" id="edit-precioProducto" value="${p.precio}" step="0.01" required>
              </div>
              <div style="margin-bottom: 15px;">
                <label>Descuento (%)</label>
                <input type="number" id="edit-descuentoProducto" value="${p.descuento || 0}" min="0" max="100">
              </div>
              <button type="button" onclick="guardarCambios(${id})" style="margin-top: 15px;">Guardar Cambios</button>
            </div>
          </div>
        </form>
      `;

      // Setup image previews for new file selections
      setupImagePreview('edit-portadaProducto');
      setupImagePreview('edit-imagen1Producto');
      setupImagePreview('edit-imagen2Producto');
      setupImagePreview('edit-imagen3Producto');
      setupImagePreview('edit-imagen4Producto');

      document.getElementById('editModal').style.display = 'block';
    } catch (error) {
      alert("❌ Error al cargar producto para editar: " + error.message);
    }
  }

  // Function to close edit modal
  function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
  }

  // Function to save changes
  async function guardarCambios(id) {
    const productoData = {
      titulo: document.getElementById('edit-tituloProducto').value.trim(),
      categoria: document.getElementById('edit-categoriaProducto').value.trim(),
      precio: parseFloat(document.getElementById('edit-precioProducto').value.trim()),
      descuento: parseFloat(document.getElementById('edit-descuentoProducto').value.trim()) || 0,
      fecha_lanzamiento: document.getElementById('edit-fechaLanzamiento').value.trim(),
      portada: document.getElementById('edit-portadaProducto').files[0],
      video: document.getElementById('edit-videoProducto').files[0],
      imagen1: document.getElementById('edit-imagen1Producto').files[0],
      imagen2: document.getElementById('edit-imagen2Producto').files[0],
      imagen3: document.getElementById('edit-imagen3Producto').files[0],
      imagen4: document.getElementById('edit-imagen4Producto').files[0],
      descripcion_corta: document.getElementById('edit-descripcionCortaProducto').value.trim(),
      descripcion: document.getElementById('edit-descripcionProducto').value.trim()
    };

    try {
      const formData = new FormData();
      for (const key in productoData) {
        formData.append(key, productoData[key]);
      }

      const response = await fetch(`/api/productos/${id}`, {
        method: 'PUT',
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error desconocido');
      }

      alert("✅ Producto actualizado correctamente.");
      closeEditModal();
      cargarProductos();
    } catch (error) {
      alert("❌ Error al actualizar producto: " + error.message);
    }
  }

  window.editarProducto = editarProducto;
  window.closeEditModal = closeEditModal;
  window.guardarCambios = guardarCambios;

  // === USUARIOS ===
  function loadUsuarios(mainContent) {
    mainContent.innerHTML = `
      <h2>Gestión de Usuarios</h2>
      <div class="section">
        <h3>Agregar Usuario</h3>
        <form id="formUsuario">
          <input type="text" id="nombreUsuario" placeholder="Nombre" required>
          <input type="email" id="correoUsuario" placeholder="Correo" required>
          <select id="rolUsuario" required>
            <option value="usuario">Usuario</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit">Agregar Usuario</button>
        </form>
      </div>
      <div class="section">
        <h3>Lista de Usuarios</h3>
        <table id="tablaUsuarios">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody id="cuerpoUsuarios"></tbody>
        </table>
      </div>
    `;
    document.getElementById("formUsuario").addEventListener("submit", agregarUsuario);
    cargarUsuarios();
  }

  // Function to add user
  async function agregarUsuario(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombreUsuario').value;
    const email = document.getElementById('correoUsuario').value;
    const rol = document.getElementById('rolUsuario').value;

    try {
      const response = await fetch('/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, correo: email, rol })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error desconocido');
      }

      alert("✅ Usuario agregado correctamente.");
      document.getElementById("formUsuario").reset();
      cargarUsuarios();
    } catch (error) {
      alert("❌ Error al agregar usuario: " + error.message);
    }
  }

  // Function to load users
  async function cargarUsuarios() {
    try {
      const response = await fetch('/api/usuarios');
      if (!response.ok) {
        throw new Error('Error al cargar usuarios');
      }
      const data = await response.json();
      const cuerpoUsuarios = document.getElementById("cuerpoUsuarios");
      if (cuerpoUsuarios) {
        cuerpoUsuarios.innerHTML = '';
        data.forEach(u => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${u.nombre}</td>
            <td>${u.correo}</td>
            <td>${u.rol}</td>
            <td>
              <button onclick="eliminarUsuario(${u.id})">Eliminar</button>
              <button onclick="modificarUsuario(${u.id}, '${u.nombre}', '${u.correo}', '${u.rol}')">Modificar</button>
            </td>
          `;
          cuerpoUsuarios.appendChild(tr);
        });
      }
    } catch (error) {
      console.error(error);
      const cuerpoUsuarios = document.getElementById("cuerpoUsuarios");
      if (cuerpoUsuarios) {
        cuerpoUsuarios.innerHTML = '<tr><td colspan="4">Error al cargar usuarios.</td></tr>';
      }
    }
  }

  // Function to delete user
  async function eliminarUsuario(id) {
    try {
      const response = await fetch(`/api/usuarios/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error desconocido');
      }
      alert("🗑️ Usuario eliminado.");
      cargarUsuarios();
    } catch (error) {
      alert("❌ Error al eliminar usuario: " + error.message);
    }
  }

  // Function to modify user
  async function modificarUsuario(id, nombre, correo, rol) {
    const nuevoNombre = prompt("Nuevo nombre:", nombre);
    const nuevoCorreo = prompt("Nuevo correo:", correo);
    const nuevoRol = prompt("Nuevo rol:", rol);

    try {
      const response = await fetch(`/api/usuarios/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: nuevoNombre, correo: nuevoCorreo, rol: nuevoRol })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error desconocido');
      }

      alert("✏️ Usuario actualizado.");
      cargarUsuarios();
    } catch (error) {
      alert("❌ Error al actualizar usuario: " + error.message);
    }
  }

  window.eliminarUsuario = eliminarUsuario;
  window.modificarUsuario = modificarUsuario;

  // === PROVEEDORES ===
  function loadProveedores(mainContent) {
    mainContent.innerHTML = `
      <h2>Gestión de Proveedores</h2>
      <div class="section">
        <h3>Agregar Proveedor</h3>
        <form id="formProveedor">
          <input type="text" id="nombreProveedor" placeholder="Nombre" required>
          <input type="email" id="correoProveedor" placeholder="Correo" required>
          <input type="text" id="articulosProveedor" placeholder="Artículos" required>
          <button type="submit">Agregar Proveedor</button>
        </form>
      </div>
      <div class="section">
        <h3>Lista de Proveedores</h3>
        <table id="tablaProveedores">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Artículos</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody id="cuerpoProveedores"></tbody>
        </table>
      </div>
    `;
    document.getElementById("formProveedor").addEventListener("submit", agregarProveedor);
    cargarProveedores();
  }

  // Function to add provider
  async function agregarProveedor(event) {
    event.preventDefault();
    const nombre = document.getElementById("nombreProveedor").value.trim();
    const correo = document.getElementById("correoProveedor").value.trim();
    const articulos = document.getElementById("articulosProveedor").value.trim();

    try {
      const response = await fetch('/api/proveedores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, correo, articulos })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error desconocido');
      }

      alert("📦 Proveedor agregado correctamente.");
      document.getElementById("formProveedor").reset();
      cargarProveedores();
    } catch (error) {
      alert("❌ Error al agregar proveedor: " + error.message);
    }
  }

  async function cargarProveedores() {
    try {
      const response = await fetch('/api/proveedores');
      if (!response.ok) {
        throw new Error('Error al cargar proveedores');
      }
      const data = await response.json();
      const cuerpoProveedores = document.getElementById("cuerpoProveedores");
      if (cuerpoProveedores) {
        cuerpoProveedores.innerHTML = '';
        data.forEach(p => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${p.nombre}</td>
            <td>${p.correo}</td>
            <td>${p.articulos}</td>
            <td>
              <button onclick="modificarProveedor(${p.id}, '${p.nombre}', '${p.correo}', '${p.articulos}')">Modificar</button>
              <button onclick="eliminarProveedor(${p.id})">Eliminar</button>
            </td>
          `;
          cuerpoProveedores.appendChild(tr);
        });
      }
    } catch (error) {
      console.error(error);
      const cuerpoProveedores = document.getElementById("cuerpoProveedores");
      if (cuerpoProveedores) {
        cuerpoProveedores.innerHTML = '<tr><td colspan="4">Error al cargar proveedores.</td></tr>';
      }
    }
  }

  async function eliminarProveedor(id) {
    if (!confirm("¿Estás seguro de eliminar a este proveedor?")) return;

    try {
      const response = await fetch(`/api/proveedores/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error desconocido');
      }
      alert("🗑️ Proveedor eliminado.");
      cargarProveedores();
    } catch (error) {
      alert("❌ Error al eliminar proveedor: " + error.message);
    }
  }

  async function modificarProveedor(id, nombre, correo, articulos) {
    const nuevoNombre = prompt("Nuevo nombre:", nombre);
    const nuevoCorreo = prompt("Nuevo correo:", correo);
    const nuevosArticulos = prompt("Nuevos artículos:", articulos);

    try {
      const response = await fetch(`/api/proveedores/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: nuevoNombre, correo: nuevoCorreo, articulos: nuevosArticulos })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error desconocido');
      }

      alert("✏️ Proveedor actualizado.");
      cargarProveedores();
    } catch (error) {
      alert("❌ Error al actualizar proveedor: " + error.message);
    }
  }

  window.eliminarProveedor = eliminarProveedor;
  window.modificarProveedor = modificarProveedor;

  // === CATEGORÍAS ===
  function loadCategorias(mainContent) {
    mainContent.innerHTML = `
    <h2>Gestión de Categorías</h2>
    <div class="section">
      <h3>Agregar Categoría</h3>
      <form id="formCategoria" enctype="multipart/form-data">
        <input type="text" id="nombreCategoria" placeholder="Nombre de la categoría (ej. Acción)" required>
        <input type="file" id="fondoCategoria" accept="image/*" required>
        <textarea id="descripcionCategoria" placeholder="Descripción (opcional)" rows="3" style="width: 100%; resize: vertical;"></textarea>
        <button type="submit">Agregar Categoría</button>
      </form>
    </div>
    <div class="section">
      <h3>Lista de Categorías</h3>
      <table id="tablaCategorias">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Fondo</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody id="cuerpoCategorias"></tbody>
      </table>
    </div>
    <!-- Modal for editing category -->
    <div id="editCategoriaModal" class="modal" style="display:none;">
      <div class="modal-content">
        <span class="close" onclick="closeEditCategoriaModal()">&times;</span>
        <div id="edit-categoria-modal-body">
          <!-- Edit form will be loaded here -->
        </div>
      </div>
    </div>
  `;
    document.getElementById("formCategoria").addEventListener("submit", agregarCategoria);
    cargarCategorias();
  }

  async function agregarCategoria(event) {
    event.preventDefault();
    const nombre = document.getElementById("nombreCategoria").value.trim();
    const descripcion = document.getElementById("descripcionCategoria").value.trim();

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    const fondoFile = document.getElementById('fondoCategoria').files[0];
    if (fondoFile) formData.append('fondo', fondoFile);

    try {
      const response = await fetch('/api/categorias', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error desconocido');
      }

      alert("✅ Categoría agregada correctamente.");
      document.getElementById("formCategoria").reset();
      cargarCategorias();
      cargarCategoriasEnSelect(); // Actualizar el select de productos
    } catch (error) {
      alert("❌ Error al agregar categoría: " + error.message);
    }
  }

  async function cargarCategorias() {
    try {
      const response = await fetch('/api/categorias');
      if (!response.ok) {
        throw new Error('Error al cargar categorías');
      }
      const data = await response.json();
      const cuerpoCategorias = document.getElementById("cuerpoCategorias");
      if (cuerpoCategorias) {
        cuerpoCategorias.innerHTML = '';
        data.forEach(c => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${c.id}</td>
            <td>${c.nombre}</td>
            <td>${c.fondo || 'N/A'}</td>
            <td>${c.descripcion || 'N/A'}</td>
            <td>
              <button onclick="editarCategoria(${c.id})" class="modificar">Modificar</button>
              <button onclick="eliminarCategoria(${c.id})" class="eliminar">Eliminar</button>
            </td>
          `;
          cuerpoCategorias.appendChild(tr);
        });
      }
    } catch (error) {
      console.error(error);
      const cuerpoCategorias = document.getElementById("cuerpoCategorias");
      if (cuerpoCategorias) {
        cuerpoCategorias.innerHTML = '<tr><td colspan="4">Error al cargar categorías.</td></tr>';
      }
    }
  }

  async function eliminarCategoria(id) {
    if (!confirm("¿Estás seguro de eliminar esta categoría? Los productos con esta categoría quedarán sin categoría.")) return;

    try {
      const response = await fetch(`/api/categorias/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error desconocido');
      }
      alert("🗑️ Categoría eliminada.");
      cargarCategorias();
      cargarCategoriasEnSelect(); // Actualizar el select de productos
    } catch (error) {
      alert("❌ Error al eliminar categoría: " + error.message);
    }
  }

  async function editarCategoria(id) {
    try {
      const response = await fetch(`/api/categorias/${id}`);
      if (!response.ok) throw new Error('Error al cargar categoría');
      const c = await response.json();

      const modalBody = document.getElementById('edit-categoria-modal-body');
      modalBody.innerHTML = `
        <form id="editFormCategoria" enctype="multipart/form-data">
          <div style="margin-bottom: 15px;">
            <label>Nombre de la categoría *</label>
            <input type="text" id="edit-nombreCategoria" value="${c.nombre}" required>
          </div>
          <div style="margin-bottom: 15px;">
            <label>Fondo (imagen)</label>
            <input type="file" id="edit-fondoCategoria" accept="image/*">
            ${c.fondo ? `<div style="margin-top: 5px;">Fondo actual: <img src="imagenes/${c.fondo}" alt="Fondo" style="max-width: 100px;"></div>` : ''}
          </div>
          <div style="margin-bottom: 15px;">
            <label>Descripción (opcional)</label>
            <textarea id="edit-descripcionCategoria" placeholder="Descripción (opcional)" rows="3" style="width: 100%; resize: vertical;">${c.descripcion || ''}</textarea>
          </div>
          <button type="button" onclick="guardarCategoria(${id})">Guardar Cambios</button>
        </form>
      `;

      document.getElementById('editCategoriaModal').style.display = 'block';
    } catch (error) {
      alert("❌ Error al cargar categoría para editar: " + error.message);
    }
  }

  function closeEditCategoriaModal() {
    document.getElementById('editCategoriaModal').style.display = 'none';
  }

  async function guardarCategoria(id) {
    const nombre = document.getElementById('edit-nombreCategoria').value.trim();
    const descripcion = document.getElementById('edit-descripcionCategoria').value.trim();
    const fondoFile = document.getElementById('edit-fondoCategoria').files[0];

    if (!nombre) {
      alert("El nombre es obligatorio");
      return;
    }

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    if (fondoFile) formData.append('fondo', fondoFile);

    try {
      const response = await fetch(`/api/categorias/${id}`, {
        method: 'PUT',
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error desconocido');
      }

      alert("✏️ Categoría actualizada.");
      closeEditCategoriaModal();
      cargarCategorias();
      cargarCategoriasEnSelect(); // Actualizar el select de productos
    } catch (error) {
      alert("❌ Error al actualizar categoría: " + error.message);
    }
  }

  window.eliminarCategoria = eliminarCategoria;
  window.editarCategoria = editarCategoria;
  window.closeEditCategoriaModal = closeEditCategoriaModal;
  window.guardarCategoria = guardarCategoria;

  // === REPORTES ===
  function loadReportes(mainContent) {
    mainContent.innerHTML = `
      <h2>Gestión de Reportes</h2>
      <div class="section">
        <h3>Estadísticas Generales</h3>
        <p>Total de Productos: <span id="totalProductos">Cargando...</span></p>
        <p>Total de Usuarios: <span id="totalUsuarios">Cargando...</span></p>
        <p>Total de Proveedores: <span id="totalProveedores">Cargando...</span></p>
        <p>Total de Compras: <span id="totalCompras">Cargando...</span></p>
      </div>
    `;
    cargarEstadisticas();
  }

  async function cargarEstadisticas() {
    try {
      const [productosRes, usuariosRes, proveedoresRes, comprasRes] = await Promise.all([
        fetch('/api/productos'),
        fetch('/api/usuarios'),
        fetch('/api/proveedores'),
        fetch('/api/compras')
      ]);

      const productos = productosRes.ok ? await productosRes.json() : [];
      const usuarios = usuariosRes.ok ? await usuariosRes.json() : [];
      const proveedores = proveedoresRes.ok ? await proveedoresRes.json() : [];
      const compras = comprasRes.ok ? await comprasRes.json() : [];

      document.getElementById('totalProductos').textContent = productos.length;
      document.getElementById('totalUsuarios').textContent = usuarios.length;
      document.getElementById('totalProveedores').textContent = proveedores.length;
      document.getElementById('totalCompras').textContent = compras.length;
    } catch (error) {
      console.error('Error cargando estadísticas:', error);
      document.getElementById('totalProductos').textContent = 'Error';
      document.getElementById('totalUsuarios').textContent = 'Error';
      document.getElementById('totalProveedores').textContent = 'Error';
      document.getElementById('totalCompras').textContent = 'Error';
    }
  }

  // === MENSAJES ===
  function loadMensajes(mainContent) {
    mainContent.innerHTML = `
      <h2>Mensajes de Contacto</h2>
      <div class="section">
        <h3>Lista de Mensajes</h3>
        <ul id="listaMensajes"></ul>
      </div>
    `;
    cargarMensajes();
  }

  async function cargarMensajes() {
    try {
      const response = await fetch('/api/mensajes');
      if (!response.ok) {
        throw new Error('Error al cargar mensajes');
      }
      const data = await response.json();
      const listaMensajes = document.getElementById("listaMensajes");
      if (listaMensajes) {
        listaMensajes.innerHTML = '';
        data.forEach(m => {
          const li = document.createElement('li');
          li.innerHTML = `
            <strong>${m.nombre}</strong>
            <div>Correo: ${m.correo}</div>
            <div>Asunto: ${m.asunto}</div>
            <p>${m.mensaje}</p>
            <div class="botonesMensaje">
              <button class="responder" onclick="responderMensaje(${m.id})">Responder</button>
              <button class="eliminar" onclick="eliminarMensaje(${m.id})">Eliminar</button>
            </div>
          `;
          listaMensajes.appendChild(li);
        });
      }
    } catch (error) {
      console.error(error);
      const listaMensajes = document.getElementById("listaMensajes");
      if (listaMensajes) {
        listaMensajes.innerHTML = '<li>Error al cargar mensajes.</li>';
      }
    }
  }

  async function eliminarMensaje(id) {
    if (!confirm("¿Estás seguro de eliminar este mensaje?")) return;

    try {
      const response = await fetch(`/api/mensajes/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error desconocido');
      }
      alert("🗑️ Mensaje eliminado.");
      cargarMensajes();
    } catch (error) {
      alert("❌ Error al eliminar mensaje: " + error.message);
    }
  }

  async function responderMensaje(id) {
    // Implementar lógica para responder mensaje, por ejemplo, abrir un modal o redirigir a email
    alert("Funcionalidad de responder mensaje no implementada aún.");
  }

  window.eliminarMensaje = eliminarMensaje;
  window.responderMensaje = responderMensaje;

  // === COMPRAS ===
  function loadCompras(mainContent) {
    mainContent.innerHTML = `
      <h2>Historial de Compras</h2>
      <div class="contenedor-compras">
        <ul id="listaCompras"></ul>
      </div>
    `;
    cargarCompras();
  }

  async function cargarCompras() {
    try {
      const response = await fetch('/api/compras');
      if (!response.ok) {
        throw new Error('Error al cargar compras');
      }
      const data = await response.json();
      const listaCompras = document.getElementById("listaCompras");
      if (listaCompras) {
        listaCompras.innerHTML = '';
        data.forEach(c => {
          const li = document.createElement('li');
          li.className = 'compra-item';
          li.innerHTML = `
            <strong>Compra ID: ${c.id}</strong>
            <div>Usuario: ${c.usuario}</div>
            <div>Producto: ${c.producto}</div>
            <div>Fecha: ${c.fecha}</div>
            <div>Total: $${c.total}</div>
            <button onclick="eliminarCompra(${c.id})">Eliminar</button>
          `;
          listaCompras.appendChild(li);
        });
      }
    } catch (error) {
      console.error(error);
      const listaCompras = document.getElementById("listaCompras");
      if (listaCompras) {
        listaCompras.innerHTML = '<li>Error al cargar compras.</li>';
      }
    }
  }

  async function eliminarCompra(id) {
    if (!confirm("¿Estás seguro de eliminar esta compra?")) return;

    try {
      const response = await fetch(`/api/compras/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error desconocido');
      }
      alert("🗑️ Compra eliminada.");
      cargarCompras();
    } catch (error) {
      alert("❌ Error al eliminar compra: " + error.message);
    }
  }

  window.eliminarCompra = eliminarCompra;
});