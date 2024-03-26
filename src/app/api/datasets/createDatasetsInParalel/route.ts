import { pb } from '@/adapters/api'
import { NextResponse } from 'next/server'
import Client, { ClientResponseError } from 'pocketbase'
import { record } from 'zod'

const newTestRecordsArray = [
    {
        title: 'Electricity Consumption',
        description:
            'Time series data representing electricity consumption in kilowatt-hours (kWh) over a period of time.',
    },
    {
        title: 'Stock Prices',
        description:
            "Historical stock prices of a particular company's shares over time.",
    },
    {
        title: 'Temperature Readings',
        description:
            'Time series data representing temperature readings in Celsius or Fahrenheit over time.',
    },
    {
        title: 'Website Traffic',
        description:
            'Time series data representing the number of visitors to a website over time.',
    },
    {
        title: 'Air Quality Index',
        description:
            'Time series data representing the Air Quality Index (AQI) over time.',
    },
    {
        title: 'Sales Revenue',
        description:
            'Time series data representing sales revenue of a company over a period of time.',
    },
    {
        title: 'Exchange Rates',
        description:
            'Time series data representing exchange rates between two currencies over time.',
    },
    {
        title: 'Social Media Mentions',
        description:
            'Time series data representing the number of mentions or interactions on a social media platform over time.',
    },
    {
        title: 'Traffic Congestion',
        description:
            'Time series data representing the level of traffic congestion in a city over time.',
    },
    {
        title: 'Energy Production',
        description:
            'Time series data representing energy production (e.g., solar, wind, hydro) over time.',
    },
    {
        title: 'Unemployment Rate',
        description:
            'Time series data representing the unemployment rate in a region over time.',
    },
    {
        title: 'Customer Churn',
        description:
            'Time series data representing the rate of customer churn (i.e., customer attrition) over time.',
    },
    {
        title: 'GDP Growth',
        description:
            'Time series data representing the Gross Domestic Product (GDP) growth rate of a country over time.',
    },
    {
        title: 'Rainfall',
        description:
            'Time series data representing the amount of rainfall in millimeters over time.',
    },
]

export async function GET(req: Request) {
    try {
        const records = newTestRecordsArray.map((record) => {
            return pb.collection('mocDataset').create(record)
        })

        return NextResponse.json(
            {
                message: 'success',
            },
            { status: 200 }
        )
    } catch (error) {
        if (error instanceof ClientResponseError) {
            // using return as thats what the nextjs docs recommend
            return NextResponse.json(
                { message: 'misslyckades att hämta dataset' },
                { status: 400 }
            )
        }
        return NextResponse.json({ message: 'Något gick fel' }, { status: 500 })
    }
}
