document.addEventListener("DOMContentLoaded", () => {
  // === PRODUCTOS ===
  const formProducto = document.getElementById("formProducto");
  const listaProductos = document.getElementById("listaProductos");

  if (formProducto) {
    formProducto.addEventListener("submit", agregarProducto);
  }

  // Function to add product
  async function agregarProducto(event) {
    event.preventDefault();
    const titulo = document.getElementById('tituloProducto').value.trim();
    const categoria = document.getElementById('categoriaProducto').value.trim();
    const precio = parseFloat(document.getElementById('precioProducto').value.trim());
    const fecha = document.getElementById('fechaLanzamiento').value.trim();
    const descuento = parseFloat(document.getElementById('descuentoProducto').value.trim()) || 0;

    try {
      const response = await fetch('/api/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo, categoria, precio, fecha_lanzamiento: fecha, descuento })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error desconocido');
      }

      alert("✅ Producto agregado correctamente.");
      formProducto.reset();
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
      listaProductos.innerHTML = '';
      data.forEach(p => {
        const li = document.createElement('li');
        li.innerHTML = `
          <strong>${p.titulo}</strong> - ${p.categoria} - $${p.precio} - Lanzamiento: ${p.fecha_lanzamiento} - Descuento: ${p.descuento}%
          <button onclick="eliminarProducto(${p.id})">Eliminar</button>
          <button onclick="mostrarFormularioModificar(${p.id}, '${p.titulo}', '${p.categoria}', ${p.precio}, '${p.fecha_lanzamiento}', ${p.descuento})">Modificar</button>
        `;
        listaProductos.appendChild(li);
      });
    } catch (error) {
      console.error(error);
      listaProductos.innerHTML = '<li>Error al cargar productos.</li>';
    }
  }

  // Function to delete product
  async function eliminarProducto(id) {
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

  // Function to modify product
  async function modificarProducto(id) {
    const nuevoTitulo = document.getElementById('nuevo_titulo').value;
    const nuevaCategoria = document.getElementById('nueva_categoria').value;
    const nuevoPrecio = parseFloat(document.getElementById('nuevo_precio').value);
    const nuevaFecha = document.getElementById('nueva_fecha_lanzamiento').value;
    const nuevoDescuento = parseFloat(document.getElementById('nuevo_descuento').value);

    try {
      const response = await fetch(`/api/productos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo: nuevoTitulo, categoria: nuevaCategoria, precio: nuevoPrecio, fecha_lanzamiento: nuevaFecha, descuento: nuevoDescuento })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error desconocido');
      }

      alert("✏️ Producto actualizado.");
      cargarProductos();
      ocultarFormularioModificar();
    } catch (error) {
      alert("❌ Error al actualizar producto: " + error.message);
    }
  }

  // === USUARIOS ===
  const formUsuario = document.getElementById("formUsuario");
  const listaUsuarios = document.getElementById("listaUsuarios");

  if (formUsuario) {
    formUsuario.addEventListener("submit", agregarUsuario);
  }

  // Function to add user
  async function agregarUsuario(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre_usuario').value;
    const email = document.getElementById('email_usuario').value;
    const password = document.getElementById('password_usuario').value;
    const rol = document.getElementById('rol_usuario').value;

    try {
      const response = await fetch('/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, password, rol })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error desconocido');
      }

      alert("✅ Usuario agregado correctamente.");
      formUsuario.reset();
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
      listaUsuarios.innerHTML = '';
      data.forEach(u => {
        const li = document.createElement('li');
        li.innerHTML = `
          <strong>${u.nombre}</strong> - ${u.email} - Rol: ${u.rol}
          <button onclick="eliminarUsuario(${u.id})">Eliminar</button>
          <button onclick="mostrarFormularioModificarUsuario(${u.id}, '${u.nombre}', '${u.email}', '${u.rol}')">Modificar</button>
        `;
        listaUsuarios.appendChild(li);
      });
    } catch (error) {
      console.error(error);
      listaUsuarios.innerHTML = '<li>Error al cargar usuarios.</li>';
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
  async function modificarUsuario(id) {
    const nuevoNombre = document.getElementById('nuevo_nombre_usuario').value;
    const nuevoEmail = document.getElementById('nuevo_email_usuario').value;
    const nuevoRol = document.getElementById('nuevo_rol_usuario').value;

    try {
      const response = await fetch(`/api/usuarios/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: nuevoNombre, email: nuevoEmail, rol: nuevoRol })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error desconocido');
      }

      alert("✏️ Usuario actualizado.");
      cargarUsuarios();
      ocultarFormularioModificarUsuario();
    } catch (error) {
      alert("❌ Error al actualizar usuario: " + error.message);
    }
  }

  // === PROVEEDORES ===
  const formProveedor = document.getElementById("formProveedor");
  const listaProveedores = document.getElementById("listaProveedores");

  if (formProveedor) {
    formProveedor.addEventListener("submit", agregarProveedor);
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
      formProveedor.reset();
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
      listaProveedores.innerHTML = '';
      data.forEach(p => {
        const li = document.createElement('li');
        li.textContent = `${p.nombre} - ${p.correo} - Artículos: ${p.articulos}`;

        const btnModificar = document.createElement('button');
        btnModificar.textContent = 'Modificar';
        btnModificar.classList.add("modificar-button");
        btnModificar.onclick = () => modificarProveedor(p.id, p.nombre, p.correo, p.articulos);

        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.classList.add("eliminar-button");
        btnEliminar.onclick = () => eliminarProveedor(p.id);

        li.appendChild(btnModificar);
        li.appendChild(btnEliminar);
        listaProveedores.appendChild(li);
      });
    } catch (error) {
      console.error(error);
      listaProveedores.innerHTML = '<li>Error al cargar proveedores.</li>';
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

  // Cargar todo al iniciar
  cargarProductos();
  cargarUsuarios();
  cargarProveedores();
});