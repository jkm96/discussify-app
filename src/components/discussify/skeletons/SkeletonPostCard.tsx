import {Avatar, Card, CardFooter, CardHeader, Divider, Skeleton} from "@nextui-org/react";
import React from "react";
import {CardBody} from "@nextui-org/card";

export function SkeletonPostCard() {
    return (
        <Card className="w-full" radius='sm'>
            <CardHeader className="flex gap-3">
                {/* Skeleton for post header section */}
                <div className="flex flex-col gap-1">
                    <Skeleton className="w-24 h-4" />
                    <Skeleton className="w-full h-6" />
                </div>
            </CardHeader>

            <Divider className='mt-0'/>

            {/* Skeleton for post author details section */}
            <CardBody className='pt-0'>
                <Card className="w-full pl-0" shadow={"none"} radius={"none"}>
                    <CardHeader className="justify-between pl-0">
                        <div className="flex gap-2">
                            <Avatar radius="sm" size="md" src={''}/>
                            <div className="flex flex-col gap-1 items-start justify-center">
                                <Skeleton className="w-32 h-6" />
                                <Skeleton className="w-24 h-4" />
                            </div>
                        </div>
                    </CardHeader>
                </Card>

                {/* Skeleton for post content section */}
                <div>
                    <Skeleton className="w-full h-40 mt-2" />
                </div>
            </CardBody>

            {/* Skeleton for post actions section */}
            <CardFooter className="text-default-400 dark:text-white text-small justify-between pt-0">
                <div className="flex justify-start w-1/2">
                    <div className="flex items-center mr-1 cursor-pointer">
                        <Skeleton className="w-8 h-8"  />
                        <Skeleton className="ml-1 w-12 h-4" />
                    </div>
                    <div className="flex items-center cursor-pointer">
                        <Skeleton className="w-8 h-8"  />
                        <Skeleton className="ml-1 w-12 h-4" />
                    </div>
                </div>

                <div className="flex justify-end w-1/2">
                    <div className="flex mr-3 items-center cursor-pointer">
                        <Skeleton className="w-8 h-8"  />
                        <Skeleton className="ml-1 w-12 h-4" />
                    </div>

                    <div className="flex items-center cursor-pointer">
                        <Skeleton className="w-8 h-8"  />
                        <Skeleton className="ml-1 w-12 h-4" />
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}

export function SkeletonCard(){
    return (
        <div className="block rounded-lg shadow-secondary-1 dark:bg-surface-dark dark:text-white text-surface">
            <Card isFooterBlurred className="h-[200px] sm:col-span-7">
                <div className="animate-pulse h-full">
                    <CardHeader className="absolute z-10 top-1 flex-col items-start">
                        <Skeleton className="text-tiny font-bold w-20 h-4 mb-2"/>
                        <Skeleton className="text-medium w-full h-6"/>
                    </CardHeader>
                    <Skeleton className="w-full h-[150px]"/>
                    <CardFooter className="absolute bg-black/40 bottom-0 z-10">
                        <div className="flex flex-grow gap-2 items-center">
                            <div className="flex gap-2">
                                <Avatar radius="sm" size="sm" src={''}/>
                                <div className="flex flex-col gap-1 items-start justify-center">
                                    <Skeleton className="text-tiny text-white/60"/>
                                    <Skeleton className="text-tiny text-white/60"/>
                                </div>
                            </div>
                        </div>
                    </CardFooter>
                </div>
            </Card>
        </div>
    );
};
