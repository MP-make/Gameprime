async function login() {
    const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Por favor, ingresa email y contraseña");
        return;
    }

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const errorData = await response.json();
            alert("Error: " + errorData.error);
            return;
        }

        const data = await response.json();
        const user = data.user;

        // Store session
        sessionStorage.setItem("sesionIniciada", user.email);
        localStorage.setItem("supabase_session", JSON.stringify(data.session));

        // Check if admin (simple check: if email contains 'admin' or specific)
        if (user.email === 'admin@gameprime.com') {
            window.location.href = "admi.html";
        } else {
            window.location.href = "index.html";
        }
    } catch (error) {
        console.error('Error en login:', error);
        alert("Error al iniciar sesión");
    }
}

window.onload = iniciarPagina;