/**
 * The `ContactForm` component is a React component that renders a contact form with various input fields and a submit button.
 * The form is designed to handle user submissions and send the form data to a backend API endpoint.
 * The component uses various UI components from the application's UI library, such as `InputContact`, `Textarea`, and `Button`.
 * It also utilizes the `useToast` hook to display success or error messages to the user.
 * The component includes animations and hover effects using the `framer-motion` library.
 */
"use client";
import React, { useEffect, useRef, useState } from 'react';
import InputContact from './input';
import { useToast } from "@/components/ui/use-toast";
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/otherTextArea';
import { useMotionValue, useMotionTemplate, motion } from "framer-motion";
import { cn } from '@/lib/utils';
import AOS from "aos";
import "aos/dist/aos.css"; // Import the AOS styles

export default function ContactForm() {
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        AOS.init({
            duration: 1000, // Set the animation duration (optional)
        });
    }, []);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                throw new Error(`response status: ${response.status}`);
            }
            const responseData = await response.json();
            toast({
                description: 'Message is sent successfully',
            });
            formRef.current?.reset(); // Safe call to reset the form
        } catch (err) {
            console.error(err);
            toast({
                description: `Cannot send message due to ${err}`,
                variant: 'destructive',
            });
        }
    }

    const radius = 100; // Change this to increase the radius of the hover effect
    const [visible, setVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: any) {
        let { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            className="rounded-[30px] flex flex-col bg-[#EBEBEB08] lg:mx-8 md:mx-8 mx-6 md:py-12 lg:py-10 py-6 px-8 shadow-lg shadow-blue-500/50 transition-shadow duration-500 ease-in-out"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos-delay="200"
        >
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col">
                <div className="flex flex-col justify-between lg:flex-row">
                    <InputContact
                        id="fname"
                        label="First Name"
                        placeholder="Eg. Ram"
                        type="text"
                        name="fname"
                        className="lg:w-[40vw]"
                    />
                    <InputContact
                        id="lname"
                        label="Last Name"
                        placeholder="Eg. Mohan"
                        type="text"
                        name="lname"
                        className="lg:w-[40vw]"
                    />
                </div>
                <InputContact
                    id="email"
                    label="Email"
                    placeholder="Eg: rammohanmishra@gmail.com"
                    type="text"
                    name="email"
                    className=""
                />
                <InputContact
                    id="phoneno"
                    label="Phone Number"
                    placeholder="Eg. 1234"
                    type="number"
                    name="phoneno"
                    className=""
                />
                <div className="flex flex-col justify-start w-moz-available">
                    <label className="text-white font-bold my-3" htmlFor="message">
                        Message
                    </label>
                    <motion.div
                        style={{
                            background: useMotionTemplate`
                                radial-gradient(
                                    ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
                                    var(--blue-500),
                                    transparent 80%
                                )
                            `,
                        }}
                        onMouseMove={handleMouseMove}
                        onMouseEnter={() => setVisible(true)}
                        onMouseLeave={() => setVisible(false)}
                        className={`p-[2px] rounded-lg transition duration-300 group/input ${
                            isAnimating ? 'shadow-[0_0_15px_5px_rgba(0,0,255,0.5)]' : ''
                        }`}
                        onAnimationStart={() => setIsAnimating(true)}
                        onAnimationEnd={() => setIsAnimating(false)}
                    >
                        <Textarea
                            name="message"
                            placeholder="Write something...."
                            className={cn(
                                `flex h-20 w-full border-none bg-gray-300 text-black shadow-input rounded-md px-3 py-2 text-sm file:border-0 file:bg-transparent 
                                file:text-sm file:font-medium placeholder:text-neutral-500 
                                focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-neutral-400 
                                disabled:cursor-not-allowed disabled:opacity-50 
                                relative z-50 
                                group-hover/input:shadow-none transition duration-400`
                            )}
                            id="message"
                            required
                        />
                    </motion.div>
                </div>

                <Button
                    className="relative z-40 secondary md:self-end lg:self-end self-center bg-[#407BFF] hover:bg-[#1358ec] mx-5 mt-5 rounded-xl font-semibold"
                    type="submit"
                >
                    <div className="absolute inset-0 rounded-lg blur-2xl bg-[#407BFF] opacity-70 transition-transform duration-500 ease-in-out"></div>
                    Send Message
                </Button>
            </form>
        </div>
    );
}
