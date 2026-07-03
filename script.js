// ========================
// MENU MOBILE - TOGGLE
// ========================

const menuToggle = document.getElementById('menuToggle');
const menuMobile = document.getElementById('menuMobile');

// Função para abrir/fechar o menu mobile
function toggleMenu() {
    menuMobile.classList.toggle('active');
}

// Evento ao clicar no botão de menu
menuToggle.addEventListener('click', toggleMenu);

// Fechar menu ao clicar em um link
const linksMenu = menuMobile.querySelectorAll('a');
linksMenu.forEach(link => {
    link.addEventListener('click', () => {
        menuMobile.classList.remove('active');
    });
});

// Fechar menu ao clicar fora
document.addEventListener('click', (e) => {
    const isMenuOpen = menuMobile.classList.contains('active');
    const isMenuToggle = e.target === menuToggle || menuToggle.contains(e.target);
    
    if (isMenuOpen && !isMenuToggle && !menuMobile.contains(e.target)) {
        menuMobile.classList.remove('active');
    }
});

// ========================
// NAVEGAÇÃO SUAVE
// ========================

// Smooth scroll para links de navegação
const navLinks = document.querySelectorAll('a[href^="#"]');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href !== '#') {
            const alvo = document.querySelector(href);
            if (alvo) {
                e.preventDefault();
                alvo.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// ========================
// BOTÕES - INTERATIVIDADE
// ========================

const botaoPrimaria = document.querySelector('.btn-primary:not([type="submit"])');

if (botaoPrimaria) {
    botaoPrimaria.addEventListener('click', () => {
        // Rolar para seção de contato
        const contato = document.getElementById('contato');
        contato.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}

// ========================
// FORMULÁRIO - VALIDAÇÃO E ENVIO
// ========================

const formulario = document.getElementById('formularioContato');
const mensagemStatus = document.getElementById('mensagemStatus');

if (formulario) {
    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Pegar valores dos campos
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();
        
        // Validar campos
        if (!nome || !email || !mensagem) {
            mostrarMensagem('Por favor, preencha todos os campos!', 'erro');
            return;
        }
        
        // Validar email
        if (!validarEmail(email)) {
            mostrarMensagem('Por favor, insira um email válido!', 'erro');
            return;
        }
        
        // Simular envio (em produção, enviar para servidor)
        console.log('Dados do formulário:');
        console.log('Nome:', nome);
        console.log('Email:', email);
        console.log('Mensagem:', mensagem);
        
        // Mostrar mensagem de sucesso
        mostrarMensagem(`✓ Obrigado ${nome}! Sua mensagem foi enviada com sucesso. Entraremos em contato em breve!`, 'sucesso');
        
        // Limpar formulário
        formulario.reset();
        
        // Limpar mensagem após 5 segundos
        setTimeout(() => {
            mensagemStatus.innerHTML = '';
            mensagemStatus.className = '';
        }, 5000);
    });
}

// Função para validar email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Função para mostrar mensagem
function mostrarMensagem(texto, tipo) {
    mensagemStatus.textContent = texto;
    mensagemStatus.className = tipo;
}

// ========================
// ANIMAÇÕES EM SCROLL
// ========================

const observador = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
});

// Observar elementos para animação
const cardsServico = document.querySelectorAll('.card-servico');
cardsServico.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observador.observe(card);
});

// ========================
// VALIDAÇÃO DE ENTRADA EM TEMPO REAL
// ========================

const inputNome = document.getElementById('nome');
const inputEmail = document.getElementById('email');
const inputMensagem = document.getElementById('mensagem');

if (inputNome) {
    inputNome.addEventListener('input', (e) => {
        // Remover números do nome
        e.target.value = e.target.value.replace(/[0-9]/g, '');
    });
}

if (inputEmail) {
    inputEmail.addEventListener('blur', (e) => {
        if (e.target.value && !validarEmail(e.target.value)) {
            e.target.style.borderColor = '#dc3545';
        } else {
            e.target.style.borderColor = '';
        }
    });
}

// ========================
// CONTADOR DE CARACTERES - MENSAGEM
// ========================

if (inputMensagem) {
    const contadorDiv = document.createElement('small');
    contadorDiv.style.display = 'block';
    contadorDiv.style.marginTop = '5px';
    contadorDiv.style.color = '#667eea';
    inputMensagem.parentNode.appendChild(contadorDiv);
    
    inputMensagem.addEventListener('input', (e) => {
        const limite = 500;
        const caracteres = e.target.value.length;
        contadorDiv.textContent = `${caracteres}/${limite} caracteres`;
        
        if (caracteres > limite) {
            e.target.value = e.target.value.substring(0, limite);
            contadorDiv.textContent = `${limite}/${limite} caracteres (máximo atingido)`;
        }
    });
}

// ========================
// EFEITO PARALLAX
// ========================

const hero = document.querySelector('.hero');

if (hero) {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        hero.style.backgroundPosition = `center ${scrollY * 0.5}px`;
    });
}

// ========================
// ATIVA LINK ATUAL NA NAVEGAÇÃO
// ========================

function ativarLinkAtual() {
    const secoes = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let atual = '';
        
        secoes.forEach(secao => {
            const topoSecao = secao.offsetTop;
            const altura = secao.clientHeight;
            
            if (scrollY >= topoSecao - altura / 3) {
                atual = secao.getAttribute('id');
            }
        });
    });
}

ativarLinkAtual();

// ========================
// LOG DE INFORMAÇÕES
// ========================

console.log('%cPágina Web Moderna Carregada com Sucesso! 🚀', 'color: #667eea; font-size: 16px; font-weight: bold;');
console.log('%cDesenvolvido com HTML5, CSS3 e JavaScript Puro', 'color: #764ba2; font-size: 12px;');
console.log('%cAutor: Miguel Silva (Alura)', 'color: #666; font-size: 12px;');

// ========================
// DETECÇÃO DE DISPOSITIVO
// ========================

function ehMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

if (ehMobile()) {
    console.log('📱 Usuário acessando via dispositivo móvel');
} else {
    console.log('💻 Usuário acessando via computador');
}

// ========================
// FEEDBACK DO USUÁRIO
// ========================

document.addEventListener('DOMContentLoaded', () => {
    console.log('✓ DOM totalmente carregado');
    
    // Verificar se todos os recursos foram carregados
    window.addEventListener('load', () => {
        console.log('✓ Todos os recursos foram carregados');
    });
});
