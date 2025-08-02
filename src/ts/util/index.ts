function autoLoad(func: CallableFunction) {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        func();
      }
    },
    {
      rootMargin: "0px",
      threshold: 1.0,
    },
  );
  observer.observe(document.getElementById("eop")!);
}

/**
 * Get Date CST shaped as YYYY${desp}MM${desp}DD from a Date Object
 * @function
 */
function getDateCST(date: Date, desp: string) {
  const str = date.toISOString();
  const _date = new Date(str.replace("Z", "-08:00"));
  return _date.toISOString().slice(0, 10).replace(/-/g, desp);
}

export { autoLoad, getDateCST };
