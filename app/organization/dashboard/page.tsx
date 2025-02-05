"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight } from "lucide-react"
import { createEvent, getAllEvents } from "@/app/utils/api"

// Dummy data
const initialJobs = [
  { id: 1, title: "Stitching Expert", category: "Stitching Work", status: "Active", openings: 2 },
  { id: 2, title: "Boutique Manager", category: "Boutique Management", status: "Active", openings: 1 },
  { id: 3, title: "Bag Designer", category: "Bag Making", status: "Closed", openings: 0 },
]

const initialEvents = [
  { id: 1, title: "Women in Crafts Workshop", date: "2023-07-15", location: "Online" },
  { id: 2, title: "Entrepreneurship Seminar", date: "2023-08-01", location: "City Convention Center" },
]

export default function OrganizationDashboard() {
  const [jobs, setJobs] = useState(initialJobs)
  const [events, setEvents] = useState([])
  const [showAddJobForm, setShowAddJobForm] = useState(false)
  const [showAddEventForm, setShowAddEventForm] = useState(false)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const fetchedEvents = await getAllEvents()
        setEvents(fetchedEvents)
      } catch (error) {
        console.error("Error fetching events:", error)
      }
    }

    fetchEvents()
  }, [])

  const handleAddJob = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const jobData = Object.fromEntries(formData)
    setJobs([...jobs, { id: jobs.length + 1, ...jobData, status: "Active" }])
    setShowAddJobForm(false)
  }

  const handleAddEvent = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const eventData = Object.fromEntries(formData)
    
    try {
      const newEvent = await createEvent(eventData)
      setEvents([...events, { id: events.length + 1, ...newEvent }])
      setShowAddEventForm(false)
    } catch (error) {
      console.error("Error adding event:", error)
    }
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Organization Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total Jobs Posted</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{jobs.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Job Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{jobs.filter((job) => job.status === "Active").length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Events Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{events.length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Quick Actions</h2>
        <div className="space-x-4">
          <Button onClick={() => setShowAddJobForm(true)}>Post a Job</Button>
          <Button onClick={() => setShowAddEventForm(true)} variant="outline">
            Create an Event
          </Button>
        </div>
      </div>

      <Button asChild className="mt-4">
        <Link href="/organization/job-posts">View All Job Posts</Link>
      </Button>

      {showAddJobForm && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Add New Job</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddJob} className="space-y-4">
              <div>
                <Label htmlFor="title">Job Title</Label>
                <Input id="title" name="title" required />
              </div>
              <div>
                <Label htmlFor="description">Job Description</Label>
                <Textarea id="description" name="description" required />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input id="category" name="category" required />
              </div>
              <div>
                <Label htmlFor="openings">Number of Openings</Label>
                <Input id="openings" name="openings" type="number" required />
              </div>
              <Button type="submit">Post Job</Button>
            </form>
          </CardContent>
        </Card>
      )}

      {showAddEventForm && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Create New Event</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddEvent} className="space-y-4">
              <div>
                <Label htmlFor="title">Event Name</Label>
                <Input id="title" name="title" required />
              </div>
              <div>
                <Label htmlFor="description">Event Description</Label>
                <Textarea id="description" name="description" required />
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Input id="date" name="date" type="date" required />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" required />
              </div>
              <Button type="submit">Create Event</Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Job Postings</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {jobs.slice(0, 3).map((job) => (
                <li key={job.id} className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">{job.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {job.category} - {job.status}
                    </p>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/organization/jobs/${job.id}`}>
                      View <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <Button asChild variant="link">
                <Link href="/organization/jobs">View All Jobs</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {events.map((event) => (
                <li key={event.id} className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">{event.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {new Date(event.date).toLocaleDateString()} - {event.location}
                    </p>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/organization/events/${event.id}`}>
                      View <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <Button asChild variant="link">
                <Link href="/organization/events">View All Events</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

