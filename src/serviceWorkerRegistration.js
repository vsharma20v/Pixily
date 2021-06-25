const register = () => {
  if ("serviceWorker" in navigator) {
    let swUrl = `${process.env.PUBLIC_URL}/sw.js`;
    navigator.serviceWorker
      .register(swUrl)
      .then((res) => {
        console.log(res.scope);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
};

export default register;
