/* ==========================================================================
   SiteMarket — branding.js
   Применяет логотип и баннер, один раз загруженные администратором в
   admin.html (см. smUploadBrandingAsset в upload.js), на ВСЕХ страницах
   сайта. Ссылки на файлы, лежащие в Firebase Storage, хранятся в
   Firestore (meta/branding) и зеркалятся в localStorage через
   firebase-sync.js — так что эта функция читает их синхронно, без сети.

   Если админ ничего не загружал — остаются файлы по умолчанию (logo.png,
   banner.webp), которые уже прописаны в HTML как src изначально.
   ========================================================================== */

function smApplyBranding() {
  let branding = {};
  try { branding = JSON.parse(localStorage.getItem('sm_branding') || '{}'); } catch (e) { branding = {}; }

  if (branding.logoUrl) {
    document.querySelectorAll('#sm-logo-img').forEach(function (img) {
      if (img.src !== branding.logoUrl) img.src = branding.logoUrl;
    });
    const favicon = document.getElementById('sm-favicon');
    if (favicon && favicon.href !== branding.logoUrl) favicon.href = branding.logoUrl;
  }

  if (branding.bannerUrl) {
    document.querySelectorAll('#sm-banner-img').forEach(function (img) {
      if (img.src !== branding.bannerUrl) img.src = branding.bannerUrl;
    });
  }
}

document.addEventListener('DOMContentLoaded', smApplyBranding);
window.addEventListener('sm:sync', function (e) {
  if (e.detail && e.detail.collection === 'branding') smApplyBranding();
});
