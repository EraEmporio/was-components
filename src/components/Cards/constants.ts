export type style = {
    container: string
    card: string
    circle: string
}

export type NoticeCard = {
    variation: string
    title: string
    text: string
}

type cardVariation = {
    cardStyle: string
    circleStyle: string
    iconVariation: string
    iconColor: string
}

const notice = <cardVariation>{
    cardStyle: 'bg-selenium-200/70 hover:bg-selenium-100',
    circleStyle: 'bg-selenium-500',
    iconVariation: 'entypo:megaphone',
    iconColor: 'white'
}
const alert = <cardVariation>{
    cardStyle: 'bg-amber-200/70 hover:bg-amber-100',
    circleStyle: 'bg-amber-500',
    iconVariation: 'ph:warning-fill',
    iconColor: 'white'
}

export const variations = <Record<string, cardVariation>>{
    "notice": notice,
    "alert": alert
}