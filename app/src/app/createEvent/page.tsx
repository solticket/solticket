"use client";

import Hero from "@/components/homepage/Hero";
import Navbar from "@/components/layout/Navbar";
import Benefits from "@/components/homepage/Benefits";
import GlobalLayout from "@/components/layout/GlobalLayout";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useProgramContext } from "@/context/program.context";
import { BN } from "bn.js";

const CreateEvent = () => {
  const { createEvent } = useProgramContext();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    count: ''
  });

  const handleChange = (e) => { 
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const creerEvent = (e) => {
    e.preventDefault();
    console.log(formData);
    const deadLine = new Date(formData.date);
    createEvent(formData.title, formData.description, formData.location, "VIRTUAL", new BN(303), parseInt(formData.count));
    // You can add your form submission logic here
  };

  return (
    <GlobalLayout>
      <main className="flex flex-col items-center justify-between w-full">
        <Navbar />
        <Hero />

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
      <button type="submit">Submit</button>
    </form>

        <Benefits />

        <div className="py-16 w-full items-center justify-center flex">
          <Button size="lg">
            {"Create your event and start selling tickets"}
          </Button>
        </div>
      </main>
    </GlobalLayout>
  );
};

export default CreateEvent;
