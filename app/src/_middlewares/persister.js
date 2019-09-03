const customMiddleWare = (store) => (next) => (action) => {
  const state = store.getState();
  localStorage.setItem('HUGO-Generator-state', JSON.stringify(state));

  next(action);
};

export default customMiddleWare;
