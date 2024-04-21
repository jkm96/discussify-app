import {PostResponse} from "@/boundary/interfaces/post";
import {Card, CardFooter, CardHeader} from "@nextui-org/react";
import React from "react";

export function RenderPostTitle(props: { postDetails: PostResponse }) {
    return <Card className="w-full"
                 shadow={"none"}
                 radius={"none"}>
        <CardHeader className="justify-between">
            <div className="flex gap-5">
                <div className="flex flex-col gap-1 items-start justify-center">
                    <h4 className="font-semibold leading-none">
                        {props.postDetails.title}
                    </h4>
                </div>
            </div>
        </CardHeader>
        <CardFooter className="gap-3">
            <div className="flex gap-1">
                <p className="font-semibold text-default-400 text-small">Since</p>
                <p className=" text-default-400 text-small">2024</p>
            </div>
            <div className="flex gap-1">
                <p className="font-semibold text-default-400 text-small">97.1K</p>
                <p className="text-default-400 text-small">views</p>
            </div>
            <div className="flex gap-1">
                <p className="font-semibold text-default-400 text-small">97.1K</p>
                <p className="text-default-400 text-small">replies</p>
            </div>
            <div className="flex gap-1">
                <p className="font-semibold text-default-400 text-small">97.1K</p>
                <p className="text-default-400 text-small">participants</p>
            </div>
        </CardFooter>
    </Card>;
}