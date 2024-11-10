function showAlert(message) {
    const alertaMensaje = document.getElementById('alert-mensaje');
    alertaMensaje.innerHTML = message;
    document.getElementById('alert-container').style.display = 'block';
}
document.getElementById('form-registro').addEventListener('submit', async(event)=> {
    event.preventDefault();

    let isValid = true;
    let errorMessage = '';

    // Obtener los valores de los campos
    const name = document.getElementById('name') ? document.getElementById('name').value : '';
    const lastName = document.getElementById('lastName') ? document.getElementById('lastName').value : '';
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validación para "Nombre"
    if (!name.trim()) {
        isValid = false;
        errorMessage += 'El campo "Nombre" no puede estar vacío. <br>';
    } else if (/\d/.test(name)) {
        isValid = false;
        errorMessage += 'El campo "Nombre" no puede contener números. <br>';
    }

    // Validación para "Apellido"
    if (!lastName.trim()) {
        isValid = false;
        errorMessage += 'El campo "Apellido" no puede estar vacío. <br>';
    } else if (/\d/.test(lastName)) {
        isValid = false;
        errorMessage += 'El campo "Apellido" no puede contener números. <br>';
    }

    // Validación para "Correo electrónico"
    if (!email.trim()) {
        isValid = false;
        errorMessage += 'El campo "Correo electrónico" no puede estar vacío. <br>';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        isValid = false;
        errorMessage += 'Por favor, ingrese un correo electrónico válido. <br>';
    }

    // Validación para "Contraseña"
    if (!password.trim()) {
        isValid = false;
        errorMessage += 'El campo "Contraseña" no puede estar vacío. <br>';
    } else if (password.length < 3) {
        isValid = false;
        errorMessage += 'La contraseña debe tener al menos 3 caracteres. <br>';
    }

    // Mostrar los errores
    if (!isValid) {
        const alertMessageElement = document.getElementById('alert-mensaje');
        alertMessageElement.innerHTML = errorMessage;
        document.getElementById('alert-container').style.display = 'block';
    } else {
        try{
            const response = await fetch('http://localhost:3030/api/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name,lastName,email, password })
            });
            const result = await response.json();
            if (response.ok) { 
                alert(`Bienvenido ${result.user.name} ${result.user.lastName}`);
            } else {
                showAlert(result.message || "Error en el inicio de sesión, vuelva a ingresar los datos");
            }
          
        }catch (error) {
        console.error('Error:', error);
        showAlert("No se pudo conectar con el servidor");
    }
    }
});


document.getElementById('cerrar-alert').addEventListener('click', function() {
    document.getElementById('alert-container').style.display = 'none';
});
