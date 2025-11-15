const supabaseUrl = 'https://qzxisawelwxjlffcbnvf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6eGlzYXdlbHd4amxmZmNibnZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3ODY2NDUsImV4cCI6MjA3NTM2MjY0NX0.ipa79U9oPZ1SmO5xsifgnryJJUw_8YpRuTKtiTQxXPs';
const supabase = createClient(supabaseUrl, supabaseKey);

document.addEventListener("DOMContentLoaded", () => {
  // === PRODUCTOS ===
  const formProducto = document.getElementById("formProducto");
  const listaProductos = document.getElementById("listaProductos");

  if (formProducto) {
    formProducto.addEventListener("submit", async function(e) {
      e.preventDefault();
      const titulo = document.getElementById("tituloProducto").value.trim();
      const categoria = document.getElementById("categoriaProducto").value.trim();
      const precio = parseFloat(document.getElementById("precioProducto").value.trim());
      const fecha = document.getElementById("fechaLanzamiento").value.trim();
      const descuento = parseFloat(document.getElementById("descuentoProducto").value.trim()) || 0;

      const { data, error } = await supabase.from('productos').insert([{ titulo, categoria, precio, fecha_lanzamiento: fecha, descuento }]);

      if (error) {
        alert("❌ Error al agregar producto: " + error.message);
      } else {
        alert("✅ Producto agregado correctamente.");
        formProducto.reset();
        cargarProductos();
      }
    });
  }

  async function cargarProductos() {
    const { data, error } = await supabase.from('productos').select('*');

    if (error) {
      console.error(error);
      listaProductos.innerHTML = '<li>Error al cargar productos.</li>';
      return;
    }

    listaProductos.innerHTML = '';
    data.forEach(p => {
      const li = document.createElement('li');
      li.textContent = `${p.titulo} - ${p.categoria} - $${parseFloat(p.precio).toFixed(2)}`;

      const btnModificar = document.createElement('button');
      btnModificar.textContent = 'Modificar';
      btnModificar.classList.add("modificar-button");
      btnModificar.onclick = () => modificarProducto(p.id, p.titulo, p.categoria, p.precio, p.fecha_lanzamiento, p.descuento);

      const btnEliminar = document.createElement('button');
      btnEliminar.textContent = 'Eliminar';
      btnEliminar.classList.add("eliminar-button");
      btnEliminar.onclick = () => eliminarProducto(p.id);

      li.appendChild(btnModificar);
      li.appendChild(btnEliminar);
      listaProductos.appendChild(li);
    });
  }

  async function eliminarProducto(id) {
    if (!confirm("¿Estás seguro de eliminar este producto?")) return;

    const { data, error } = await supabase.from('productos').delete().eq('id', id);

    if (error) {
      alert("❌ Error al eliminar producto: " + error.message);
    } else {
      alert("🗑️ Producto eliminado.");
      cargarProductos();
    }
  }

  async function modificarProducto(id, titulo, categoria, precio, fecha, descuento) {
    const nuevoTitulo = prompt("Nuevo título:", titulo);
    const nuevaCategoria = prompt("Nueva categoría:", categoria);
    const nuevoPrecio = parseFloat(prompt("Nuevo precio:", precio));
    const nuevaFecha = prompt("Fecha de lanzamiento:", fecha);
    const nuevoDescuento = parseFloat(prompt("Descuento (%):", descuento || 0));

    const { data, error } = await supabase.from('productos').update({
      titulo: nuevoTitulo,
      categoria: nuevaCategoria,
      precio: nuevoPrecio,
      fecha_lanzamiento: nuevaFecha,
      descuento: nuevoDescuento
    }).eq('id', id);

    if (error) {
      alert("❌ Error al actualizar producto: " + error.message);
    } else {
      alert("✏️ Producto actualizado.");
      cargarProductos();
    }
  }

  // === USUARIOS ===
  const formUsuario = document.getElementById("formUsuario");
  const listaUsuarios = document.getElementById("listaUsuarios");

  if (formUsuario) {
    formUsuario.addEventListener("submit", async function(e) {
      e.preventDefault();
      const nombre = document.getElementById("nombreUsuario").value.trim();
      const correo = document.getElementById("correoUsuario").value.trim();
      const rol = document.getElementById("rolUsuario").value;

      const { data, error } = await supabase.from('usuarios').insert([{ nombre, correo, rol }]);

      if (error) {
        alert("❌ Error al agregar usuario: " + error.message);
      } else {
        alert("👤 Usuario agregado correctamente.");
        formUsuario.reset();
        cargarUsuarios();
      }
    });
  }

  async function cargarUsuarios() {
    const { data, error } = await supabase.from('usuarios').select('*');

    if (error) {
      console.error(error);
      listaUsuarios.innerHTML = '<li>Error al cargar usuarios.</li>';
      return;
    }

    listaUsuarios.innerHTML = '';
    data.forEach(u => {
      const li = document.createElement('li');
      li.textContent = `${u.nombre} - ${u.correo} - Rol: ${u.rol}`;

      const btnModificar = document.createElement('button');
      btnModificar.textContent = 'Modificar';
      btnModificar.classList.add("modificar-button");
      btnModificar.onclick = () => modificarUsuario(u.id, u.nombre, u.correo, u.rol);

      const btnEliminar = document.createElement('button');
      btnEliminar.textContent = 'Eliminar';
      btnEliminar.classList.add("eliminar-button");
      btnEliminar.onclick = () => eliminarUsuario(u.id);

      li.appendChild(btnModificar);
      li.appendChild(btnEliminar);
      listaUsuarios.appendChild(li);
    });
  }

  async function eliminarUsuario(id) {
    if (!confirm("¿Estás seguro de eliminar a este usuario?")) return;

    const { data, error } = await supabase.from('usuarios').delete().eq('id', id);

    if (error) {
      alert("❌ Error al eliminar usuario: " + error.message);
    } else {
      alert("🗑️ Usuario eliminado.");
      cargarUsuarios();
    }
  }

  async function modificarUsuario(id, nombre, correo, rol) {
    const nuevoNombre = prompt("Nuevo nombre:", nombre);
    const nuevoCorreo = prompt("Nuevo correo:", correo);
    const nuevoRol = prompt("Nuevo rol (cliente/admin):", rol);

    const { data, error } = await supabase.from('usuarios').update({
      nombre: nuevoNombre,
      correo: nuevoCorreo,
      rol: nuevoRol
    }).eq('id', id);

    if (error) {
      alert("❌ Error al actualizar usuario: " + error.message);
    } else {
      alert("✏️ Usuario actualizado.");
      cargarUsuarios();
    }
  }

  // === PROVEEDORES ===
  const formProveedor = document.getElementById("formProveedor");
  const listaProveedores = document.getElementById("listaProveedores");

  if (formProveedor) {
    formProveedor.addEventListener("submit", async function(e) {
      e.preventDefault();
      const nombre = document.getElementById("nombreProveedor").value.trim();
      const correo = document.getElementById("correoProveedor").value.trim();
      const articulos = document.getElementById("articulosProveedor").value.trim();

      const { data, error } = await supabase.from('proveedores').insert([{ nombre, correo, articulos }]);

      if (error) {
        alert("❌ Error al agregar proveedor: " + error.message);
      } else {
        alert("📦 Proveedor agregado correctamente.");
        formProveedor.reset();
        cargarProveedores();
      }
    });
  }

  async function cargarProveedores() {
    const { data, error } = await supabase.from('proveedores').select('*');

    if (error) {
      console.error(error);
      listaProveedores.innerHTML = '<li>Error al cargar proveedores.</li>';
      return;
    }

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
  }

  async function eliminarProveedor(id) {
    if (!confirm("¿Estás seguro de eliminar a este proveedor?")) return;

    const { data, error } = await supabase.from('proveedores').delete().eq('id', id);

    if (error) {
      alert("❌ Error al eliminar proveedor: " + error.message);
    } else {
      alert("🗑️ Proveedor eliminado.");
      cargarProveedores();
    }
  }

  async function modificarProveedor(id, nombre, correo, articulos) {
    const nuevoNombre = prompt("Nuevo nombre:", nombre);
    const nuevoCorreo = prompt("Nuevo correo:", correo);
    const nuevosArticulos = prompt("Nuevos artículos:", articulos);

    const { data, error } = await supabase.from('proveedores').update({
      nombre: nuevoNombre,
      correo: nuevoCorreo,
      articulos: nuevosArticulos
    }).eq('id', id);

    if (error) {
      alert("❌ Error al actualizar proveedor: " + error.message);
    } else {
      alert("✏️ Proveedor actualizado.");
      cargarProveedores();
    }
  }

  // Cargar todo al iniciar
  cargarProductos();
  cargarUsuarios();
  cargarProveedores();
});