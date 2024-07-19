import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Event } from '@/types/event'
import dayjs from 'dayjs'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'

const EventCard = ({ event }: { event: Event }) => {
  console.log('🚀🚀🚀 ~ EventCard ~ event:', event)
  const router = useRouter()
  return (
    <Card
      className="flex-grow-0 flex-shrink-0 cursor-pointer"
      onClick={() => {
        router.push('/event/' + event.publicKey.toString())
      }}
    >
      <div className="h-[200px] bg-gray-100 rounded-t-lg flex-grow-0 flex-shrink-0 relative">
        <Image
          src="https://spaceholder.cc/i/300x200"
          alt={event.account.title}
          className="w-full h-[200px] object-cover rounded-t-lg"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <CardHeader className="p-4 flex flex-col space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold capitalize">{`${event.account.title}, ${event.account.location}`}</CardTitle>
        <CardDescription>
          {dayjs(event.account.startDate.toNumber() * 1000).format(
            'DD MMM YYYY',
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 text-sm">
        {event.account.description}
      </CardContent>
      <CardFooter className="px-4 pt-0">
        <Button>{'See more'}</Button>
      </CardFooter>
    </Card>
  )
}

export default EventCard
