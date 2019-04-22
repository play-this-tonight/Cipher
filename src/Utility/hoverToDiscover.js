const display = 'data-hover-display';
const discover = 'data-hover-discover';

const hideRound = (round) => () => {
  document.querySelectorAll(`[${display}="${round}"]`).forEach((element) => {
    element.classList.add("makeLarger");
  })
}

const displayRound = (round) => () => {
  document.querySelectorAll(`[${display}="${round}"]`).forEach((element) => {
    element.classList.remove("makeLarger");
  })
}


const hoverToDiscover = (round) => {
  const boundHideRound = hideRound(round);
  const boundDisplayRound = displayRound(round);

  const hoverEl = document.querySelector(`[${discover}="${round}"]`);

  // document.querySelector(`[${discover}="${round}"]`).addEventListener('mouseEnter', boundDisplayRound);
  // document.querySelector(`[${discover}="${round}"]`).addEventListener('moseLeave', boundHideRound);



}

export { hoverToDiscover };
