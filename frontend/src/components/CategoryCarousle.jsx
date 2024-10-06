import React from 'react'
import { Button } from './ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'

const category = [
    "Frontend Developer", 
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer",
]

const CategoryCarousle = () => {

    return (
        <div>
            <Carousel className="w-full max-w-xl mx-auto my-20">
                <CarouselContent>
                    {
                        category.map((cat,  index) =>(
                            <CarouselItem className="md:basis-1/2 lg:basis-2/5">
                                <Button className="bg-clrprime">
                                    {cat}
                                </Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default CategoryCarousle
