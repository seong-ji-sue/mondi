import { closeAlert, openAlert } from "./alert";

export const wonComma = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const copyUrl = () => {
  const textarea = document.createElement("textarea");
  textarea.value = window.location.href;
  textarea.style.top = "0";
  textarea.style.left = "0";
  textarea.style.position = "fixed";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
  openAlert({ title: "링크가 복사되었습니다.", onYes: closeAlert })
}