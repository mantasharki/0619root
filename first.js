function loadScript(url) {
  return new Promise((resolve, reject) => {
    // 既に同じ src の <script> があれば再読み込みしない
    if (document.querySelector(`script[src="${url}"]`)) {
      resolve();
      return;
    }

    const s = document.createElement('script');
    s.src = url;                 // ここに文字列で URL を渡す
    s.type = 'text/javascript';
    s.async = true;
    s.onload  = () => resolve();
    s.onerror = (e) => reject(e);
    document.head.appendChild(s);
  });
}

// 使い方例（必ずクォートで囲む）
loadScript('https://mantasharki.github.io/todestination/second.js')
  .then(() => {
    console.log('loaded and executed');
    // 読み込んだスクリプトが window.hello を定義していれば呼べる
    if (typeof window.hello === 'function') window.hello();
  })
  .catch(err => console.error('読み込み失敗:', err));
