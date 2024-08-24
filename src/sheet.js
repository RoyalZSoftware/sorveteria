const SHEET_COLLAPSED = 0;
const SHEET_DRAWED = 30;
const SHEET_EXPANDED = 100;

function initializeSheet(sheetEl) {
  sheetEl.style.display = 'none';
  const handle = sheetEl.querySelector('[sheet-handle]');
  const sheetContent = sheetEl.querySelector('[sheet-content]');

  const percentFromClientY = (clientY) => {
    console.log(window);
    const totalHeight = window.innerHeight;
    const percent = 1 - ((clientY - 32)/ totalHeight);

    return percent < 0 ? 0 : percent > 1 ? 1 : percent;
  }

  const nextDockPoint = (curPos, delta) => {
    const newPos = curPos + delta;
    if (newPos >= 70) return SHEET_EXPANDED;
    if (newPos >= 20) return SHEET_DRAWED;
    return SHEET_COLLAPSED;
  }

  let position = 0;
  let mouseMoveListener = undefined;

  handle.addEventListener('mousedown', (ev) => {
    let startClientY = ev.clientY;
    sheetEl.style.transition = '';
    ev.preventDefault();
    const mouseMove = (e) => {
      position = percentFromClientY(e.clientY) * 100;
      console.log("Moving mouse", percentFromClientY(e.clientY));
      sheetEl.style.transform = `translateY(${100 - percentFromClientY(e.clientY) * 100}%)`;
    }
    const mouseUp = (e) => {
      const finalClientY = e.clientY;
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);
      const delta = startClientY - finalClientY;
      dockTo(nextDockPoint(position, delta));
    }

    window.addEventListener('mouseup', mouseUp);
    window.addEventListener('mousemove', mouseMove);
  });

  const dockTo = (dockPoint) => {
    sheetEl.style.transition = 'transform 0.3s';
    const handleSize = dockPoint != 100 ? 16 + 80: 0;
    sheetEl.style.transform = `translateY(calc(${100 - dockPoint}% - ${handleSize}px))`;
  };

  return {
    render: (contentEl) => {
      sheetContent.innerHTML = contentEl.innerHTML;
    },
    state: SHEET_COLLAPSED,
    draw: () => {
      Sheet.state = SHEET_DRAWED;
      dockTo(Sheet.state);
    },
    expand: () => {
      Sheet.state = SHEET_EXPANDED;
      dockTo(Sheet.state);
    },
    collapse: () => {
      Sheet.state = SHEET_COLLAPSED;
      dockTo(Sheet.state);
    },
    hide: () => {
      sheetEl.style.display = 'none';
    },
    show: () => {
      sheetEl.style.display = 'block';
    }
  }
};

