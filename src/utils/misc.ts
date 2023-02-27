export function copyToClip(str: any) {
  function listener(e: any) {
    e?.clipboardData.setData("text/html", str);
    e?.clipboardData.setData("text/plain", str);
    e?.preventDefault();
  }
  document.addEventListener("copy", listener);
  document.execCommand("copy");
  document.removeEventListener("copy", listener);
}
