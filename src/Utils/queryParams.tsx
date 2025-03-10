export function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
      board: params.get("board") ? JSON.parse(params.get("board")!) : null,
      isXNext: params.get("isXNext") === "true",
      history: params.get("history") ? JSON.parse(params.get("history")!) : [],
      step: Number(params.get("step")) || 0,
      redoStack: params.get("redoStack") ? JSON.parse(params.get("redoStack")!) : []
    };
  }
  
  export function setQueryParams(state: any) {
    const params = new URLSearchParams();
    params.set("board", JSON.stringify(state.board));
    params.set("isXNext", state.isXNext);
    params.set("history", JSON.stringify(state.history));
    params.set("step", state.step);
    window.history.replaceState(null, "", `?${params.toString()}`);
  }
  