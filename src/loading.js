const element = document.getElementById("loading");
const uiLoading = {
  isLoading: false,
  start: () => {
    uiLoading.isLoading = true;
    element.className += " loading"
  },
  stop: () => {
    uiLoading.isLoading = false;;
    element.className = element.className.replace(" loading", "");
  },
  promise: async (promise) => {
    uiLoading.isLoading = true;
    promise.then(() => uiLoading.isLoading = false).catch(() => uiLoading.isLoading = false);
  }
};

