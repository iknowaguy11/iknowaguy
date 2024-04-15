'use client';

import React from 'react'

type PropType = {
  selected: boolean
  index: number
  onClick: () => void
}

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, index, onClick } = props

  return (
    <div
      className={'border-4 overflow-hidden rounded-md embla-thumbs__slide'.concat(
        selected ? ' embla-thumbs__slide--selected' : ''
      )}
    >
      <button
        onClick={onClick}
        type="button"
        className="m-2 embla-thumbs__slide__number"
      >
        {index + 1}
      </button>
    </div>
  )
}
