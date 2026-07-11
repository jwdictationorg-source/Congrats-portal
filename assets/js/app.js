export const showToast = (message, type = 'info') => {
    const container = document.getElementById('toast-container');
    if (!container) {
        alert(message);
        return;
    }
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    container.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
};

export const loadComponent = async (id, url) => {
    const element = document.getElementById(id);
    if (element) {
        try {
            const response = await fetch(url);
            if (response.ok) {
                element.innerHTML = await response.text();
            }
        } catch (error) {
            console.error(error);
        }
    }
};

export const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
};

window.toggleAppTheme = toggleTheme;

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    loadComponent('navbar-placeholder', 'components/navbar.html');
});
