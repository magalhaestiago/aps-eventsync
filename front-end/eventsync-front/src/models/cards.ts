export type CardProps = {
    title?: string,
    date?: Date,
    description?: string,
    subscribers?: {
        current: string,
        max: string
    }
}
// Just one example
export const eventCardMock: CardProps = { title: "WGESAD", description: "Evento de engenharia de software", date: new Date(), subscribers: {current: '10',max: '20'} }