import React, { useRef, useState, useEffect } from 'react'
import { createRoot, Root } from 'react-dom/client'
import css from './index.module.scss'

interface Props {
  visible: boolean,
  onAnimationend?: () => void
}

function Loading (props: Props) {
  const { visible: visibleProps, onAnimationend } = props
  const wrapperEl = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState<boolean>(visibleProps)

  useEffect(toggleDialog, [visibleProps])

  function toggleDialog () {
    const wrapper = wrapperEl.current
    if (visibleProps) {
      setVisible(visibleProps)
    } else {
      wrapper?.classList.add('animate__fadeOut')
      wrapper?.addEventListener('animationend', () => {
        setVisible(false)
        onAnimationend && onAnimationend()
      }, { once: true })
    }
  }

  return (
    visible
      ? <div ref={wrapperEl} className={[css.mask, 'animate__animated', 'animate__fadeIn'].join(' ')}>
        <div className={css.loading}></div>
      </div>
      : null
  )
}

class LoadingClass {
  private readonly root: Root

  constructor () {
    this.root = LoadingClass.getRoot()
  }

  private static getRoot () {
    const container = document.createElement('div')
    document.body.appendChild(container)
    return createRoot(container)
  }

  show () {
    const params = { visible: true }
    this.root.render(<Loading {...params}/>)
  }

  hide (onAnimationend?: () => void) {
    const params = {
      visible: false,
      onAnimationend
    }
    this.root.render(<Loading {...params}/>)
  }
}

export { LoadingClass }
export default Loading
