'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useProgramContext } from '../../context/program.context'
import { BN } from 'bn.js'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { createEventSchema } from '../../schema/event.schema'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from '../ui/form'
import { Input } from '../ui/input'
import { z } from 'zod'
import { Button } from '../ui/button'
import { useModalStore } from '@/stores/modal.store'
import { useState } from 'react'

const convertToBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)

    fileReader.onload = () => {
      if (!fileReader.result) {
        reject('Failed to read file')
      }

      const [_t, base64] = (fileReader.result as string).split(',')

      resolve(base64)
    }

    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}

const CreateEventForm = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(
    'https://spaceholder.cc/i/300x200',
  )
  const { closeModal } = useModalStore()
  const form = useForm({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      title: '',
      description: '',
      date: '',
      location: '',
      totalSeats: 0,
      image: null as null | File,
    },
  })

  const { createEvent } = useProgramContext()

  const onSubmit = async (values: z.infer<typeof createEventSchema>) => {
    await createEvent({
      title: values.title,
      description: values.description,
      location: values.location,
      category: 'VIRTUAL',
      startDate: new BN(new Date(values.date).getTime() / 1000),
      totalSeats: values.totalSeats,
      imageUrl: imageUrl ?? 'https://spaceholder.cc/i/300x200',
    })
    closeModal()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return
    const base64 = await convertToBase64(file)

    const response = await fetch('/api/upload-image', {
      method: 'POST',
      body: JSON.stringify({ image: base64 }),
    })

    const { url } = await response.json()

    setImageUrl(url)
  }

  return (
    <DialogContent className="overflow-scroll">
      <DialogHeader>
        <DialogTitle className="mb-6">Create event</DialogTitle>
        <DialogDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{'Title'}</FormLabel>
                    <FormControl>
                      <Input placeholder="Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{'Description'}</FormLabel>
                    <FormControl>
                      <Input placeholder="Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{'Date'}</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{'Location'}</FormLabel>
                    <FormControl>
                      <Input placeholder="Location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image"
                render={() => (
                  <FormItem>
                    <FormLabel>{'Image'}</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        placeholder="Image"
                        onChange={handleFileChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="totalSeats"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{'Total seats'}</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(event) =>
                          field.onChange(+event.target.value)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-end">
                <Button type="submit">{'Create event'}</Button>
              </div>
            </form>
          </Form>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  )
}

export default CreateEventForm
