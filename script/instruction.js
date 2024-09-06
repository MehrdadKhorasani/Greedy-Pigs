import { instruction_view } from "./instruction_UI.js";
import { initMenu } from "./menu_UI.js";

export function closeInstructionPage(e) {
  if (instruction_view.classList.contains('hiddenView')) {
    document.removeEventListener('keydown', closeInstructionPage)
    return;
  }

  if (e.key === 'Escape') initMenu()
}