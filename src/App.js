import {useState} from 'react'
import './App.css'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'
import _ from 'lodash'
import {v4} from 'uuid'

const item = {
  id: v4(),
  name: 'yoga',
  desc: 'karmic',
  startDate: '2022-09-28',
  endDate: '2022-09-28',
  time: '07:30',
}

const item2 = {
  id: v4(),
  name: 'Meditation',
  desc: 'Mindfulness, Transcendental',
  startDate: '2022-09-28',
  endDate: '2021-06-28',
  time: '08:00',
}

function App() {
  const [text, setText] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [endDate, setEndDate] = useState('')
  const [description, setDescription] = useState('')
  const [state, setState] = useState({
    todo: {
      title: 'Todo',
      items: [item, item2],
    },
    'in-progress': {
      title: 'In Progress',
      items: [],
    },
    done: {
      title: 'Completed',
      items: [],
    },
  })

  const handleDragEnd = ({destination, source}) => {
    if (!destination) {
      return
    }

    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return
    }

    const itemCopy = {...state[source.droppableId].items[source.index]}

    setState(prev => {
      prev = {...prev}

      prev[source.droppableId].items.splice(source.index, 1)

      prev[destination.droppableId].items.splice(destination.index, 0, itemCopy)

      return prev
    })
  }

  const addItem = () => {
    setState(prev => {
      return {
        ...prev,
        todo: {
          title: 'Todo',
          items: [
            {
              id: v4(),
              name: text,
              desc: description,
              startDate: date,
              endDate: endDate,
              time: time,
            },
            ...prev.todo.items,
          ],
        },
      }
    })

    setText('')
  }

  return (
    <div>
      <div className="App">
        <div>
          <div className="container">
            <h2 className="head">Task Manager</h2>
            <li>
              <input
                type="text"
                className="inp"
                placeholder="Name"
                value={text}
                onChange={e => setText(e.target.value)}
              />
            </li>
            <li>
              {' '}
              <input type="file" className="inp" />
            </li>
            <li>
              <input
                type="text"
                className="inp"
                placeholder="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </li>
            <h3>Details</h3>
            <li>
              <select className="inp">
                <option>status</option>
                <option>Todo</option>
                <option>InProgress</option>
                <option>Completed</option>
              </select>
            </li>
            <li>
              <label htmlFor="start">Start date</label>
              <input
                id="start"
                value={date}
                className="inp"
                onChange={e => setDate(e.target.value)}
                type="date"
              />
            </li>
            <li>
              <label htmlFor="end">End Date</label>
              <input
                id="end"
                value={endDate}
                className="inp"
                onChange={e => setEndDate(e.target.value)}
                type="date"
              />
            </li>
            <li>
              <label htmlFor="dur">Duration</label>
              <input
                id="dur"
                value={time}
                className="inp"
                onChange={e => setTime(e.target.value)}
                type="time"
              />
            </li>
            <button type="button" className="btn" onClick={addItem}>
              Add
            </button>
          </div>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          {_.map(state, (data, key) => {
            return (
              <div key={key} className="column">
                <h3>{data.title}</h3>

                <Droppable droppableId={key}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="droppable-col"
                      >
                        {data.items.map((el, index) => {
                          return (
                            <Draggable
                              key={el.id}
                              index={index}
                              draggableId={el.id}
                            >
                              {(provided, snapshot) => {
                                console.log(snapshot)
                                return (
                                  <div
                                    className={`item ${
                                      snapshot.isDragging && 'dragging'
                                    }`}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    {el.name}
                                    <p className="desc">{el.desc}</p>
                                    <p className="date">
                                      Start-Date: {el.startDate} <br />{' '}
                                      End-Date:
                                      {el.endDate}
                                    </p>
                                    <p>Duration : {el.time} </p>
                                  </div>
                                )
                              }}
                            </Draggable>
                          )
                        })}
                        {provided.placeholder}
                      </div>
                    )
                  }}
                </Droppable>
              </div>
            )
          })}
        </DragDropContext>
      </div>
    </div>
  )
}

export default App
