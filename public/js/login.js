function toggleSenha() {
  const input = document.getElementById('senha');
  input.type = input.type === 'password' ? 'text' : 'password';
}

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const btn = document.querySelector('.btn-entrar');

  btn.textContent = 'Entrando...';
  btn.disabled = true;

  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.token);
      window.location.href = '/dashboard.html';
    } else {
      alert(data.mensagem || 'Email ou senha incorretos');
      btn.textContent = 'Entrar';
      btn.disabled = false;
    }
  } catch (error) {
    alert('Erro ao conectar com o servidor');
    btn.textContent = 'Entrar';
    btn.disabled = false;
  }
});
