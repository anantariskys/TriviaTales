import React from 'react'

const QuestionNavigatorLayout:React.FC<{children:React.ReactNode}> = ({children}) => {
  return (
    <div className="grid grid-cols-5 gap-2">
        {children}
    </div>
  )
}

export default QuestionNavigatorLayout