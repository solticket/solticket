import { useProgramContext } from '@/context/program.context'
import { Button } from '../ui/button'
import { useState } from 'react'
import { EventData } from '@/types/event'
import { BN } from 'bn.js'

const CreateEventForm = () => {
  const { createEvent } = useProgramContext()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    count: '',
  })

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const creerEvent = (e: any) => {
    e.preventDefault()
    const deadLine = new Date(formData.date)
    const eventData: EventData = {
      title: formData.title,
      description: formData.description,
      category: 'VIRTUAL',
      location: formData.location,
      deadline: new BN(new Date(formData.date).getTime() / 1000),
      count: parseInt(formData.count),
    }
    createEvent(eventData)
    // You can add your form submission logic here
  }

  return (
    <div>
      <form onSubmit={creerEvent}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="count">Count:</label>
          <input
            type="number"
            id="count"
            name="count"
            value={formData.count}
            onChange={handleChange}
          />
        </div>
        <Button type="submit" size="lg">
          {'Create an event'}
        </Button>
      </form>
    </div>
  )
}

export default CreateEventForm
