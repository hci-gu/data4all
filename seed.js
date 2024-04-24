import PocketBase from 'pocketbase'

const stringWithHyphen = (text) => {
    return text.toLowerCase().replaceAll(' ', '-')
}
const getRandomTag = (tags) => {
    const randomIndex = Math.floor(Math.random() * tags.length)
    return tags[randomIndex].id
}

;(async () => {
    const pb = new PocketBase('http://localhost:8090')
    await pb.admins.authWithPassword('admin@email.com', 'password123')

    const newTestTagsArray = [
        'Energy',
        'Finance',
        'Weather',
        'Web Analytics',
        'Environmental',
        'Sales',
        'Economics',
        'Social Media',
        'Transportation',
        'Employment',
        'CRM',
        'Economic Indicators',
        'Climate',
        'Market Analysis',
        'Demographics',
    ]

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

    const newTestUsers = [
        {
            name: 'Suzuka Nakamoto',
            email: 'Suzuka_Nakamoto@kungsbacka.com',
            role: 'User',
            password: 'password123',
        },
        {
            name: 'Moa Kikuchi',
            email: 'Moa_Kikuchi@kungsbacka.com',
            role: 'User',
            password: 'password123',
        },
        {
            name: 'Momoko Okazaki',
            email: 'Momoko_Okazaki@kungsbacka.com',
            role: 'User',
            password: 'password123',
        },
        {
            name: 'John Smith',
            email: 'john_smith@kungsbacka.com',
            role: 'User',
            password: 'password123',
        },
        {
            name: 'Maria Rodriguez',
            email: 'maria_rodriguez@kungsbacka.com',
            role: 'User',
            password: 'password123',
        },
        {
            name: 'Chen Wei',
            email: 'chen_wei@kungsbacka.com',
            role: 'User',
            password: 'password123',
        },
        {
            name: 'Emily Johnson',
            email: 'emily_johnson@kungsbacka.com',
            role: 'User',
            password: 'password123',
        },
        {
            name: 'Muhammad Khan',
            email: 'muhammad_khan@kungsbacka.com',
            role: 'User',
            password: 'password123',
        },
        {
            name: 'Sophie Martin',
            email: 'sophie_martin@kungsbacka.com',
            role: 'User',
            password: 'password123',
        },
        {
            name: 'Kim Sung',
            email: 'kim_sung@kungsbacka.com',
            role: 'User',
            password: 'password123',
        },
    ]

    const testdatasets = await pb.collection('dataset').getFullList()
    if (testdatasets.length > 0) {
        for (let index = 0; index < testdatasets.length; index++) {
            for (let j = 0; j < newTestRecordsArray.length; j++) {
                const testRecord = newTestRecordsArray[j]
                if (testdatasets[index].title.includes(testRecord.title)) {
                    await pb
                        .collection('dataset')
                        .delete(testdatasets[index].id)
                }
            }
        }
    }

    const testTags = await pb.collection('tag').getFullList()
    for (let index = 0; index < testTags.length; index++) {
        if (newTestTagsArray.includes(testTags[index].name)) {
            await pb.collection('tag').delete(testTags[index].id)
        }
    }

    let tags = []
    for (let i = 0; i < newTestTagsArray.length; i++) {
        const tag = newTestTagsArray[i]
        tags.push(
            await pb.collection('tag').create(
                {
                    name: tag,
                },
                { $autoCancel: false }
            )
        )
    }
    await Promise.all(tags)

    for (let i = 0; i < newTestRecordsArray.length; i++) {
        const record = newTestRecordsArray[i]
        await pb.collection('dataset').create(
            {
                ...record,
                slug: stringWithHyphen(record.title),
                tag: [getRandomTag(tags)],
            },
            { $autoCancel: false }
        )
    }

    const allusers = await pb.collection('users').getFullList()
    if (allusers.length > 0) {
        for (let index = 0; index < allusers.length; index++) {
            for (let j = 0; j < newTestUsers.length; j++) {
                const testUser = newTestUsers[j]
                if (allusers[index].email.includes(testUser.email)) {
                    await pb.collection('users').delete(allusers[index].id)
                }
            }
        }
    }

    let testUsers = []
    for (let index = 0; index < newTestUsers.length; index++) {
        const user = newTestUsers[index]
        testUsers.push(
            await pb.collection('users').create(
                {
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    password: user.password,
                    passwordConfirm: user.password,
                },
                {
                    $autoCancel: false,
                }
            )
        )
    }

    await Promise.all(testUsers)
})()
