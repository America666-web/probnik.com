/** @type {import('tailwindcss').Config} */
module.exports = {
  // Сайт статический (без фреймворка) — сканируем все HTML и JS файлы
  // на предмет использованных классов, чтобы в сборку попали только
  // реально используемые Tailwind-утилиты (tree-shaking / purge).
  content: [
    './*.html',
    './*.js'
  ],
  theme: {
    extend: {
      // Пробрасываем существующие CSS-переменные дизайн-системы как
      // Tailwind-утилиты (bg-*, text-*, border-*, rounded-*, shadow-*),
      // чтобы новый код можно было писать классами Tailwind, а старый
      // CSS (см. tailwind.css) продолжал работать как раньше.
      colors: {
        'bg-primary': 'var(--bg-primary)',
        'bg-secondary': 'var(--bg-secondary)',
        'bg-card': 'var(--bg-card)',
        'bg-card-hover': 'var(--bg-card-hover)',
        'border-c': 'var(--border-color)',
        'text-main': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        accent: 'var(--accent)',
        'accent-2': 'var(--accent2)',
        'accent-3': 'var(--accent3)',
        'accent-hover': 'var(--accent-hover)',
        danger: 'var(--danger)',
        success: 'var(--success)'
      },
      borderRadius: {
        lg2: 'var(--radius-lg)',
        md2: 'var(--radius-md)',
        sm2: 'var(--radius-sm)'
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)'
      },
      fontFamily: {
        display: ['Space Grotesk', 'Segoe UI', 'sans-serif'],
        body: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      }
    }
  },
  // Отключаем сброс стилей Tailwind (preflight) — у сайта уже есть
  // собственный, точно подобранный сброс в tailwind.css, и
  // включение preflight поверх него может незаметно поменять вид
  // существующих страниц (что нам как раз нельзя — функционал/вид
  // не должен сломаться).
  corePlugins: {
    preflight: false
  },
  plugins: []
};
