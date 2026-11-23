/** 首屏前执行，读取本地偏好/系统偏好，避免深浅色闪烁 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');if(!t){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){}})()`;
