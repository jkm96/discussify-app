import {Button, Card, CardFooter, CardHeader, Image} from "@nextui-org/react";
import React from "react";

export default function CoverPosts() {
    return (
        <div className="flex flex-wrap gap-1 mb-3">
            <Card isFooterBlurred className="w-3/12 h-[200px] sm:col-span-7">
                <CardHeader className="absolute z-10 top-1 flex-col items-start">
                    <p className="text-tiny font-bold">Your day your way</p>
                    <h4 className="text-medium">Your checklist for better sleep</h4>
                </CardHeader>
                <Image
                    removeWrapper
                    alt="Relaxing app background"
                    className="z-0 w-1/2 h-full object-cover"
                    src="/images/card-example-5.jpeg"
                />
                <CardFooter
                    className="absolute bg-black/40 bottom-0 z-10">
                    <div className="flex flex-grow gap-2 items-center">
                        <div className="flex flex-col">
                            <p className="text-tiny text-white/60">Breathing App</p>
                            <p className="text-tiny text-white/60">Get a good night sleep.</p>
                        </div>
                    </div>
                    <Button radius="full" size="sm">Get App</Button>
                </CardFooter>
            </Card>
            <Card isFooterBlurred className="w-3/12  h-[200px] sm:col-span-7">
                <CardHeader className="absolute z-10 top-1 flex-col items-start">
                    <p className="text-tiny font-bold">Your day your way</p>
                    <h4 className="text-medium">Your checklist for better sleep</h4>
                </CardHeader>
                <Image
                    removeWrapper
                    alt="Relaxing app background"
                    className="z-0 w-1/2 h-full object-cover"
                    src="/images/card-example-5.jpeg"
                />
                <CardFooter
                    className="absolute bg-black/40 bottom-0 z-10">
                    <div className="flex flex-grow gap-2 items-center">
                        <Image
                            alt="Breathing app icon"
                            className="rounded-full w-10 h-11 bg-black"
                            src="/images/breathing-app-icon.jpeg"
                        />
                        <div className="flex flex-col">
                            <p className="text-tiny text-white/60">Breathing App</p>
                            <p className="text-tiny text-white/60">Get a good night sleep.</p>
                        </div>
                    </div>
                    <Button radius="full" size="sm">Get App</Button>
                </CardFooter>
            </Card>
            <Card isFooterBlurred className="w-3/12  h-[200px] sm:col-span-7">
                <CardHeader className="absolute z-10 top-1 flex-col items-start">
                    <p className="text-tiny font-bold">Your day your way</p>
                    <h4 className="text-medium">Your checklist for better sleep</h4>
                </CardHeader>
                <Image
                    removeWrapper
                    alt="Relaxing app background"
                    className="z-0 w-1/2 h-full object-cover"
                    src="/images/card-example-5.jpeg"
                />
                <CardFooter
                    className="absolute bg-black/40 bottom-0 z-10">
                    <div className="flex flex-grow gap-2 items-center">
                        <Image
                            alt="Breathing app icon"
                            className="rounded-full w-10 h-11 bg-black"
                            src="/images/breathing-app-icon.jpeg"
                        />
                        <div className="flex flex-col">
                            <p className="text-tiny text-white/60">Breathing App</p>
                            <p className="text-tiny text-white/60">Get a good night sleep.</p>
                        </div>
                    </div>
                    <Button radius="full" size="sm">Get App</Button>
                </CardFooter>
            </Card>
        </div>
    )
}