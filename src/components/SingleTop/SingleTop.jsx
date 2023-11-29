import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Tooltip,
    IconButton,
} from "@material-tailwind/react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function SingleTop({ contest }) {
    const { participants, _id, contest_image, contest_name, contest_prize, contest_description, contest_price, contest_deadline } = contest



    const date = contest_deadline.substring(0, 10)


    return (
        <Card className="shadow-lg -z-1">
            <CardHeader floated={false} color="blue-gray">
                <img

                    src={contest_image}
                    alt="ui/ux review check"
                />
                <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />

            </CardHeader>
            <CardBody>
                <div className="mb-3 flex items-center justify-between">
                    <Typography variant="h5" color="blue-gray" className="font-medium">
                        {contest_name}
                    </Typography>

                </div>
                <Typography color="gray">
                    {contest_description}
                </Typography>
                <div className="flex flex-row gap-5">
                    <Typography color="gray" className="font-semibold">
                        Joining Fee : {contest_price}
                    </Typography>
                    <Typography color="gray" className="font-semibold">
                        Deadline : {date}
                    </Typography>
                </div>
                <Typography color="black" className="text-2xl font-semibold">
                   Participant: {participants}
                </Typography>
                <div className="group mt-8  inline-flex flex-wrap items-center gap-3">
                    <Typography color="black" >
                        <span className="font-bold">Prize Money : <span className="text-red-500">{contest_prize}</span></span>
                    </Typography>
                </div>
            </CardBody>
            <CardFooter className="pt-3 relative z-10">
                {/* <Button size="lg" fullWidth={true} className="bg-secondary  h-10 bottom-3">
                    Join Now
                </Button> */}

                <Link to={`/contest/${_id}`} className='btn w-full bg-secondary btn-secondary  h-10 bottom-3'>Show Details</Link>
                {/* <Link to={`/payment/contest/${_id}`}  className='btn join-item btn-secondary'>Join Now</Link> */}
            </CardFooter>
        </Card>
    );
}

export default SingleTop;