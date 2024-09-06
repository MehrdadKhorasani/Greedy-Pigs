import { menu_view } from "./menu_UI.js";
import { closeInstructionPage } from "./instruction.js"
export const instruction_view = document.querySelector('.main-instruction');

export function instructionUI() {
  menu_view.classList.add("hiddenView");
  instruction_view.classList.remove("hiddenView");

  document.addEventListener('keydown', closeInstructionPage)
}
