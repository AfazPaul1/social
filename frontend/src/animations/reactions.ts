export const popAnimation = (el: HTMLElement) => {
  el.animate(
    [
      {transform: 'scale(1) rotate(0deg)'},
      {transform:'scale(1.25) rotate(12deg)'},
      {transform: 'scale(1.5) rotate(40deg)'},
      {transform:'scale(1) rotate(0deg)'},
    ],
    {
      duration: 380,
      easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      //fill:"forwards" //using size to show state is not a good idea apparently. facebook youtube only use color changes. ig material ui things. also avoids layout issues etc. lets not persist animation states
    }
  )
}
export const bumpAnimation = (el: HTMLElement) => {
  el.animate(
    [
      { transform: 'translateY(0)' },
      { transform: 'translateY(-6px)' },
      { transform: 'translateY(0)' }
    ],
    {
      duration: 200,
      easing: 'ease'
    }
  )
}

export const shakeAnimation = (el: HTMLElement) => {
  el.animate(
    [
      { transform: 'translateX(0)' },
      { transform: 'translateX(-5px)' },
      { transform: 'translateX(5px)' },
      { transform: 'translateX(0)' }
    ],
    {
      duration: 200,
      easing: 'ease'
    }
  )
}