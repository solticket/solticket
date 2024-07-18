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

const CreateEventForm = () => {
  const { closeModal } = useModalStore()
  const form = useForm({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      title: '',
      description: '',
      date: '',
      location: '',
      count: 0,
    },
  })

  const { createEvent } = useProgramContext()

  const onSubmit = async (values: z.infer<typeof createEventSchema>) => {
    const eventData = {
      ...values,
      deadline: new BN(new Date(values.date).getTime() / 1000),
      category: 'VIRTUAL',
      // image: 'https://spaceholder.cc/i/400x400',
    }
    await createEvent(eventData)
    closeModal()
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
                name="count"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{'Number of places'}</FormLabel>
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
