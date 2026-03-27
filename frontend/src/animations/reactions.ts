export const popAnimation = (el:HTMLElement) => {
    el.animate(
        [
             {transform: 'scale(1) rotate(0deg)'},
             {transform:'scale(1.6) rotate(10deg)'},
             {transform:'scale(1.3) rotate(0deg)'},
        ],
         {
            duration:300,
            easing:'ease',
            composite:'add'
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