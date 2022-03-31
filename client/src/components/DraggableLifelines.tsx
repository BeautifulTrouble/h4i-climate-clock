import React, { CSSProperties, useEffect, useState } from 'react'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggingStyle,
  NotDraggingStyle,
} from 'react-beautiful-dnd'
import ReactDOM from 'react-dom'
import { ModuleResInterface } from '../interfaces'
import {
  LIFELINES_LOCAL_STORAGE_KEY,
  NUM_LIFELINES_DISPLAYED,
} from '../util/constants'
import LifelineCard from './LifelineCard'
import { deleteElement, reorderElement } from './utils/utils'

interface DraggableLifelinesInterface {
  lifelinesProp: ModuleResInterface[]
}

const DraggableLifelines = ({ lifelinesProp }: DraggableLifelinesInterface) => {
  const BASE_PADDING = 8
  const [lifelines, setLifelines] = useState<ModuleResInterface[]>([])

  /* did this to solve weird bug of lifelines being set to empty array */
  useEffect(() => {
    setLifelines(lifelinesProp)
  }, [lifelinesProp])

  const deleteLifeline = (index: number) => {
    const modifiedLifelines: ModuleResInterface[] = deleteElement(
      lifelines,
      index,
    )
    setLifelines([...modifiedLifelines])
    localStorage.setItem(LIFELINES_LOCAL_STORAGE_KEY, JSON.stringify(lifelines))
  }

  const getDraggableItemStyle = (
    draggableStyle: DraggingStyle | NotDraggingStyle | undefined,
    isDisplayed: boolean,
  ): CSSProperties => ({
    height: '12.5%',
    backgroundColor: isDisplayed ? 'lightgreen' : 'darkgrey',
    padding: BASE_PADDING * 2,
    margin: `0 0 ${BASE_PADDING}px 0`,
    ...draggableStyle,
  })

  const getDroppableStyle = () => ({
    padding: BASE_PADDING,
    margin: '0 auto',
    width: '95vw',
    border: '2px black solid',
  })

  const onDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      return
    }
    reorderElement(lifelines, result.source.index, result.destination.index)
    localStorage.setItem(LIFELINES_LOCAL_STORAGE_KEY, JSON.stringify(lifelines))
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppableId">
        {(provided, _) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={getDroppableStyle()}
          >
            {lifelines.map((lifeline, index) => (
              <Draggable
                key={index}
                draggableId={index.toString()}
                index={index}
              >
                {(provided, _) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getDraggableItemStyle(
                      provided.draggableProps.style,
                      index < NUM_LIFELINES_DISPLAYED,
                    )}
                  >
                    <LifelineCard
                      lifeline={lifeline}
                      index={index}
                      deleteLifeline={deleteLifeline}
                      isDisplayed={index < NUM_LIFELINES_DISPLAYED}
                    />
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default DraggableLifelines